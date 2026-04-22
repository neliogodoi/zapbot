class StateManager {
  constructor() {
    this.states = new Map();
  }

  getOrCreate(userId) {
    if (!this.states.has(userId)) {
      this.states.set(userId, { lastIntent: 'default' });
    }

    return this.states.get(userId);
  }
}

module.exports = {
  StateManager,
};
