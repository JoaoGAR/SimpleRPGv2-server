const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/authMiddleware');
const characterMiddleware = require('../middleware/characterMiddleware');
const { rerollAbilities, rerollBaseTier } = require('../controllers/craftController');

dotenv.config();

router.post('/reroll/abilities', authMiddleware, characterMiddleware, rerollAbilities);
router.post('/reroll/baseTier', authMiddleware, characterMiddleware, rerollBaseTier);

module.exports = router;
