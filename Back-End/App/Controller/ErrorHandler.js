/*******************************************************************************
 * Name: Nome della classe da DDP; (QuizziPedia::ciao::prova::...)
 * Description: scrivere una piccola descrizione della classe (riassunto da DDP).
 * Relations with other classes:
 * + NomeAltraClasse1
 * + NomeAltraClasse2
 * Creation data: 27-04-2016
 * Author: Nome Cognome
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: NomeClasse_aaaammgg
 * Update data: gg-mm-aaaa
 * Description: descrizione della modifica fatta.
 * Autore: Nome Cognome
 *-------------------------------------------------------------------------------
 *******************************************************************************/
"use strict";
var QuizziPediaError = require('../Controller/Errors/QuizziPediaError.js');
var ErrorModel = require('../App/Model/ErrorModel.js');

var errormodel = new ErrorModel();

exports.insertError = function(req, res, next) {
    var error = {
        errorCode: req.errorCode,
        errorTitle: req.errorTitle,
        errorMessage: req.errorMessage
    }
    errormodel.insert(error);
    return res.send(error);
}


/**
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
 **/