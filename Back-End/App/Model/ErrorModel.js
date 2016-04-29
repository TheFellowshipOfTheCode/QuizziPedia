/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Models::ErrorModel
 * Description: classe che rappresenta le informazioni di un errore che si è
 * verificato eseguendo una determianta operazione.
 * Relations with other classes:
 * + IN ErrorHandler
 * Creation data: 27-04-2016
 * Author: Mattia Varotto
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: ErrorModel_20160427
 * Update data: 28-04-2016
 * Description: definito il modello e aggiunti i metodi getCode(), getTitle() e
 * get Message().
 * Autore: Mattia Varotto
 *-------------------------------------------------------------------------------
 *******************************************************************************/
"use strict";
let mongoose = require('mongoose');

let errorSchema = new mongoose.Schema({
    errorCode: Number,
    errorTitle : String,
    errorMessage: String
});

/**
errorSchema.methods.getCode = function() {
    return this.errorCode;
};

errorSchema.methods.getTitle = function() {
    return this.errorTitle;
};

errorSchema.methods.getMessage = function() {
    return this.errorMessage;
};
**/


// vedere se si riesce ad inserire gli errori nel database e fare i test relativi

let ErrorModel = mongoose.model('Errors', errorSchema);

module.exports = ErrorModel;