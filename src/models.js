class IncomingMessage {
  constructor({ userId, text, timestamp = new Date() }) {
    this.userId = userId;
    this.text = text;
    this.timestamp = timestamp;
  }
}

class OutgoingMessage {
  constructor({ userId, text }) {
    this.userId = userId;
    this.text = text;
  }
}

module.exports = {
  IncomingMessage,
  OutgoingMessage,
};
