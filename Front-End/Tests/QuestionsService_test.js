/*******************************************************************************
 * Name: QuestionsServiceTest;
 * Description: test di unità per la classe
 * QuizziPedia::Front-End::Tests::QuestionsService_test;
 * Creation data: 02-06-2016;
 * Author: Marco Prelaz;
 * License: MIT.
 ********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: QuestionsServiceTest_20160602;
 * Update data: 02-06-2016;
 * Description: Scritto il test;
 * Author: Marco Prelaz.
 *-------------------------------------------------------------------------------
 *******************************************************************************/


"use strict";
/*1-Respons object*/
var objRes1 =
    [
        { _id: '573c3b3cb1a712e6ecd003d8',
            makeWith: 'qml',
            language: 'it',
            question: [ [Object], [Object] ] },
        { _id: '573db615c54482a1f5a82e55',
            makeWith: 'qml',
            language: 'it',
            question: [ [Object], [Object] ] },
        { _id: '573db90ac54482a1f5a82e56',
            makeWith: 'qml',
            language: 'it',
            question: [ [Object], [Object] ] }
    ];

var objRes2 =
{ _id: '574168240a7ba626375283af',
    makeWith: 'qml',
    language: 'it',
    keywords:
        [ 'UniPD',
            'Ingegneria del Software',
            'Informatica',
            'Programmazione' ],
    question:
        [ { type: 'rispostaMultipla',
            questionText: 'Qual è il numero minimo di appelli da sostenere per superare l\'esame di Programmazione?',
            answers: [Object] } ],
    topic: 'Informatica' };

var objRes3 = [ 'Piloti', 'Formula1', 'motoGP'];


var objRes4 =
    [
        { _id: '572caee0b3f30a0752a6120a', name: 'Patente' },
        { _id: '5732f856dcba0f5dade5d349', name: 'Cinema' },
        { _id: '5732f995dcba0f5dade5d674', name: 'Fisica' },
        { _id: '5732fda1dcba0f5dade5d92f', name: 'Logica' },
        { _id: '5732f884dcba0f5dade5d3ef', name: 'Geografia' },
        { _id: '5732f9d9dcba0f5dade5d699', name: 'Videogiochi' },
        { _id: '5732fe56dcba0f5dade5d9a0', name: 'Animali' },
        { _id: '5732f6f0dcba0f5dade5d1fa', name: 'Sport' },
        { _id: '5732f760dcba0f5dade5d294', name: 'Matematica' },
        { _id: '5732f681dcba0f5dade5d16a', name: 'Storia' },
        { _id: '5732f935dcba0f5dade5d5c0', name: 'Tecnologia' },
        { _id: '5732f6cedcba0f5dade5d1e3', name: 'Informatica' },
        { _id: '5732fe87dcba0f5dade5d9c0', name: 'Motori' }
    ];

var objRes5 =
{
    userLevel: 500
};


describe("QuestionsService api rest unit test", function () {
    var redditService, httpBackend;


    beforeEach(function() {
        module('QuizziPedia');
        inject(function (_QuestionsService_, _$httpBackend_) {
            QuestionsService = _QuestionsService_;
            httpBackend = _$httpBackend_;
        });

        /*2-Back-End simulato*/
        httpBackend.whenPOST("/api/it/userquestion").respond(function(method, url, data) {
            return [200, {code: 90, title: "Ok Domanda", message: "Domanda creata correttamente"}, {}];
        });
        httpBackend.whenPUT("/api/it/userquestion").respond(function(method, url, data) {
            return [200, {code:88, title: "Ok Domanda", message: "Domanda modificata correttamente"}, {}];
        });
        httpBackend.whenPUT("/api/it/userquestion/574168240a7ba626375283af").respond(function(method, url, data) {
            return [200, {code: 84, title: "Ok Domanda", message: "Immagine caricate correttamente"}, {}];
        });
        httpBackend.whenGET("/api/it/userquestion").respond(objRes1);
        httpBackend.whenGET("/api/it/userquestion/574168240a7ba626375283af").respond(objRes2);
        httpBackend.whenPOST("/api/it/user/training/question").respond(function(method, url, data) {
            return [200, objRes2, {}];
        });
        httpBackend.whenPOST("/api/it/topic/keywords").respond(function(method, url, data) {
            return [200, objRes3, {}];
        });
        httpBackend.whenGET("/api/it/topics").respond(objRes4);
        httpBackend.whenPUT("/api/it/user/statistics").respond(function(method, url, data) {
            return [200, objRes5, {}];
        });
        httpBackend.whenPUT("/api/it/topic/statistics").respond(function(method, url, data) {
            return [200, {code:100, title: "Ok", message: "Statistiche argomento aggiornate correttamente"}, {}];
        });
        httpBackend.whenPUT("/api/it/usertraining/questionstatistics").respond(function(method, url, data) {
            return [200, {code:100, title: "Ok Domanda", message: "Statistiche domande aggiornate correttamente"}, {}];
        });

    });

    /*3-Test veri e propri*/
    it("should create a question", function () {
        httpBackend.expectPOST("/api/it/userquestion");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuestionsService.sendQuestion(objRes2, "it", undefined).then(function(result) {
                console.log("Passed createQuestion test");
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify({code: 90, title: "Ok Domanda", message: "Domanda creata correttamente"})
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should modify a question", function () {
        httpBackend.expectPUT("/api/it/userquestion");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuestionsService.sendQuestion(objRes2, "it", "574168240a7ba626375283af").then(function(result) {
                console.log("Passed modifyQuestion test");
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify({code:88, title: "Ok Domanda", message: "Domanda modificata correttamente"})
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    /*it("should upload a image in a question", function () {
        httpBackend.expectPUT("/api/it/userquestion/573db90ac54482a1f5a82e56");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuestionsService.uploadImageQuestion("573db90ac54482a1f5a82e56", "[/Images/collegamentotorre.jpg]", "it").then(function(result) {
                console.log("Passed uploadImageQuestion test");
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify({code: 84, title: "Ok Domanda", message: "Immagine caricate correttamente"})
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });*/

    it("should give back the questions of a user", function () {
        httpBackend.expectGET("/api/it/userquestion");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuestionsService.getUsersQuestions("it").then(function(result) {
            console.log(result.data);
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify(objRes1)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should give back a specific question", function () {
        httpBackend.expectGET("/api/it/userquestion/574168240a7ba626375283af");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuestionsService.getQuestion("574168240a7ba626375283af", "it").then(function(result) {
                console.log(result.data);
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify(objRes2)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should give back the next question of a training", function () {
        httpBackend.expectPOST("/api/it/user/training/question");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuestionsService.getNextQuestion("it", "").then(function(result) {
                console.log("Passed getNextQuestion test");
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify(objRes2)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should give back the keywords of a topic", function () {
        httpBackend.expectPOST("/api/it/topic/keywords");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuestionsService.getKeywords("it", "Motori").then(function(result) {
                console.log("Passed createQuestion test");
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify(objRes3)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should give back the existing topics", function () {
        httpBackend.expectGET("/api/it/topics");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuestionsService.getTopics("it").then(function(result) {
                console.log(result.data);
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify(objRes4)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should update the statistics of a user", function () {
        httpBackend.expectPUT("/api/it/user/statistics");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuestionsService.updateStatisticsUser("it", "500").then(function(result) {
                console.log("Passed modifyQuestion test");
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify(objRes5)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should update the statistics of a topic", function () {
        httpBackend.expectPUT("/api/it/topic/statistics");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuestionsService.updateStatisticsTopic("it", "500").then(function(result) {
                console.log("Passed modifyQuestion test");
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify({code:100, title: "Ok", message: "Statistiche argomento aggiornate correttamente"})
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should update the statistics of a question", function () {
        httpBackend.expectPUT("/api/it/usertraining/questionstatistics");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuestionsService.updateStatisticsQuestion("it", "500").then(function(result) {
                console.log("Passed modifyQuestion test");
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify({code:100, title: "Ok Domanda", message: "Statistiche domande aggiornate correttamente"})
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

});
