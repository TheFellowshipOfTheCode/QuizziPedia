/*******************************************************************************
* Name: QuizziPedia::Back-End::Server;
* Description: classe che crea il server;
* Creation data: 27-04-2016;
* Author: Franco Berton.
********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
* ID: Config_20160427;
* Update data: 27-04-2016;
* Description: Creata e ultimata la classe;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/
// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var port     = process.env.PORT || 8080;  // set our port
var config= require('./Config/Config');
start(config(app));
function start(config){
// start app ===============================================
    app.listen(port);
    console.log('Magic happens on port ' + port); 				// shoutout to the user
}
exports = module.exports = app; 						// expose app
