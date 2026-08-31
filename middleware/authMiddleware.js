const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = function (req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ msg: 'User is not authenticated. Please log in again.' });
    }

    try {
        if (!token.startsWith('Bearer ')) {
            return res.status(401).json({ msg: 'Invalid token' });
        }
        const actualToken = token.slice(7).trim();
        if (!actualToken) return res.status(401).json({ msg: 'Invalid token' });

        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET, { algorithms: ['HS256'] });
        if (!decoded?.user?.id || !Number.isSafeInteger(decoded.user.id)) {
            return res.status(401).json({ msg: 'Invalid token' });
        }
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};
