const { DatabaseSync } = require('node:sqlite');

class HistoryRepository {
  constructor(dbPath = 'zapbot.db') {
    this.db = new DatabaseSync(dbPath);
    this.init();
  }

  init() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS conversation_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        role TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  save({ userId, role, message }) {
    const stmt = this.db.prepare(
      'INSERT INTO conversation_history (user_id, role, message) VALUES (?, ?, ?)'
    );
    stmt.run(userId, role, message);
  }

  listForUser({ userId, limit = 20 }) {
    const stmt = this.db.prepare(
      `SELECT role, message
       FROM conversation_history
       WHERE user_id = ?
       ORDER BY id DESC
       LIMIT ?`
    );

    const rows = stmt.all(userId, limit);
    return rows.reverse().map((row) => `${row.role}: ${row.message}`);
  }
}

module.exports = {
  HistoryRepository,
};
