class MessageHandler {
  constructor({ queue, useCase }) {
    this.queue = queue;
    this.useCase = useCase;
  }

  processNext() {
    const incoming = this.queue.pop();
    if (!incoming) {
      return null;
    }

    return this.useCase.execute(incoming);
  }
}

module.exports = {
  MessageHandler,
};
