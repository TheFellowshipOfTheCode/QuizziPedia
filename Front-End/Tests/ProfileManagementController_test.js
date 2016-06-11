/*******************************************************************************
 * Name: ProfileManagementController_test;
 * Description: test di unità per la classe
 * QuizziPedia::Front-End::Controllers::ProfileManagementController;
 * Relations with other classes:
 * + .
 * Creation data: 07-06-2016;
 * Author: Mattia Varotto;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: ProfileManagementController_test_20160607;
 * Update data: 07-06-2016;
 * Description: Scritti i test;
 * Author: Mattia Varotto.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

describe('Testing ProfileManagementController', function() {
    var $scope;
    var $q;
    var deferred;
    var $rootScope;
    var $location;
    var $routeParams;
    var $httpBackend;
    var controller;
    var $UserDetailsService;

    beforeEach(function() {

        module('QuizziPedia');

        inject(function($controller, _$httpBackend_, _$routeParams_, _$rootScope_, _$q_, _$location_, AuthService, UserDetailsService) {
            $q = _$q_;
            $rootScope= _$rootScope_;
            httpBackend = _$httpBackend_;
            $location = _$location_;
            $routeParams = _$routeParams_;
            $scope = _$rootScope_.$new();
            $UserDetailsService = UserDetailsService;

            deferred = _$q_.defer();

            spyOn($location, 'path');

            controller = $controller('ProfileManagementController', {
                $scope: $scope,
                $rootScope: $rootScope,
                $routeParams: $routeParams,
                $location: $location,
                AuthService: AuthService,
                $UserDetailsService: $UserDetailsService
            });

        })
    });


    it('should check that the account has been deleted', function() {
        spyOn($scope, 'deleteAccount');
        $scope.deleteAccount();
        expect($scope.deleteAccount).toHaveBeenCalled();
    });

    it('should check that the account has been changed', function() {
        spyOn($scope, 'changeAccount');
        $scope.changeAccount();
        expect($scope.changeAccount).toHaveBeenCalled();
    });

    it('should check that the account has been modified', function() {
        spyOn($scope, 'modify');
        $scope.modify();
        expect($scope.modify).toHaveBeenCalled();
    });
});