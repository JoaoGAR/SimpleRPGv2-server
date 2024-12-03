const rewardCalculator = (character, queue) => {

    const requirements = queue.job.requirements;
    const characterSkills = character.skill;
    const job = queue.job;

    const totalSkillLevel = requirements.reduce((total, requirement) => {
        const matchingSkills = characterSkills.filter(skill => skill.skillId === requirement.skillId);
        const levelSum = matchingSkills.reduce((sum, skill) => sum + skill.level, 0);
        return total + levelSum;
    }, 0);

    const skillPenalty = requirements.reduce((total, requirement) => total + requirement.skillLevel, 0);
    const difficulty = job.difficulty;
    const rewards = [];
    const filledRewards = [];
    let status = 200;
    let message = 'Trabalho concluído.';
    const d20 = (Math.floor(Math.random() * 20) + 1);
    const calcd20 = (d20 - skillPenalty) + totalSkillLevel;
    let rewardQtd = (Math.floor(Math.random() * (job.rewards.length)) + 1);
    let penalty = 1;
    let experience = 0;

    if (calcd20 < difficulty) {
        message = 'Acidente de trabalho';
        rewardQtd -= difficulty;
        penalty = 2;
    }

    let gold = job.gold;
    if (gold) {
        experience = (job.experience * (queue.duration + 1) / penalty);
        gold = (gold / penalty) * (queue.duration + 1);
    }

    job.rewards.forEach(reward => {
        if (reward.itemId !== 1) {
            for (let i = 0; i < reward.weight; i++) {
                filledRewards.push(reward);
            }
        }
    });

    while (filledRewards.length < 10) {
        filledRewards.push({});
    }

    rewardQtd = Math.floor(rewardQtd / penalty);
    for (let i = 0; i < rewardQtd; i++) {
        let randomReward = Math.floor(Math.random() * filledRewards.length);
        let reward = filledRewards[randomReward];
        if (reward && Object.keys(reward).length > 0) {
            rewards.push(reward);
        }
    }

    return {
        'status': status,
        'rewards': rewards,
        'message': message,
        'experience': experience,
        'd20': d20,
        'calcd20': calcd20,
        'totalSkillLevel': totalSkillLevel,
        'skillPenalty': skillPenalty,
        'difficulty': difficulty,
        'rewardQtd': rewardQtd,
        'gold': gold,
    };

};

module.exports = { rewardCalculator };