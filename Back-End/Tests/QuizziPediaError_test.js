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
 *******************************************************************************/
"use strict";

let QuizziPediaError = require('../App/Controller/Errors/QuizziPediaError.js');
let q = new QuizziPediaError(123,"asd","qwe");

let expect = require('expect');

describe("QuizziPediaError", function() {
    it("check if it returns the error code", function() {
        expect(q.getCode()).toEqual(123);
    });

    it("check if it returns the error title", function() {
        expect(q.getTitle()).toEqual('asd');
    });

    it("check if it returns the error title", function() {
        expect(q.getMessage()).toEqual('qwe');
    });

    it("check if it returns the error as a string", function() {
        expect(q.toString()).toEqual('123 asd: qwe.');
    });

    /**it("check if it returns the error as a JSON", function() {
        expect(q.toJSON()).toEqual({ "code": 123, "title": "asd", "message": "qwe" });
    });**/
});

