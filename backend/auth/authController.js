async function handleOAuthCallback(req, res) {
  const { token } = req.query; // passed as ?token=abc123
  const userProfile = await getOAuthUserProfile(req); // however you handle this
  const user = await findOrCreateUser(userProfile);

  if (token) {
    const invite = db.prepare('SELECT * FROM invites WHERE token = ? AND used = 0').get(token);

    if (invite) {
      // Associate user to the game
      db.prepare(`
        INSERT OR IGNORE INTO game_players (user_id, game_id)
        VALUES (?, ?)
      `).run(user.id, invite.game_id);

      // Optionally assign a role
      if (invite.role) {
        assignRoleToUser(user.id, invite.role);
      }

      // Mark token as used
      db.prepare('UPDATE invites SET used = 1 WHERE token = ?').run(token);

      console.log(`✅ User ${user.id} added to game ${invite.game_id} using token.`);
    } else {
      console.warn(`⚠️ Invalid or used invite token: ${token}`);
    }
  }

  // Redirect to game lobby or dashboard
  res.redirect(`/dashboard`);
}
