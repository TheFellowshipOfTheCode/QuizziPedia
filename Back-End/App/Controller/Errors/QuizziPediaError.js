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

    // da sistemare, in javascript le variabili tra virgolette non vengono parsate
    toJSON() {
        return this;
    }

    toString() {
        return this.code + ' ' + this.title + ': ' + this.message + '.';
    }
}

