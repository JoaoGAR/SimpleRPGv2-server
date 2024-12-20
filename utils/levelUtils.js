function requiredXPForNextLevel(level) {
    return Math.floor(10 * Math.pow(level, 2));
}

const levelCalculator = (character, gainedEXP) => {
    let novaExperiencia = character.experience + gainedEXP;
    let novoLevel = character.level;
    let classPoints = 0;
    let skillPoints = 0;

    while (novaExperiencia >= requiredXPForNextLevel(novoLevel + 1) && novoLevel < 50) {
        novoLevel++;
        if (novoLevel > character.level) {
            if (novoLevel % 5 === 0) {
                classPoints += 1;
                skillPoints += 1;
            }
            skillPoints += 1;
        }
    }

    return {
        'level': novoLevel,
        'totalExp': novaExperiencia,
        'classPoints': classPoints,
        'skillPoints': skillPoints,
        'levelled': novoLevel > character.level
    };
};

module.exports = { levelCalculator };