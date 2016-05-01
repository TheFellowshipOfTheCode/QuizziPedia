/*******************************************************************************
 * Name: ErrorModel_test
 * Description: classe che contiene i test per la classe ErrorModel.
 * Relations with other classes:
 * + ErrorModel
 * Creation data: 28-04-2016
 * Author: Mattia Varotto
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: ErrorModel_test_20160428
 * Update data: 28-04-2016
 * Description: aggiunti i test per i metodi getCode(), getTitle() e getMessage()
 * del modello.
 * Autore: Mattia Varotto
 *-------------------------------------------------------------------------------
 *******************************************************************************/
"use strict";
let expect = require('expect');

let ErrorModel = require('../App/Model/ErrorModel.js');

let errormodel = new ErrorModel();
errormodel.errorCode = 404;
errormodel.errorTitle = 'non trovato';
errormodel.errorMessage = 'la pagina cercata non è stata trovata';

describe("ErrorModel", function() {
    it("check if it returns the error code", function() {
        expect(errormodel.getCode()).toEqual(404);
    });

    it("check if it returns the error title", function() {
        expect(errormodel.getTitle()).toEqual('non trovato');
    });

    it("check if it returns the error message", function() {
        expect(errormodel.getMessage()).toEqual('la pagina cercata non è stata trovata');
    });
});