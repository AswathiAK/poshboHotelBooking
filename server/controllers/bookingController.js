require('dotenv').config();
const Booking = require("../models/bookingModel.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Room = require("../models/roomModel.js");
const Hotel = require("../models/hotelModel.js");

//Stripe checkout
// const createStripeCheckout = async (req, res, next) => {
//   const { user, hotelId, price } = req.body;
//   const hotel = await Hotel.findById(hotelId);
//   const customer = await stripe.customers.create({
//     metadata: {
//       user_id: user._id,
//       name:user.name,
//       property: hotel.name,
//       total:price
//     }
//   });
//   const YOUR_DOMAIN = 'http://localhost:3000';
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: 'inr',
//             product_data: {
//               name: hotel.name
//             },
//             unit_amount: price * 100
//           },
//           quantity: 1
//         }
//       ],
//       customer:customer.id,
//       mode: 'payment',
//       success_url: `${YOUR_DOMAIN}/account/success`,
//       cancel_url: `${YOUR_DOMAIN}/${hotelId}`,
//     });
//     res.json({ id: session.id });
//   } catch (error) {
//     next(error);
//   }
// };

// let endpointSecret;
// // const endpointSecret = process.env.WEBHOOK_SECRET;
// const createWebhook = (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   let eventType;
//   let data;
//   if (endpointSecret) {
//     let event;
//     try {
//       event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//     } catch (err) {
//       res.status(400).send(`Webhook Error: ${err.message}`);
//       return;
//     }
//     data = event.data.object;
//     eventType = event.type;
//   } else {
//     data = req.body.data.object;
//     eventType = req.body.type;
//   }
//   // Handle the event
//   if (eventType==='checkout.session.completed') {
//     stripe.customers.retrieve(data.customer).then(customer => {
//       console.log('customer', customer);
//       console.log('data', data);
//     }).catch(err=>console.log(err.message));
//   }
//   // Return a 200 res to acknowledge receipt of the event
//   res.send().end();
// };

// //CREATION
// const createBooking = async (req, res, next) => {
//   const { user, hotel, checkInDate, checkOutDate,
//     noOfGuests, selectedRooms, totalAmount } = req.body;
//   const roomCounts = {};
//   try {
//     const rooms = await Room.find({ "roomNumbers._id": { $in: selectedRooms } });
//     const roomDetails = rooms.map((room) => ({ title: room.title }));
//     selectedRooms.forEach((roomId) => {
//       const room = rooms.find((room) => room.roomNumbers.some((number) => number._id.toString() === roomId));
//       if (room) {
//         const { title } = room;
//         roomCounts[title] = (roomCounts[title] || 0) + 1;
//       }
//     });
//     const roomData = roomDetails.map((room) => ({
//       title: room.title,
//       count: roomCounts[room.title] || 0,
//     }));
//     const bookHotel = new Booking({
//       user, hotel, checkInDate, checkOutDate, noOfGuests,
//       selectedRooms: roomData,
//       totalAmount
//     });
//     const saveBooking = await bookHotel.save();
//     res.status(200).json({ message: 'Booked successfully', saveBooking });
//   } catch (error) {
//     next(error);
//   }
// };
// const bookingDetails = async (req, res, next) => {
//   const { id: userId } = req.params;
//   try {
//     const bookingData = await Booking.find({ user: userId }).populate('hotel');
//     res.status(200).json(bookingData);
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   createStripeCheckout,
//   createBooking,
//   bookingDetails,createWebhook
// }


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

const createBooking = async (customer, data, tempBookingData, next) => {
  const { hotel, checkInDate, checkOutDate,
    noOfGuests, selectedRooms, totalAmount, dates } = tempBookingData; 
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
      user:customer.metadata.userId,
      hotel, checkInDate, checkOutDate, noOfGuests,
      selectedRooms: roomData,
      totalAmount,
      paymentId:data.payment_intent,
      paymentStatus:data.payment_status
    });
    const saveBooking = await bookHotel.save(); console.log(saveBooking);
    await Promise.all(selectedRooms.map(roomId => {
      const unAvailableRooms = Room.updateOne(
        { "roomNumbers._id": roomId },
        {
          $push: {
            "roomNumbers.$.unAvailableDates": dates
          }
        }
      );
      return unAvailableRooms;
    })); 
  } catch (error) {
    console.log(error.message);
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
        console.log('customer', customer);
        console.log('data', data);
        createBooking(customer, data, tempBookingData, next);
      })
      .catch(err => next(err));
  }
  // Return a 200 res to acknowledge receipt of the event
  res.send().end();
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
  bookingDetails,createWebhook
}