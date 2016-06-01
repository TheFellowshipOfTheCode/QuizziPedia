/*******************************************************************************
 * Name: AuthServiceTest;
 * Description: test di unità per la classe
 * QuizziPedia::Front-End::Controllers::AuthService;
 * Relations with other classes:
 * + .
 * Creation data: 26-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: AuthServiceTest_20160526;
 * Update data: 01-05-2016;
 * Description: Scritto il test;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/
/*
 "use strict";

var objRes = {
  "data": {
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
      },
      {
        "topicName": "Patente",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Letteratura Italiana",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Letteratura Straniera",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Filosofia",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Medicina",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Informatica UNIPD",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Biologia",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Cucina",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Cinema",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Economia e Finanza",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Tecnologia",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Fisica",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Elettronica",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Astronomia",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Arte",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Geologia",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Moda",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Politica",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "TV e Spettacolo",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Caccia e Pesca",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Logica",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Motori",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Giurisprudenza e Diritto",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Chimica",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Geometria",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Geografia",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Videogiochi",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Fumetti e Manga",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Animali",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Informatica",
        "totalAnswers": 2,
        "correctAnswers": 2,
        "topicLevel": 521
      },
      {
        "topicName": "Sport",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Musica",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Architettura",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Matematica",
        "totalAnswers": 1,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Psicologia",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      },
      {
        "topicName": "Storia",
        "totalAnswers": 0,
        "correctAnswers": 0,
        "topicLevel": 500
      }
    ],
    "userImg": "Images/Members/573b06bbade95afa018870e3.jpg"
  },
  "status": 200,
  "config": {
    "method": "GET",
    "transformRequest": [
      null
    ],
    "transformResponse": [
      null
    ],
    "url": "/api/it/loggedin",
    "headers": {
      "Accept": "application/json, text/plain, "
    }
  },
  "statusText": "OK"
};


describe("reddit api service", function () {
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


  it("should do something", function () {
    console.log("arrivo qui");
    httpBackend.expectGET("/api/it/loggedin");
    httpBackend.whenGET(/Views/).respond(200, '');
    console.log("ho risposto");
    redditService.giveMe("it").then(function(subreddits) {
      console.log("Entro qui");
      console.log(subreddits);
      expect(JSON.stringify(subreddits)).toEqual(
        JSON.stringify(objRes)
      );
    }, function(err) {
      console.log(err);
    }
    );
    httpBackend.flush();
  });

});*/
