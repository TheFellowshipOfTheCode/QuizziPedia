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

/*Guida su come creare test per i Services (Da cancellare quando finito)
 1) Capire che tipo di oggetti restituisce il Back-End alle varie api del service
 2) Scrive gli oggetti come variabili globali nella sezione "1-Respons object"
 3) Scrivere nella sezione "2-Back-End simulato" l'api del Back-End a cui il service
    tenta di connettersi.
 4) Scrivere nella sezione "3-Test veri e propri" il test vero e proprio

 Nota bene:
 *  httpBackend.whenGET(/Views/).respond(200, ''); serve per risolvere le chiamate alle view indesiderate.
 * link utili sono:
  + http://nathanleclaire.com/blog/2014/04/12/unit-testing-services-in-angularjs-for-fun-and-for-profit/
  + https://docs.angularjs.org/api/ngMock/service/$httpBackend
*/


 "use strict";
 /*1-Respons object*/
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
      AuthService = _AuthService_;
      httpBackend = _$httpBackend_;
    });

    /*2-Back-End simulato*/
    httpBackend.whenGET("/api/it/loggedin").respond(objRes);
    httpBackend.whenPOST("/api/it/signin").respond(function(method, url, data) {
      data=angular.fromJson(data);
      if(data.username.toString()==objRes.username.toString() && data.password.toString()==objRes.password.toString()) {
        return [200, objRes, {}];
      }
      else {
        return [500, {code:1, title:"no login", message:"Login non effettuato"}, {}];
      }
    });

    httpBackend.whenPOST("/api/it/signup").respond(function(method, url, data) {
      return [200, {code:1, title:"Registrazione", message:"Registrazione avvenuta con successo"}, {}];
    });

  });

  /*3-Test veri e propri*/
  it("should give back to the server the authticathed user", function () {
    httpBackend.expectGET("/api/it/loggedin");
    httpBackend.whenGET(/Views/).respond(200, '');
    AuthService.giveMe("it").then(function(result) {
      expect(JSON.stringify(result.data)).toEqual(
        JSON.stringify(objRes)
      );
    }, function(err) {
        console.log(err);
      }
    );
    httpBackend.flush();
  });

  it("should give back to the server the authticathed user after the login operation", function () {
    httpBackend.expectPOST("/api/it/signin");
    httpBackend.whenGET(/Views/).respond(200, '');
    AuthService.signIn("mgranzot", "$2a$08$dxLlHUAATVdByHRXq07Up.W9fk6d5FnFOu6/NuDuWlH6UEY7d16kC", "it").then(function(result) {
      console.log("Passed login test");
      expect(JSON.stringify(result.data)).toEqual(
        JSON.stringify(objRes)
      );
    }, function(err) {
        console.log("No login test");
        expect(JSON.stringify(err.data)).toEqual(
          JSON.stringify({code:1, title:"no login", message:"Login non effettuato"})
        );
      }
    );
    httpBackend.flush();
  });

  it("should create a new user and give back the information or errror", function () {
    httpBackend.expectPOST("/api/it/signup");
    httpBackend.whenGET(/Views/).respond(200, '');
    AuthService.signUp("mgranzot", "provaPass", "matteo.granzotto@isasuperdeveloper.it", "Matteo", "Granzotto", "it").then(function(result) {
      console.log("Passed signUp test");
      expect(JSON.stringify(result.data)).toEqual(
        JSON.stringify({code:1, title:"Registrazione", message:"Registrazione avvenuta con successo"})
      );
    }, function(err) {
        console.log("No signUp test");
        expect(JSON.stringify(err.data)).toEqual(
          JSON.stringify({"code":4,"title":"Errore Registrazione","message":"Username e Email già presente"})
        );
      }
    );
    httpBackend.flush();
  });

});
