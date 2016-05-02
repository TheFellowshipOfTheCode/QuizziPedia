/*******************************************************************************
* Name: LangModel_test;
* Description: test di unità per la classe
* QuizziPedia::Front-End::Models::LangModel;
* Relations with other classes:
* + AppRun.
* Creation data: 29-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: LangModel_test_20160429;
* Update data: 29-04-2016;
* Description: Scritto il test, superato;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

'use strict';

describe('LangModelTest', function(){
    var LangModel;
    var lang;
    beforeEach(function(){
        module('QuizziPedia');
        inject( function($injector){
            LangModel = $injector.get('LangModel');
        });
        lang = new LangModel("it",{"logIn":"Accedi", "signUp": "Registrazione"});
    });
    it('should get the language of the system', function(){
        var result = lang.getLang();
        expect(result).toEqual("it");
    });
    it('should get the set of the keywords of the system', function(){
        var result = lang.getListOfKeys();
        expect(result).toEqual({"logIn":"Accedi", "signUp": "Registrazione"});
    });
    it('should set the new language of the system', function(){
        lang.setNewLang("en",{"logIn":"Login", "signUp": "Signup"});
        var result1 = lang.getLang();
        var result2 = lang.getListOfKeys();
        expect(result1).toEqual("en");
        expect(result2).toEqual({"logIn":"Login", "signUp": "Signup"});
    });
});
