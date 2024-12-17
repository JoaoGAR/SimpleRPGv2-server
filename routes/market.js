const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/authMiddleware');
const { fillMarket, buyItem } = require('../controllers/marketController');

dotenv.config();

router.get('/getItems', authMiddleware, fillMarket);
router.post('/buyItem', authMiddleware, buyItem);

module.exports = router;