const { positiveInteger, badRequest } = require('../utils/requestValidation');
const { challengeTarget: challengeTargetService, BattleError } = require('../services/battleService');

async function challengeTarget(req, res) {
    const targetId = positiveInteger(req.body.targetId);
    if (!targetId) {
        return badRequest(res, 'Invalid target.');
    }

    try {
        const battle = await challengeTargetService(req.user.id, targetId);
        return res.send(battle);
    } catch (error) {
        if (error instanceof BattleError) {
            return res.status(error.status).json({ msg: error.message });
        }

        console.error('Unable to resolve battle:', error);
        return res.status(500).send('Server error');
    }
}

module.exports = { challengeTarget };
