/*******************************************************************************
 * Name: TrainingControllerTest;
 * Description: test di unità per la classe;
 * QuizziPedia::Front-End::Tests::TrainingController_test;
 * Creation data: 02-06-2016;
 * Author: Matteo Granzotto;
 * License: MIT.
 ********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: TrainingControllerTest_20160602;
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

describe('Testing TrainingController', function () {

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
    inject(function($controller, _$httpBackend_, _$rootScope_, _$q_, _$location_, _$mdDialog_,_$document_,_$compile_, QuestionsService, UserDetailsModel, TrainingModeModel) {
      $q = _$q_;
      $rootScope= _$rootScope_;
      httpBackend = _$httpBackend_;
      $location = _$location_;
      $scope = _$rootScope_.$new();
      $mdDialog= _$mdDialog_;
      $document = _$document_;
      $compile = _$compile_;

      //$rootScope.userLogged = new UserDetailsModel("", "", "", "", "", "" , "100", "", "");


      // We use the $q service to create a mock instance of defer
      // Usiamo il service $q per creare un'istanza mock di defer
      deferred = _$q_.defer();
      deferred2 = _$q_.defer();

      // Use a Jasmine Spy to return the deferred promise
      // 3-Usiamo uno spy di Jasmine per ritornare una promessa (Poi in ogni test aggiungo cosa voglio ritornare nella promessa)
      spyOn(QuizService, 'getQuiz').and.returnValue(deferred.promise);
      spyOn($mdDialog, 'show').and.returnValue(deferred2.promise);
      spyOn(QuestionsService, 'getTopics').and.returnValue(deferred.promise);
      spyOn(window, 'onbeforeunload').and.returnValue(null);


      // Init the controller, passing our spy service instance
      // Inizializzamo il controller passandogli l'istanza del service spy creato prima
      $controller('TrainingController', {
        $scope: $scope,
        $rootScope: $rootScope,
        $location: $location,
        $mdDialog: $mdDialog,
        $compile: $compile,
        QuestionsService: QuestionsService,
        UserDetailsModel: UserDetailsModel,
        TrainingModeModel: TrainingModeModel,
        $routeParams: {lang: "it"}
      });

    });

  });

  // 4-Scrivo i test

  //creazione dell'allenamento
  it('should create the training', function () {
    httpBackend.whenGET(/Views/).respond(200, '');

    // Risolvo promesse
    deferred.resolve({data:["Architettura"]});

    //variabili
    $scope.traininIsFinished = false;
    $scope.trainingIsLoaded = true;
    $scope.iQ = false;
    $scope.questionNumberOnTraining = 1;
    $scope.numberOfQuestionsOnTraining = {num: 1 };
    $scope.selectedTopicOnMind = "Architettura";
    $scope.readonly = false;
    $scope.selectedItem = null;
    $scope.searchText = null;
    $scope.autocompleteDemoRequireMatch = true;
    $scope.selectedKeywords = [];
    $scope.problemWithTopic = false;
    $scope.stopToGoBack = false;
    $scope.temporaryLevel = 500;

    $rootScope.listOfKeys={}
    $rootScope.listOfKeys.doYouWannaGoBakLang="vuoi tornare indietro?";

    var argument="Architettura";
    var keywords="Prova";
    var restart=false;

    $scope.starTraining(argument, keywords, restart);
    $scope.stopToGoBack = false;
    window.onbeforeunload=null;
    $scope.$on('$locationChangeStart', null);
    $rootScope.$apply();

    expect($scope.training).not.toBe(undefined);

  });


  //settaggio domande infite
  it('should set infiite question', function () {
    httpBackend.whenGET(/Views/).respond(200, '');

    // Risolvo promesse
    deferred.resolve({data:["Architettura"]});

    //variabili
    $scope.traininIsFinished = false;
    $scope.trainingIsLoaded = true;
    $scope.iQ = false;
    $scope.questionNumberOnTraining = 1;
    $scope.numberOfQuestionsOnTraining = {num: 1 };
    $scope.selectedTopicOnMind = "Architettura";
    $scope.readonly = false;
    $scope.selectedItem = null;
    $scope.searchText = null;
    $scope.autocompleteDemoRequireMatch = true;
    $scope.selectedKeywords = [];
    $scope.problemWithTopic = false;
    $scope.stopToGoBack = false;
    $scope.temporaryLevel = 500;

    $rootScope.listOfKeys={}
    $rootScope.listOfKeys.doYouWannaGoBakLang="vuoi tornare indietro?";

    $scope.setInfiniteQuestion(true);
    $scope.stopToGoBack = false;
    window.onbeforeunload=null;
    $scope.$on('$locationChangeStart', null);

    $rootScope.$apply();


    expect($scope.iQ).toBe(true);

  });

  //restart dell'allenamento
  it('should create the training', function () {
    httpBackend.whenGET(/Views/).respond(200, '');

    // Risolvo promesse
    deferred.resolve({data:["Architettura"]});

    //variabili
    $scope.traininIsFinished = false;
    $scope.trainingIsLoaded = true;
    $scope.iQ = false;
    $scope.questionNumberOnTraining = 1;
    $scope.numberOfQuestionsOnTraining = {num: 1 };
    $scope.selectedTopicOnMind = "Architettura";
    $scope.readonly = false;
    $scope.selectedItem = null;
    $scope.searchText = null;
    $scope.autocompleteDemoRequireMatch = true;
    $scope.selectedKeywords = [];
    $scope.problemWithTopic = false;
    $scope.stopToGoBack = false;
    $scope.temporaryLevel = 500;

    $rootScope.listOfKeys={}
    $rootScope.listOfKeys.doYouWannaGoBakLang="vuoi tornare indietro?";

    var argument="Architettura";
    var keywords="Prova";
    var restart=false;

    $scope.starTraining(argument, keywords, restart);
    $scope.endTraining();
    $scope.resetTraining();
    $scope.stopToGoBack = false;
    window.onbeforeunload=null;
    $scope.$on('$locationChangeStart', null);

    $rootScope.$apply();

    expect($scope.training).not.toBe(undefined);

  });

  //nuova domanda
  it('should download the new question', function () {
    httpBackend.whenGET(/Views/).respond(200, '');

    // Risolvo promesse
    deferred.resolve({data:["Architettura"]});
    deferred2.resolve();

    //variabili
    $scope.traininIsFinished = false;
    $scope.trainingIsLoaded = true;
    $scope.iQ = false;
    $scope.questionNumberOnTraining = 1;
    $scope.numberOfQuestionsOnTraining = {num: 1 };
    $scope.selectedTopicOnMind = "Architettura";
    $scope.readonly = false;
    $scope.selectedItem = null;
    $scope.searchText = null;
    $scope.autocompleteDemoRequireMatch = true;
    $scope.selectedKeywords = [];
    $scope.problemWithTopic = false;
    $scope.stopToGoBack = false;
    $scope.temporaryLevel = 500;

    $rootScope.listOfKeys={}
    $rootScope.listOfKeys.doYouWannaGoBakLang="vuoi tornare indietro?";

    var argument="Architettura";
    var keywords="Prova";
    var restart=false;

    $scope.setInfiniteQuestion(true);
    $scope.starTraining(argument, keywords, restart);
    $scope.newQuestion();
    $scope.stopToGoBack = false;
    window.onbeforeunload=null;
    $rootScope.$on('$locationChangeStart', null);
    var called=false;
    $rootScope.$on('loadNewQuestion', function (event, next, current) {
            called=true;
    });
    $rootScope.$apply();

    expect(called).toBe(true);

  });

  //finire il questionario
  it('should stop the training', function () {
    httpBackend.whenGET(/Views/).respond(200, '');

    // Risolvo promesse
    deferred.resolve({data:["Architettura"]});
    deferred2.resolve();

    //variabili
    $scope.traininIsFinished = false;
    $scope.trainingIsLoaded = true;
    $scope.iQ = false;
    $scope.questionNumberOnTraining = 1;
    $scope.numberOfQuestionsOnTraining = {num: 1 };
    $scope.selectedTopicOnMind = "Architettura";
    $scope.readonly = false;
    $scope.selectedItem = null;
    $scope.searchText = null;
    $scope.autocompleteDemoRequireMatch = true;
    $scope.selectedKeywords = [];
    $scope.problemWithTopic = false;
    $scope.stopToGoBack = false;
    $scope.temporaryLevel = 500;

    $rootScope.listOfKeys={}
    $rootScope.listOfKeys.doYouWannaGoBakLang="vuoi tornare indietro?";

    var argument="Architettura";
    var keywords="Prova";
    var restart=false;

    $scope.setInfiniteQuestion(true);
    $scope.starTraining(argument, keywords, restart);
    $scope.endTraining();
    $scope.stopToGoBack = false;
    window.onbeforeunload=null;
    $rootScope.$on('$locationChangeStart', null);
    var called=false;

    $rootScope.$apply();

    expect($scope.traininIsFinished).toBe(true);

  });

  //ritorno alle impostazioni dopo la fine di un allenamento
  it('should back to the training set up after the end', function () {
    httpBackend.whenGET(/Views/).respond(200, '');

    // Risolvo promesse
    deferred.resolve({data:["Architettura"]});

    //variabili
    $scope.traininIsFinished = false;
    $scope.trainingIsLoaded = true;
    $scope.iQ = false;
    $scope.questionNumberOnTraining = 1;
    $scope.numberOfQuestionsOnTraining = {num: 1 };
    $scope.selectedTopicOnMind = "Architettura";
    $scope.readonly = false;
    $scope.selectedItem = null;
    $scope.searchText = null;
    $scope.autocompleteDemoRequireMatch = true;
    $scope.selectedKeywords = [];
    $scope.problemWithTopic = false;
    $scope.stopToGoBack = false;
    $scope.temporaryLevel = 500;

    $rootScope.listOfKeys={}
    $rootScope.listOfKeys.doYouWannaGoBakLang="vuoi tornare indietro?";

    var argument="Architettura";
    var keywords="Prova";
    var restart=false;

    $scope.starTraining(argument, keywords, restart);
    $scope.endTraining();
    $scope.goBackToSetUp();
    $scope.stopToGoBack = false;
    window.onbeforeunload=null;
    $scope.$on('$locationChangeStart', null);

    $rootScope.$apply();

    expect($scope.training).toBe(undefined);

  });


});
