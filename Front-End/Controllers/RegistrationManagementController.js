/*******************************************************************************
 * Name: QuizziPedia::Front-End::Controllers::RegistrationManagementController;
 * Description: questa classe permette di gestire le iscrizioni ad un quiz;
 * Relations with other classes:
 * +
 * Creation data: 13-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: SearchController_20160513;
 * Update data: 13-05-2016;
 * Description: Inseriti tutti i metodi per la gestione delle iscrizioni;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 * ID: SearchController_20160513;
 * Update data: 13-05-2016;
 * Description: Creata e iniziata stesura della classe;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/


app.controller('RegistrationManagementController', RegistrationManagementController);

RegistrationManagementController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', '$mdDialog', 'ErrorInfoModel', 'QuizService'];

function RegistrationManagementController($scope, $rootScope, $routeParams, $location, $mdDialog , ErrorInfoModel, QuizService) {

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
                    delete $scope.subscribedUsers;
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

