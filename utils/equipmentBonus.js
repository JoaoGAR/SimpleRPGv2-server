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

module.exports = { equipmentBonus };
