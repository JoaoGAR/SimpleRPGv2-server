const dayjs = require('dayjs');

const Reward = require('../models/Reward');
const Character = require('../models/Character');
const WorkQueue = require('../models/WorkQueue');
const Job = require('../models/Job');
const Attribute = require('../models/Attribute');
const BaseItem = require('../models/BaseItem');

async function getQueue(req, res) {
    try {
        const userId = req.user.id;
        const now = dayjs();
        let character = await Character.findOne({ where: { userId } });
        const characterId = character.id;
        let queue = await WorkQueue.findAll({
            where: { characterId },
            include: [
                {
                    model: Job, as: 'job',
                    include: [
                        {
                            model: Reward,
                            as: 'rewards',
                            include: [{ model: BaseItem, as: 'item' }],
                            order: [['itemId', 'ASC']],
                        },
                        { model: Attribute, as: 'attribute' },
                    ],
                }
            ],
            order: [
                ['id', 'ASC'],
            ],
        });
        queue.forEach(async function callback(value, index) {

            if (value.jobStatus === 2 && value.jobId === 1) {
                const coordsx = value.coordsx;
                const coordsy = value.coordsy;

                await character.update({ coordsx, coordsy });
                await value.destroy();
            }

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
            await WorkQueue.update(
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