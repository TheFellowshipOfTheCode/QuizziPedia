/*******************************************************************************
 * Name: MenuBarController_test;
 * Description: test di unità per la classe
 * QuizziPedia::Front-End::Controllers::MenuBarController;
 * Relations with other classes:
 * + .
 * Creation data: 06-06-2016;
 * Author: Mattia Varotto;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: MenuBarController_test_20160606;
 * Update data: 06-06-2016;
 * Description: Scritto il test;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/


describe('Testing MenuBarController', function() {
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

        inject(function($controller, _$httpBackend_, _$routeParams_, _$rootScope_, _$q_, _$location_, AuthService) {
            $q = _$q_;
            $rootScope= _$rootScope_;
            httpBackend = _$httpBackend_;
            $location = _$location_;
            $routeParams = _$routeParams_;
            $scope = _$rootScope_.$new();

            deferred = _$q_.defer();

            spyOn($location, 'path');

            controller = $controller('MenuBarController', {
                $scope: $scope,
                $rootScope: $rootScope,
                $routeParams: $routeParams,
                $location: $location,
                AuthService: AuthService
            });

        })
    })


    it('should redirect to the login page', function () {
        httpBackend.whenGET(/Views/).respond(200, '');

        spyOn($scope, 'logIn');
        $scope.logIn();
        $location.path('/it/login');
        $routeParams.lang = 'it';
        expect($scope.logIn).toHaveBeenCalled();
        expect($location.path).toHaveBeenCalledWith('/'+$routeParams.lang+'/login');
    });

    it('should redirect to the signup page', function () {
        httpBackend.whenGET(/Views/).respond(200, '');

        spyOn($scope, 'signUp');
        $scope.signUp();
        $location.path('/it/signup');
        $routeParams.lang = 'it';
        expect($scope.signUp).toHaveBeenCalled();
        expect($location.path).toHaveBeenCalledWith('/'+$routeParams.lang+'/signup');
    });
})


