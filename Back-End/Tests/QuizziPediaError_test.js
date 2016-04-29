/*******************************************************************************
 * Name: QuizziPediaError_test
 * Description: classe che contiene i test per la classe QuizziPediaError.
 * Relations with other classes:
 * + QuizziPediaError
 * Creation data: 28-04-2016
 * Author: Mattia Varotto
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuizziPediaError_test_20160428
 * Update data: 28-04-2016
 * Description: aggiunti i test per i metodi getCode(), getTitle(), getMessage(),
 * toJSON() e toString(); il test per il metodo toJSON() è ancora da definire.
 * Autore: Mattia Varotto
 *-------------------------------------------------------------------------------
 * ID: QuizziPediaError_test_20160428
 * Update data: 29-04-2016
 * Description: definito il test per il metodo toJSON().
 * Autore: Mattia Varotto
 *******************************************************************************/
"use strict";

let QuizziPediaError = require('../App/Controller/Errors/QuizziPediaError.js');
let q = new QuizziPediaError(123,"Accesso vietato","l\'utente non può accedere a quest\'area");

let expect = require('expect');

describe("QuizziPediaError", function() {
    it("check if it returns the error code", function() {
        expect(q.getCode()).toEqual(123);
    });

    it("check if it returns the error title", function() {
        expect(q.getTitle()).toEqual('Accesso vietato');
    });

    it("check if it returns the error title", function() {
        expect(q.getMessage()).toEqual('l\'utente non può accedere a quest\'area');
    });

    it("check if it returns the error as a string", function() {
        expect(q.toString()).toEqual('123 Accesso vietato: l\'utente non può accedere a quest\'area.');
        console.log(q.toString());
    });

    it("check if it returns the error as a JSON", function() {
        expect(q.toJSON()).toEqual({ "code": 123, "title": "Accesso vietato",
            "message": "l\'utente non può accedere a quest\'area" });
    });
});

