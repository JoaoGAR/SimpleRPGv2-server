module.exports.getResponseMessage = (key) => {
    const messages = {
        serverError: 'Server error.',
        queueFull: "The character's work queue is already full.",
        queueNotFound: 'Queue not found for the specified character.',
        workCompleted: 'Work completed successfully.',
        workDismissed: 'Work removed from queue.',
        workQueued: 'Work added to queue successfully.',
    };
    return messages[key] || 'Message not found.';
};