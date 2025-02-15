const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.authenticate(req.body.username, req.body.password);
        if (user) {
            req.session.userId = user.id;
            res.redirect('/items/dashboard');
        } else {
            res.render('login', { error: 'Invalid credentials' });
        }
    } catch (err) {
        res.render('login', { error: 'An error occurred' });
    }
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        await User.create(req.body.username, req.body.password);
        res.redirect('/login');
    } catch (err) {
        res.render('register', { error: 'Username already exists' });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;