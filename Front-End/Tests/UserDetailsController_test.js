/**
 * Created by francoberton on 03/06/16.
 */
/*******************************************************************************
 * Name: UserDetailsController_test;
 * Description: test di unità per la classe;
 * QuizziPedia::Front-End::Tests::UserDetailsController_test;
 * Creation data: 02-06-2016;
 * Author:  Franco Berton;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: UserDetailsController_test_20160602;
 * Update data: 02-06-2016;
 * Description: Scritto il test;
 * Author: Franco Berton.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

describe('Testing UserDetailsController', function () {
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
        inject(function($controller, _$httpBackend_, _$rootScope_, _$q_, _$location_, UserDetailsService, QuizService) {
            $q = _$q_;
            $rootScope= _$rootScope_;
            httpBackend = _$httpBackend_;
            $location = _$location_;
            $scope = _$rootScope_.$new();

            deferred = _$q_.defer();
            $rootScope.userLogged={
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

            spyOn(QuizService, 'getDoneQuestionnaire').and.returnValue(deferred.promise);
            spyOn(QuizService, 'getSubscribedQuestionnaire').and.returnValue(deferred.promise);
            spyOn(QuizService, 'getApprovedQuestionnaire').and.returnValue(deferred.promise);

            $controller('UserDetailsController', {
                $scope: $scope,
                $rootScope: $rootScope,
                $location: $location,
                QuizService: QuizService,
                UserDetailsService:UserDetailsService,
            });
        })
    })


    it('should resolve promise that get done questionnaire', function () {
        httpBackend.whenGET(/Views/).respond(200, '');
        console.log()
        deferred.resolve({
            "data":{
                "quizSummaries": [
                    "574173850769200c38b09407",
                    "574abf2825470f382518cee9"
                ]
            }
        });
        $rootScope.$apply();
        console.log($scope.quizzes)
        expect($scope.quizzes).not.toBe(undefined);

    });

})