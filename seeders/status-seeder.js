'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();

        await queryInterface.bulkInsert('Statuses', [
            {
                name: 'Poisoned',
                description: 'The target takes poison damage over time and has reduced resistance.',
                icon: 'icons/status/poisoned.jfif',
                skillId: 11,
                savingThrowSkillId: 2,
                duration: 3,
                stun: false,
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Burning',
                description: 'The target is on fire and takes recurring fire damage.',
                icon: 'icons/status/burning.jfif',
                skillId: 5,
                savingThrowSkillId: 8,
                duration: 2,
                stun: false,
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Stunned',
                description: 'The target cannot act while the effect lasts.',
                icon: 'icons/status/stunned.jfif',
                skillId: 1,
                savingThrowSkillId: 2,
                duration: 1,
                stun: true,
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Blessed',
                description: 'A divine boon that improves combat performance.',
                icon: 'icons/status/blessed.jfif',
                skillId: 17,
                savingThrowSkillId: null,
                duration: 3,
                stun: false,
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Feared',
                description: 'The target is overwhelmed by fear and has penalties to actions.',
                icon: 'icons/status/feared.jfif',
                skillId: 15,
                savingThrowSkillId: 18,
                duration: 2,
                stun: false,
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Silenced',
                description: 'The target cannot cast spells that require verbal components.',
                icon: 'icons/status/silenced.jfif',
                skillId: 6,
                savingThrowSkillId: 18,
                duration: 2,
                stun: false,
                createdAt: now,
                updatedAt: now,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Statuses', {
            name: ['Poisoned', 'Burning', 'Stunned', 'Blessed', 'Feared', 'Silenced']
        });
    }
};
