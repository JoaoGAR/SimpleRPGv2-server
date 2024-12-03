const distanceCalculator = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

const timeCalculator = (distance, speed) => {
    return distance / speed;
};

module.exports = { distanceCalculator, timeCalculator };