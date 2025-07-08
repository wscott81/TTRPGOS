// backend/controllers/inviteController.js
const db = require('../db');

async function validateAndUseInviteToken(userId, token) {
    const getInvite = db.prepare(`SELECT * FROM invites WHERE token = ? AND used = 0`);
    const invite = getInvite.get(token);

    if (!invite) {
        throw new Error('Invalid or already used invite token');
    }

    // Associate user to the game using the invite
    const insertPlayer = db.prepare(`
        INSERT OR IGNORE INTO game_players (game_id, user_id)
        VALUES (?, ?)
    `);
    insertPlayer.run(invite.game_id, userId);

    // Mark invite as used
    const markUsed = db.prepare(`UPDATE invites SET used = 1 WHERE token = ?`);
    markUsed.run(token);

    console.log(`✅ User ${userId} joined game ${invite.game_id} via invite token.`);
}

module.exports = {
    validateAndUseInviteToken
};

