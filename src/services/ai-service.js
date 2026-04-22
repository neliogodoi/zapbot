class AIService {
  constructor(aiAdapter) {
    this.aiAdapter = aiAdapter;
  }

  reply({ context, userMessage }) {
    const prompt = [...context, `user: ${userMessage}`].join('\n');
    return this.aiAdapter.ask(prompt);
  }
}

module.exports = {
  AIService,
};
