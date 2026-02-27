'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();

        await queryInterface.bulkInsert('Attributes', [
            {
                id: 1,
                name: 'Strength',
                description: 'x',
                icon: 'icons/attributes/strenght.jfif',
                color: 'red',
                createdAt: now,
                updatedAt: now,
            },
            {
                id: 2,
                name: 'Intelligence',
                description: 'x',
                icon: 'icons/attributes/inteligence.jfif',
                color: 'blue',
                createdAt: now,
                updatedAt: now,
            },
            {
                id: 3,
                name: 'Dexterity',
                description: 'x',
                icon: 'icons/attributes/dexterity.jfif',
                color: 'green',
                createdAt: now,
                updatedAt: now,
            },
            {
                id: 4,
                name: 'Charisma',
                description: 'x',
                icon: 'icons/attributes/charisma.jfif',
                color: 'pink',
                createdAt: now,
                updatedAt: now,
            },
            {
                id: 5,
                name: 'Sacred',
                description: 'x',
                icon: 'icons/attributes/sacre.jfif',
                color: 'yellow',
                createdAt: now,
                updatedAt: now,
            },
            {
                id: 6,
                name: 'Occultism',
                description: 'x',
                icon: 'icons/attributes/occultism.jfif',
                color: 'purple',
                createdAt: now,
                updatedAt: now,
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Attributes', null, {});
    }
};
