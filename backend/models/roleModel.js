const db = require('../db');

// Create roles table
function createRolesTable() {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS permissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      role_id INTEGER NOT NULL,
      permission TEXT NOT NULL,
      FOREIGN KEY(role_id) REFERENCES roles(id)
    )
  `).run();
}

// Create user_roles table
function createUserRolesTable() {
  const stmt = `
    CREATE TABLE IF NOT EXISTS user_roles (
      user_id INTEGER,
      role_id INTEGER,
      PRIMARY KEY (user_id, role_id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (role_id) REFERENCES roles(id)
    )
  `;
  db.prepare(stmt).run();
}

// Add a role
function addRole(name) {
  return db.prepare('INSERT OR IGNORE INTO roles (name) VALUES (?)').run(name);
}

// Assign a role to a user
function assignRoleToUser(userId, roleName) {
  const role = db.prepare('SELECT id FROM roles WHERE name = ?').get(roleName);
  if (!role) throw new Error('Role not found');

  const stmt = db.prepare('INSERT OR IGNORE INTO user_roles (user_id, role_id) VALUES (?, ?)');
  stmt.run(userId, role.id);
}

// Add permission to a role
function addPermission(roleId, permission) {
  return db.prepare('INSERT INTO permissions (role_id, permission) VALUES (?, ?)').run(roleId, permission);
}

// Get all permissions for a role
function getPermissionsByRole(roleId) {
  return db.prepare('SELECT permission FROM permissions WHERE role_id = ?').all(roleId);
}

// Seed default roles
function seedRoles() {
  addRole('admin');
  addRole('gm');
  addRole('player');
}

// Seed permissions based on roles
function seedPermissions() {
  const roles = db.prepare('SELECT id, name FROM roles').all();

  for (const role of roles) {
    switch (role.name) {
      case 'admin':
        addPermission(role.id, 'create_user');
        addPermission(role.id, 'delete_user');
        addPermission(role.id, 'view_all_games');
        break;
      case 'gm':
        addPermission(role.id, 'create_game');
        addPermission(role.id, 'kick_player');
        addPermission(role.id, 'view_game_stats');
        break;
      case 'player':
        addPermission(role.id, 'join_game');
        addPermission(role.id, 'edit_character');
        break;
    }
  }
}

module.exports = {
  createRolesTable,
  createUserRolesTable,
  addRole,
  assignRoleToUser,
  addPermission,
  getPermissionsByRole,
  seedRoles,
  seedPermissions
};
// Get user roles
function getUserRoles(userId) {
  const stmt = db.prepare(`
    SELECT r.name FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = ?
  `);
  return stmt.all(userId).map(row => row.name);
}

// Check if user has a specific role
function userHasRole(userId, roleName) {
  const stmt = db.prepare(`
    SELECT 1 FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = ? AND r.name = ?
  `);
  return !!stmt.get(userId, roleName);
}

