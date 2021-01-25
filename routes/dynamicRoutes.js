const express = require("express");
const bcrypt = require("bcryptjs");
const socialMediaUser = require("../model/SocialmediaUser");
const passport = require("passport");
const { forwordAuthentication } = require("../config/auth");

const router = express.Router();


// signup page
router.get('/signup', forwordAuthentication, (req, res) => {
    res.render("signup");
});

// signup validation and authorization
router.post('/signup', forwordAuthentication, (req, res) => {
    const { name, email, password, conformpassword } = req.body;
    let errors = [];

    if(!name || !email || !password || !conformpassword) {
        errors.push({msg: "All fields are required!"});
    }

    if(password != conformpassword) {
        errors.push({msg: "Passwords don't match!"});
    }

    if(password.length < 6) {
        errors.push({msg: "Password must be at least 6 character long."});
    }

    if(errors.length > 0) {
        res.render('signup', {
            errors,
            name,
            email,
            password,
            conformpassword
        });
    } else {
        socialMediaUser.findOne({email: email}).then(user => {
            if(user) {
                errors.push({msg: "Email already exists!"});
                res.render('signup', {
                    errors,
                    name,
                    email,
                    password,
                    conformpassword
                });
            } else {
                const newSocialMediaUser = new socialMediaUser({
                    name,
                    email,
                    password,
                    conformpassword
                });

                // hash password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newSocialMediaUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        // set password to hasshed
                        newSocialMediaUser.password = hash;
                        // save new socialmedia user
                        newSocialMediaUser
                            .save()
                            .then(user => {
                                req.flash('success_msg', 'successfully registered!, you are now able to processed further');
                                res.redirect('/users/signin');
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    })
                })
            }
        })
    }
})


// signin page
router.get('/signin', (req, res) => {
    res.render("signin");
});


// signup validation and authorization
router.post('/signin', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashbord',
        failureRedirect: '/users/signin',
        failureFlash: true
    })(req, res, next);
});


// logout routes
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'you are logout.');
    req.redirect('/users/signin')
})

module.exports = router;


