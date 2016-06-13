/*******************************************************************************
 * Name: HomeController_test;
 * Description: test di unità per la classe
 * QuizziPedia::Front-End::Controllers::HomeController;
 * Relations with other classes:
 * + .
 * Creation data: 06-06-2016;
 * Author: Mattia Varotto;
 * License: MIT.
 ********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: HomeController_test_20160606;
 * Update data: 06-06-2016;
 * Description: Scritti i test;
 * Author: Mattia Varotto.
 *-------------------------------------------------------------------------------
 *******************************************************************************/


describe('Testing HomeController', function() {
    var $scope;
    var $q;
    var deferred;
    var $rootScope;
    var $location;
    var $routeParams;
    var $httpBackend;
    var controller;

    beforeEach(function() {

        module('QuizziPedia');

        inject(function($controller, _$httpBackend_, _$routeParams_, _$rootScope_, _$q_, _$location_, _$compile_) {
            $q = _$q_;
            $rootScope= _$rootScope_;
            httpBackend = _$httpBackend_;
            $location = _$location_;
            $routeParams = _$routeParams_;
            $scope = _$rootScope_.$new();
            $compile= _$compile_;

            deferred = _$q_.defer();

            spyOn(document, 'getElementById').and.returnValue({value:"ricercatest"});

            controller = $controller('HomeController', {
                $scope: $scope,
                $compile: $compile,
                $rootScope: $rootScope,
                $routeParams: {lang:"it"},
                $location: $location
            });

        })
    });


    it('should check that trainingMode() is being called', function () {
        httpBackend.whenGET(/Views/).respond(200, '');
        spyOn($location, 'path');
        $scope.trainingMode();
        expect($location.path).toHaveBeenCalledWith('/it/training');
    });

    it('should check that search() is being called', function () {
        httpBackend.whenGET(/Views/).respond(200, '');
        spyOn($location, 'path');
        $scope.search();
        expect($location.path).toHaveBeenCalledWith('/it/search/ricercatest');
    });

})
