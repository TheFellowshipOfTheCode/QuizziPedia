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
    require('./passport')(passport); // pass passport for configuration
    // view engine setup
    app.set('views','./public/views');
    app.set('view engine', 'ejs');
    // set up our express application
    app.use(morgan('dev')); // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)
    app.use(bodyParser()); // get information from html forms
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join('.', 'public')));
    // required for passport
    app.use(session({ secret: 'anything'})); // session secret
    app.use(flash()); // use connect-flash for flash messages stored in session
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    // routes ======================================================================
    require('../app/routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
};
