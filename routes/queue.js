const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/authMiddleware');
const { getQueue } = require('../controllers/queueController');

dotenv.config();

router.get('/get', authMiddleware, getQueue);

module.exports = router;