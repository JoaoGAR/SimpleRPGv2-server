const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/authMiddleware');
const { getJobs, startWork, finishWork, dismissWork } = require('../controllers/jobController');

dotenv.config();

router.get('/get', authMiddleware, getJobs);
router.post('/startWork', authMiddleware, startWork);
router.post('/finish', authMiddleware, finishWork);
router.post('/dismiss', authMiddleware, dismissWork);

module.exports = router;