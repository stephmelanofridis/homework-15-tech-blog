const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
            order: [['createdAt', 'DESC']],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
            current_user: req.session.user_id
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login and sign up page
router.get('/loginsignup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('loginsignup');
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
            attributes: { exclude: ['password'] },
            order: [['createdAt', 'DESC']],
            where: {
                user_id: req.session.user_id,
            }
        });
        if (postData.length > 0) {
            const posts = postData.map((post) => post.get({ plain: true }));
            console.log(posts)
            res.render('dashboard', {
                posts,
                logged_in: req.session.logged_in,
                current_user: req.session.user_id
            });
        }
        else {
            console.log('here is the dashboard')
            res.render('dashboard', {
                logged_in: req.session.logged_in,
                current_user: req.session.user_id
            })
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }],
            attributes: { exclude: ['password'] },
        });

        const post = postData.get({ plain: true });
        const commentData = await Comment.findAll({
            include: [{ model: User }],
            attributes: { exclude: ['password'] },
            where: {
                post_id: req.params.id
            }
        })

        let comments = commentData.map((comment) => comment.get({ plain: true }));
        comments = comments.map((comment) => ({ ...comment, current_user: req.session.user_id }))
        res.render('post', {
            post,
            comments,
            logged_in: req.session.logged_in,
            current_user: req.session.user_id
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/edit/:id', async (req, res) => {
    const postData = await Post.findByPk(req.params.id, {
        include: [{ model: User }],
        attributes: { exclude: ['password'] },
    });

    const post = postData.get({ plain: true });

    res.render('editpost', {
        post,
        logged_in: req.session.logged_in,
        current_user: req.session.user_id
    });
});

router.get('/comment/edit/:id', async (req, res) => {
    const commentData = await Comment.findByPk(req.params.id, {
        include: [{ model: User }],
        attributes: { exclude: ['password'] },
    });
    const comment = commentData.get({ plain: true });
    res.render('editcomment', {
        comment,
        logged_in: req.session.logged_in,
        current_user: req.session.user_id
    });
});

module.exports = router;