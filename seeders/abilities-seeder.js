'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();

        await queryInterface.bulkInsert('Abilities', [

            // ===== STRENGTH =====
            {
                name: 'Cleave',
                description: 'Basic strength cleave attack.',
                icon: 'abilities/strenght/cleave.jfif',
                skillId: 1,
                tierId: 1,
                typeId: 1,
                attack: null,
                weight: '50',
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Heavy Strike',
                description: 'Heavy strength strike.',
                icon: 'abilities/strenght/heavyStrike.jfif',
                skillId: 1,
                tierId: 2,
                typeId: 1,
                attack: null,
                weight: '50',
                createdAt: now,
                updatedAt: now,
            },

            // ===== INTELLIGENCE =====
            {
                name: 'Immolate',
                description: 'Basic fire intelligence spell.',
                icon: 'abilities/inteligence/immolate.jfif',
                skillId: 5,
                tierId: 1,
                typeId: 1,
                attack: null,
                weight: '50',
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Acid Spray',
                description: 'Acid intelligence attack.',
                icon: 'abilities/inteligence/acidSpray.jfif',
                skillId: 5,
                tierId: 2,
                typeId: 1,
                attack: null,
                weight: '50',
                createdAt: now,
                updatedAt: now,
            },

            // ===== DEXTERITY =====
            {
                name: 'Heavy shot',
                description: 'Heavy dexterity ranged attack.',
                icon: 'abilities/dexterity/heavyShot.jfif',
                skillId: 9,
                tierId: 1,
                typeId: 1,
                attack: null,
                weight: '50',
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Explosive shot',
                description: 'Explosive dexterity ranged attack.',
                icon: 'abilities/dexterity/explosiveShot.jfif',
                skillId: 9,
                tierId: 2,
                typeId: 1,
                attack: null,
                weight: '50',
                createdAt: now,
                updatedAt: now,
            },

        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Abilities', {
            name: [
                'Cleave',
                'Heavy Strike',
                'Immolate',
                'Acid Spray',
                'Heavy shot',
                'Explosive shot'
            ]
        });
    }
};