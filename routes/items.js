const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const item = await Item.getAllByUser(req.session.userId);
        res.render('dashboard', { items:item });
    } catch (err) {
        res.status(500).send('Error fetching items');
    }
});

router.get('/new', isAuthenticated, (req, res) => {
    res.render('new-item.ejs');
});
router.get('/dashboard', isAuthenticated, async(req, res) => {
    const item = await Item.getAllByUser(req.session.userId);
    res.render('dashboard.ejs',{items:item});
});

router.post('/', isAuthenticated, async (req, res) => {
    try {
        await Item.create(req.body, req.session.userId);
        res.redirect('/items/dashboard');
    } catch (err) {
        res.status(500).send('Error creating item');
    }
});

router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const item = await Item.getOne(req.params.id, req.session.userId);
        if (item) {
            res.render('view-item', { item });
        } else {
            res.redirect('/items/dashboard');
        }
    } catch (err) {
        res.status(500).send('Error fetching item');
    }
});

router.get('/:id/edit', isAuthenticated, async (req, res) => {
    try {
        const item = await Item.getOne(req.params.id, req.session.userId);
        if (item) {
            res.render('edit-item', { item });
        } else {
            res.redirect('/items/dashboard');
        }
    } catch (err) {
        res.status(500).send('Error fetching item');
    }
});

router.post('/:id', isAuthenticated, async (req, res) => {
    try {
        await Item.update(req.params.id, req.body, req.session.userId);
        res.redirect('/items/dashboard');
    } catch (err) {
        res.status(500).send('Error updating item');
    }
});

router.post('/:id/delete', isAuthenticated, async (req, res) => {
    try {
        await Item.delete(req.params.id, req.session.userId);
        res.redirect('/items/dashboard');
    } catch (err) {
        res.status(500).send('Error deleting item');
    }
});

module.exports = router;