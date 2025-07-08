// backend/db/seedPermissions.js

const db = require('./index');

// Ensure roles exist
const role = db.prepare('SELECT id FROM roles WHERE name = ?').get('admin');
if (!role) {
  console.error('❌ Role "admin" not found. Run seedRoles.js first.');
  process.exit(1);
}

// Define the default permissions
const defaultPermissions = [
  'CREATE_GAME',
  'JOIN_GAME',
  'MANAGE_USERS',
  'VIEW_MAP',
  'EDIT_MAP',
  'DELETE_GAME'
];

// Insert permissions for the admin role
defaultPermissions.forEach((perm) => {
  const exists = db
    .prepare('SELECT id FROM permissions WHERE role_id = ? AND permission = ?')
    .get(role.id, perm);

  if (!exists) {
    db.prepare('INSERT INTO permissions (role_id, permission) VALUES (?, ?)').run(role.id, perm);
    console.log(`✅ Inserted permission: ${perm}`);
  } else {
    console.log(`⚠️ Permission already exists: ${perm}`);
  }
});

console.log('🎉 Default permissions seeding complete.');

