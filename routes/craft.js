const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/authMiddleware');
const { rerollAbilities, rerollBaseTier } = require('../controllers/craftController');

dotenv.config();

router.post('/reroll/abilities', authMiddleware, rerollAbilities);
router.post('/reroll/baseTier', authMiddleware, rerollBaseTier);

module.exports = router;
