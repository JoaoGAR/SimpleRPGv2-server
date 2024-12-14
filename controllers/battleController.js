const { rollDice } = require('../utils/diceUtils');
const { equipmentBonus } = require('../utils/equipmentBonus');
const { getCharacterByUser } = require('../DAOs/CharacterDAO');

const Character = require('../models/Character');

async function challengeTarget(req, res) {
    try {
        const { targetId } = req.body;
        const userId = req.user.id;
        let attacker = await getCharacterByUser(userId, null);
        let target = await getCharacterByUser(null, targetId);

        attacker = await equipmentBonus(attacker, attacker.inventory);
        target = await equipmentBonus(target, target.inventory);
        let battleStatus = [];
        let winner = 0;

        let roundNumber = 1;
        while (attacker.wellness > 0 && target.wellness > 0) {
            const roundA = await battle(attacker, target, roundNumber);
            battleStatus.push(roundA);
            if (target.wellness === 0) { winner = 1; break };

            const roundB = await battle(target, attacker, roundNumber);
            battleStatus.push(roundB);
            if (attacker.wellness === 0) break;

            roundNumber++;
        }
        await updateCharacterWellness(attacker.id, attacker.wellness);

        res.send({ battleStatus, winner });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erro no servidor');
    }
}

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
    let attack = await rollAttack(weapon, ability, skillModifier, target);

    target.wellness = Math.max(target.wellness - attack.damage, 0);

    const round = {
        message: `ROUND: ${roundN}| ${attacker.name} atacou ${target.name}(${target.armorClass}[AC]) com ${ability.name}(${ability.attack}).
                    Ele rolou ${attack.d20 + attack.skillModifier}(${attack.d20} + ${attack.skillModifier}[SM]) no teste de acerto. O golpe foi certeiro, causando ${attack.damage}(${attack.weaponDamage}[WD] + ${attack.abilityDamage}[AD] + ${attack.skillModifier}[SM]) de dano ao ${target.name}(${target.wellness})!`,
        rols: attack
    };

    attack.target = { 'name': target.name, 'wellness': target.wellness, 'armorClass': target.armorClass };
    attack.attacker = { 'name': attacker.name };
    attack.ability = { 'name': ability.name, 'attack': ability.attack };
    attack.roundN = roundN;

    return attack;
}

async function updateCharacterWellness(characterId, wellness) {
    try {
        await Character.update({ wellness }, { where: { id: characterId } });
    } catch (error) {
        console.error(`Erro ao atualizar wellness do personagem ${characterId}:`, error);
        throw error;
    }
}

module.exports = { challengeTarget };