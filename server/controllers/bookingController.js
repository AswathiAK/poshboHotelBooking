require('dotenv').config();
const Booking = require("../models/bookingModel.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Room = require("../models/roomModel.js");
const Hotel = require("../models/hotelModel.js");
const createError = require('../middlewares/errorHandling.js');
const { ObjectId } = require("mongodb");
const User = require('../models/userModel.js');
const Wallet = require('../models/walletHistoryModel.js');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

//stripe trial
let tempBookingData = null;
const createStripeCheckout = async (req, res, next) => {
  const { user, hotelId, price, bookingData } = req.body; 
  tempBookingData = bookingData; 
  const hotel = await Hotel.findById(hotelId); 
  const customer = await stripe.customers.create({
    metadata: {
      userId: user._id,
      name:user.name,
      property: hotel.name,
      total:price
    } 
  });
  const YOUR_DOMAIN = 'http://localhost:3000';
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: hotel.name
            },
            unit_amount: price * 100
          },
          quantity: 1
        }
      ],
      customer:customer.id,
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/account/success`,
      cancel_url: `${YOUR_DOMAIN}/${hotelId}`,
    }); 
    res.json({ id: session.id });
  } catch (error) {
    next(error);
  }
};

//wallet vachullacreatebookinginstripe
const createBooking = async (customer, data, tempBookingData, next) => {
  const { hotel, checkInDate, checkOutDate,
    noOfGuests, selectedRooms, totalAmount,
    isWalletApplied, balanceTotal,
    dates, wallet } = tempBookingData;  
  try { 
    const bookHotel = new Booking({
      user: customer.metadata.userId,
      hotel,
      checkInDate,
      checkOutDate,
      noOfGuests,
      selectedRooms,
      totalAmount,
      isWalletApplied,
      balanceTotal,
      paymentMethod:'card',
      paymentId: data.payment_intent,
      paymentStatus: data.payment_status,
    });
    const saveBooking = await bookHotel.save();
    await Promise.all(selectedRooms.map(async (roomId) => {
      const unAvailableRooms = await Room.updateOne(
        { "roomNumbers._id": roomId },
        {
          $push: {
            "roomNumbers.$.unAvailableDates": dates,
          },
        }
      );
      return unAvailableRooms;
    }));
    await User.updateOne(
      { _id: saveBooking.user },
      { $set: { wallet: wallet } },
      {new:true}
    );
  } catch (error) {
    next(error);
  }
};

let endpointSecret;
// const endpointSecret = process.env.WEBHOOK_SECRET;
const createWebhook = (req, res, next) => {  
  const sig = req.headers['stripe-signature'];
  let eventType;
  let data;
  if (endpointSecret) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    } 
    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;      
  } 
  // Handle the event
  if (eventType==='checkout.session.completed') {
    stripe.customers.retrieve(data.customer)
      .then(customer => {
        createBooking(customer, data, tempBookingData, next);
      })
      .catch(err => next(err));
  }
  res.send().end();
};

//booking with wallet only
const createBookingWithWallet = async (req, res, next) => {
  const { user, hotel, checkInDate, checkOutDate,
    noOfGuests, selectedRooms, totalAmount, balanceTotal, dates, wallet } = req.body;
  try {
    const bookHotel = new Booking({
      user, hotel, checkInDate, checkOutDate, noOfGuests,
      selectedRooms,
      totalAmount,
      isWalletApplied: true,
      balanceTotal,
      paymentMethod:'wallet',
      paymentId: uuidv4(),
      paymentStatus: 'paid'
    });
    const saveBooking = await bookHotel.save();
    await Promise.all(selectedRooms.map(async (roomId) => {
      const unAvailableRooms = await Room.updateOne(
        { "roomNumbers._id": roomId },
        {
          $push: {
            "roomNumbers.$.unAvailableDates": dates,
          },
        }
      );
      return unAvailableRooms;
    }));
    const updatedUser = await User.findOneAndUpdate(
      { _id: saveBooking.user },
      { $set: { wallet: wallet } },
      { new: true }
    );
    res.status(200).json({ message: 'Booked successfully', saveBooking ,updatedUser});
  } catch (error) {
    next(error);
  }
};

const userBookingDetails = async (req, res, next) => {
  const { id: userId } = req.params; 
  try {
    const pipeline = [
      { $match: { user: new ObjectId(userId) } },
      {
        $lookup: {
          from: "rooms",
          localField: "selectedRooms",
          foreignField: "roomNumbers._id",
          as: "roomDetails",
        },
      },
      {
        $lookup: {
          from: 'hotels',
          localField: 'hotel',
          foreignField: '_id',
          as:'hotelDetails'
        }
      }
    ];
    const bookingDetails = await Booking.aggregate(pipeline); 
    res.status(200).json(bookingDetails); 
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

//cancel with wallet history
const cancelBooking = async (req, res, next) => {
  const { bookingId } = req.params;
  try {
    const bookingData = await Booking.findById(bookingId); 
    if (!bookingData) {
      return next(createError(404, "Booking not found"));
    }
    const updatedBooking = await Booking.findByIdAndUpdate(
      { _id: bookingId },
      { $set: { bookingStatus: 'cancelled' } },
      { new: true }
    );
    const selectedRooms = updatedBooking.selectedRooms;
    await Promise.all(selectedRooms.map(async (room) => {
      const unAvailableRooms = await Room.updateOne(
        { "roomNumbers._id": room },
        { 
          $pull: {
            "roomNumbers.$.unAvailableDates": {
              $gte: updatedBooking.checkInDate,
              $lte: updatedBooking.checkOutDate
            }
          }
        }
      );
      return unAvailableRooms;
    }));
    await User.updateOne(
      { _id: updatedBooking.user },
      { $inc: { wallet: updatedBooking.totalAmount } }
    );
    const walletHistory = new Wallet({
      user: updatedBooking.user,
      bookingId: updatedBooking._id,
      creditedAmount: updatedBooking.totalAmount,
      transactionId: uuidv4()
    }); 
    const saveWalletHistory = await walletHistory.save();
    res.status(200).json({ message: 'Successfully cancelled the booking', updatedBooking });
  } catch (error) {
    next(error);
  }
};

const getWalletHistory = async (req, res, next) => {
  const { id: userId } = req.params;
  try {
    const walletHistory = await Wallet.find({ user: userId });
    res.status(200).json(walletHistory);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStripeCheckout, createWebhook,
  createBookingWithWallet,
  userBookingDetails, 
  cancelBooking,
  getWalletHistory
}