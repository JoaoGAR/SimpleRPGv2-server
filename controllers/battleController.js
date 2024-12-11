const { rollDice } = require('../utils/diceUtils');
const { equipmentBonus } = require('../utils/equipmentBonus');

const Inventory = require('../models/Inventory');
const Skill = require('../models/Skill');
const CharacterSkill = require('../models/CharacterSkill');
const WeaponAbility = require('../models/WeaponAbility');
const Item = require('../models/Item');
const Character = require('../models/Character');
const Ability = require('../models/Ability');

async function rollAttack(weapon, ability, skillModifier, target) {
    const targetAC = target.armorClass;
    const d20 = await rollDice('1d20');
    const critical = d20 === 20 ? 2 : 1;
    const weaponDamage = await rollDice(weapon.attack);
    const abilityDamage = await rollDice(ability.attack);
    let damage = 0;
    let status = 0;

    if ((d20 + skillModifier) > targetAC || d20 === 20) {
        damage = (weaponDamage + abilityDamage + skillModifier) * critical;
        status = 1;
    }

    return {
        status,
        d20,
        skillModifier,
        critical,
        weaponDamage,
        abilityDamage,
        damage,
    }
}

async function battle(attacker, target, roundN) {

    const weapon = attacker.inventory.find(
        (inventory) => inventory.item.categoryId == 7
    )?.item;

    const ability = weapon.abilities[0]?.ability;

    let skillModifier = attacker.skills.find(
        (skills) => skills.skill.id == weapon.skillId
    );
    skillModifier = skillModifier.level ? Math.floor(skillModifier.level / 2) : 0;
    const attack = await rollAttack(weapon, ability, skillModifier, target);

    const round = {
        message: `ROUND: ${roundN}| ${attacker.name} atacou ${target.name}([AC] ${target.armorClass}) com ${ability.name}(${ability.attack}).
                    Ele rolou ${attack.d20 + attack.skillModifier}(${attack.d20} + ${attack.skillModifier}[SM]) no teste de acerto. O golpe foi certeiro, causando ${attack.damage}(${attack.weaponDamage}[WD] + ${attack.abilityDamage}[AD] + ${attack.skillModifier}[SM]) de dano ao ${target.name}!`,
        rols: attack
    };

    return round;
}

async function challengeTarget(req, res) {
    try {
        const { targetId } = req.body;
        const userId = req.user.id;
        let attacker = await getCharacterByUser(userId, null);
        let target = await getCharacterByUser(null, targetId);

        console.log(attacker.inventory);
        attacker = await equipmentBonus(attacker, attacker.inventory);
        target = await equipmentBonus(target, target.inventory);
        let battleStatus = [];

        for (let i = 1; i <= 3; i++) {
            const roundA = await battle(attacker, target, i);
            const roundB = await battle(target, attacker, i);
            battleStatus.push(roundA);
            battleStatus.push(roundB);
        }

        res.send({ battleStatus, attacker });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erro no servidor');
    }
}

module.exports = { challengeTarget };