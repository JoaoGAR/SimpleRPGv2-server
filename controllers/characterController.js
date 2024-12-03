const { getCharacterByUser } = require('../DAOs/CharacterDAO');

async function getCharacter(req, res) {
    try {
        const { characterId } = req.query;
        const character = await getCharacterByUser(null, characterId);
        res.send(character);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erro no servidor');
    }
}

module.exports = { getCharacter };