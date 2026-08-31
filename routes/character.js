const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/authMiddleware');
const { getCharacter } = require('../controllers/characterController');

const Character = require('../models/Character');
const Race = require('../models/Race');
const { positiveInteger, badRequest } = require('../utils/requestValidation');

dotenv.config();

router.post('/register', authMiddleware, async (req, res) => {
    const { name, raceId } = req.body;

    try {
        if (typeof name !== 'string' || !name.trim() || name.length > 100) return badRequest(res, 'Invalid character name.');
        const validRaceId = positiveInteger(raceId);
        if (!validRaceId) return badRequest(res, 'Invalid character details.');
        if (await Character.findOne({ where: { userId: req.user.id } })) return res.status(409).json({ msg: 'This user already has a character.' });
        if (!await Race.findByPk(validRaceId)) return badRequest(res, 'Invalid race.');
        let character = await Character.findOne({ where: { name: name.trim() } });
        if (character) {
            return res.status(400).json({ msg: 'A character with this name already exists.' });
        }

        character = await Character.create({
            name: name.trim(),
            raceId: validRaceId,
            userId: req.user.id,
        });
        return res.status(201).json(character);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

router.get('/races/get', authMiddleware, async (req, res) => {
    const { id, name, history, icon, heraldry, image } = req.body;
    try {
        let races = await Race.findAll();
        res.send(races);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

router.get('/getInfo', authMiddleware, getCharacter);

module.exports = router;
