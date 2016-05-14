app.controller('ShowAllCreatedQuestionnairesController', ShowAllCreatedQuestionnairesController);

ShowAllCreatedQuestionnairesController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', '$mdDialog', '$cookies', '$timeout', '$mdSidenav', 'ErrorInfoModel', 'QuizService'];

function ShowAllCreatedQuestionnairesController ($scope, $rootScope, $routeParams, $location, $mdDialog, $cookies, $timeout, $mdSidenav, ErrorInfoModel, QuizService) {


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
                    //console.log($scope.personalQuizzes);
                    // $location.path('/' + $routeParams.lang + '/questionnairemanagementview');
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
