/*******************************************************************************
 * Name: ErrorInfoModelTest;
 * Description: test di unità per la classe
 * QuizziPedia::Front-End::Models::ErrorInfoModel;
 * Relations with other classes:
 * + .
 * Creation data: 29-04-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: ErrorInfoModel_20160429;
 * Update data: 29-04-2016;
 * Description: Scritto il test, superato;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

'use strict';

describe('ErrorInfoModelTest', function(){
    var ErrorInfoModel;
    var e;

    beforeEach(function(){
        module('QuizziPedia');
        inject( function($injector){
            ErrorInfoModel = $injector.get('ErrorInfoModel');
        });
        e = new ErrorInfoModel("1", "messaggio errore numero 1", "titolo errore numero 1");
    });
    it('should get the code of the error', function(){
        var result = e.getCode();
        expect(result).toEqual("1");
    });
    it('should get the message of the error', function(){
        var result = e.getMessage();
        expect(result).toEqual( "messaggio errore numero 1");
    });
    it('should get the title of the error', function(){
        var result = e.getTitle();
        expect(result).toEqual( "titolo errore numero 1");
    });

});


