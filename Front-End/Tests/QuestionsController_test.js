/*******************************************************************************
 * Name: QuizziPedia::Front-End::Controllers::QuestionsController_test;
 * Description: questa classe permette di gestire le domande utente;
 * Creation data: 04-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
 * -------------------------------------------------------------------------------
 * ID: QuestionsController_test_20160526;
 * Update data: 02-06-2016;
 * Description: Creazione test controller
 * Author: Franco Berton.
 *-------------------------------------------------------------------------------
 *******************************************************************************/



describe('Testing QuestionsController', function () {
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
        inject(function($controller, _$httpBackend_,_$routeParams_, _$rootScope_, _$q_, _$location_, QuestionsService) {
            $q = _$q_;
            $rootScope = _$rootScope_;
            httpBackend = _$httpBackend_;
            $location = _$location_;
            $scope = _$rootScope_.$new();
            $routeParams=_$routeParams_
            deferred = _$q_.defer();
            

            spyOn(QuestionsService, 'updateStatisticsUser').and.returnValue(deferred.promise);
            spyOn(QuestionsService, 'updateStatisticsQuestion').and.returnValue(deferred.promise);
            spyOn(QuestionsService, 'updateStatisticsTopic').and.returnValue(deferred.promise);
            spyOn($rootScope, '$on').and.callThrough();

            $controller('QuestionsController', {
                $scope: $scope,
                $rootScope: $rootScope,
                $routeParams:  $routeParams,
                $location: $location,
                QuestionsService: QuestionsService,
                $routeParams:{
                    lang:'it'
                },
                $rootScope: {
                    userLogged: {
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
                }
            });
        })
    })
    
})