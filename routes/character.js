const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/authMiddleware');
const { getCharacter } = require('../controllers/characterController');

const Character = require('../models/Character');
const Race = require('../models/Race');

dotenv.config();

router.post('/register', authMiddleware, async (req, res) => {
    const { name, raceId, coordsx, coordsy, userId } = req.body;

    try {
        let character = await Character.findOne({ where: { name } });
        if (character) {
            return res.status(400).json({ msg: 'Já existe um personagem com este nome.' });
        }

        character = await Character.create({
            name,
            raceId,
            coordsx,
            coordsy,
            userId,
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erro no servidor');
    }
});

router.get('/races/get', authMiddleware, async (req, res) => {
    const { id, name, history, icon, heraldry, image } = req.body;
    try {
        let races = await Race.findAll();
        res.send(races);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erro no servidor');
    }
});

router.get('/getInfo', authMiddleware, getCharacter);

module.exports = router;