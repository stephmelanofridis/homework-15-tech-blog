const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const { withAuth } = require('../utils/auth');

router.get('/', async (res, req) => {
    try {
        const postData = await Post.findAll({
            include: ['poster', 'comment'],
            order: [['date', 'ASC']],
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