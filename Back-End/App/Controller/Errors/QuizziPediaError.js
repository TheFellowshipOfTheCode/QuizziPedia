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
    console.log(req);
    errorModel.generateError(req, res);
    console.log("returning RES: " + res.body)
}

exports.getCode = function(req, res) {

}


    /*getCode() {
        return this.code;
    }

    getTitle() {
        return this.title;
    }

    getMessage() {
        return this.message;
    }

    toJSON() {
        let string = '{ "code": ' + this.code + ',' +
                       ' "title": ' + '"' + this.title + '"' + ',' +
                        ' "message": ' + '"' + this.message + '"' + ' }';
        let json = JSON.parse(string);
        return json;
    }

    toString() {
        return this.code + ' ' + this.title + ': ' + this.message + '.';
    }
}
*/
