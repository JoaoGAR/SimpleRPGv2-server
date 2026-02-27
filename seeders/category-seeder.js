'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();

        await queryInterface.bulkInsert('Categories', [
            {
                id: 1,
                name: 'MAIN_HAND',
                slot: 1,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: 2,
                name: 'HEAD',
                slot: 2,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: 3,
                name: 'HANDS',
                slot: 3,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: 4,
                name: 'FEET',
                slot: 4,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: 5,
                name: 'BODY',
                slot: 5,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: 6,
                name: 'LEGS',
                slot: 6,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: 7,
                name: 'OFF_HAND',
                slot: 7,
                createdAt: now,
                updatedAt: now,
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Categories', null, {});
    }
};