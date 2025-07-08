// backend/db/initDb.js
const { createRolesTable, createUserRolesTable, seedRoles } = require('../models/roleModel');
const { createPermissionsTable, seedPermissions } = require('../models/permissionModel');
const {
  createGamePermissionsTable,
} = require('../models/gamePermissionModel');
const { createInviteTable } = require('../models/inviteModel');
createInviteTable();


// Initialize all necessary tables and seed default data
function initDatabase() {
  try {
    console.log('🛠 Creating roles table...');
    createRolesTable();

    console.log('🛠 Creating user_roles table...');
    createUserRolesTable();

    console.log('🛠 Creating permissions table...');
    createPermissionsTable();

    console.log('🌱 Seeding roles (safe)...');
    seedRoles();

    console.log('🌱 Seeding permissions (safe)...');
    seedPermissions();

    console.log('✅ Database initialized successfully.');
  } catch (err) {
    console.error('❌ Error initializing database:', err.message);
  }
}

// Run the initializer
initDatabase();

