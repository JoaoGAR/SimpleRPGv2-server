module.exports.getResponseMessage = (key) => {
    const messages = {
        serverError: 'Erro no servidor.',
        queueFull: 'A fila de trabalho do personagem já está cheia.',
        queueNotFound: 'Fila não encontrada para o personagem em questão.',
        workCompleted: 'Trabalho concluído com sucesso.',
        workDismissed: 'Trabalho retirado da fila.',
        workQueued: 'Trabalho adicionado à fila com sucesso.',
    };
    return messages[key] || 'Mensagem não encontrada.';
};