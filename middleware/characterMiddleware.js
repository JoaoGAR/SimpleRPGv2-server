const Character = require('../models/Character');

module.exports = async function characterMiddleware(req, res, next) {
    try {
        const character = await Character.findOne({ where: { userId: req.user.id } });
        if (!character) return res.status(404).json({ msg: 'Character not found.' });
        req.character = character;
        return next();
    } catch (error) {
        return next(error);
    }
};
