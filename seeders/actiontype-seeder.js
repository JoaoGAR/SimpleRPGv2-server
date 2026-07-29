'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();

        await queryInterface.bulkInsert('ActionTypes', [
            {
                id: 1,
                name: 'Action',
                description: 'Standard action',
                icon: 'icons/actions/action.png',
                createdAt: now,
                updatedAt: now,
            },
            {
                id: 2,
                name: 'Bonus Action',
                description: 'Bonus action',
                icon: 'icons/actions/bonusAction.png',
                createdAt: now,
                updatedAt: now,
            },
            {
                id: 3,
                name: 'Reaction',
                description: 'Reaction trigger',
                icon: 'icons/actions/reaction.png',
                createdAt: now,
                updatedAt: now,
            },
            {
                id: 4,
                name: 'Passive',
                description: 'Passive effect',
                icon: 'icons/actions/passive.png',
                createdAt: now,
                updatedAt: now,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ActionTypes', null, {});
    }
};
