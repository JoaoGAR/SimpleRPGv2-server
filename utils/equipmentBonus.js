const equipmentBonus = async (character, equipment) => {
    const equipmentSkillLevels = await getEquipmentBonus(equipment);

    character.skills.forEach(characterSkill => {
        if (equipmentSkillLevels[characterSkill.skillId]) {
            characterSkill.level += equipmentSkillLevels[characterSkill.skillId];
        }
    });

    return character;
}

const getEquipmentBonus = async (equipment) => {
    const equipmentSkillLevels = [];

    equipment.forEach(equipedItem => {
        equipedItem.item.skills.forEach(itemSkill => {
            if (!equipmentSkillLevels[itemSkill.skillId]) {
                equipmentSkillLevels[itemSkill.skillId] = 0;
            }
            equipmentSkillLevels[itemSkill.skillId] += itemSkill.level;
        });
    });

    return equipmentSkillLevels;
}

module.exports = { equipmentBonus, getEquipmentBonus };