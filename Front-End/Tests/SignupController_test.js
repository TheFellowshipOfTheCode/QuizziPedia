/*******************************************************************************
 * Name: SignupController_test;
 * Description: test di unità per la classe;
 * QuizziPedia::Front-End::Tests::SignupController_test;
 * Creation data: 02-06-2016;
 * Author:  Franco Berton;
 * License: MIT.
 ********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: SignupController_test_20160602;
 * Update data: 02-06-2016;
 * Description: Scritto il test;
 * Author: Franco Berton.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

describe('Testing SignupController', function () {
    var $scope;
    var $q;
    var deferred;
    var $rootScope;
    var $location;
    var $routeParams;
    var $httpBackend;

    beforeEach(function() {

        module('QuizziPedia');
        /*2-Fare l'inject di $controller e di tutte le dipendenze del controller testato*/
        inject(function($controller, _$httpBackend_, _$rootScope_, _$q_, _$location_, AuthService) {
            $q = _$q_;
            $rootScope= _$rootScope_;
            httpBackend = _$httpBackend_;
            $location = _$location_;
            $scope = _$rootScope_.$new();

            deferred = _$q_.defer();

            spyOn(AuthService, 'signUp').and.returnValue(deferred.promise);

            $controller('SignUpController', {
                $scope: $scope,
                $rootScope: $rootScope,
                $location: $location,
                AuthService: AuthService
            });
        })
    })


    it('should resolve promise that confirm the registration of a user', function () {
        httpBackend.whenGET(/Views/).respond(200, '');
        $scope.user={
            "name": "Matteo",
            "surname": "Gambarotto",
            "email": "gambarotto.matteo@gmail.com",
            "username": "mgambarotto",
            "password": "ciaociao",
            "passwordCheck": "ciaociao"
        }
        $scope.signUp($scope.user)
        deferred.resolve({});
        $rootScope.$apply();
        expect($rootScope.isDownloading).not.toBe(undefined);

    });

})