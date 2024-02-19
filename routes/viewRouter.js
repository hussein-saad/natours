const express = require('express');

const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getOverview);
router.get('/tour/:slug', viewController.getTourDetails);

router.get('/login', viewController.getLoginForm);
router.get('/signup', viewController.getSingupForm);

module.exports = router;