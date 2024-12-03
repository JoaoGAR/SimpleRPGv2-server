const equipmentBonus = (character, equipment) => {
    const equipmentSkillLevels = {};

    equipment.forEach(equipedItem => {
        equipedItem.item.skills.forEach(itemSkill => {
            if (!equipmentSkillLevels[itemSkill.skillId]) {
                equipmentSkillLevels[itemSkill.skillId] = 0;
            }
            equipmentSkillLevels[itemSkill.skillId] += itemSkill.level;
        });
    });

    character.skill.forEach(characterSkill => {
        if (equipmentSkillLevels[characterSkill.skillId]) {
            characterSkill.level += equipmentSkillLevels[characterSkill.skillId];
        }
    });

    return character;
}

module.exports = { equipmentBonus };