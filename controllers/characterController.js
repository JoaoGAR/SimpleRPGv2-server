const { getCharacterByUser } = require('../DAOs/CharacterDAO');

async function getCharacter(req, res) {
    try {
        const userId = req.user.id;
        const character = await getCharacterByUser(userId);
        if (!character) return res.status(404).json({ msg: 'Character not found.' });
        res.send(character);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

module.exports = { getCharacter };
