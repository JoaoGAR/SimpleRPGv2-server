'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {

        const now = new Date();

        await queryInterface.bulkInsert('Rewards', [

            /* ================= EASY JOBS (difficulty 10) ================= */

            // job 2 Load and Carry Supplies
            { weight: 40, amount: 1, jobId: 2, baseItemId: 1, createdAt: now, updatedAt: now },
            { weight: 40, amount: 1, jobId: 2, baseItemId: 2, createdAt: now, updatedAt: now },
            { weight: 30, amount: 1, jobId: 2, baseItemId: 3, createdAt: now, updatedAt: now },
            { weight: 15, amount: 1, jobId: 2, baseItemId: 21, createdAt: now, updatedAt: now }, // sword raro

            // job 6 Translate Old Documents
            { weight: 40, amount: 1, jobId: 6, baseItemId: 1, createdAt: now, updatedAt: now },
            { weight: 35, amount: 1, jobId: 6, baseItemId: 4, createdAt: now, updatedAt: now },
            { weight: 20, amount: 1, jobId: 6, baseItemId: 27, createdAt: now, updatedAt: now }, // staff

            // job 10 Silent Courier
            { weight: 40, amount: 1, jobId: 10, baseItemId: 3, createdAt: now, updatedAt: now },
            { weight: 40, amount: 1, jobId: 10, baseItemId: 5, createdAt: now, updatedAt: now },
            { weight: 25, amount: 1, jobId: 10, baseItemId: 25, createdAt: now, updatedAt: now }, // dagger


            /* ================= MEDIUM JOBS (difficulty 12–14) ================= */

            // Arena Fighter
            { weight: 40, amount: 1, jobId: 3, baseItemId: 6, createdAt: now, updatedAt: now },
            { weight: 35, amount: 1, jobId: 3, baseItemId: 7, createdAt: now, updatedAt: now },
            { weight: 20, amount: 1, jobId: 3, baseItemId: 22, createdAt: now, updatedAt: now }, // axe

            // Craft Tools
            { weight: 40, amount: 1, jobId: 7, baseItemId: 6, createdAt: now, updatedAt: now },
            { weight: 30, amount: 1, jobId: 7, baseItemId: 8, createdAt: now, updatedAt: now },
            { weight: 20, amount: 1, jobId: 7, baseItemId: 27, createdAt: now, updatedAt: now },

            // Pickpocket
            { weight: 35, amount: 1, jobId: 11, baseItemId: 8, createdAt: now, updatedAt: now },
            { weight: 30, amount: 1, jobId: 11, baseItemId: 10, createdAt: now, updatedAt: now },
            { weight: 25, amount: 1, jobId: 11, baseItemId: 25, createdAt: now, updatedAt: now },


            /* ================= HARD JOBS ================= */

            // Heavy Construction
            { weight: 40, amount: 1, jobId: 4, baseItemId: 11, createdAt: now, updatedAt: now },
            { weight: 30, amount: 1, jobId: 4, baseItemId: 14, createdAt: now, updatedAt: now },
            { weight: 20, amount: 1, jobId: 4, baseItemId: 22, createdAt: now, updatedAt: now },

            // Military strategist
            { weight: 40, amount: 1, jobId: 8, baseItemId: 12, createdAt: now, updatedAt: now },
            { weight: 30, amount: 1, jobId: 8, baseItemId: 14, createdAt: now, updatedAt: now },
            { weight: 20, amount: 1, jobId: 8, baseItemId: 27, createdAt: now, updatedAt: now },

            // Precision archer
            { weight: 40, amount: 1, jobId: 12, baseItemId: 9, createdAt: now, updatedAt: now },
            { weight: 35, amount: 1, jobId: 12, baseItemId: 10, createdAt: now, updatedAt: now },
            { weight: 25, amount: 1, jobId: 12, baseItemId: 26, createdAt: now, updatedAt: now },


            /* ================= VERY HARD ================= */

            // Shock trooper
            { weight: 40, amount: 1, jobId: 5, baseItemId: 16, createdAt: now, updatedAt: now },
            { weight: 35, amount: 1, jobId: 5, baseItemId: 19, createdAt: now, updatedAt: now },
            { weight: 20, amount: 1, jobId: 5, baseItemId: 22, createdAt: now, updatedAt: now },

            // Master engineer
            { weight: 40, amount: 1, jobId: 9, baseItemId: 15, createdAt: now, updatedAt: now },
            { weight: 30, amount: 1, jobId: 9, baseItemId: 14, createdAt: now, updatedAt: now },
            { weight: 20, amount: 1, jobId: 9, baseItemId: 27, createdAt: now, updatedAt: now },

            // Elite infiltrator
            { weight: 40, amount: 1, jobId: 13, baseItemId: 13, createdAt: now, updatedAt: now },
            { weight: 30, amount: 1, jobId: 13, baseItemId: 15, createdAt: now, updatedAt: now },
            { weight: 20, amount: 1, jobId: 13, baseItemId: 25, createdAt: now, updatedAt: now },

        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Rewards', null, {});
    }
};