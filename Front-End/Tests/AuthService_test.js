/*******************************************************************************
 * Name: AuthServiceTest;
 * Description: test di unità per la classe;
 * QuizziPedia::Front-End::Tests::AuthService_test;
 * Creation data: 26-05-2016;
 * Author: Matteo Granzotto;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: AuthServiceTest_20160601;
 * Update data: 01-06-2016;
 * Description: Scritto il test;
 * Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

 "use strict";

var objRes =
  {
    "_id": "573b06bbade95afa018870e3",
    "privilege": "pro",
    "name": "Matteo",
    "surname": "Granzotto",
    "email": "granzotto.matteo@gmail.com",
    "username": "mgranzot",
    "password": "$2a$08$dxLlHUAATVdByHRXq07Up.W9fk6d5FnFOu6/NuDuWlH6UEY7d16kC",
    "__v": 2,
    "quizSummaries": [
      "574173850769200c38b09407",
      "574abf2825470f382518cee9"
    ],
    "experienceLevel": 1,
    "statistics": [
      {
        "topicName": "Religione",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      }
    ],
    "userImg": "Images/Members/573b06bbade95afa018870e3.jpg"
  };


describe("AuthService api rest unit test", function () {
  var redditService, httpBackend;


  beforeEach(function() {
    module('QuizziPedia');
    inject(function (_AuthService_, _$httpBackend_) {
      redditService = _AuthService_;
      httpBackend = _$httpBackend_;
    });

    httpBackend.whenGET("/api/it/loggedin").respond(
      objRes
    );

  });


  it("should give back to the server the authticathed user", function () {
    httpBackend.expectGET("/api/it/loggedin");
    httpBackend.whenGET(/Views/).respond(200, '');
    redditService.giveMe("it").then(function(subreddits) {
      expect(JSON.stringify(subreddits.data)).toEqual(
        JSON.stringify(objRes)
      );
    }, function(err) {
        console.log(err);
      }
    );
    httpBackend.flush();
  });

});
