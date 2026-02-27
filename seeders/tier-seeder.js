'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {

        const now = new Date();

        await queryInterface.bulkInsert('Tiers', [

            {
                name: 'Damaged',
                color: '#bebebe',
                background: '#333333',
                weight: 40,
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Normal',
                color: '#000000',
                background: '#cccccc',
                weight: 30,
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Magic',
                color: '#ffffff',
                background: '#38682e',
                weight: 20,
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Masterwork',
                color: '#ffffff',
                background: '#0f4d9e',
                weight: 15,
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Rare',
                color: '#000000',
                background: '#fdd700',
                weight: 10,
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Exotic',
                color: '#000000',
                background: '#ff882e',
                weight: 6,
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Epic',
                color: '#ffffff',
                background: '#8011db',
                weight: 3,
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Unique',
                color: '#ffffff',
                background: '#ff0000',
                weight: 1,
                createdAt: now,
                updatedAt: now,
            },

        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Tiers', null, {});
    }
};