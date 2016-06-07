/**
 * Created by francoberton on 06/06/16.
 */


describe('Testing RegistrationManagementController', function () {
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
        inject(function($controller, _$httpBackend_,_$routeParams_, _$rootScope_, _$q_, _$location_,  QuizService) {
            $q = _$q_;
            $rootScope= _$rootScope_;
            httpBackend = _$httpBackend_;
            $location = _$location_;
            $scope = _$rootScope_.$new();
            $routeParams=_$routeParams_

            deferred = _$q_.defer();



            $controller('RegistrationManagementController', {
                $scope: $scope,
                $rootScope: $rootScope,
                $routeParams:  $routeParams,
                $location: $location,
                QuizService: QuizService,
                $rootScope: {idQuiz: "574166390a7ba626375283ad",lang:'it'}
            });
        })
    })






})