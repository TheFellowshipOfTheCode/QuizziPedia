/*******************************************************************************
 * Name: QuizziPedia::Back-End::Config::Config;
 * Description: 	questa classe gestisce la configurazione del server.
 * Non sono stati modellati attributi e metodi di questa classe in quanto viene
 * gestita da Express;
 * Relations with other classes:
 * + IN	Server.
 * Creation data: 27-04-2016;
 * Author: Franco Berton.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: Config_20160427;
 * Update data: 27-04-2016;
 * Description: Creata classe e inserite procedure necessarie all'avvio del
 * server;
 * Autore: Franco Berton.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

 var accessToDB = require("./loginToMongoLab.js");


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


    var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

    var mongodbUri = 'mongodb://'+accessToDB.login+':'+accessToDB.password+'@'+accessToDB.url+'/'+accessToDB.database;

    mongoose.connect(mongodbUri, options, function(err) {
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
    app.use(express.static(path.join('../../', 'Front-End')));
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
    require('../App/Routes/UserRouter.js')(app);
    require('../App/Routes/QuizRouter.js')(app);
    require('../App/Routes/QuestionRouter.js')(app);
    require('../App/Routes/LangRouter.js')(app);
    app.get('/*',function(req,res){
       res.sendFile(path.resolve('../Front-End/Index.html'));
    });
};
