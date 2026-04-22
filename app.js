const { AIModelAdapter } = require('./src/adapters/ai-model-adapter');
const { WhatsAppAdapter } = require('./src/adapters/whatsapp-adapter');
const { AIModel } = require('./src/ai/ai-model');
const { MessageHandler } = require('./src/handlers/message-handler');
const { MessageQueue } = require('./src/queue/message-queue');
const { HistoryRepository } = require('./src/repository/history-repository');
const { AIService } = require('./src/services/ai-service');
const { HistoryService } = require('./src/services/history-service');
const { StateManager } = require('./src/state/state-manager');
const { HandleIncomingMessage } = require('./src/use-cases/handle-incoming-message');
const { WhatsApp } = require('./src/whatsapp');

function buildApp({ dbPath = 'zapbot.db' } = {}) {
  const queue = new MessageQueue();
  const model = new AIModel();
  const aiAdapter = new AIModelAdapter(model);
  const aiService = new AIService(aiAdapter);
  const repository = new HistoryRepository(dbPath);
  const historyService = new HistoryService(repository);
  const stateManager = new StateManager();

  const useCase = new HandleIncomingMessage({
    aiService,
    historyService,
    stateManager,
  });

  const handler = new MessageHandler({ queue, useCase });
  const whatsappAdapter = new WhatsAppAdapter(queue);
  const whatsapp = new WhatsApp(whatsappAdapter);

  return {
    whatsapp,
    handler,
    whatsappAdapter,
  };
}

if (require.main === module) {
  const { whatsapp, handler, whatsappAdapter } = buildApp();

  whatsapp.inbound({ userId: 'user-123', text: 'Olá, tudo bem?' });
  const response = handler.processNext();

  if (response) {
    const outgoing = whatsappAdapter.send(response);
    console.log(outgoing);
  }
}

module.exports = {
  buildApp,
};
