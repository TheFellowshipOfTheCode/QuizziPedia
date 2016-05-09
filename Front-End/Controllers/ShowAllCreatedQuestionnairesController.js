app.controller('ShowAllCreatedQuestionnairesController', ShowAllCreatedQuestionnairesController);

ShowAllCreatedQuestionnairesController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', '$mdDialog', '$cookies', '$timeout', '$mdSidenav', 'ErrorInfoModel', 'QuizService'];

function ShowAllCreatedQuestionnairesController ($scope, $rootScope, $routeParams, $location, $mdDialog, $cookies, $timeout, $mdSidenav, ErrorInfoModel, QuizService) {



        console.log("---------------------------------------------------------");
        console.log($rootScope.userLogged.getId());
        console.log("---------------------------------------------------------");
        QuizService.showAllCreatedQuestionnaires($rootScope.userLogged.getId(), $routeParams.lang)
            .then(function (result) {
                if (result) {
                    $scope.personalQuizzes = result;
                    // $location.path('/' + $routeParams.lang + '/questionnairemanagementview');
                }
            }, function (err) {
                $scope.error = new ErrorInfoModel();
                if($routeParams.lang === 'it') {
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
