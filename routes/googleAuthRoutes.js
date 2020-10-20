const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.route('/').get(authController.getGoogle);
router.route('/dashboard').get(authController.getGoogleCb);

module.exports = router;
