# Zapbot (Node.js)

Sim — é totalmente possível usar **Node.js**. Esta implementação converte o pipeline para Node 22, mantendo o desenho arquitetural:

`WhatsApp -> WhatsAppAdapter -> Queue -> MessageHandler -> StateManager -> HandleIncomingMessage -> (AIService/HistoryService) -> (AIModelAdapter/Repository) -> (AIModel/SQLite)`

## Estrutura

- `app.js`: composição dos componentes
- `src/whatsapp.js`: entrada do canal
- `src/adapters/whatsapp-adapter.js`: adaptação para fila e envio
- `src/adapters/selenium-whatsapp-adapter.js`: integração opcional com WhatsApp Web via Selenium
- `src/queue/message-queue.js`: fila em memória
- `src/handlers/message-handler.js`: consumo da fila
- `src/state/state-manager.js`: estado por usuário
- `src/use-cases/handle-incoming-message.js`: orquestração principal
- `src/services/ai-service.js`: chamada ao modelo
- `src/services/history-service.js`: gerenciamento de histórico
- `src/repository/history-repository.js`: persistência em SQLite (`node:sqlite`)
- `src/ai/ai-model.js`: modelo de IA base

## Executar

```bash
npm run start
```

## Testes

```bash
npm test
```

## WhatsApp com Selenium

Além do adapter simples, existe um `SeleniumWhatsAppAdapter` para automação com WhatsApp Web.

- método `start()`: abre `https://web.whatsapp.com` e espera QR Code
- método `send({ contactName, text })`: busca contato e envia mensagem
- método `stop()`: encerra o driver

> Observação: para usar em ambiente real, é necessário instalar `selenium-webdriver` e ter navegador/driver configurados.
