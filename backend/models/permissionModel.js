// backend/models/permissionModel.js
const db = require('../db');

function createPermissionsTable() {
  db.prepare(`DROP TABLE IF EXISTS permissions`).run(); // 💣 Dev-only reset
  db.prepare(`
    CREATE TABLE permissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT
    )
  `).run();
}


function seedPermissions() {
  const permissions = [
    { name: 'CREATE_GAME', description: 'Can create a new game' },
    { name: 'DELETE_GAME', description: 'Can delete any game' },
    { name: 'EDIT_PROFILE', description: 'Can edit user profile' },
    { name: 'VIEW_STATS', description: 'Can view game statistics' }
  ];

  const insert = db.prepare(`
    INSERT OR IGNORE INTO permissions (name, description)
    VALUES (?, ?)
  `);

  for (const perm of permissions) {
    insert.run(perm.name, perm.description);
    console.log(`✅ Inserted (or skipped existing) permission: ${perm.name}`);
  }
}

module.exports = {
  createPermissionsTable,
  seedPermissions
};

