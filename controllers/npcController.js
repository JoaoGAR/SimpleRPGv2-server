const { getNPCsByLocation } = require('../DAOs/NpcDAO');

async function getNPCs(req, res) {
    try {
        const { structureId, locationId } = req.body;
        const npcs = await getNPCsByLocation(structureId, locationId);
        res.send(npcs);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

module.exports = { getNPCs };