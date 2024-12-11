const rollDice = async (dice) => {
    const [qtd, size] = dice.split('d').map(Number);

    let result = 0;
    for (let i = 0; i < qtd; i++) {
        result += Math.floor(Math.random() * size) + 1;
    }

    return result;
}

module.exports = { rollDice };