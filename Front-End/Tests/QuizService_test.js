/*******************************************************************************
 * Name: QuizServiceTest;
 * Description: test di unità per la classe
 * QuizziPedia::Front-End::Tests::QuizService_test;
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
 * ID: QuizServiceTest_20160602;
 * Update data: 02-06-2016;
 * Description: Scritto il test;
 * Author: Marco Prelaz.
 *-------------------------------------------------------------------------------
 *******************************************************************************/


"use strict";
/*1-Respons object*/
var objRes1 =
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

var objRes2 =
{
    _id: '5741796380586d4a380ffe10',
    title: 'Ingegneria del Software',
    topic: 'Informatica',
    active: true,
    questions: [],
    keywords: []
};

var objRes3 =
    [
        {
            _id: '574165cd0a7ba626375283aa',
            title: 'Analisi Matematica',
            author: '573b0733ade95afa018870e4',
            topic: 'Matematica',
            __v: 1,
            correctAnswers: 0,
            active: true,
            activeUsers: ['573b06bbade95afa018870e3'],
            registeredUsers: [],
            questions: ['5737928e60ea53bc20157d2a'],
            keywords: []
        },
        {
            _id: '574165eb0a7ba626375283ab',
            title: 'Architettura degli Elaboratori',
            author: '573b0733ade95afa018870e4',
            topic: 'Informatica',
            __v: 0,
            correctAnswers: 0,
            active: false,
            activeUsers: [],
            registeredUsers: [],
            questions: ['573647aa6bd910d813b22c7b'],
            keywords: []
        }
    ];

var objRes4 =
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

var objRes5 =
    [
        "57459391b0e492d8009da996",
        "5745988ab0e492d8009da999",
        "57459980b0e492d8009da99a",
        "57459b23b0e492d8009da99b"
    ];

var objRes6 =
{
    _id: '5748532f0932af6c0c0d9045',
    mark: 1.3,
    quiz: '5741796380586d4a380ffe10',
    date: '2016-05-27T14:01:19.301Z',
    author: 'User deleted',
    title: 'Ingegneria del Software - DEMO',
    topic: 'Informatica'
};


describe("QuizService api rest unit test", function () {
    var redditService, httpBackend;


    beforeEach(function() {
        module('QuizziPedia');
        inject(function (_QuizService_, _$httpBackend_) {
            QuizService = _QuizService_;
            httpBackend = _$httpBackend_;
        });

        /*2-Back-End simulato*/
        httpBackend.whenGET("/api/it/topics").respond(objRes1);
        httpBackend.whenPOST("/api/it/userquiz").respond(function(method, url, data) {
            return [200, objRes2, {}];
        });
        httpBackend.whenGET("/api/it/userquiz").respond(objRes3);
        httpBackend.whenGET("/api/it/allquestions/Motori/motoGP").respond(objRes4);
        httpBackend.whenGET("/api/it/userquiz/5741796380586d4a380ffe10").respond(objRes2);
        httpBackend.whenGET("/api/it/userdonequizzes").respond(objRes5);
        httpBackend.whenPOST("/api/it/usersubscribe").respond(function(method, url, data) {
            return [200, {code: 331, title: "Iscrizione Utente Questionario OK", message: "L'utente si è registrato correttamente al questionario"}, {}];
        });
        httpBackend.whenGET("/api/it/usersubscribe").respond(objRes5);
        httpBackend.whenGET("/api/it/userapproved").respond(objRes5);
        httpBackend.whenPOST("/api/it/user/quiz/summary").respond(function(method, url, data) {
            return [200, objRes5, {}];
        });
        httpBackend.whenGET("/api/it/userquizsubscribe/5741796380586d4a380ffe10").respond(objRes5);
        httpBackend.whenPOST("/api/it/userquizactiveUser").respond(function(method, url, data) {
            return [200, {code: 354, title: 'Abilitazione Utente ok', message: 'Abilitazione iscritto avvenuta'}, {}];
        });
        httpBackend.whenPUT("/api/it/quizactive/5741796380586d4a380ffe10").respond(function(method, url, data) {
            return [200, {code: 3003, title: 'Ok Questionario', message: 'Abilitazione avvenuta correttamente'}, {}];
        });

    });

    /*3-Test veri e propri*/
    it("should give back the existing topics", function () {
        httpBackend.expectGET("/api/it/topics");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuizService.getTopic("it").then(function(result) {
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify(objRes1)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should create a quiz", function () {
        httpBackend.expectPOST("/api/it/userquiz");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuizService.createQuestionnaire("Ingegneria del Software", "aferrara", [], "Informatica", [], "it").then(function(result) {
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify(objRes2)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should give back the quizzes of a user", function () {
        httpBackend.expectGET("/api/it/userquiz");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuizService.showAllCreatedQuestionnaires("it").then(function(result) {
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify(objRes3)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should give back the questions of a specific topic with some specific keywords", function () {
        httpBackend.expectGET("/api/it/allquestions/Motori/motoGP");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuizService.showAllQuestions("Motori", "motoGP", "it").then(function(result) {
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify(objRes4)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should give back a specific quiz", function () {
        httpBackend.expectGET("/api/it/userquiz/5741796380586d4a380ffe10");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuizService.getQuiz("it", "5741796380586d4a380ffe10").then(function(result) {
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify(objRes2)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should give back the quizzes done by a user", function () {
        httpBackend.expectGET("/api/it/userdonequizzes");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuizService.getDoneQuestionnaire("it").then(function(result) {
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify(objRes5)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should subscribe a user to a quiz", function () {
        httpBackend.expectPOST("/api/it/usersubscribe");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuizService.subscribeQuestionnaire("5741796380586d4a380ffe10", "it").then(function(result) {
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify({code: 331, title: "Iscrizione Utente Questionario OK", message: "L'utente si è registrato correttamente al questionario"})
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should give back the quizzes the user is subscribed", function () {
        httpBackend.expectGET("/api/it/usersubscribe");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuizService.getSubscribedQuestionnaire("it").then(function(result) {
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify(objRes5)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should give back the quizzes the user is been approved to do", function () {
        httpBackend.expectGET("/api/it/userapproved");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuizService.getApprovedQuestionnaire("it").then(function(result) {
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify(objRes5)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should create a summary of a quiz done by a user", function () {
        httpBackend.expectPOST("/api/it/user/quiz/summary");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuizService.setQuizResult("it", objRes2).then(function(result) {
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify(objRes5)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should give back the users subscribed to a quiz", function () {
        httpBackend.expectGET("/api/it/userquizsubscribe/5741796380586d4a380ffe10");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuizService.getUsersForThisQuestionnaire("5741796380586d4a380ffe10", "it").then(function(result) {
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify(objRes5)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should approve a user to do a quiz", function () {
        httpBackend.expectPOST("/api/it/userquizactiveUser");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuizService.approveSubscribeQuestionnaire("573b0733ade95afa018870e4", "5741796380586d4a380ffe10", "it").then(function(result) {
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify({code: 354, title: 'Abilitazione Utente ok', message: 'Abilitazione iscritto avvenuta'})
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should active a quiz", function () {
        httpBackend.expectPUT("/api/it/quizactive/5741796380586d4a380ffe10");
        httpBackend.whenGET(/Views/).respond(200, '');
        QuizService.startQuiz("5741796380586d4a380ffe10", "it").then(function(result) {
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify({code: 3003, title: 'Ok Questionario', message: 'Abilitazione avvenuta correttamente'})
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });
});
