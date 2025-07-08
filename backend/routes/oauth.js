const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const db = require('../../db');
require('dotenv').config();

const router = express.Router();

const createOrUpdateUser = (email, name, provider) => {
  let user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) {
    db.prepare('INSERT INTO users (email, name, provider) VALUES (?, ?, ?)').run(email, name, provider);
    user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  }
  return user;
};

// GOOGLE OAUTH
router.get('/google/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const { data } = await axios.post(
      `https://oauth2.googleapis.com/token`,
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo`, {
      headers: { Authorization: `Bearer ${data.access_token}` }
    });

    const user = createOrUpdateUser(userInfo.data.email, userInfo.data.name, 'google');
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);

    res.redirect(`https://yourfrontend.com/oauth-success?token=${token}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('OAuth failed');
  }
});


const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const db = require('../../db');
require('dotenv').config();

const router = express.Router();

const createOrUpdateUser = (email, name, provider) => {
  let user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) {
    db.prepare('INSERT INTO users (email, name, provider) VALUES (?, ?, ?)').run(email, name, provider);
    user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  }
  return user;
};

// GOOGLE OAUTH
router.get('/google/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const { data } = await axios.post(
      `https://oauth2.googleapis.com/token`,
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo`, {
      headers: { Authorization: `Bearer ${data.access_token}` }
    });

    const user = createOrUpdateUser(userInfo.data.email, userInfo.data.name, 'google');
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);

    res.redirect(`https://yourfrontend.com/oauth-success?token=${token}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('OAuth failed');
  }
});

const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const db = require('../../db');
require('dotenv').config();

const router = express.Router();

const createOrUpdateUser = (email, name, provider) => {
  let user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) {
    db.prepare('INSERT INTO users (email, name, provider) VALUES (?, ?, ?)').run(email, name, provider);
    user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  }
  return user;
};

// GOOGLE OAUTH
router.get('/google/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const { data } = await axios.post(
      `https://oauth2.googleapis.com/token`,
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo`, {
      headers: { Authorization: `Bearer ${data.access_token}` }
    });

    const user = createOrUpdateUser(userInfo.data.email, userInfo.data.name, 'google');
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);

    res.redirect(`https://yourfrontend.com/oauth-success?token=${token}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('OAuth failed');
  }
});
