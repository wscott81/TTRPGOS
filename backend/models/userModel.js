// backend/models/userModel.js

const db = require('../db');
const bcrypt = require('bcrypt');

// Create users table
function createUsersTable() {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      role_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(role_id) REFERENCES roles(id)
    )
  `).run();
}

// Create a new user with hashed password
async function createUser({ username, password, email, role_id }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const stmt = db.prepare(`
    INSERT INTO users (username, password, email, role_id)
    VALUES (?, ?, ?, ?)
  `);
  const info = stmt.run(username, hashedPassword, email, role_id);
  return { id: info.lastInsertRowid, username, email, role_id };
}

// Get user by email
function findUserByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
}

// Get user by username
function getUserByUsername(username) {
  return db.prepare('SELECT * FROM users WHERE username = ?').get(username);
}

// Get user by ID
function findUserById(id) {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
}

// Compare hashed passwords
async function comparePassword(inputPassword, storedHash) {
  return await bcrypt.compare(inputPassword, storedHash);
}

module.exports = {
  createUsersTable,
  createUser,
  findUserByEmail,
  findUserById,
  getUserByUsername,
  comparePassword
};

