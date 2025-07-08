const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

require('dotenv').config();

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) return res.status(400).json({ message: 'Missing fields' });

  const existingUser = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (existingUser) return res.status(409).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run(username, hashedPassword, role);
  res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Missing credentials' });

  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user) return res.status(401).json({ message: 'Invalid username or password' });

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) return res.status(403).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, username: user.username, role: user.role });
  });
});

module.exports = router;
const crypto = require('crypto');
const db = require('../db');

router.post('/request-reset', async (req, res) => {
  const { email } = req.body;

  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = Date.now() + 1000 * 60 * 15; // 15 minutes

    db.prepare('UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?')
      .run(token, expiry, email);

    // Replace with real email sending later
    console.log(`Reset link: http://localhost:3000/reset-password?token=${token}`);

    res.json({ message: 'Password reset link sent (check console for now).' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
const bcrypt = require('bcrypt');

router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = db.prepare('SELECT * FROM users WHERE reset_token = ?').get(token);

    if (!user || user.reset_token_expiry < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    db.prepare(`
      UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?
    `).run(hashedPassword, user.id);

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
