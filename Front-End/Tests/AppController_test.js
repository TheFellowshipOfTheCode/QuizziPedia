/*******************************************************************************
 * Name: AppControllerTest;
 * Description: test di unità per la classe;
 * QuizziPedia::Front-End::Tests::AppController_test;
 * Creation data: 02-06-2016;
 * Author: Matteo Granzotto;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: AppControllerTest_20160602;
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




describe('Testing AppController', function () {

  /*1-Tutte le variabili che rappresentano le dipendenze che andremo ad inserire nel test con inject */
  var $scope;
  var $q;
  var deferred;

  var $rootScope;
  var $location;
  var $routeParams;
  var $httpBackend;

  beforeEach(function() {

    module('QuizziPedia');
    /*2-Fare l'inject di $contorller e di tutte le dipendenze del controller testato*/
    inject(function($controller, _$httpBackend_, _$rootScope_, _$q_, _$location_, AuthService, LangService) {
      $q = _$q_;
      $rootScope= _$rootScope_;
      httpBackend = _$httpBackend_;
      $location = _$location_;
      // In questo caso utilizzo $rootScope
      // $scope = _$rootScope_.$new(); // Creo un nuovo $scope

      // We use the $q service to create a mock instance of defer
      // Usiamo il service $q per creare un'istanza mock di defer
      deferred = _$q_.defer();

      // Use a Jasmine Spy to return the deferred promise
      // 3-Usiamo uno spy di Jasmine per ritornare una promessa (Poi in ogni test aggiungo cosa voglio ritornare nella promessa)
      spyOn(AuthService, 'giveMe').and.returnValue(deferred.promise);
      spyOn(AuthService, 'isLogged').and.returnValue("true");
      spyOn(LangService, 'getKeywords').and.returnValue(deferred.promise);
      spyOn(LangService, 'getSupportedLang').and.returnValue(deferred.promise);
      //spyOn(MenuBarModel, 'getDirectives').and.returnValue();


      // Init the controller, passing our spy service instance
      // Inizializzamo il controller passandogli l'istanza del service spy creato prima
      $controller('AppController', {
        $rootScope: $rootScope,
        $location: $location,
        AuthService: AuthService,
        LangService: LangService
      });
    });

  });

  // 4-Scrivo i test
  /* +) Metodo di esempio ******************************************************

  //Test che per un determinato metodo risolve la promessa
  it('should resolve promise for the method ', function () {
    // Necessario per far si che le chiamate a pagine html sia dato come ok e non esca errore
    httpBackend.whenGET(/Views/).respond(200, '');

    // Setup the data we wish to return for the .then function in the controller
    // Imposto i dati che ci aguriamo vengano ritornati nella funzione .the nel controller
    deferred.resolve([{ id: 1 }, { id: 2 }]);

    // We have to call apply for this to work
    // Dobbiamo chiamare la funzione apply di $scope in modo che il mock della promessa venga effettivamente creato e funzioni
    $scope.$apply();

    // Since we called apply, not we can perform our assertions
    // Da quando abbiamo chiamato apply, possiamo eseguire le righe di codice che controllano i risultati aspettati
    expect($scope.results).not.toBe(undefined);
    expect($scope.error).toBe(undefined);
  });

  //Test che per un determinato metodo non risolve la promessa
  it('should reject promise for the method ', function () {
    // Necessario per far si che le chiamate a pagine html sia dato come ok e non esca errore
    httpBackend.whenGET(/Views/).respond(200, '');

    // This will call the .catch function in the controller
    // Questo chiamerà la funzione .catch del controller. Nel nostro caso il ramo di errore della chiamata then al metodo del servizio.
    deferred.reject();

    // We have to call apply for this to work
    // Dobbiamo chiamare la funzione apply di $scope in modo che il mock della promessa venga effettivamente creato e funzioni
    $scope.$apply();

    // Since we called apply, not we can perform our assertions
    // Da quando abbiamo chiamato apply, possiamo eseguire le righe di codice che controllano i risultati aspettati
    expect($scope.results).toBe(undefined);
    expect($scope.error).toBe('There has been an error!');
  });
  */

  //A) Controllo che l'utente sia loggato *************************************//

  //Test che per un determinato metodo risolve la promessa
  it('should resolve promise when an user is logged', function () {
    httpBackend.whenGET(/Views/).respond(200, '');
    deferred.resolve({
        "data":{
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
      }
    });
    $rootScope.$apply();
    expect($rootScope.userLogged).not.toBe(undefined);
    expect($rootScope.userLogged.getName()).toBe("Matteo");
  });

  //Test che per un determinato metodo non risolve la promessa
  it('should reject promise when a user is not logged and change location', function () {
    httpBackend.whenGET(/Views/).respond(200, '');
    deferred.reject();
    $rootScope.$apply();
    expect($rootScope.error).not.toBe(undefined);
  });

});

/*Secondo test su AppController*/

describe('Testing AppController for the second time', function () {

  var $scope;
  var $q;
  var deferred;

  var $rootScope;
  var $location;
  var $routeParams;
  var $httpBackend;

  beforeEach(function() {

    module('QuizziPedia');
    inject(function($controller, _$httpBackend_, _$rootScope_, _$q_, _$location_, AuthService, LangService) {
      $q = _$q_;
      $rootScope= _$rootScope_;
      httpBackend = _$httpBackend_;
      $location = _$location_;

      deferred = _$q_.defer();

      spyOn(AuthService, 'giveMe').and.returnValue(deferred.promise);
      spyOn(AuthService, 'isLogged').and.returnValue("false");
      spyOn(LangService, 'getKeywords').and.returnValue(deferred.promise);
      spyOn(LangService, 'getSupportedLang').and.returnValue(deferred.promise);

      $controller('AppController', {
        $rootScope: $rootScope,
        $location: $location,
        AuthService: AuthService,
        LangService: LangService
      });
    });

  });

  //A) Controllo che l'utente non sia loggato *********************************//

  it('should test when there is not an user', function () {
    httpBackend.whenGET(/Views/).respond(200, '');
    $rootScope.$apply();
    expect($rootScope.testPassed).toBe(true);
  });





});
