const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const { withAuth } = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: ['poster', 'comment'],
            order: [['date_created', 'DESC']],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            layout: 'main',
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
            order: [['date_created', 'DESC']],
            where: { user_id: req.session.user_id, }
        })

        if (postData.length > 0) {
            const posts = postData.map((post) => post.get({ plain: true }));
            res.render('dashboard', {
                posts,
                logged_in: req.session.logged_in,
            });
        } else {
            res.render('dashboard', {
                logged_in: req.session.logged_in,
            });
        };
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;