/*******************************************************************************
 * Name: FillingQuestionnaireControllerTest;
 * Description: test di unità per la classe;
 * QuizziPedia::Front-End::Tests::FillingQuestionnaireController_test;
 * Creation data: 02-06-2016;
 * Author: Matteo Granzotto;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: FillingQuestionnaireControllerTest_20160602;
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

describe('Testing FillingQuestionnaireController', function () {

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
    inject(function($controller, _$httpBackend_, _$rootScope_, _$q_, _$location_, _$mdDialog_,_$document_,_$compile_, QuizService, UserDetailsModel) {
      $q = _$q_;
      $rootScope= _$rootScope_;
      httpBackend = _$httpBackend_;
      $location = _$location_;
      $scope = _$rootScope_.$new();
      $mdDialog= _$mdDialog_;
      $document = _$document_;
      $compile = _$compile_;

      $rootScope.userLogged = new UserDetailsModel("", "", "", "", "", "" , "100", "", "");


      // We use the $q service to create a mock instance of defer
      // Usiamo il service $q per creare un'istanza mock di defer
      deferred = _$q_.defer();
      deferred2 = _$q_.defer();

      // Use a Jasmine Spy to return the deferred promise
      // 3-Usiamo uno spy di Jasmine per ritornare una promessa (Poi in ogni test aggiungo cosa voglio ritornare nella promessa)
      spyOn(QuizService, 'getQuiz').and.returnValue(deferred.promise);
      spyOn($mdDialog, 'show').and.returnValue(deferred2.promise);


      // Init the controller, passing our spy service instance
      // Inizializzamo il controller passandogli l'istanza del service spy creato prima
      $controller('FillingQuestionnaireController', {
        $scope: $scope,
        $rootScope: $rootScope,
        $location: $location,
        $mdDialog: $mdDialog,
        $compile: $compile,
        QuizService: QuizService,
        UserDetailsModel: UserDetailsModel,
        $routeParams: {idQuestion: "57343f882aad4ba97602fbb4"}
      });

    });

  });

  // 4-Scrivo i test

  //download del questionario
  it('should download the quiz', function () {
    httpBackend.whenGET(/Views/).respond(200, '');

    // Risolvo promesse
    deferred.resolve(
      {
        "data":
          {
            "_id":"5741796380586d4a380ffe10",
            "title":"Ingegneria del Software - DEMO",
            "topic":"Informatica","active":true,
            "questions":[
              {
                "_id":"57457953ebd3d455563fc906",
                "makeWith":"qml",
                "language":"it",
                "keywords":["Prova"],
                "question":[
                  {
                    "type":"collegamento",
                    "image":"/Images/veroFalso/prova.png",
                    "questionText":"Unisci questi nemici storici.",
                    "answers":[
                      {"url1":"/Images/collegamento/D2_1.jpg","url2":"/Images/collegamento/D2_5.png"},
                      {"url1":"/Images/collegamento/D2_2.jpg","text2":"olio"}
                    ]
                  }
                ]
              }
              ],
            "keywords": ["Prova"]
          }
        }
    );
    /*deferred2.resolve({
      "data":
        {   }
    });*/

    //variabili
    $scope.questionNumberOnQuiz = 0;
    $scope.quizIsLoaded = true;
    $scope.startQuiz= false;
    $scope.noStart= false;
    $scope.started= false;
    $scope.quizIsLoaded = true;
    $scope.quizIsFinished = false;
    $scope.noAuth = false;
    $scope.downloadQuiz();
    $rootScope.$apply();

    expect($scope.quiz).not.toBe(undefined);
    expect(JSON.stringify($scope.quiz.getQuestions())).toBe(JSON.stringify(
      [
        {
        "_id":"57457953ebd3d455563fc906",
        "makeWith":"qml",
        "language":"it",
        "keywords":["Prova"],
        "question":[
          {
            "type":"collegamento",
            "image":"/Images/veroFalso/prova.png",
            "questionText":"Unisci questi nemici storici.",
            "answers":[
              {"url1":"/Images/collegamento/D2_1.jpg","url2":"/Images/collegamento/D2_5.png"},
              {"url1":"/Images/collegamento/D2_2.jpg","text2":"olio"}
            ]
          }
        ]
      }
     ]
    ));


  });

  //prossima domanda
  it('should get the next question', function () {
    httpBackend.whenGET(/Views/).respond(200, '');

    // Risolvo promesse
    deferred.resolve(
      {
        "data":
          {
            "_id":"5741796380586d4a380ffe10",
            "title":"Ingegneria del Software - DEMO",
            "topic":"Informatica","active":true,
            "questions":[
              {
                "_id":"57457953ebd3d455563fc906",
                "makeWith":"qml",
                "language":"it",
                "keywords":["Prova"],
                "question":[
                  {
                    "type":"collegamento",
                    "image":"/Images/veroFalso/prova.png",
                    "questionText":"Unisci questi nemici storici.",
                    "answers":[
                      {"url1":"/Images/collegamento/D2_1.jpg","url2":"/Images/collegamento/D2_5.png"},
                      {"url1":"/Images/collegamento/D2_2.jpg","text2":"olio"}
                    ]
                  }
                ]
              },
              {
                "_id":"57457953ebd3d455563fc906",
                "makeWith":"qml",
                "language":"it",
                "keywords":["Prova"],
                "question":[
                  {
                    "type":"collegamento",
                    "image":"/Images/veroFalso/prova.png",
                    "questionText":"Unisci questi amici storici.",
                    "answers":[
                      {"url1":"/Images/collegamento/D2_1.jpg","url2":"/Images/collegamento/D2_5.png"},
                      {"url1":"/Images/collegamento/D2_2.jpg","text2":"olio"}
                    ]
                  }
                ]
              }
              ],
            "keywords": ["Prova"]
          }
        }
    );
    deferred2.resolve();

    //variabili
    $scope.questionNumberOnQuiz = 0;
    $scope.quizIsLoaded = true;
    $scope.startQuiz= false;
    $scope.noStart= false;
    $scope.started= false;
    $scope.quizIsLoaded = true;
    $scope.quizIsFinished = false;
    $scope.noAuth = false;
    $rootScope.listOfKeys={};
    $rootScope.listOfKeys.attention="";
    $rootScope.listOfKeys.areYouSureToGoOn="";
    $rootScope.listOfKeys.yesGoOn="";
    $rootScope.listOfKeys.dontGoOn="";
    var html = '<div class="scrollable"></div>';
    elem = angular.element(html);  // turn html into an element object
    $compile(elem)($scope); // compile the html
    $scope.$digest();  // update the scope
    $scope.downloadQuiz();
    $scope.nextQuestion();
    $rootScope.$apply();
    expect($scope.quiz).not.toBe(undefined);
    expect($scope.questionNumberOnQuiz).toBe(1);


  });

});
