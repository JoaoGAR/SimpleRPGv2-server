'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();

        await queryInterface.bulkInsert('Races', [
            {
                name: 'Human',
                history: 'Humans are adaptable and ambitious, thriving in diverse cultures and environments. Their societies rise and fall quickly, driven by ambition, faith, and conflict.',
                icon: 'races/human.jfif',
                heraldry: 'races/human.jfif',
                image: 'races/human.jfif',
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Dwarf',
                history: 'Dwarves are resilient folk born in stone halls beneath the mountains. Masters of craftsmanship and endurance, they value honor, tradition, and ancestral legacy.',
                icon: 'races/dwarf.jfif',
                heraldry: 'races/dwarf.jfif',
                image: 'races/dwarf.jfif',
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Elf',
                history: 'Elves are ancient beings bound to magic and nature. Their long lives grant them wisdom, but also sorrow, as they witness the slow decay of the world.',
                icon: 'races/elf.jfif',
                heraldry: 'races/elf.jfif',
                image: 'races/elf.jfif',
                createdAt: now,
                updatedAt: now,
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Races', null, {});
    }
};