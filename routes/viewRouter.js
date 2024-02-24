const express = require('express');

const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get(
  '/tour/:slug',
  authController.isLoggedIn,
  viewController.getTourDetails,
);
router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewController.getSingupForm);

router.get('/me',authController.protect,viewController.getAccount);

module.exports = router;
