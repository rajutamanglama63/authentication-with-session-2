const localStrategy = require("passport-local").Strategy;
const mongooose = require("mongoose");
const bycrypt = require("bcryptjs");

const socialMediaUser = require("../model/SocialmediaUser");


module.exports = function(passport) {
    passport.use(
        new localStrategy({ usernameField: 'email'}, (email, password, done) => {
            // Match authenticated user aka authUser
            socialMediaUser.findOne({
                email:email
            }).then(user => {
                if(!user) {
                    return done(null, false, { message:'That email is not registered!'});
                }

                // Match password
                bycrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;
                    if(isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect!'});
                    }
                })
            })
            .catch(err => console.log(err))
        })
    )

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        socialMediaUser.findById(id, function(err, user) {
          done(err, user);
        });
    });
    
}