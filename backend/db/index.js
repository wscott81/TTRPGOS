// backend/db/index.js

const Database = require('better-sqlite3');
const path = require('path');

// Ensure the path points to your database file (it will be created if it doesn't exist)
const db = new Database(path.join(__dirname, 'ttrpg_os.db'));

module.exports = db;
