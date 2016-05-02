/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Controllers::Errors::QuizziPediaError
 * Description: classe che contiene gli errori e costruisce i messaggi
 * d'errore.
 * Relations with other classes:
 * + IN ErrorsHandler
 * Creation data: 27-04-2016
 * Author: Mattia Varotto
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuizziPediaError_20160427
 * Update data: 28-04-2016
 * Description: aggiunti i metodi getCode(), getTitle(), getMessage(), toJSON()
 * e toString(); il metodo toJSON() è ancora da definire.
 * Autore: Mattia Varotto
 *-------------------------------------------------------------------------------
 * ID: QuizziPediaError_20160427
 * Update data: 29-04-2016
 * Description: definito il metodo toJSON().
 * Autore: Mattia Varotto
 *******************************************************************************/
"use strict";

module.exports = class QuizziPediaError  {
    constructor(code, title, message) {
        this.code = code;
        this.title = title;
        this.message = message;
    }

    getCode() {
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

