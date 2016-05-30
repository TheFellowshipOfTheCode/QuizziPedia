/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Controllers::ErrorsHandler
 * Description: classe middleware per la gestione degli errori.
 * Creation data: 03-05-2016
 * Author: Mattia Varotto
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: ErrorsHandler_20160503
 * Update data: 03-05-2016
 * Description: Creata classe e aggiunti metodi.
 * Autore: Mattia Varotto
 *-------------------------------------------------------------------------------
 * ID: ErrorsHandler_20160503
 * Update data: 04-05-2016
 * Description: Creati metodi: insertError(), handleError().
 * Autore: Mattia Varotto
 *-------------------------------------------------------------------------------
 *******************************************************************************/
"use strict";
var QuizziPediaError = require('../Controller/Errors/QuizziPediaError.js');
var ErrorModel = require('../App/Model/ErrorModel.js');

var errormodel = new ErrorModel();

/*  serve a qualcosa???

exports.handleError = function(req, res, next) {
    errormodel.findOne({errorCode: req.errormodel.errorCode}, function(errorFound) {
        var error = {
            errorCode: errorFound.errorCode,
            errorTitle: errorFound.errorTitle,
            errorMessage: errorFound.errorMessage
        }
        res.send(error);
    })
}

*/