require('dotenv').config();
const express = require("express");
const booking_route = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyUser } = require("../middlewares/authorization");

booking_route.post('/:id/create-checkout-session',verifyUser, bookingController.createStripeCheckout);
booking_route.post('/webhook', express.raw({ type: 'application/json' }), bookingController.createWebhook);

// booking_route.post('/:id/book-property', verifyUser, bookingController.createBooking);
booking_route.get('/:id/bookings', verifyUser, bookingController.bookingDetails);

// let endpointSecret;
// // const endpointSecret = process.env.WEBHOOK_SECRET;
// booking_route.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
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
//     });
//   }
//   // Return a 200 res to acknowledge receipt of the event
//   res.send();
// });




module.exports = booking_route;
