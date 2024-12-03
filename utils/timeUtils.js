module.exports.calculateDuration = (duration) => {
    let durationTime = 2;
    switch (duration) {
        case 0: return { finalDuration: 0, durationTime: 0.5 };
        case 1: return { finalDuration: 1, durationTime: 1 };
        case 2: return { finalDuration: 2, durationTime: 2 };
        default: return { finalDuration: 2, durationTime: 2 };
    }
};