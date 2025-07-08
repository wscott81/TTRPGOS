const db = require('./index'); // or replace with correct DB connection
const {
  createRolesTable,
  createUserRolesTable,
  addRole
} = require('../models/roleModel');

createRolesTable();
createUserRolesTable();

const defaultRoles = ['admin', 'gm', 'player', 'guest'];

defaultRoles.forEach(role => {
  addRole(role);
});

console.log('Default roles seeded successfully.');
