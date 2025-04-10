const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getNotifications } = require('../controllers/notificationsController');

router.get('/', protect, getNotifications);

module.exports = router;
