/*******************************************************************************
 * Name: QuizziPedia::Front-End::Controllers::RegistrationManagementController;
 * Description: questa classe permette di gestire le iscrizioni ad un quiz;
 *
 *
 * Creation data: 10-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: RegistrationManagementController_20160513;
 * Update data: 13-05-2016;
 * Description: Inseriti i metodi numberOfPages(), rightColor(), subscribeQuestionnaire();
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 * ID: RegistrationManagementController_20160511;
 * Update data: 11-05-2016;
 * Description: Inseriti i metodi getUserForThisQuestionnaire(), goOn(), goBack();
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 * ID: RegistrationManagementController_20160510;
 * Update data: 10-05-2016;
 * Description: Creata e iniziata stesura della classe;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/


app.controller('RegistrationManagementController', RegistrationManagementController);

RegistrationManagementController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', '$mdDialog', 'ErrorInfoModel', 'QuizService','ngMeta'];

function RegistrationManagementController($scope, $rootScope, $routeParams, $location, $mdDialog , ErrorInfoModel, QuizService, ngMeta) {

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
        ngMeta.setTitle($rootScope.listOfKeys.titleLangRegistrationManagement);
        ngMeta.setTag('description',$rootScope.listOfKeys.titleLangRegistrationManagementDescription);
    }

    $scope.currentPage = 0;
    $scope.pageSize = 15;
    $scope.isActive = true;

    var quizId = $routeParams.idQuiz;
    getUserForThisQuestionnaire(quizId);

    function getUserForThisQuestionnaire(quizId) {
        QuizService.getUsersForThisQuestionnaire(quizId, $routeParams.lang)
            .then(function (result) {
                if(result.data.length >0){
                    $scope.subscribedUsers = result.data;}
                else{
                    $scope.subscribedUsers = [];
                }

            }, function (err) {
                $scope.error = new ErrorInfoModel("8", "Errore", "Caricamento utenti registrati non andato a buon fine");
                alert = $mdDialog.alert()
                    .title($scope.error.getTitle())
                    .content($scope.error.getMessage())
                    .ok('Ok');
                $mdDialog
                    .show(alert)
                    .finally(function () {
                        alert = undefined;
                    });
            });
    }

        $scope.goOn = function () {
            angular.element(".scrollable").scrollTop(0,0);
            $scope.currentPage=$scope.currentPage+1;
        }

        $scope.goBack = function () {
            angular.element(".scrollable").scrollTop(0,0);
            $scope.currentPage=$scope.currentPage-1;
        }

        $scope.numberOfPages=function(numberOfQuizzes){
            var value;
            if(numberOfQuizzes%$scope.pageSize > 0) {
                value = Math.floor(numberOfQuizzes/$scope.pageSize)+1;
            }
            else {
                value = Math.floor(numberOfQuizzes/$scope.pageSize);
            }
            return value;
        };

        $scope.rightColor = function () {
            $scope.isActive= !$scope.isActive;
        }

        $scope.subscribeQuestionnaire = function(userId) {
            if ($routeParams.idQuiz != undefined) {
                QuizService.approveSubscribeQuestionnaire(userId, $routeParams.idQuiz, $routeParams.lang)
                    .then(function (result) {
                        alert = $mdDialog.alert()
                            .title("Approvazione andata a buon fine")
                            .content("Hai approvato l'iscrizione dell'utente")
                            .ok('Ok');
                        $mdDialog
                            .show(alert)
                            .finally(function () {
                                alert = undefined;
                            });

                    }, function (err) {
                        $scope.error = new ErrorInfoModel("10", "Errore", "Approvazione non andata a buon fine");
                        alert = $mdDialog.alert()
                            .title($scope.error.getTitle())
                            .content($scope.error.getMessage())
                            .ok('Ok');
                        $mdDialog
                            .show(alert)
                            .finally(function () {
                                alert = undefined;
                            });
                    });
            }
        }


}
