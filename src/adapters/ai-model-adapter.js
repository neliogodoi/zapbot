class AIModelAdapter {
  constructor(model) {
    this.model = model;
  }

  ask(prompt) {
    return this.model.generate(prompt);
  }
}

module.exports = {
  AIModelAdapter,
};
