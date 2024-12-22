const { rollDice } = require('./diceUtils');

const rewardCalculator = async (character, queue) => {

    const { requirements, difficulty, rewards: jobRewards, gold: jobGold, experience: jobExperience } = queue.job;

    const characterSkills = character.skills;
    const totalSkillLevel = await calculateTotalSkillLevel(requirements, characterSkills);
    const skillPenalty = await calculateSkillPenalty(requirements);
    const d20 = await rollDice('1d20');
    const calcd20 = d20 - skillPenalty + totalSkillLevel;

    let rewardQtd = await rollDice(`1d${jobRewards.length}`);
    let penalty = 1;
    let message = 'Trabalho exemplar.';
    let status = 200;

    if (calcd20 < difficulty) {
        message = 'Acidente de trabalho.';
        rewardQtd -= difficulty;
        penalty = 2;
    }

    let gold = jobGold ? (jobGold / penalty) * (queue.duration + 1) : 0;
    let experience = jobGold ? (jobExperience * (queue.duration + 1) / penalty) : 0;
    rewardQtd = Math.floor(rewardQtd / penalty);

    const filledRewards = await fillRewards(jobRewards);
    const rewards = await classifyRewards(filledRewards, rewardQtd);

    return {
        status,
        rewards,
        message,
        experience,
        d20,
        calcd20,
        totalSkillLevel,
        skillPenalty,
        difficulty,
        rewardQtd,
        gold,
    };
};

const battleRewardCalculator = async (character, enemy) => {

    let jobRewards = [];
    const jobGold = enemy.gold;
    const jobExperience = enemy.experience;
    const isWithinRange = (character.level + 5) <= enemy.level;
    const penalty = isWithinRange ? 1 : 2;

    enemy.inventory.forEach(enemyInventory => {
        jobRewards.push({
            itemId: enemyInventory.itemId,
            baseItemId: enemyInventory.item.baseItemId,
            weight: isWithinRange ? 2 : 1,
        });
    });
    let rewardQtd = await rollDice(`1d${jobRewards.length}`);
    let gold = Math.floor(jobGold / penalty);
    let experience = Math.floor(jobExperience / penalty);
    rewardQtd = jobRewards.length > 1 ? Math.floor(rewardQtd / penalty) : rewardQtd;

    const filledRewards = await fillRewards(jobRewards);
    const rewards = await classifyRewards(filledRewards, rewardQtd);

    return {
        rewards,
        experience,
        gold,
    };
}

const calculateTotalSkillLevel = async (requirements, characterSkills) => {
    return requirements.reduce((total, requirement) => {
        const matchingSkills = characterSkills.filter(skill => skill.skillId === requirement.skillId);
        const levelSum = matchingSkills.reduce((sum, skill) => sum + skill.level, 0);
        return total + levelSum;
    }, 0);
};

const calculateSkillPenalty = async (requirements) => {
    return requirements.reduce((total, requirement) => total + requirement.skillLevel, 0);
};

const fillRewards = async (jobRewards) => {

    const filledRewards = [];
    jobRewards.forEach(reward => {
        for (let i = 0; i < reward.weight; i++) {
            filledRewards.push(reward);
        }
    });
    while (filledRewards.length < 10) {
        filledRewards.push({});
    }
    return filledRewards;
};

const classifyRewards = async (filledRewards, rewardQtd) => {

    const rewards = [];
    for (let i = 0; i < rewardQtd; i++) {
        const randomReward = Math.floor(Math.random() * filledRewards.length);
        const reward = filledRewards[randomReward];
        if (reward && Object.keys(reward).length > 0) {
            rewards.push(reward);
        }
    }

    return rewards;
}

module.exports = { rewardCalculator, battleRewardCalculator };