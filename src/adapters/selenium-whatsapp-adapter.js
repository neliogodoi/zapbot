class SeleniumWhatsAppAdapter {
  constructor({ queue, driver = null, waitTimeoutMs = 15000 } = {}) {
    if (!queue) {
      throw new Error('queue is required');
    }

    this.queue = queue;
    this.driver = driver;
    this.waitTimeoutMs = waitTimeoutMs;
  }

  async start() {
    const { Builder, By, until } = require('selenium-webdriver');
    this.By = By;
    this.until = until;

    if (!this.driver) {
      this.driver = await new Builder().forBrowser('chrome').build();
    }

    await this.driver.get('https://web.whatsapp.com');
    await this.driver.wait(
      this.until.elementLocated(this.By.css('canvas[aria-label="Scan me!"]')),
      this.waitTimeoutMs
    );
  }

  receive({ userId, text }) {
    this.queue.push({
      userId,
      text,
      timestamp: new Date(),
    });
  }

  async send({ contactName, text }) {
    const { Key } = require('selenium-webdriver');

    if (!this.driver) {
      throw new Error('Driver not initialized. Call start() first.');
    }

    const searchBox = await this.driver.wait(
      this.until.elementLocated(this.By.css('div[contenteditable="true"][data-tab="3"]')),
      this.waitTimeoutMs
    );

    await searchBox.clear();
    await searchBox.sendKeys(contactName, Key.ENTER);

    const messageBox = await this.driver.wait(
      this.until.elementLocated(this.By.css('div[contenteditable="true"][data-tab="10"]')),
      this.waitTimeoutMs
    );

    await messageBox.sendKeys(text, Key.ENTER);
  }

  async stop() {
    if (this.driver) {
      await this.driver.quit();
      this.driver = null;
    }
  }
}

module.exports = {
  SeleniumWhatsAppAdapter,
};
