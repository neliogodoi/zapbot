class MessageQueue {
  constructor() {
    this.queue = [];
  }

  push(message) {
    this.queue.push(message);
  }

  pop() {
    if (this.queue.length === 0) {
      return null;
    }

    return this.queue.shift();
  }
}

module.exports = {
  MessageQueue,
};
