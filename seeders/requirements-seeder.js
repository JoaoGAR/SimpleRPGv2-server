'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();

        await queryInterface.bulkInsert('Requirements', [

            // ===== Strength Jobs =====
            { jobId: 2, skillId: 2, skillLevel: 2, createdAt: now, updatedAt: now }, // Vigor
            { jobId: 2, skillId: 4, skillLevel: 2, createdAt: now, updatedAt: now }, // Athletism

            { jobId: 3, skillId: 1, skillLevel: 3, createdAt: now, updatedAt: now }, // Melee
            { jobId: 3, skillId: 3, skillLevel: 2, createdAt: now, updatedAt: now }, // Resistance

            { jobId: 4, skillId: 2, skillLevel: 4, createdAt: now, updatedAt: now }, // Vigor
            { jobId: 4, skillId: 4, skillLevel: 3, createdAt: now, updatedAt: now }, // Athletism

            { jobId: 5, skillId: 1, skillLevel: 5, createdAt: now, updatedAt: now }, // Melee
            { jobId: 5, skillId: 3, skillLevel: 4, createdAt: now, updatedAt: now }, // Resistance

            // ===== Intelligence Jobs =====
            { jobId: 6, skillId: 6, skillLevel: 2, createdAt: now, updatedAt: now }, // Knowledge
            { jobId: 6, skillId: 7, skillLevel: 2, createdAt: now, updatedAt: now }, // Logic

            { jobId: 7, skillId: 11, skillLevel: 3, createdAt: now, updatedAt: now }, // Expertise
            { jobId: 7, skillId: 7, skillLevel: 2, createdAt: now, updatedAt: now }, // Logic

            { jobId: 8, skillId: 7, skillLevel: 4, createdAt: now, updatedAt: now }, // Logic
            { jobId: 8, skillId: 6, skillLevel: 3, createdAt: now, updatedAt: now }, // Knowledge

            { jobId: 9, skillId: 11, skillLevel: 5, createdAt: now, updatedAt: now }, // Expertise
            { jobId: 9, skillId: 7, skillLevel: 4, createdAt: now, updatedAt: now }, // Logic

            // ===== Dexterity Jobs =====
            { jobId: 10, skillId: 9, skillLevel: 2, createdAt: now, updatedAt: now }, // Accuracy
            { jobId: 10, skillId: 10, skillLevel: 2, createdAt: now, updatedAt: now }, // Stealth

            { jobId: 11, skillId: 10, skillLevel: 3, createdAt: now, updatedAt: now }, // Stealth
            { jobId: 11, skillId: 12, skillLevel: 2, createdAt: now, updatedAt: now }, // Acrobatics

            { jobId: 12, skillId: 9, skillLevel: 4, createdAt: now, updatedAt: now }, // Accuracy
            { jobId: 12, skillId: 8, skillLevel: 3, createdAt: now, updatedAt: now }, // Resilience (Reflex substitute)

            { jobId: 13, skillId: 10, skillLevel: 5, createdAt: now, updatedAt: now }, // Stealth
            { jobId: 13, skillId: 12, skillLevel: 4, createdAt: now, updatedAt: now }, // Acrobatics

            // ===== Charisma Jobs =====
            { jobId: 14, skillId: 13, skillLevel: 2, createdAt: now, updatedAt: now }, // Persuasion
            { jobId: 14, skillId: 14, skillLevel: 2, createdAt: now, updatedAt: now }, // Deception

            { jobId: 15, skillId: 16, skillLevel: 3, createdAt: now, updatedAt: now }, // Leadership
            { jobId: 15, skillId: 13, skillLevel: 2, createdAt: now, updatedAt: now }, // Persuasion

            { jobId: 16, skillId: 15, skillLevel: 4, createdAt: now, updatedAt: now }, // Intimidation
            { jobId: 16, skillId: 16, skillLevel: 3, createdAt: now, updatedAt: now }, // Leadership

            { jobId: 17, skillId: 16, skillLevel: 5, createdAt: now, updatedAt: now }, // Leadership
            { jobId: 17, skillId: 13, skillLevel: 4, createdAt: now, updatedAt: now }, // Persuasion

            // ===== Sacred Jobs =====
            { jobId: 18, skillId: 17, skillLevel: 2, createdAt: now, updatedAt: now }, // Faith
            { jobId: 18, skillId: 18, skillLevel: 2, createdAt: now, updatedAt: now }, // Willpower

            { jobId: 19, skillId: 20, skillLevel: 3, createdAt: now, updatedAt: now }, // Healing
            { jobId: 19, skillId: 17, skillLevel: 3, createdAt: now, updatedAt: now }, // Faith

            { jobId: 20, skillId: 19, skillLevel: 4, createdAt: now, updatedAt: now }, // Purification
            { jobId: 20, skillId: 18, skillLevel: 3, createdAt: now, updatedAt: now }, // Willpower

            { jobId: 21, skillId: 17, skillLevel: 5, createdAt: now, updatedAt: now }, // Faith
            { jobId: 21, skillId: 19, skillLevel: 4, createdAt: now, updatedAt: now }, // Purification

            // ===== Occultism Jobs =====
            { jobId: 22, skillId: 21, skillLevel: 2, createdAt: now, updatedAt: now }, // Dark Arts
            { jobId: 22, skillId: 24, skillLevel: 2, createdAt: now, updatedAt: now }, // Forbidden Knowledge

            { jobId: 23, skillId: 23, skillLevel: 3, createdAt: now, updatedAt: now }, // Curses
            { jobId: 23, skillId: 21, skillLevel: 2, createdAt: now, updatedAt: now }, // Dark Arts

            { jobId: 24, skillId: 22, skillLevel: 4, createdAt: now, updatedAt: now }, // Necromancy
            { jobId: 24, skillId: 24, skillLevel: 3, createdAt: now, updatedAt: now }, // Forbidden Knowledge

            { jobId: 25, skillId: 21, skillLevel: 5, createdAt: now, updatedAt: now }, // Dark Arts
            { jobId: 25, skillId: 22, skillLevel: 4, createdAt: now, updatedAt: now }, // Necromancy

            // ===== Mixed Jobs =====
            { jobId: 26, skillId: 12, skillLevel: 5, createdAt: now, updatedAt: now }, // Acrobatics
            { jobId: 26, skillId: 14, skillLevel: 5, createdAt: now, updatedAt: now }, // Deception
            { jobId: 26, skillId: 8, skillLevel: 5, createdAt: now, updatedAt: now }, // Resilience

            { jobId: 27, skillId: 9, skillLevel: 4, createdAt: now, updatedAt: now }, // Accuracy
            { jobId: 27, skillId: 10, skillLevel: 4, createdAt: now, updatedAt: now }, // Stealth
            { jobId: 27, skillId: 11, skillLevel: 3, createdAt: now, updatedAt: now }, // Expertise

            { jobId: 28, skillId: 16, skillLevel: 4, createdAt: now, updatedAt: now }, // Leadership
            { jobId: 28, skillId: 17, skillLevel: 4, createdAt: now, updatedAt: now }, // Faith
            { jobId: 28, skillId: 21, skillLevel: 4, createdAt: now, updatedAt: now }, // Dark Arts

            { jobId: 29, skillId: 6, skillLevel: 4, createdAt: now, updatedAt: now }, // Knowledge
            { jobId: 29, skillId: 2, skillLevel: 4, createdAt: now, updatedAt: now }, // Vigor
            { jobId: 29, skillId: 16, skillLevel: 4, createdAt: now, updatedAt: now }, // Leadership

        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Requirements', null, {});
    }
};