// backend/routes/inviteRoutes.js
const express = require('express');
const router = express.Router();
const { getInvite, markInviteAsUsed } = require('../models/inviteModel');

router.get('/invite/:token', async (req, res) => {
  const invite = getInvite(req.params.token);

  if (!invite) {
    return res.status(400).send('Invalid or expired invite.');
  }

  // You could store the invite token in a session or redirect to OAuth here
  req.session.inviteToken = invite.token;

  res.redirect('/auth/oauth-login'); // Or however your OAuth flow starts
});

module.exports = router;
