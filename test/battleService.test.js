const test = require('node:test');
const assert = require('node:assert/strict');

const { findWeapon, getSkillModifier, rollAttack } = require('../services/battleService');

test('findWeapon selects only the equipped main-hand item', () => {
    const weapon = { categoryId: 1, attack: '1d6' };
    const character = {
        inventory: [{ item: { categoryId: 7 } }, { item: weapon }],
    };

    assert.equal(findWeapon(character), weapon);
});

test('getSkillModifier returns zero when the weapon skill is not trained', () => {
    assert.equal(getSkillModifier({ skills: [] }, 3), 0);
    assert.equal(getSkillModifier({ skills: [{ skill: { id: 3 }, level: 14 }] }, 3), 2);
});

test('rollAttack returns a complete combat result', async () => {
    const result = await rollAttack({ attack: '1d6' }, { attack: '1d4' }, 1, { armorClass: 0 });

    assert.equal(result.status, 1);
    assert.ok(result.d20 >= 1 && result.d20 <= 20);
    assert.ok(result.damage >= 3);
    assert.equal(result.critical, result.d20 === 20 ? 2 : 1);
});
