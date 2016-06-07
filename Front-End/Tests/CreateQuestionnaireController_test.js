/*******************************************************************************
 * Name: CreateQuestionnaireControllerTest;
 * Description: test di unità per la classe;
 * QuizziPedia::Front-End::Tests::CreateQuestionnaireController_test;
 * Creation data: 02-06-2016;
 * Author: Matteo Granzotto;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: CreateQuestionnaireControllerTest_20160602;
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




describe('Testing CreateQuestionnaireController', function () {

  /*1-Tutte le variabili che rappresentano le dipendenze che andremo ad inserire nel test con inject */
  var $scope;
  var $q;
  var deferred;

  var $rootScope;
  var $location;
  var $routeParams;
  var $httpBackend;
  var filterFilter;

  beforeEach(function() {

    module('QuizziPedia');
    /*2-Fare l'inject di $contorller e di tutte le dipendenze del controller testato*/
    inject(function($controller, _$httpBackend_, _$rootScope_, _$q_, _$location_, QuizService, _filterFilter_) {
      $q = _$q_;
      $rootScope= _$rootScope_;
      httpBackend = _$httpBackend_;
      $location = _$location_;
      $scope = _$rootScope_.$new();
      filterFilter=_filterFilter_

      // We use the $q service to create a mock instance of defer
      // Usiamo il service $q per creare un'istanza mock di defer
      deferred = _$q_.defer();
      deferred2 = _$q_.defer();

      // Use a Jasmine Spy to return the deferred promise
      // 3-Usiamo uno spy di Jasmine per ritornare una promessa (Poi in ogni test aggiungo cosa voglio ritornare nella promessa)
      spyOn(QuizService, 'getTopic').and.returnValue(deferred.promise);
      spyOn(QuizService, 'showAllQuestions').and.returnValue(deferred2.promise);
      spyOn(QuizService, 'createQuestionnaire').and.returnValue(deferred.promise);


      // Init the controller, passing our spy service instance
      // Inizializzamo il controller passandogli l'istanza del service spy creato prima
      $controller('CreateQuestionnaireController', {
        $scope: $scope,
        $rootScope: $rootScope,
        $location: $location,
        QuizService: QuizService,
        filterFilter: filterFilter
      });
    });

  });

  // 4-Scrivo i test

  //Ottento i topic dal sistema
  it('should get the topic from the system', function () {
    httpBackend.whenGET(/Views/).respond(200, '');
    deferred.resolve({"data":["Architettura"]});
    $rootScope.$apply();
    expect($scope.topics).not.toBe(undefined);
    expect(JSON.stringify($scope.topics)).toBe(JSON.stringify(["Architettura"]));
  });

  //Scarico le domande
  it('should show all the questions', function () {
    httpBackend.whenGET(/Views/).respond(200, '');
    deferred.resolve({"data":["Architettura"]});
    deferred2.resolve(
      {
        "data":
        [
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
        ]
      }
    );
    $scope.showAllQuestions(null,null);
    $rootScope.$apply();
    expect($scope.questions).not.toBe(undefined);
    expect(JSON.stringify($scope.questions[0])).toBe(JSON.stringify(
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
    ));
  });

  //Cerco le domande
  it('should show the questions I searched', function () {
    httpBackend.whenGET(/Views/).respond(200, '');
    deferred.resolve({"data":["Architettura"]});
    $scope.questions=
        [
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
                "type":"veroFalso",
                "answers":[
                  {
                    "text":"Il PC è meglio delle console.",
                    "isItRight":"true"
                  }
                ]
              }
            ]
          },
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
        ];
    $scope.showAllQuestions(null,null);
    $scope.search="seguenti";
    $scope.updateSearch();
    $rootScope.$apply();
    expect($scope.questions).not.toBe(undefined);
    expect(JSON.stringify($scope.filtered[1])).toBe(JSON.stringify(
      {
        "_id":"57343f882aad4ba97602fbb4",
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
    ));
  });


  //Creo un questionario: operazione riuscita
  it('should show all the questions', function () {
    httpBackend.whenGET(/Views/).respond(200, '');
    var quiz = {
        title: "Quiz Test",
        author: "572639ee3ad3319e15d36e71",
        keyword: ["Quiz Test"],
        topic: "Architettura",
        questions: [
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
                "type":"veroFalso",
                "answers":[
                  {
                    "text":"Il PC è meglio delle console.",
                    "isItRight":"true"
                  }
                ]
              }
            ]
          }
        ]
    };
    $scope.createQuestionnaire(quiz);
    deferred.resolve(true);
    $rootScope.$apply();
    expect($scope.createdQuestionnaireTest).toBe(true);
  });

  //Creo un questionario: operazione fallita
  it('should show all the questions', function () {
    httpBackend.whenGET(/Views/).respond(200, '');
    var quiz = {
        title: "Quiz Test",
        author: "572639ee3ad3319e15d36e71",
        keyword: ["Quiz Test"],
        topic: "Architettura",
        questions: [
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
                "type":"veroFalso",
                "answers":[
                  {
                    "text":"Il PC è meglio delle console.",
                    "isItRight":"true"
                  }
                ]
              }
            ]
          }
        ]
    };
    $scope.createQuestionnaire(quiz);
    deferred.reject();
    $rootScope.$apply();
    expect($scope.createdQuestionnaireTest).toBe(false);
  });

  //Aggiungo una domanda
  it('should show all the questions', function () {
    httpBackend.whenGET(/Views/).respond(200, '');
    $scope.questions_selected=[];
    $scope.questions=
        [
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
                "type":"veroFalso",
                "answers":[
                  {
                    "text":"Il PC è meglio delle console.",
                    "isItRight":"true"
                  }
                ]
              }
            ]
          },
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
        ];

    $scope.quiz = {
        title: "Quiz Test",
        author: "572639ee3ad3319e15d36e71",
        keyword: ["Quiz Test"],
        topic: "Architettura",
        questions: []
    };

    var question = { "_id":"57343f882aad4ba97602fbb4",
      "makeWith":"qml","language":"it",
      "author":"572639ee3ad3319e15d36e71",
      "__v":0,
      "correctAnswers":0,
      "totalAnswers":103,
      "level":789,
      "keywords":["Console","Nintendo","Sony","Microsoft"],
      "question":[
        {
          "type":"veroFalso",
          "answers":[
            {
              "text":"Il PC è meglio delle console.",
              "isItRight":"true"
            }
          ]
        }
      ]
    };

    $scope.addQuestion(question);
    deferred.resolve(true);
    $rootScope.$apply();
    expect($scope.questions_selected[0]).toBe(question);
  });



});
