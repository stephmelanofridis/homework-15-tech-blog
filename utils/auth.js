const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/loginsignup');
    } else {
        next();
    }
};

module.exports = withAuth;