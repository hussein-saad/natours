const express = require('express');

const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewController.getOverview,
);
router.get(
  '/tour/:slug',
  authController.isLoggedIn,
  viewController.getTourDetails,
);
router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewController.getSingupForm);

router.get('/me', authController.protect, viewController.getAccount);

router.get('/my-bookings', authController.protect, viewController.getMyBookings);

module.exports = router;
