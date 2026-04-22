const test = require('node:test');
const assert = require('node:assert/strict');

const { MessageQueue } = require('../src/queue/message-queue');
const { SeleniumWhatsAppAdapter } = require('../src/adapters/selenium-whatsapp-adapter');

test('selenium adapter should enqueue received messages', () => {
  const queue = new MessageQueue();
  const adapter = new SeleniumWhatsAppAdapter({ queue });

  adapter.receive({ userId: 'u2', text: 'Olá via Selenium' });

  const next = queue.pop();
  assert.ok(next);
  assert.equal(next.userId, 'u2');
  assert.equal(next.text, 'Olá via Selenium');
});
