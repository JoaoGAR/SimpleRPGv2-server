const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/authMiddleware');

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

module.exports = router;