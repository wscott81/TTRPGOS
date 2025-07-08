// backend/db.js
const Database = require('better-sqlite3');

// Create or open the database file
const db = new Database('./ttrpgos.db');

// Ensure Users table exists with OAuth support
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT,
    oauth_provider TEXT,
    oauth_id TEXT
  );
`);

module.exports = db;

