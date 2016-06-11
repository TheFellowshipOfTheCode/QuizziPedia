/*******************************************************************************
 * Name: EditorQMLControllerTest;
 * Description: test di unità per la classe;
 * QuizziPedia::Front-End::Tests::EditorQMLController_test;
 * Creation data: 02-06-2016;
 * Author: Matteo Granzotto;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: EditorQMLControllerTest_20160602;
 * Update data: 02-06-2016;
 * Description: Scritto il test;
 * Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

/*Guida su come creare test per i Controller (Da cancellare quando finito)

  Seguire i punti.

  Nota bene:
  * link utile: http://www.bradoncode.com/blog/2015/07/13/unit-test-promises-angualrjs-q/
  * spyOn(searchService, 'search').and.returnValue(deferred.promise);
    quando il Controller utilizza il metodo search di searchService il mock del
    metodo ritorna la promessa risolta.
*/




describe('Testing EditorQMLController', function () {

  /*1-Tutte le variabili che rappresentano le dipendenze che andremo ad inserire nel test con inject */
  var $scope;
  var $q;
  var deferred;
  var deferred2;

  var $rootScope;
  var $location;
  var $routeParams;
  var $httpBackend;
  var filterFilter;

  beforeEach(function() {

    module('QuizziPedia');
    /*2-Fare l'inject di $contorller e di tutte le dipendenze del controller testato*/
    inject(function($controller, _$httpBackend_, _$rootScope_, _$q_, _$location_, QuestionsService, JSONtoQML) {
      $q = _$q_;
      $rootScope= _$rootScope_;
      httpBackend = _$httpBackend_;
      $location = _$location_;
      $scope = _$rootScope_.$new();


      // We use the $q service to create a mock instance of defer
      // Usiamo il service $q per creare un'istanza mock di defer
      deferred = _$q_.defer();
      deferred2 = _$q_.defer();

      // Use a Jasmine Spy to return the deferred promise
      // 3-Usiamo uno spy di Jasmine per ritornare una promessa (Poi in ogni test aggiungo cosa voglio ritornare nella promessa)
      spyOn(QuestionsService, 'getTopics').and.returnValue(deferred.promise);
      spyOn(QuestionsService, 'getQuestion').and.returnValue(deferred2.promise);


      // Init the controller, passing our spy service instance
      // Inizializzamo il controller passandogli l'istanza del service spy creato prima
      $controller('EditorQMLController', {
        $scope: $scope,
        $rootScope: $rootScope,
        $location: $location,
        QuestionsService: QuestionsService,
        JSONtoQML: JSONtoQML
      });
    });

  });

  // 4-Scrivo i test

  //$scope.id non esiste: ottento i topic dal sistema
  it('should get the topic from the system', function () {
    httpBackend.whenGET(/Views/).respond(200, '');
    deferred.resolve({"data":["Architettura"]});
    $rootScope.$apply();
    expect($scope.topics).not.toBe(undefined);
    expect(JSON.stringify($scope.topics)).toBe(JSON.stringify(["Architettura"]));
  });

});


describe('Testing EditorQMLController for the second time', function () {

  /*1-Tutte le variabili che rappresentano le dipendenze che andremo ad inserire nel test con inject */
  var $scope;
  var $q;
  var deferred;
  var deferred2;
  var $rootScope;
  var $location;
  var $routeParams;
  var $httpBackend;
  var filterFilter;
  var $mdDialog;
  var $document;

  beforeEach(function() {

    module('QuizziPedia');
    /*2-Fare l'inject di $contorller e di tutte le dipendenze del controller testato*/
    inject(function($controller, _$httpBackend_, _$rootScope_, _$q_, _$location_, _$mdDialog_,_$document_, QuestionsService, JSONtoQML) {
      $q = _$q_;
      $rootScope= _$rootScope_;
      httpBackend = _$httpBackend_;
      $location = _$location_;
      $scope = _$rootScope_.$new();
      $mdDialog= _$mdDialog_;
      $document = _$document_;


      // We use the $q service to create a mock instance of defer
      // Usiamo il service $q per creare un'istanza mock di defer
      deferred = _$q_.defer();
      deferred2 = _$q_.defer();

      // Use a Jasmine Spy to return the deferred promise
      // 3-Usiamo uno spy di Jasmine per ritornare una promessa (Poi in ogni test aggiungo cosa voglio ritornare nella promessa)
      spyOn(QuestionsService, 'getTopics').and.returnValue(deferred.promise);
      spyOn(QuestionsService, 'getQuestion').and.returnValue(deferred2.promise);


      // Init the controller, passing our spy service instance
      // Inizializzamo il controller passandogli l'istanza del service spy creato prima
      $controller('EditorQMLController', {
        $scope: $scope,
        $rootScope: $rootScope,
        $location: $location,
        $mdDialog: $mdDialog,
        QuestionsService: QuestionsService,
        JSONtoQML: JSONtoQML,
        $routeParams: {idQuestion: "57343f882aad4ba97602fbb4"}
      });

    });

  });

  // 4-Scrivo i test

  //$scope.id esiste: ottento i topic dal sistema assime alla domanda
  it('should get the topic from the system and the question', function () {
    httpBackend.whenGET(/Views/).respond(200, '');
    deferred.resolve({"data":["Architettura"]});
    deferred2.resolve({
      "data":

        { "_id":"57343f882aad4ba97602fbb4",
          "makeWith":"qml","language":"it",
          "author":"572639ee3ad3319e15d36e71",
          "__v":0,
          "correctAnswers":0,
          "totalAnswers":103,
          "level":789,
          "keywords":["Console","Nintendo","Sony","Microsoft"],
          "question":[
            {
              "type":"rispostaMultipla",
              "questionText":"Quale delle seguenti Console è la più vecchia?",
              "answers":[
                {
                  "text":"PS1",
                  "isItRight":"true"
                },
                {
                  "text":"Xbox360",
                  "isItRight":"false"
                },
                {
                  "text":"Nintendo 3DS",
                  "isItRight":"false"
                }
              ]
            }
          ]
        }

    });
    $rootScope.$apply();
    expect($scope.topics).not.toBe(undefined);
    expect(JSON.stringify($scope.topics)).toBe(JSON.stringify(["Architettura"]));
    expect(angular.fromJson($scope.question)).toEqual(angular.fromJson(
      {
          "type": "rispostaMultipla",
          "questionText": "Quale delle seguenti Console è la più vecchia?",
          "answer": [
            {
              "text": "PS1",
              "isItRight": "true"
            },
            {
              "text": "Xbox360",
              "isItRight": "false"
            },
            {
              "text": "Nintendo 3DS",
              "isItRight": "false"
            }
          ],
          "keywords": [
            "Console",
            "Nintendo",
            "Sony",
            "Microsoft"
          ]
     }
    ));

  });


  //inserisco la domanda: promessa risolta
  it('should get the topic from the system', function () {
    httpBackend.whenGET(/Views/).respond(200, '');
    deferred.resolve({"data":["Architettura"]});
    deferred2.resolve({
      "data":

        { "_id":"57343f882aad4ba97602fbb4",
          "makeWith":"qml","language":"it",
          "author":"572639ee3ad3319e15d36e71",
          "__v":0,
          "correctAnswers":0,
          "totalAnswers":103,
          "level":789,
          "keywords":["Console","Nintendo","Sony","Microsoft"],
          "question":[
            {
              "type":"rispostaMultipla",
              "questionText":"Quale delle seguenti Console è la più vecchia?",
              "answers":[
                {
                  "text":"PS1",
                  "isItRight":"true"
                },
                {
                  "text":"Xbox360",
                  "isItRight":"false"
                },
                {
                  "text":"Nintendo 3DS",
                  "isItRight":"false"
                }
              ]
            }
          ]
        }

    });

    var mockElement = {"value":{
        "type": "rispostaMultipla",
        "questionText": "Quale delle seguenti Console è la più vecchia?",
        "answer": [
          {
            "text": "PS1",
            "isItRight": "true"
          },
          {
            "text": "Xbox360",
            "isItRight": "false"
          },
          {
            "text": "Nintendo 3DS",
            "isItRight": "false"
          }
        ],
        "keywords": [
          "Console",
          "Nintendo",
          "Sony",
          "Microsoft"
        ]
   }};
   var document_getElementById = document.getElementById;
   spyOn(document, "getElementById").and.callFake(function(id){
       if(id==="Juiceeditor"){
           return mockElement;
       }
       return document_getElementById(id);
   });

    var selectedTopic= {name: "Architettura"};

    $scope.submitQuestion(selectedTopic);


    $rootScope.$apply();
    expect($scope.topics).not.toBe(undefined);
    expect(JSON.stringify($scope.topics)).toBe(JSON.stringify(["Architettura"]));
    expect(angular.fromJson($scope.question)).toEqual(angular.fromJson(
      {
          "type": "rispostaMultipla",
          "questionText": "Quale delle seguenti Console è la più vecchia?",
          "answer": [
            {
              "text": "PS1",
              "isItRight": "true"
            },
            {
              "text": "Xbox360",
              "isItRight": "false"
            },
            {
              "text": "Nintendo 3DS",
              "isItRight": "false"
            }
          ],
          "keywords": [
            "Console",
            "Nintendo",
            "Sony",
            "Microsoft"
          ]
     }
    ));

  });

});
