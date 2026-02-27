'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();

        await queryInterface.bulkInsert('DamageTypes', [
            { name: 'PHYSICAL', icon: 'icons/damage/physical.jfif', createdAt: now, updatedAt: now },
            { name: 'FIRE', icon: 'icons/damage/fire.jfif', createdAt: now, updatedAt: now },
            { name: 'COLD', icon: 'icons/damage/cold.jfif', createdAt: now, updatedAt: now },
            { name: 'LIGHTNING', icon: 'icons/damage/lightning.jfif', createdAt: now, updatedAt: now },
            { name: 'ACID', icon: 'icons/damage/acid.jfif', createdAt: now, updatedAt: now },
            { name: 'POISON', icon: 'icons/damage/poison.jfif', createdAt: now, updatedAt: now },
            { name: 'NECROTIC', icon: 'icons/damage/necrotic.jfif', createdAt: now, updatedAt: now },
            { name: 'RADIANT', icon: 'icons/damage/radiant.jfif', createdAt: now, updatedAt: now },
            { name: 'PSYCHIC', icon: 'icons/damage/psychic.jfif', createdAt: now, updatedAt: now },
            { name: 'FORCE', icon: 'icons/damage/force.jfif', createdAt: now, updatedAt: now },
            { name: 'THUNDER', icon: 'icons/damage/thunder.jfif', createdAt: now, updatedAt: now },
            { name: 'HOLY', icon: 'icons/damage/holy.jfif', createdAt: now, updatedAt: now },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('DamageTypes', {
            name: ['PHYSICAL', 'FIRE', 'COLD', 'LIGHTNING', 'ACID', 'POISON', 'NECROTIC', 'RADIANT', 'PSYCHIC', 'FORCE', 'THUNDER', 'HOLY']
        });
    }
};
