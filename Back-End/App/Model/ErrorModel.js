/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Models::ErrorModel
 * Description: classe che rappresenta le informazioni di un errore che si è
 * verificato eseguendo una determianta operazione.
 * Creation data: 03-05-2016
 * Author: Mattia Varotto
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: ErrorModel_20160513
 * Update data: 13-05-2016
 * Description: definito il modello e aggiunti i metodi getCode(), getTitle() e
 * get Message().
 * Autore: Mattia Varotto
 *-------------------------------------------------------------------------------
 *******************************************************************************/
"use strict";
var mongoose = require('mongoose');

var errorSchema = new mongoose.Schema({
    errorCode: Number,
    errorTitle : String,
    errorMessage: String
});


errorSchema.statics.generateError = function(error, callback) {
    console.log(error);
    return this.findOne({errorCode: 123}, callback);
}

errorSchema.statics.getCode = function() {
    return this.errorCode;
};

errorSchema.statics.getTitle = function() {
    return this.errorTitle;
};

errorSchema.statics.getMessage = function() {
    return this.errorMessage;
};


var ErrorModel = mongoose.model('Errors', errorSchema);

module.exports = ErrorModel;