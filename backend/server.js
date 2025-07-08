// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const inviteRoutes = require('./routes/inviteRoutes');
app.use('/', inviteRoutes);

// Import database and models
const db = require('./db');
const { createUsersTable } = require('./models/userModel');
const { createRolesTable, createUserRolesTable } = require('./models/roleModel');

// Import routes
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Adjust to match your frontend
  credentials: true
}));
app.use(express.json());

// Create required DB tables
createUsersTable();
createRolesTable();
createUserRolesTable();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('TTRPG-OS Backend Running 🚀');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

