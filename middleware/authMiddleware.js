const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = function (req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ msg: 'Usuário sem autenticação, refaça o login.' });
    }

    try {
        const actualToken = token.startsWith('Bearer ') ? token.slice(7, token.length).trimLeft() : token;

        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token inválido' });
    }
};