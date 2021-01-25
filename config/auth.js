module.exports = {
    ensureAuthentication : (req, res, next) => {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please login to excess further!');
        res.redirect('/users/signin');
    },

    forwordAuthentication : (req, res, next) => {
        if(!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/dashbord');
    }
}