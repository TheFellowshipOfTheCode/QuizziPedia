/*******************************************************************************
 * Name: QuizziPedia::Front-End::Controllers::ShowAllCreatedQuestionnairesController;
 * Description: questa classe permette di gestire la visualizzazione di tutti i
 * questionari creati da un utente;
 *
 *
 * Creation data: 27-04-2016;
 * Author: Mattia Varotto;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: ShowAllCreatedQuestionnairesController_20160513;
 * Update data: 13-05-2016;
 * Description: Completata stesura della classe;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 * ID: ShowAllCreatedQuestionnairesController_20160427;
 * Update data: 27-04-2016;
 * Description: Creata la classe;
 * Author: Mattia Varotto.
 *-------------------------------------------------------------------------------
 *******************************************************************************/


app.controller('ShowAllCreatedQuestionnairesController', ShowAllCreatedQuestionnairesController);
ShowAllCreatedQuestionnairesController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', '$mdDialog', 'ErrorInfoModel', 'QuizService'];

function ShowAllCreatedQuestionnairesController ($scope, $rootScope, $routeParams, $location, $mdDialog, ErrorInfoModel, QuizService) {
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
                    delete $scope.personalQuizzes;
                }
            }, function (err) {
                $scope.error = new ErrorInfoModel();
                if ($routeParams.lang === 'it') {
                    alert = $mdDialog.alert()
                        .title("Errore")
                        .content("I questionari non possono essere visualizzati!")
                        .ok('Ok');
                } else {
                    alert = $mdDialog.alert()
                        .title("Error")
                        .content("Questionnaires can't be showed!")
                        .ok('Ok');
                }
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
}
