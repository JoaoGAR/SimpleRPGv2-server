const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/authMiddleware');
const { getSkills, getCharacterSkills, saveCharacterSkills } = require('../controllers/skillController');

dotenv.config();

router.get('/get', authMiddleware, getSkills);
router.get('/character/skills/get', authMiddleware, getCharacterSkills);
router.post('/save', authMiddleware, saveCharacterSkills);

module.exports = router;