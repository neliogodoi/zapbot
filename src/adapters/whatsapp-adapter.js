const { IncomingMessage } = require('../models');

class WhatsAppAdapter {
  constructor(queue) {
    this.queue = queue;
  }

  receive({ userId, text }) {
    this.queue.push(new IncomingMessage({ userId, text, timestamp: new Date() }));
  }

  send(outgoing) {
    // integração real com provedor WhatsApp entraria aqui
    return `[WhatsApp] -> ${outgoing.userId}: ${outgoing.text}`;
  }
}

module.exports = {
  WhatsAppAdapter,
};
