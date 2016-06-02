/*******************************************************************************
 * Name: LangControllerTest;
 * Description: test di unità per la classe;
 * QuizziPedia::Front-End::Tests::LangController_test;
 * Creation data: 02-06-2016;
 * Author: Matteo Granzotto;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: LangControllerTest_20160602;
 * Update data: 02-06-2016;
 * Description: Scritto il test;
 * Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 *******************************************************************************/


describe('Testing LangController', function () {

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
      $scope= _$rootScope_.$new();

      // We use the $q service to create a mock instance of defer
      // Usiamo il service $q per creare un'istanza mock di defer
      deferred = _$q_.defer();

      // Use a Jasmine Spy to return the deferred promise
      // 3-Usiamo uno spy di Jasmine per ritornare una promessa (Poi in ogni test aggiungo cosa voglio ritornare nella promessa)
      spyOn(LangService, 'getSlang').and.returnValue(deferred.promise);
      spyOn($location, 'path').and.returnValue('/it/home');

      // Init the controller, passing our spy service instance
      // Inizializzamo il controller passandogli l'istanza del service spy creato prima
      $controller('LangController', {
        $scope: $scope,
        $rootScope: $rootScope,
        $location: $location,
        LangService: LangService
      });
    });

  });

  // 4-Scrivo i test

  //A) Vado alla lingua scelta ***********************************************//

  //Test che per un determinato metodo risolve la promessa
  it('should resolve promise when an user is logged', function () {
    httpBackend.whenGET(/Views/).respond(200, '');
    deferred.resolve([{"lang":"it"}]);
    $scope.goToNewLang();
    $rootScope.$apply();
    expect($rootScope.isDownloading).toBe(false);
    expect($location.path).toHaveBeenCalledWith("/it/home");
  });

});
