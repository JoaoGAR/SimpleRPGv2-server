const User = require('../models/User');
const Character = require('../models/Character');

User.associate({ Character });

class UserDAO {
    async getUser(id = null, email = null) {

        const key = id !== null ? { 'id': id } : { 'email': email };

        const user = await User.findOne({
            where: key,
            include: [{ model: Character, as: 'character' }],
        });
        return user;
    }
}

module.exports = UserDAO;