/*******************************************************************************
* Name: QuizziPedia::Front-End::Views::QuestionnaireManagementController
* Description: controller che gestisce la gestione dei questionari;
*
*
* Creation data: 26-04-2016
* Author: Mattia Varotto
********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
* ID: QuestionnaireManagementController_20160526;
* Update data: 26-05-2016;
* Description: Aggiornato controller
* Author: Franco Berton.
*-------------------------------------------------------------------------------
* ID: QuestionnaireManagementController_20160427;
* Update data: 27-04-2016;
* Description: Aggiunti i metodi goToCreateQuestionnaire() e goToShowAllCreatedQuestionnaires();
* Author: Alberto Ferrara.
*-------------------------------------------------------------------------------
* ID: QuestionnaireManagementController_20160426
* Update data: 26-04-2016
* Description: creazione della classe;
* Author: Mattia Varotto3
*-------------------------------------------------------------------------------
*******************************************************************************/

app.controller('QuestionnaireManagementController', QuestionnaireManagementController);

QuestionnaireManagementController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', '$mdDialog', '$cookies', '$timeout', '$mdSidenav', 'ErrorInfoModel','QuizService','ngMeta'];

function QuestionnaireManagementController ($scope, $rootScope, $routeParams, $location, $mdDialog, $cookies, $timeout, $mdSidenav, ErrorInfoModel,QuizService,ngMeta) {
    if ($rootScope.listOfKeys!=undefined){
        metaData();
    }
    var langDownloaded = $rootScope.$on("langDownloaded", function(event, args) {
        if(args){
            metaData();
        }
    });
    $scope.$on('$destroy', langDownloaded);

    function metaData() {
        ngMeta.setTitle($rootScope.listOfKeys.questionnaireManagement);
        ngMeta.setTag('description',$rootScope.listOfKeys.questionnaireManagementDescription);
    }

    $scope.goToCreateQuestionnaire = function() {
        $location.path('/'+$routeParams.lang+'/createquestionnaire');
    }

    if($rootScope.userLogged != undefined){
        showAllQuizzes($rootScope.userLogged, $routeParams.lang);
    }
    else{
        var ist = $rootScope.$on("userDownloaded", function(event, args) {
            if(args){
                showAllQuizzes($rootScope.userLogged, $routeParams.lang);
            }
        });
        $scope.$on('$destroy', ist);
    }

    function showAllQuizzes(user, lang) {
        QuizService.showAllCreatedQuestionnaires(user, lang)
            .then(function (result) {
                if (result.data.length > 0) {
                    $scope.personalQuizzes = result.data;
                }
                else {
                    $scope.personalQuizzes = [];

                }
            }, function (err) {
                $scope.error = new ErrorInfoModel();
                alert = $mdDialog.alert()
                    .title($rootScope.listOfKeys.genericError)
                    .content("I questionari non possono essere visualizzati!")
                    .ok('Ok');
                $mdDialog
                    .show(alert)
                    .finally(function () {
                        alert = undefined;
                    });
            });

    }

    $scope.goToQuiz = function(quizId) {
        $location.path('/' + $routeParams.lang + '/managementsubscription/' + quizId);
    }

    $scope.disable=[];
    $scope.startQuiz = function(quizId, index){
        $rootScope.isDownloading=true;
        QuizService.startQuiz(quizId, $routeParams.lang)
            .then(function (result) {
                alert = $mdDialog.alert()
                    .title($rootScope.listOfKeys.quizIsStartedTitle)
                    .content($rootScope.listOfKeys.quizIsStarted)
                    .ok('Ok');
                $mdDialog
                    .show(alert)
                    .finally(function () {
                        alert = undefined;
                    });
                $scope.disable[index]=true;
                $rootScope.isDownloading=false;
            }, function (err) {

                alert = $mdDialog.alert()
                    .title($rootScope.listOfKeys.genericError)
                    .content($rootScope.listOfKeys.quizIsNotStarted)
                    .ok('Ok');
                $mdDialog
                    .show(alert)
                    .finally(function () {
                        alert = undefined;
                    });
                $rootScope.isDownloading=false;
            });
    }

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.isActive = true;

    $scope.goOn = function () {
        angular.element(".scrollable").scrollTop(0,0);
        $scope.currentPage=$scope.currentPage+1;
    }

    $scope.goBack = function () {
        angular.element(".scrollable").scrollTop(0,0);
        $scope.currentPage=$scope.currentPage-1;
    }

    $scope.numberOfPages=function(numberOfQuestions){
        var value;
        if(numberOfQuestions%$scope.pageSize > 0) {
            value = Math.floor(numberOfQuestions/$scope.pageSize)+1;
        }
        else {
            value = Math.floor(numberOfQuestions/$scope.pageSize);
        }
        return value;
    };
}
