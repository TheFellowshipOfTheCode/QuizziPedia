var passport = require("passport");

exports.signout = function(req, res, next) {
    req.logOut();
    res.send(200);
};

exports.signin = function(req, res, next) {
    passport.authenticate('local-signin', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send({ success : false, message : 'Login non effettuato' });
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send({success:true, user:user});
        });
    })(req, res, next);
}

exports.signup = function(req, res, next) {
    passport.authenticate('local-signup', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send({ success : false, message : 'Registrazione non effettuato' });
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send({success:true, user:user});
        });
    })(req, res, next);
};