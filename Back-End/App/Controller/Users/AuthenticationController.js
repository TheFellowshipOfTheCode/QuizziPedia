/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Controllers::Users::
 * AuthenticationController;
 * Description: classe che si occupa della registrazione e dell'autenticazione
 * dell'utente nel sistema. È un componente ConcreteHandler del design pattern
 * Chain of responsibility. Risulta essere il componente che eventualmente
 * esegue la richiesta del client attraverso Passport;
 * Relations with other classes:
 * + IN	UserController;
 * + OUT Session;
 * + OUT UserModel.
 * Creation data: 27-04-2016;
 * Author: Franco Berton.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: AuthenticationController_20160427;
 * Update data: 27-04-2016;
 * Description: Creata classe e inseriti tutti i metodi;
 * Autore: Franco Berton.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

var passport = require("passport");

exports.signout = function(req, res, next) {
    req.logOut();
    res.sendStatus(200);
};

exports.signin = function(req, res, next) { 
    passport.authenticate('local-signin', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(500).json({"code":1, "title":"no login", "message":"Login non effettuato"});
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
            return res.send({ success : false, message : 'Registrazione non effettuata' });
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send({success:true, user:user});
        });
    })(req, res, next);
};