module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        // req.session.oldUrl = req.url;
        req.flash('error', 'Please log in to view that resource');
        res.redirect('/login');
    },

    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/user/profile');
    }
};