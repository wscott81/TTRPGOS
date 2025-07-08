const express = require('express');
const passport = require('./passport');

const router = express.Router();

// ----- Google OAuth -----
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful login, redirect to frontend (adjust this!)
        res.redirect('http://yourfrontendurl.com/login-success');
    });

// ----- Discord OAuth -----
router.get('/discord', passport.authenticate('discord'));

router.get('/discord/callback',
    passport.authenticate('discord', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('http://yourfrontendurl.com/login-success');
    });

// ----- Twitch OAuth -----
router.get('/twitch', passport.authenticate('twitch'));

router.get('/twitch/callback',
    passport.authenticate('twitch', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('http://yourfrontendurl.com/login-success');
    });

// ----- Check if user is logged in -----
router.get('/login-success', (req, res) => {
    if (req.user) {
        res.json({ loggedIn: true, user: req.user });
    } else {
        res.json({ loggedIn: false });
    }
});

// ----- Logout -----
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('http://yourfrontendurl.com/');
    });
});

module.exports = router;
