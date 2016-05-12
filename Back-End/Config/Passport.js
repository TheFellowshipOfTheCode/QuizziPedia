// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User        = require('../App/Model/UserModel');
var Topic = require('../App/Model/TopicModel');


// expose this function to our app using module.exports
module.exports = function(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {
                // find a user whose username is the same as the forms username
                // we are checking to see if the user trying to login already exists
                User.findOne({$or: [{'username' : username}, {'email' : req.param('email')}]}, function(err, user) {
                    if (err)
                        return done(err);
                    // check to see if theres already a user with that email
                    if (user) {
                        if (user.username == username && user.email == req.param('email'))
                            return done(null, false, {code:4,title:'Errore Registrazione',message: 'Username e Email già presente'});
                        else {
                            if (user.email === req.param('email'))
                                return done(null, false, {code:3, title:'Errore Registrazione', message: 'Email già presente'})
                            else
                                return done(null, false, {code:2, title:'Errore Registrazione', message: 'Username già presente'})
                        }
                    } else {

                        // if there is no user with that email
                        // create the user
                        var newUser            = new User();

                        // set the user's local credentials
                        newUser.password 	  = newUser.generateHash(password)
                        newUser.username      = username;
                        newUser.email    	  = req.param('email');
                        newUser.surname 	  = req.param('surname');
                        newUser.name    	  = req.param('name');
                        newUser.privilege     = 'normal';
                        Topic.find({},function(err,topics){
                            if(err)
                                throw err;
                            topics.forEach(function(topic){
                                newUser.statistics.push({
                                    topicName: topic.name
                                });
                            });
                            // save the user
                            newUser.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, newUser,{code:1, title:'Registrazione', message: 'Registrazione avvenuta con successo'});
                            });
                        });

                    }
                });
            });

        }));
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signin', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            // callback with email and password from our form
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            var UsernameOrEmail = (username.indexOf('@') === -1) ? {'username': username} : {'email': username};
            User.findOne( UsernameOrEmail , function(err, user) {
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                // all is well, return successful user
                return done(null, user);
            })
        }));



};
