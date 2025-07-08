// backend/models/gamePermissionModel.js
const db = require('../db');

// Create the game_permissions table
function createGamePermissionsTable() {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS game_permissions (
      user_id INTEGER NOT NULL,
      game_id INTEGER NOT NULL,
      permission TEXT NOT NULL,
      PRIMARY KEY (user_id, game_id, permission),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (game_id) REFERENCES games(id)
    )
  `).run();
}

// Assign permission to a user for a specific game
function assignGamePermission(userId, gameId, permission) {
  db.prepare(`
    INSERT OR IGNORE INTO game_permissions (user_id, game_id, permission)
    VALUES (?, ?, ?)
  `).run(userId, gameId, permission);
}

// Check if a user has a specific permission in a game
function hasGamePermission(userId, gameId, permission) {
  const result = db.prepare(`
    SELECT 1 FROM game_permissions
    WHERE user_id = ? AND game_id = ? AND permission = ?
  `).get(userId, gameId, permission);
  return !!result;
}

module.exports = {
  createGamePermissionsTable,
  assignGamePermission,
  hasGamePermission
};
