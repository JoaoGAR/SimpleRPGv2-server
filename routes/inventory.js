const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/authMiddleware');
const { getInventory, equipItem } = require('../controllers/inventoryController');

dotenv.config();

router.get('/get', authMiddleware, getInventory);
router.post('/equip/item', authMiddleware, equipItem);

module.exports = router;