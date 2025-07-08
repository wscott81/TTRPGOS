// backend/models/inviteModel.js
const db = require('../db');
const crypto = require('crypto');

// Create the invites table
function createInviteTable() {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS invites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token TEXT UNIQUE NOT NULL,
      game_id INTEGER NOT NULL,
      expires_at INTEGER,
      used INTEGER DEFAULT 0,
      created_at INTEGER DEFAULT (strftime('%s','now')),
      FOREIGN KEY (game_id) REFERENCES games(id)
    )
  `).run();
}

// Generate a random invite token
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Create a new invite for a given game
function createInvite(gameId, expiresInSeconds = 86400) {
  const token = generateToken();
  const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;

  db.prepare(`
    INSERT INTO invites (token, game_id, expires_at)
    VALUES (?, ?, ?)
  `).run(token, gameId, expiresAt);

  return token;
}

// Fetch invite only if it's valid (not used and not expired)
function getInvite(token) {
  return db.prepare(`
    SELECT * FROM invites
    WHERE token = ? AND used = 0 AND expires_at > strftime('%s','now')
  `).get(token);
}

// Mark an invite token as used
function markInviteAsUsed(token) {
  db.prepare(`UPDATE invites SET used = 1 WHERE token = ?`).run(token);
}

// Validate and use an invite token, return associated game_id
function validateAndUseInviteToken(token) {
  const invite = getInvite(token);

  if (!invite) {
    throw new Error('Invalid, expired, or used invite token');
  }

  markInviteAsUsed(token);
  return invite.game_id;
}

// Export everything
module.exports = {
  createInviteTable,
  createInvite,
  getInvite,
  markInviteAsUsed,
  validateAndUseInviteToken
};

