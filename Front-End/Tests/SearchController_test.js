/**
 * Created by francoberton on 04/06/16.
 */

describe('Testing SearchController', function () {
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
        inject(function($controller, _$httpBackend_,_$routeParams_, _$rootScope_, _$q_, _$location_,  SearchService) {
            $q = _$q_;
            $rootScope= _$rootScope_;
            httpBackend = _$httpBackend_;
            $location = _$location_;
            $scope = _$rootScope_.$new();
            $routeParams=_$routeParams_

            deferred = _$q_.defer();

            spyOn(SearchService, 'searchUsers').and.returnValue(deferred.promise);
            spyOn(SearchService, 'searchQuestionnaire').and.returnValue(deferred.promise);
           

            $controller('SearchController', {
                $scope: $scope,
                $rootScope: $rootScope,
                $routeParams:  $routeParams,
                $location: $location,
                SearchService:  SearchService
            });
        })
    })


    it('should resolve promise that search multiple users', function () {
        httpBackend.whenGET(/Views/).respond(200, '');
        deferred.resolve({
            "data":{
                "name":"alberto",
                "surname": "ferrara",
                "mail":"aferrara@gmail.com"
            }
        });
        $rootScope.$apply();
        expect($scope.users).not.toBe(undefined);
    });

    it('should resolve promise that search multiple questionnaires', function () {
        httpBackend.whenGET(/Views/).respond(200, '');
        deferred.resolve({
            "data":{
                "title":"Teo gnoato non fa i test"
            }
        });
        $rootScope.$apply();
        expect($scope.quizzes ).not.toBe(undefined);
    });



})