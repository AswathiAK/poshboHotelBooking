const express = require("express");
const review_route = express.Router();
const reviewController = require('../controllers/reviewController');
const { verifyUser } = require('../middlewares/authorization');

review_route.post('/:id/:hotelId', verifyUser, reviewController.addReview);
review_route.put('/:id/:reviewId', verifyUser, reviewController.editReview);
review_route.delete('/:id/:reviewId', verifyUser, reviewController.deleteReview);
review_route.get('/:id', verifyUser, reviewController.allReviewsOfUser);
review_route.get('/:id/:reviewId', verifyUser, reviewController.getSingleReview);

module.exports = review_route; 
