/*******************************************************************************
 * Name: SearchServiceTest;
 * Description: test di unità per la classe
 * QuizziPedia::Front-End::Tests::SearchService_test;
 * Creation data: 03-06-2016;
 * Author: Marco Prelaz;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: SearchServiceTest_20160603;
 * Update data: 03-06-2016;
 * Description: Scritto il test;
 * Author: Marco Prelaz.
 *-------------------------------------------------------------------------------
 *******************************************************************************/


"use strict";
/*1-Respons object*/
var objRes1 =
    [
        {
            _id: '573b06bbade95afa018870e3',
            name: 'Matteo',
            surname: 'Granzotto',
            username: 'mgranzot'
        },
        {
            _id: '573b09aeade95afa018870e8',
            name: 'Matteo',
            surname: 'Gnoato',
            username: 'mgnoato'
        }
    ];

var objRes2 =
    [
        {
            _id: '573ec3f7c97365bd014e3121',
            title: 'Ingegneria del Software'
        },
        {
            _id: '5741796380586d4a380ffe10',
            title: 'Ingegneria del Software - DEMO'
        }
    ];


describe("QuestionsService api rest unit test", function () {
    var redditService, httpBackend;


    beforeEach(function () {
        module('QuizziPedia');
        inject(function (_SearchService_, _$httpBackend_) {
            SearchService = _SearchService_;
            httpBackend = _$httpBackend_;
        });

        /*2-Back-End simulato*/
        httpBackend.whenGET("/api/it/searchuser/matteo").respond(objRes1);
        httpBackend.whenGET("/api/it/searchquiz/Ingegneria").respond(objRes2);


    });

    /*3-Test veri e propri*/
    it("should give back the users searched", function () {
        httpBackend.expectGET("/api/it/searchuser/matteo");
        httpBackend.whenGET(/Views/).respond(200, '');
        SearchService.searchUsers("matteo", "it").then(function (result) {
                console.log(result.data);
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify(objRes1)
                );
            }, function (err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should give back the quizzes searched", function () {
        httpBackend.expectGET("/api/it/searchquiz/Ingegneria");
        httpBackend.whenGET(/Views/).respond(200, '');
        SearchService.searchQuestionnaire("Ingegneria", "it").then(function (result) {
                console.log(result.data);
                expect(JSON.stringify(result.data)).toEqual(
                    JSON.stringify(objRes2)
                );
            }, function (err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

});