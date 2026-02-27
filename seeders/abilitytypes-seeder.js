'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();

        await queryInterface.bulkInsert('AbilityTypes', [
            { name: 'Damage', createdAt: now, updatedAt: now },
            { name: 'Heal', createdAt: now, updatedAt: now },
            { name: 'Buff', createdAt: now, updatedAt: now },
            { name: 'Debuff', createdAt: now, updatedAt: now },
            { name: 'Utility', createdAt: now, updatedAt: now },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('AbilityTypes', {
            name: ['Damage', 'Heal', 'Buff', 'Debuff', 'Utility']
        });
    }
};
