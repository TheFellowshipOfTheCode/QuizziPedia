/*******************************************************************************
 * Name: QuizziPedia::Front-End::Controllers:CreateQuestionnaireController;
 * Description: ;
 * Relations with other classes:
 * +
 * Creation data: 03-05-2016;
 * Author: Simone Magagna;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: CreateQuestionnaireController_20160503;
 * Update data: 27-04-2016;
 * Description: Creata la classe;
 * Author: Simone Magagna.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.controller('CreateQuestionnaireController', CreateQuestionnaireController);

CreateQuestionnaireController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', '$mdDialog', '$cookies', '$timeout','$mdSidenav', 'UserDetailsModel', 'ErrorInfoModel', 'MenuBarModel'];

function CreateQuestionnaireController ($scope, $rootScope, $routeParams, AuthService, $location, $mdDialog, $cookies, $timeout, $mdSidenav, UserDetailsModel, ErrorInfoModel, MenuBarModel) {

    $scope.quiz = {
        name: '',
        keywords: '',
        selectedItem: undefined
    };

    $scope.items = ['Scienze', 'Informatica', 'Storia'];
    $scope.quiz.selectedItem;
    $scope.getSelectedText = function() {
        if ($scope.quiz.selectedItem !== undefined) {
            return $scope.quiz.selectedItem;
        } else {
            if($routeParams.lang === 'it')
                return "Seleziona un argomento";
            else
                return "Selected an argument";
        }
    };

    $scope.createQuestionnaire = function() {
        QuizService.createQuestionnaire(quiz.name, quiz.keywords, quiz.selectedItem, $routeParams.lang)
            .then(function (result) {
                if (result.data.code == 3) {
                    alert = $mdDialog.alert()
                        .title('Creazione effettuata')
                        .content('La creazione del questionario è avvenuta con successo!')
                        .ok('Chiudi');
                    $mdDialog
                        .show(alert)
                        .finally(function () {
                            alert = undefined;
                        });
                    $location.path('/' + $routeParams.lang + '/createquestionnaireview');
                }
            }, function (err) {
                if (err.data.code == 2) {
                    alert = $mdDialog.alert()
                        .title("Errore")
                        .content("Creazione fallita")
                        .ok('Chiudi');
                    $mdDialog
                        .show(alert)
                        .finally(function () {
                            alert = undefined;
                        });
                }
                $rootScope.error = new ErrorInfoModel("5", "Creazione fallita", "Creazione " +
                    "non effettuata");
            })
    };
}
