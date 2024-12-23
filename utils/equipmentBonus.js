const equipmentBonus = async (character, equipment) => {
    const equipmentSkillLevels = [];

    equipment.forEach(equippedItem => {
        equippedItem.item.skills.forEach(itemSkill => {
            if (!equipmentSkillLevels[itemSkill.skillId]) {
                equipmentSkillLevels[itemSkill.skillId] = 0;
            }
            equipmentSkillLevels[itemSkill.skillId] += itemSkill.level;
        });
    });

    character.skills.forEach(characterSkill => {
        if (equipmentSkillLevels[characterSkill.skillId]) {
            characterSkill.level += equipmentSkillLevels[characterSkill.skillId];
        }
    });

    return character;
}

const getInitiative = (equipment) => {
    if (!Array.isArray(equipment) || equipment.length === 0) {
        return 0;
    }

    return equipment.reduce((minInitiative, currentItem) => {
        const currentInitiative = currentItem.item.initiative || 0;
        return currentInitiative < minInitiative ? currentInitiative : minInitiative;
    }, Infinity);
};

module.exports = { equipmentBonus, getInitiative };
