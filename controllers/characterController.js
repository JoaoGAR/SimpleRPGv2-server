const { getCharacterByUser } = require('../DAOs/CharacterDAO');

async function getCharacter(req, res) {
    try {
        const { characterId } = req.query;
        const userId = req.user.id;
        const character = await getCharacterByUser(userId, characterId);
        res.send(character);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

module.exports = { getCharacter };