/*******************************************************************************
 * Name: LangServiceTest;
 * Description: test di unità per la classe
 * QuizziPedia::Front-End::Tests::LangService_test;
 * Creation data: 01-06-2016;
 * Author: Marco Prelaz;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: LangServiceTest_20160601;
 * Update data: 01-06-2016;
 * Description: Scritto il test;
 * Author: Marco Prelaz.
 *-------------------------------------------------------------------------------
 *******************************************************************************/


"use strict";
/*1-Respons object*/
var objRes1 =
{
    "variables": {
        "logIn": "Accedi",
        "signUp": "Registrati",
        "home": "Home",
        "profileManagement": "Gestione profilo",
        "questionnaireManagement": "Gestione questionari",
        "questionsManagement": "Gestione domande",
        "logOut": "Disconnettiti",
        "training": "Modalità allenamento",
        "whatIs": "Che cos'è?",
        "whatIsTraining": "La modalità allenamento ti permette di esercitarti su qualsiasi argomento tu voglia. Premi il pussante per iniziare!",
        "goToTraining": "Inizia l'allenamento",
        "search": "Ricerca"
      }
};

var objRes2 = [ 'English', 'Italiano' ];


var objRes3 =
{
    _id: '57237ec7c80eb66928eb3ca5',
    lang: 'it'
};


describe("LangService api rest unit test", function () {
    var redditService, httpBackend;


    beforeEach(function() {
        module('QuizziPedia');
        inject(function (_LangService_, _$httpBackend_) {
            LangService = _LangService_;
            httpBackend = _$httpBackend_;
        });

        /*2-Back-End simulato*/
        httpBackend.whenGET("/api/it").respond(objRes1);
        httpBackend.whenGET("/api/supported/lang/give/me").respond(objRes2);
        httpBackend.whenGET("/api/supported/lang/give/me/Italiano").respond(objRes3);


    });

    /*3-Test veri e propri*/
    it("should give back the list of keywords in the corrected language", function () {
        httpBackend.expectGET("/api/it");
        httpBackend.whenGET(/Views/).respond(200, '');
        LangService.getKeywords("it").then(function(result) {
                expect(JSON.stringify(result)).toEqual(
                    JSON.stringify(objRes1.variables)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should give back the existing languages", function () {
        httpBackend.expectGET("/api/supported/lang/give/me");
        httpBackend.whenGET(/Views/).respond(200, '');
        LangService.getSupportedLang().then(function(result) {
                expect(JSON.stringify(result)).toEqual(
                    JSON.stringify(objRes2)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should give back the abbreviation of a language", function () {
        httpBackend.expectGET("/api/supported/lang/give/me/Italiano");
        httpBackend.whenGET(/Views/).respond(200, '');
        LangService.getSlang("Italiano").then(function(result) {
                expect(JSON.stringify(result)).toEqual(
                    JSON.stringify(objRes3)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

});
