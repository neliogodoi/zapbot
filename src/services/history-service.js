class HistoryService {
  constructor(repository) {
    this.repository = repository;
  }

  saveUserMessage({ userId, text }) {
    this.repository.save({ userId, role: 'user', message: text });
  }

  saveAssistantMessage({ userId, text }) {
    this.repository.save({ userId, role: 'assistant', message: text });
  }

  getContext({ userId }) {
    return this.repository.listForUser({ userId });
  }
}

module.exports = {
  HistoryService,
};
