/*******************************************************************************
 * Name: QuizziPedia::Front-End::Controllers::SearchController;
 * Description: questa classe permette di gestire la ricerca di questionari e
 * utenti all’interno dell’applicazione. Fornisce all’utente le funzionalità
 * di ricerca per utenti e questionari;
 * Relations with other classes:
 * + SearchService;
 * + QuizService.
 * Creation data: 27-04-2016;
 * Author: Matteo Granzotto;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: SearchController_20160427;
 * Update data: 27-04-2016;
 * Description: Creata la classe;
 * Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: SearchController_20160510;
 * Update data: 10-05-2016;
 * Description: Iniziata stesura della classe;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/


app.controller('SearchController', SearchController);

SearchController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', '$mdDialog', 'QuestionItemModel', 'ErrorInfoModel', 'SearchService'];

function SearchController($scope, $rootScope, $routeParams, $location, $mdDialog, QuestionItemModel, ErrorInfoModel, SearchService) {

    //Caricamento utenti
    SearchService.searchUsers($routeParams.tosearch, $routeParams.lang)
        .then(function (result) {
            if (result.data != undefined) {
                $scope.users = result.data;
            }
            else {
                //Devo segnalare che non ho trovato questionari
                delete $scope.users;
            }
        }, function (err) {
            $scope.error = new ErrorInfoModel("8", "Errore", "Caricamento utenti non andato a buon fine");
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


        //Caricamento questionari
        SearchService.searchQuestionnaire($routeParams.tosearch, $routeParams.lang)
            .then(function (result) {
                if (result.data != undefined) {
                    $scope.quizzes = result.data;
                }
                else {
                    //Devo segnalare che non ho trovato questionari
                    delete $scope.quizzes;
                }
            }, function (err) {
                $scope.error = new ErrorInfoModel("8", "Errore", "Caricamento questionari non andato a buon fine");
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

