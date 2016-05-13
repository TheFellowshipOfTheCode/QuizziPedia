/*******************************************************************************
 * Name: QuizziPedia::Front-End::Controllers::UserDetailsController;
 * Description: questa classe permette di recuperare i dati dell'utente;
 * Relations with other classes:
 * +
 * Creation data: 12-05-2016;
 * Author: Matteo Granzotto;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: SearchController_20160512;
 * Update data: 12-05-2016;
 * Description: Creata e iniziata stesura della classe;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/


app.controller('UserDetailsController', UserDetailsController);

UserDetailsController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', '$mdDialog', 'ErrorInfoModel', 'UserDetailsService', 'QuizService'];

function UserDetailsController($scope, $rootScope, $routeParams, $location, $mdDialog , ErrorInfoModel, UserDetailsService, QuizService) {
    //console.log($rootScope.userLogged.getUsername());
    if($rootScope.userLogged != undefined){
        $scope.user = $rootScope.userLogged;
        loadDoneQuizzes();
        loadAbilitatedQuizzes()
    }
    else{
        var ist = $rootScope.$on("userDownloaded", function(event, args) {
            if(args){
                $scope.user = $rootScope.userLogged;
                loadDoneQuizzes();
                loadAbilitatedQuizzes()
            }
        });
        $scope.$on('$destroy', ist);
    }

    function loadDoneQuizzes() {
       QuizService.getDoneQuestionnaire($routeParams.lang)
           .then(function (result) {
               $scope.quizzes = result.data;
               //console.log("quiz: " + $scope.quizzes);
           }, function (err) {
               console.log(err);
        }

    function loadAbilitatedQuizzes() {
        QuizService.getSubscribedQuestionnaire($routeParams.lang)
            .then(function (result) {
                $scope.subscribedQuizzes = result.data;
                //console.log("quiz: " + $scope.subscribedQuizzes);
            }, function (err) {
                console.log(err);
                    $scope.error = new ErrorInfoModel("8", "Errore", "Caricamento questionari disponibili non andato a buon fine");
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

