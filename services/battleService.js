const { rollDice } = require('../utils/diceUtils');
const { battleRewardCalculator } = require('../utils/rewardUtils');
const { equipmentBonus, getInitiative } = require('../utils/equipmentBonus');
const { levelCalculator } = require('../utils/levelUtils');
const { getCharacterByUser } = require('../DAOs/CharacterDAO');
const { generateItem } = require('./itemService');

const BaseItem = require('../models/BaseItem');
const Character = require('../models/Character');
const Inventory = require('../models/Inventory');

const MAIN_HAND_CATEGORY_ID = 1;

class BattleError extends Error {
    constructor(message, status = 400) {
        super(message);
        this.name = 'BattleError';
        this.status = status;
    }
}

async function challengeTarget(userId, targetId) {
    let attacker = await getCharacterByUser(userId, null);
    let target = await getCharacterByUser(null, targetId);

    validateCombatants(attacker, target);

    attacker = await equipmentBonus(attacker, attacker.inventory);
    target = await equipmentBonus(target, target.inventory);
    validateCombatLoadout(attacker);
    validateCombatLoadout(target);

    let attackerInitiative = await getInitiative(attacker.inventory);
    let targetInitiative = await getInitiative(target.inventory);
    attackerInitiative += await rollDice('1d20');
    targetInitiative += await rollDice('1d20');

    const [first, second] = attackerInitiative >= targetInitiative
        ? [attacker, target]
        : [target, attacker];
    const battleStatus = await resolveBattle(first, second);

    // NPCs are encounter templates and do not have a recovery lifecycle. Persisting
    // their battle damage would make a defeated NPC permanently unrecoverable.
    await updateAttackerWellness(attacker);

    const winner = attacker.wellness > 0 ? 1 : 0;
    const rewards = winner ? await grantRewards(attacker, target) : emptyRewards();
    const character = await getCharacterByUser(userId, null);

    return {
        battleStatus,
        winner,
        ...rewards,
        character,
        attackerInitiative,
        targetInitiative,
    };
}

function validateCombatants(attacker, target) {
    if (!attacker || !target || attacker.id === target.id) {
        throw new BattleError('Target not found.', 404);
    }
    if (!target.isNPC) {
        throw new BattleError('Only NPC targets can be challenged.');
    }
    if (!attacker.inventory?.length || !target.inventory?.length) {
        throw new BattleError('Both combatants must have equipment.');
    }
}

function validateCombatLoadout(character) {
    const weapon = findWeapon(character);
    if (!weapon) {
        throw new BattleError(`${character.name} must equip a main-hand weapon.`);
    }
    if (!weapon.attack || !weapon.abilities?.[0]?.ability?.attack) {
        throw new BattleError(`${character.name}'s weapon is not ready for battle.`);
    }
}

function findWeapon(character) {
    return character.inventory.find(({ item }) => item?.categoryId === MAIN_HAND_CATEGORY_ID)?.item;
}

async function resolveBattle(first, second) {
    const battleStatus = [];
    let roundNumber = 1;

    while (first.wellness > 0 && second.wellness > 0) {
        const firstAttack = await battle(first, second, roundNumber);
        battleStatus.push(firstAttack);
        if (second.wellness === 0) break;

        const secondAttack = await battle(second, first, roundNumber);
        battleStatus.push(secondAttack);
        if (first.wellness === 0) break;

        roundNumber += 1;
    }

    // The caller derives the winner from the original attacker, not initiative order.
    return battleStatus;
}

async function battle(attacker, target, roundN) {
    const weapon = findWeapon(attacker);
    const ability = weapon.abilities[0].ability;
    const skillModifier = getSkillModifier(attacker, weapon.skillId);
    const attack = await rollAttack(weapon, ability, skillModifier, target);

    target.wellness = Math.max(target.wellness - attack.damage, 0);

    return {
        ...attack,
        target: { name: target.name, wellness: target.wellness, armorClass: target.armorClass },
        attacker: { name: attacker.name },
        ability: { name: ability.name, attack: ability.attack },
        roundN,
    };
}

function getSkillModifier(character, skillId) {
    const skill = character.skills?.find(({ skill }) => skill?.id === skillId);
    return skill ? Math.floor(skill.level / 5) : 0;
}

async function rollAttack(weapon, ability, skillModifier, target) {
    const d20 = await rollDice('1d20');
    const critical = d20 === 20 ? 2 : 1;
    const weaponDamage = await rollDice(weapon.attack);
    const abilityDamage = await rollDice(ability.attack);
    const hit = d20 + skillModifier > target.armorClass || d20 === 20;
    const damage = hit ? (weaponDamage + abilityDamage + skillModifier) * critical : 0;

    return { status: hit ? 1 : 0, d20, skillModifier, critical, weaponDamage, abilityDamage, damage };
}

async function updateAttackerWellness(attacker) {
    await Character.update({ wellness: attacker.wellness }, { where: { id: attacker.id } });
}

async function grantRewards(attacker, target) {
    const battleLoot = await battleRewardCalculator(attacker, target);
    const levelCalc = levelCalculator(attacker, battleLoot.experience);
    const updates = {
        experience: levelCalc.totalExp,
        level: levelCalc.level,
        gold: attacker.gold + battleLoot.gold,
    };

    if (levelCalc.levelled) {
        updates.classPoints = attacker.classPoints + levelCalc.classPoints;
        updates.skillPoints = attacker.skillPoints + levelCalc.skillPoints;
    }
    await attacker.update(updates);

    const createdItems = [];
    for (const reward of battleLoot.rewards) {
        if (!reward.baseItemId) continue;

        const baseItem = await BaseItem.findByPk(reward.baseItemId);
        if (!baseItem) continue;

        const item = await generateItem(baseItem);
        if (!item) continue;

        createdItems.push(item);
        await Inventory.create({ itemId: item.id, characterId: attacker.id });
    }

    return { createdItems, experience: battleLoot.experience, gold: battleLoot.gold };
}

function emptyRewards() {
    return { createdItems: [], experience: 0, gold: 0 };
}

module.exports = {
    BattleError,
    battle,
    challengeTarget,
    findWeapon,
    getSkillModifier,
    rollAttack,
    updateAttackerWellness,
};
