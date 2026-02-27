'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();

        await queryInterface.bulkInsert('BaseItems', [

            /* ================= CLOTH ================= */

            { id: 1, name: 'Simple cloth head', description: 'Simple cloth head', icon: 'icons/items/head.svg', image: 'items/armor/cloth/head/', categoryId: 2, minAttack: null, maxAttack: null, armorClass: 1, attributeId: '2,3', armorType: 1, initiative: 1, basePrice: 1, createdAt: now, updatedAt: now },
            { id: 2, name: 'Simple cloth hands', description: 'Simple cloth hands', icon: 'icons/items/hands.svg', image: 'items/armor/cloth/hands/', categoryId: 3, minAttack: null, maxAttack: null, armorClass: 1, attributeId: '2,3', armorType: 1, initiative: 1, basePrice: 1, createdAt: now, updatedAt: now },
            { id: 3, name: 'Simple cloth feet', description: 'Simple cloth feet', icon: 'icons/items/feet.svg', image: 'items/armor/cloth/feet/', categoryId: 4, minAttack: null, maxAttack: null, armorClass: 1, attributeId: '2,3', armorType: 1, initiative: 1, basePrice: 1, createdAt: now, updatedAt: now },
            { id: 4, name: 'Simple cloth body', description: 'Simple cloth body', icon: 'icons/items/body.svg', image: 'items/armor/cloth/body/', categoryId: 5, minAttack: null, maxAttack: null, armorClass: 2, attributeId: '2,3', armorType: 1, initiative: 1, basePrice: 2, createdAt: now, updatedAt: now },
            { id: 5, name: 'Simple cloth legs', description: 'Simple cloth legs', icon: 'icons/items/legs.svg', image: 'items/armor/cloth/legs/', categoryId: 6, minAttack: null, maxAttack: null, armorClass: 1, attributeId: '2,3', armorType: 1, initiative: 1, basePrice: 1, createdAt: now, updatedAt: now },


            /* ================= LIGHT ================= */

            { id: 6, name: 'Simple light head', description: 'Simple light head', icon: 'icons/items/head.svg', image: 'items/armor/light/head/', categoryId: 2, minAttack: null, maxAttack: null, armorClass: 2, attributeId: '3', armorType: 2, initiative: 0, basePrice: 3, createdAt: now, updatedAt: now },
            { id: 7, name: 'Simple light hands', description: 'Simple light hands', icon: 'icons/items/hands.svg', image: 'items/armor/light/hands/', categoryId: 3, minAttack: null, maxAttack: null, armorClass: 2, attributeId: '3', armorType: 2, initiative: 0, basePrice: 3, createdAt: now, updatedAt: now },
            { id: 8, name: 'Simple light feet', description: 'Simple light feet', icon: 'icons/items/feet.svg', image: 'items/armor/light/feet/', categoryId: 4, minAttack: null, maxAttack: null, armorClass: 2, attributeId: '3', armorType: 2, initiative: 0, basePrice: 3, createdAt: now, updatedAt: now },
            { id: 9, name: 'Simple light body', description: 'Simple light body', icon: 'icons/items/body.svg', image: 'items/armor/light/body/', categoryId: 5, minAttack: null, maxAttack: null, armorClass: 3, attributeId: '3', armorType: 2, initiative: 0, basePrice: 4, createdAt: now, updatedAt: now },
            { id: 10, name: 'Simple light legs', description: 'Simple light legs', icon: 'icons/items/legs.svg', image: 'items/armor/light/legs/', categoryId: 6, minAttack: null, maxAttack: null, armorClass: 2, attributeId: '3', armorType: 2, initiative: 0, basePrice: 3, createdAt: now, updatedAt: now },


            /* ================= MEDIUM ================= */

            { id: 11, name: 'Simple medium head', description: 'Simple medium head', icon: 'icons/items/head.svg', image: 'items/armor/medium/head/', categoryId: 2, minAttack: null, maxAttack: null, armorClass: 3, attributeId: '1,3', armorType: 3, initiative: -1, basePrice: 6, createdAt: now, updatedAt: now },
            { id: 12, name: 'Simple medium hands', description: 'Simple medium hands', icon: 'icons/items/hands.svg', image: 'items/armor/medium/hands/', categoryId: 3, minAttack: null, maxAttack: null, armorClass: 3, attributeId: '1,3', armorType: 3, initiative: -1, basePrice: 6, createdAt: now, updatedAt: now },
            { id: 13, name: 'Simple medium feet', description: 'Simple medium feet', icon: 'icons/items/feet.svg', image: 'items/armor/medium/feet/', categoryId: 4, minAttack: null, maxAttack: null, armorClass: 3, attributeId: '1,3', armorType: 3, initiative: -1, basePrice: 6, createdAt: now, updatedAt: now },
            { id: 14, name: 'Simple medium body', description: 'Simple medium body', icon: 'icons/items/body.svg', image: 'items/armor/medium/body/', categoryId: 5, minAttack: null, maxAttack: null, armorClass: 5, attributeId: '1,3', armorType: 3, initiative: -1, basePrice: 8, createdAt: now, updatedAt: now },
            { id: 15, name: 'Simple medium legs', description: 'Simple medium legs', icon: 'icons/items/legs.svg', image: 'items/armor/medium/legs/', categoryId: 6, minAttack: null, maxAttack: null, armorClass: 3, attributeId: '1,3', armorType: 3, initiative: -1, basePrice: 6, createdAt: now, updatedAt: now },


            /* ================= HEAVY ================= */

            { id: 16, name: 'Simple heavy head', description: 'Simple heavy head', icon: 'icons/items/head.svg', image: 'items/armor/heavy/head/', categoryId: 2, minAttack: null, maxAttack: null, armorClass: 5, attributeId: '1', armorType: 4, initiative: -3, basePrice: 12, createdAt: now, updatedAt: now },
            { id: 17, name: 'Simple heavy hands', description: 'Simple heavy hands', icon: 'icons/items/hands.svg', image: 'items/armor/heavy/hands/', categoryId: 3, minAttack: null, maxAttack: null, armorClass: 4, attributeId: '1', armorType: 4, initiative: -3, basePrice: 12, createdAt: now, updatedAt: now },
            { id: 18, name: 'Simple heavy feet', description: 'Simple heavy feet', icon: 'icons/items/feet.svg', image: 'items/armor/heavy/feet/', categoryId: 4, minAttack: null, maxAttack: null, armorClass: 4, attributeId: '1', armorType: 4, initiative: -3, basePrice: 12, createdAt: now, updatedAt: now },
            { id: 19, name: 'Simple heavy body', description: 'Simple heavy body', icon: 'icons/items/body.svg', image: 'items/armor/heavy/body/', categoryId: 5, minAttack: null, maxAttack: null, armorClass: 8, attributeId: '1', armorType: 4, initiative: -3, basePrice: 15, createdAt: now, updatedAt: now },
            { id: 20, name: 'Simple heavy legs', description: 'Simple heavy legs', icon: 'icons/items/legs.svg', image: 'items/armor/heavy/legs/', categoryId: 6, minAttack: null, maxAttack: null, armorClass: 5, attributeId: '1', armorType: 4, initiative: -3, basePrice: 12, createdAt: now, updatedAt: now },

            /* ================= WEAPONS ================= */
            { id: 21, name: 'Simple sword', description: 'Simple sword', icon: 'icons/items/melee.svg', image: 'items/weapons/swords/', categoryId: 1, minAttack: 2, maxAttack: 4, armorClass: 0, attributeId: '1', armorType: null, initiative: 1, basePrice: 1, createdAt: now, updatedAt: now },
            { id: 22, name: 'Simple axe', description: 'Simple axe', icon: 'icons/items/melee.svg', image: 'items/weapons/axes/', categoryId: 1, minAttack: 3, maxAttack: 5, armorClass: 0, attributeId: '1', armorType: null, initiative: 0, basePrice: 1, createdAt: now, updatedAt: now },
            { id: 23, name: 'Simple club', description: 'Simple club', icon: 'icons/items/melee.svg', image: 'items/weapons/clubs/', categoryId: 1, minAttack: 2, maxAttack: 5, armorClass: 0, attributeId: '1', armorType: null, initiative: 0, basePrice: 1, createdAt: now, updatedAt: now },
            { id: 24, name: 'Simple spear', description: 'Simple spear', icon: 'icons/items/melee.svg', image: 'items/weapons/spears/', categoryId: 1, minAttack: 2, maxAttack: 4, armorClass: 0, attributeId: '1', armorType: null, initiative: 1, basePrice: 1, createdAt: now, updatedAt: now },
            { id: 25, name: 'Simple dagger', description: 'Simple dagger', icon: 'icons/items/melee.svg', image: 'items/weapons/daggers/', categoryId: 1, minAttack: 1, maxAttack: 3, armorClass: 0, attributeId: '3', armorType: null, initiative: 2, basePrice: 1, createdAt: now, updatedAt: now },
            { id: 26, name: 'Simple bow', description: 'Simple bow', icon: 'icons/items/ranged.svg', image: 'items/weapons/bows/', categoryId: 1, minAttack: 2, maxAttack: 4, armorClass: 0, attributeId: '3', armorType: null, initiative: 1, basePrice: 1, createdAt: now, updatedAt: now },
            { id: 27, name: 'Simple staff', description: 'Simple staff', icon: 'icons/items/magic.svg', image: 'items/weapons/staffs/', categoryId: 1, minAttack: 2, maxAttack: 4, armorClass: 0, attributeId: '2', armorType: null, initiative: 1, basePrice: 1, createdAt: now, updatedAt: now },
            { id: 28, name: 'Simple magic focus', description: 'Simple magic focus', icon: 'icons/items/magic.svg', image: 'items/weapons/magic/', categoryId: 1, minAttack: 2, maxAttack: 4, armorClass: 0, attributeId: '2', armorType: null, initiative: 1, basePrice: 1, createdAt: now, updatedAt: now },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('BaseItems', null, {});
    }
};