function positiveInteger(value) {
    const parsed = Number(value);
    return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
}

function finiteCoordinate(value) {
    const parsed = Number(value);
    return Number.isFinite(parsed) && Math.abs(parsed) <= 1000000 ? parsed : null;
}

function badRequest(res, message = 'Invalid request.') {
    return res.status(400).json({ status: 400, msg: message });
}

module.exports = { positiveInteger, finiteCoordinate, badRequest };
