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
 * Description: Scritti i test;
 * Author: Mattia Varotto.
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


    it('should check that logIn() is being called', function () {
        httpBackend.whenGET(/Views/).respond(200, '');

        spyOn($scope, 'logIn');
        $scope.logIn();
        $location.path('/it/login');
        $routeParams.lang = 'it';
        expect($scope.logIn).toHaveBeenCalled();
        expect($location.path).toHaveBeenCalledWith('/'+$routeParams.lang+'/login');
    });

    it('should check that signUp() is being called', function () {
        httpBackend.whenGET(/Views/).respond(200, '');

        spyOn($scope, 'signUp');
        $scope.signUp();
        $location.path('/it/signup');
        $routeParams.lang = 'it';
        expect($scope.signUp).toHaveBeenCalled();
        expect($location.path).toHaveBeenCalledWith('/'+$routeParams.lang+'/signup');
    });

    it('should check that goToUserPage() is being called', function () {
        httpBackend.whenGET(/Views/).respond(200, '');

        spyOn($scope, 'goToUserPage');
        $scope.goToUserPage();
        $location.path('/it/userpage');
        $routeParams.lang = 'it';
        expect($scope.goToUserPage).toHaveBeenCalled();
        expect($location.path).toHaveBeenCalledWith('/'+$routeParams.lang+'/userpage');
    });

    it('should check that goToUserManagementPage() is being called', function () {
        httpBackend.whenGET(/Views/).respond(200, '');

        spyOn($scope, 'goToUserManagementPage');
        $scope.goToUserManagementPage();
        $location.path('/it/profilemanagement');
        $routeParams.lang = 'it';
        expect($scope.goToUserManagementPage).toHaveBeenCalled();
        expect($location.path).toHaveBeenCalledWith('/'+$routeParams.lang+'/profilemanagement');
    });

    it('should check that goToQuestionsManagementPage() is being called', function () {
        httpBackend.whenGET(/Views/).respond(200, '');

        spyOn($scope, 'goToQuestionsManagementPage');
        $scope.goToQuestionsManagementPage();
        $location.path('/it/questions');
        $routeParams.lang = 'it';
        expect($scope.goToQuestionsManagementPage).toHaveBeenCalled();
        expect($location.path).toHaveBeenCalledWith('/'+$routeParams.lang+'/questions');
    });

    it('should check that goToQuizManagementPage() is being called', function () {
        httpBackend.whenGET(/Views/).respond(200, '');

        spyOn($scope, 'goToQuizManagementPage');
        $scope.goToQuizManagementPage();
        $location.path('/it/questionnairemanagement');
        $routeParams.lang = 'it';
        expect($scope.goToQuizManagementPage).toHaveBeenCalled();
        expect($location.path).toHaveBeenCalledWith('/'+$routeParams.lang+'/questionnairemanagement');
    });

    it('should check that backToHome() is being called', function () {
        httpBackend.whenGET(/Views/).respond(200, '');

        spyOn($scope, 'backToHome');
        $scope.backToHome();
        $location.path('/it/home');
        $rootScope.systemLang = 'it';
        expect($scope.backToHome).toHaveBeenCalled();
        expect($location.path).toHaveBeenCalledWith('/'+$rootScope.systemLang+'/home');
    });
})


