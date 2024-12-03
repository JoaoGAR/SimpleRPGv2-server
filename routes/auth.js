const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/authMiddleware');
const UserController = require('../controllers/userController');

dotenv.config();
const userController = new UserController();

router.post('/register', (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));
router.get('/me', authMiddleware, (req, res) => userController.me(req, res));

module.exports = router;