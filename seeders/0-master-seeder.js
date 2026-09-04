'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const seeders = [
            require('./actiontype-seeder'),
            require('./abilitytypes-seeder'),
            require('./damagetype-seeder'),
            require('./attributes-seeder'),
            require('./category-seeder'),
            require('./tier-seeder'),
            require('./races-seeder'),
            require('./classes-seeder'),
            require('./skills-seeder'),
            require('./jobs-seeder'),
            require('./baseitems-seeder'),
            require('./status-seeder'),
            require('./requirements-seeder'),
            require('./rewards-seeder'),
            require('./abilities-seeder'),
        ];

        for (const seeder of seeders) {
            await seeder.up(queryInterface, Sequelize);
        }
    },

    async down(queryInterface, Sequelize) {
        const seeders = [
            require('./abilities-seeder'),
            require('./rewards-seeder'),
            require('./requirements-seeder'),
            require('./status-seeder'),
            require('./baseitems-seeder'),
            require('./jobs-seeder'),
            require('./skills-seeder'),
            require('./classes-seeder'),
            require('./races-seeder'),
            require('./tier-seeder'),
            require('./category-seeder'),
            require('./attributes-seeder'),
            require('./damagetype-seeder'),
            require('./abilitytypes-seeder'),
            require('./actiontype-seeder'),
        ];

        for (const seeder of seeders) {
            await seeder.down(queryInterface, Sequelize);
        }
    }
};
