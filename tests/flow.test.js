const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { buildApp } = require('../app');

test('full flow should process inbound messages and persist history', () => {
  const dbPath = path.join(os.tmpdir(), `zapbot-test-${Date.now()}.db`);
  const { whatsapp, handler, whatsappAdapter } = buildApp({ dbPath });

  whatsapp.inbound({ userId: 'u1', text: 'Primeira mensagem' });
  const response = handler.processNext();

  assert.ok(response);
  assert.equal(response.userId, 'u1');
  assert.match(response.text, /Primeira mensagem/);

  whatsapp.inbound({ userId: 'u1', text: 'Segunda mensagem' });
  const response2 = handler.processNext();

  assert.ok(response2);
  assert.equal(response2.userId, 'u1');
  assert.match(response2.text, /Segunda mensagem/);

  const outbound = whatsappAdapter.send(response2);
  assert.match(outbound, /\[WhatsApp\] -> u1:/);

  fs.rmSync(dbPath, { force: true });
});
