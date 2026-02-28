'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();

        await queryInterface.bulkInsert('DamageTypes', [
            { name: 'PHYSICAL', icon: 'icons/damage/physical.png', createdAt: now, updatedAt: now },
            { name: 'FIRE', icon: 'icons/damage/fire.png', createdAt: now, updatedAt: now },
            { name: 'COLD', icon: 'icons/damage/cold.png', createdAt: now, updatedAt: now },
            { name: 'LIGHTNING', icon: 'icons/damage/lightning.png', createdAt: now, updatedAt: now },
            { name: 'POISON', icon: 'icons/damage/poison.png', createdAt: now, updatedAt: now },
            { name: 'PSYCHIC', icon: 'icons/damage/psychic.png', createdAt: now, updatedAt: now },
            { name: 'HOLY', icon: 'icons/damage/holy.png', createdAt: now, updatedAt: now },
            { name: 'DARK', icon: 'icons/damage/dark.png', createdAt: now, updatedAt: now }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('DamageTypes', {
            name: ['PHYSICAL', 'FIRE', 'COLD', 'LIGHTNING', 'POISON', 'NECROTIC', 'RADIANT', 'PSYCHIC', 'HOLY']
        });
    }
};
