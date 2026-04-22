class WhatsApp {
  constructor(adapter) {
    this.adapter = adapter;
  }

  inbound({ userId, text }) {
    this.adapter.receive({ userId, text });
  }
}

module.exports = {
  WhatsApp,
};
