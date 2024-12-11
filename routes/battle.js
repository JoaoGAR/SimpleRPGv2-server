const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/authMiddleware');
const { challengeTarget } = require('../controllers/battleController');

dotenv.config();

router.post('/attack', authMiddleware, challengeTarget)

module.exports = router;