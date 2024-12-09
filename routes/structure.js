const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/authMiddleware');
const { getNPCs } = require('../controllers/npcController');

const Structure = require('../models/Structure');

dotenv.config();

router.get('/get', authMiddleware, async (req, res) => {
    try {
        let structures = await Structure.findAll();
        res.send(structures);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erro no servidor');
    }
});

router.get('/getById', authMiddleware, async (req, res) => {
    try {
        const { structureId } = req.query;
        let structure = await Structure.findOne({ where: { id: structureId } });
        res.send(structure);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erro no servidor');
    }
});

router.post('/getNPCsByLocation', authMiddleware, getNPCs)

module.exports = router;