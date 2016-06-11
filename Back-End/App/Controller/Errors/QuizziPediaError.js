/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Controllers::Errors::QuizziPediaError
 * Description: classe che contiene gli errori e costruisce i messaggi
 * d'errore.
 * Creation data: 03-05-2016
 * Author: Mattia Varotto
 ********************************************************************************
 * Updates history
 * *-------------------------------------------------------------------------------
 * ID: QuizziPediaError_20160427
 * Update data: 03-05-2016
 * Description: definito il metodo toJSON().
 * Autore: Mattia Varotto
 *-------------------------------------------------------------------------------
 * ID: QuizziPediaError_20160427
 * Update data: 04-05-2016
 * Description: aggiunti i metodi getCode(), getTitle(), getMessage(), toJSON()
 * e toString(); il metodo toJSON() è ancora da definire.
 * Autore: Mattia Varotto
  *******************************************************************************/
"use strict";

var errorModel = require('../../Model/ErrorModel.js')

exports.generateError = function(req, res) {
    errorModel.generateError(req, res);
}

exports.getCode = function(req, res) {

}
