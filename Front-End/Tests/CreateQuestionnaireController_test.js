/*******************************************************************************
 * Name: CreateQuestionnaireControllerTest;
 * Description: test di unità per la classe
 * QuizziPedia::Front-End::Controllers::CreateQuestionnaireControllerTest;
 *
 *
 * Creation data: 25-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: CreateQuestionnaireControllerTest_20160525;
 * Update data: 25-05-2016;
 * Description: Scritto il test;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/
/*
'use strict'

describe("Testing a Controller that uses a Promise", function () {
    var $scope;
    var $q;
    var deferred;

    beforeEach(module('QuizziPedia'));

    beforeEach(inject(function($controller, _$rootScope_, _$q_, QuizService) {
        $q = _$q_;
        $scope = _$rootScope_.$new();

        // We use the $q service to create a mock instance of defer
        deferred = _$q_.defer();

        // Use a Jasmine Spy to return the deferred promise
        spyOn(QuizService, 'getTopic').and.returnValue(deferred.promise);

        // Init the controller, passing our spy service instance
        $controller('CreateQuestionnaireControllerTest', {
            $scope: $scope,
            QuizService: QuizService
        });
    }));

    it('should resolve promise', function () {
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve([{ name: "Alberto" }, { surname: "Ferrara" }]);

        // We have to call apply for this to work
        $scope.$apply();

        // Since we called apply, not we can perform our assertions
        expect($scope.results).not.toBe(undefined);
        expect($scope.error).toBe(undefined);
    });
    /*
     it('should reject promise', function () {
     // This will call the .catch function in the controller
     deferred.reject();

     // We have to call apply for this to work
     $scope.$apply();

     // Since we called apply, not we can perform our assertions
     expect($scope.results).toBe(undefined);
     expect($scope.error).toBe('There has been an error!');
     });

});*/