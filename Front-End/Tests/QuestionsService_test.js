/*******************************************************************************
 * Name: QuestionsServiceTest;
 * Description: test di unità per la classe
 * QuizziPedia::Front-End::Tests::QuestionsService_test;
 * Creation data: 02-06-2016;
 * Author: Marco Prelaz;
 * License: MIT.
 ********************************************************************************
 * Updates history
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
{

};

var objRes2 =
{

};

var objRes3 =
{

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
        httpBackend.whenPUT("/api/it/userquestion").respond(objRes2);
        httpBackend.whenPUT("/api/it/userquestion/574168240a7ba626375283af").respond(objRes3);
        httpBackend.whenGET("/api/it/userquestion").respond(objRes1);
        httpBackend.whenGET("/api/it/userquestion/574168240a7ba626375283af").respond(objRes3);
        httpBackend.whenPOST("/api/it/user/training/question").respond(objRes1);
        httpBackend.whenPOST("/api/it/topic/keywords").respond(objRes1);
        httpBackend.whenGET("/api/it/topics").respond(objRes1);
        httpBackend.whenPUT("/api/it/user/statistics").respond(objRes2);
        httpBackend.whenPUT("/api/it/topic/statistics").respond(objRes2);
        httpBackend.whenPUT("/api/it/usertraining/questionstatistics").respond(objRes2);

    });

    /*3-Test veri e propri*/


});
