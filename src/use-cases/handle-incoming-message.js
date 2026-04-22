const { OutgoingMessage } = require('../models');

class HandleIncomingMessage {
  constructor({ aiService, historyService, stateManager }) {
    this.aiService = aiService;
    this.historyService = historyService;
    this.stateManager = stateManager;
  }

  execute(incoming) {
    this.stateManager.getOrCreate(incoming.userId);
    this.historyService.saveUserMessage({ userId: incoming.userId, text: incoming.text });

    const context = this.historyService.getContext({ userId: incoming.userId });
    const answer = this.aiService.reply({ context, userMessage: incoming.text });

    this.historyService.saveAssistantMessage({ userId: incoming.userId, text: answer });

    return new OutgoingMessage({
      userId: incoming.userId,
      text: answer,
    });
  }
}

module.exports = {
  HandleIncomingMessage,
};
