var express = require('express');
var path = require('path');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var flash    = require('connect-flash');
var passport= require('passport');
module.exports = function(app) {

    mongoose.connect('mongodb://localhost/Database', function(err) {
        if(err) {
            console.log('connection error', err);
        } else {
            console.log('connection successful');
        }

    });
    require('./Passport')(passport); // pass passport for configuration
    // view engine setup
    app.set('views','../../Front-End/Views');
    app.set('view engine', 'ejs');
    // set up our express application
    app.use(morgan('dev')); // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/../../Front-End'));
    // required for passport
    app.use(session({
        secret: "cookie_secret",
        resave: true,
        saveUninitialized: true
    })); // session secret
    app.use(flash()); // use connect-flash for flash messages stored in session
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    // routes ======================================================================
    // Routing for the application
     app.get('/*',function(req,res){
        var path = require('path');
        res.sendFile(path.resolve('Front-End/index.html'));
     });
    require('../App/Routes/UserRouter.js')(app);
    require('../App/Routes/QuizRouter.js')(app);
    require('../App/Routes/QuestionRouter.js')(app);
    require('../App/Routes/LangRouter.js')(app);
};
