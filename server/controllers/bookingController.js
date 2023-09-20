require('dotenv').config();
const Booking = require("../models/bookingModel.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Room = require("../models/roomModel.js");

//Stripe checkout
const createStripeCheckout = async (req, res, next) => {
  const { hotelId, name, price } = req.body;
  const YOUR_DOMAIN = 'http://localhost:3000';
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: name
            },
            unit_amount: price * 100
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/account/success`,
      cancel_url: `${YOUR_DOMAIN}/${hotelId}`,
    }); 
    res.json({ id: session.id });
  } catch (error) {
    next(error);
  }
};

//CREATION
const createBooking = async (req, res, next) => {    
  const { user, hotel, checkInDate, checkOutDate,
    noOfGuests, selectedRooms, totalAmount } = req.body; 
  const roomCounts = {};
  try {
    const rooms = await Room.find({ "roomNumbers._id": { $in: selectedRooms } }); 
    const roomDetails = rooms.map((room) => ({ title: room.title }));
    selectedRooms.forEach((roomId) => {
      const room = rooms.find((room) => room.roomNumbers.some((number) => number._id.toString() === roomId));
      if (room) {
        const { title } = room;
        roomCounts[title] = (roomCounts[title] || 0) + 1;
      }
    });
    const roomData = roomDetails.map((room) => ({
      title: room.title,
      count: roomCounts[room.title] || 0,
    }));
    const bookHotel = new Booking({
      user, hotel, checkInDate, checkOutDate, noOfGuests,
      selectedRooms: roomData,
      totalAmount
    });
    const saveBooking = await bookHotel.save();
    res.status(200).json({ message: 'Booked successfully', saveBooking });
  } catch (error) {
    next(error);
  }  
};
const bookingDetails = async (req, res, next) => {
  const { id: userId } = req.params;
  try {
    const bookingData = await Booking.find({ user: userId }).populate('hotel');
    res.status(200).json(bookingData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStripeCheckout, 
  createBooking,
  bookingDetails
}