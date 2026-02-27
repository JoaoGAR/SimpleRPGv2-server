'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();

        await queryInterface.bulkInsert('Skills', [

            // ===== Strength (attributeId: 1) =====
            { attributeId: 1, name: 'Melee', description: 'x', icon: 'icons/skills/melee.jfif', createdAt: now, updatedAt: now },
            { attributeId: 1, name: 'Vigor', description: 'x', icon: 'icons/skills/vigor.jfif', createdAt: now, updatedAt: now },
            { attributeId: 1, name: 'Resistance', description: 'x', icon: 'icons/skills/resistance.jfif', createdAt: now, updatedAt: now },
            { attributeId: 1, name: 'Athletism', description: 'x', icon: 'icons/skills/athletism.jfif', createdAt: now, updatedAt: now },

            // ===== Intelligence (attributeId: 2) =====
            { attributeId: 2, name: 'Arcanism', description: 'x', icon: 'icons/skills/arcanism.jfif', createdAt: now, updatedAt: now },
            { attributeId: 2, name: 'Knowledge', description: 'x', icon: 'icons/skills/knowledge.jfif', createdAt: now, updatedAt: now },
            { attributeId: 2, name: 'Logic', description: 'x', icon: 'icons/skills/logic.jfif', createdAt: now, updatedAt: now },
            { attributeId: 2, name: 'Resilience', description: 'x', icon: 'icons/skills/resilience.jfif', createdAt: now, updatedAt: now },

            // ===== Dexterity (attributeId: 3) =====
            { attributeId: 3, name: 'Accuracy', description: 'x', icon: 'icons/skills/accuracy.jfif', createdAt: now, updatedAt: now },
            { attributeId: 3, name: 'Stealth', description: 'x', icon: 'icons/skills/stealth.jfif', createdAt: now, updatedAt: now },
            { attributeId: 3, name: 'Expertise', description: 'x', icon: 'icons/skills/expertise.jfif', createdAt: now, updatedAt: now },
            { attributeId: 3, name: 'Acrobatics', description: 'x', icon: 'icons/skills/acrobatics.jfif', createdAt: now, updatedAt: now },

            // ===== Charisma (attributeId: 4) =====
            { attributeId: 4, name: 'Persuasion', description: 'x', icon: 'icons/skills/persuasion.jfif', createdAt: now, updatedAt: now },
            { attributeId: 4, name: 'Deception', description: 'x', icon: 'icons/skills/deception.jfif', createdAt: now, updatedAt: now },
            { attributeId: 4, name: 'Intimidation', description: 'x', icon: 'icons/skills/intimidation.jfif', createdAt: now, updatedAt: now },
            { attributeId: 4, name: 'Leadership', description: 'x', icon: 'icons/skills/leadership.jfif', createdAt: now, updatedAt: now },

            // ===== Sacred (attributeId: 5) =====
            { attributeId: 5, name: 'Faith', description: 'x', icon: 'icons/skills/faith.jfif', createdAt: now, updatedAt: now },
            { attributeId: 5, name: 'Willpower', description: 'x', icon: 'icons/skills/willpower.jfif', createdAt: now, updatedAt: now },
            { attributeId: 5, name: 'Purification', description: 'x', icon: 'icons/skills/purification.jfif', createdAt: now, updatedAt: now },
            { attributeId: 5, name: 'Healing', description: 'x', icon: 'icons/skills/healing.jfif', createdAt: now, updatedAt: now },

            // ===== Occultism (attributeId: 6) =====
            { attributeId: 6, name: 'Dark Arts', description: 'x', icon: 'icons/skills/darkarts.jfif', createdAt: now, updatedAt: now },
            { attributeId: 6, name: 'Necromancy', description: 'x', icon: 'icons/skills/necromancy.jfif', createdAt: now, updatedAt: now },
            { attributeId: 6, name: 'Curses', description: 'x', icon: 'icons/skills/curses.jfif', createdAt: now, updatedAt: now },
            { attributeId: 6, name: 'Forbidden Knowledge', description: 'x', icon: 'icons/skills/forbiddenknowledge.jfif', createdAt: now, updatedAt: now },

        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Skills', null, {});
    }
};