const dayjs = require('dayjs');

const Reward = require('../models/Reward');
const Character = require('../models/Character');
const WorkQueue = require('../models/WorkQueue');
const Job = require('../models/Job');
const Attribute = require('../models/Attribute');

async function getQueue(req, res) {
    try {
        const userId = req.user.id;
        const now = dayjs();
        let character = await Character.findOne({ where: { userId } });
        const characterId = character.id;
        let queue = await WorkQueue.findAll({
            where: { characterId },
            order: [
                ['createdAt', 'ASC'],
            ],
            include: [
                {
                    model: Job, as: 'job',
                    include: [
                        { model: Reward, as: 'rewards' },
                        { model: Attribute, as: 'attribute' },
                    ]
                }
            ],
        });
        queue.forEach(function callback(value, index) {
            if (queue[index - 1]) {
                if (queue[index - 1].jobStatus == 2) {
                    value.jobStatus = 1;
                }
            } else {
                value.jobStatus = 1;
            }
            if (value.endAt <= now) {
                value.jobStatus = 2;
            }
            WorkQueue.update(
                { jobStatus: value.jobStatus },
                { where: { id: value.id } },
            );
        });
        res.send(queue);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erro no servidor');
    }
}

module.exports = { getQueue };