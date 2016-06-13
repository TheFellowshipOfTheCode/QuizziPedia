/*******************************************************************************
* Name: QuizziPedia::Front-End::Controllers::SearchController;
* Description: questa classe permette di gestire la ricerca di questionari e
* utenti all’interno dell’applicazione. Fornisce all’utente le funzionalità
* di ricerca per utenti e questionari;
*
*
* Creation data: 27-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
* -------------------------------------------------------------------------------
* ID: SearchController_20160526;
* Update data: 26-05-2016;
* Description: Aggiornato controller
* Author: Franco Berton.
* -------------------------------------------------------------------------------
* ID: SearchController_20160504;
* Update data: 04-05-2016;
* Description: Inserito il metodo registrationToQuiz();
* Author: Alberto Ferrara.
*-------------------------------------------------------------------------------
* ID: SearchController_20160502;
* Update data: 02-05-2016;
* Description: Inseriti i metodi searchUsers() e searchQuestionnaire();
* Author: Alberto Ferrara.
*-------------------------------------------------------------------------------
* ID: SearchController_20160427;
* Update data: 27-04-2016;
* Description: Creata la classe;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/


app.controller('SearchController', SearchController);

SearchController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', '$mdDialog', 'ErrorInfoModel', 'SearchService', 'QuizService','ngMeta'];

function SearchController($scope, $rootScope, $routeParams, $location, $mdDialog, ErrorInfoModel, SearchService, QuizService, ngMeta) {

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
        ngMeta.setTitle($rootScope.listOfKeys.search);
        ngMeta.setTag('description',$rootScope.listOfKeys.searchDescription);
    }

    SearchService.searchUsers($routeParams.tosearch, $routeParams.lang)
        .then(function (result) {
            if (result.data != undefined) {
                $scope.users = result.data;
            }
            else {
                delete $scope.users;
            }
        }, function (err) {
            $scope.error = new ErrorInfoModel("8", $rootScope.listOfKeys.genericError, $rootScope.listOfKeys.usersNotDownloaded);
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


    SearchService.searchQuestionnaire($routeParams.tosearch, $routeParams.lang)
        .then(function (result) {
            if (result.data != undefined) {
                $scope.quizzes = result.data;
            }
            else {
                delete $scope.quizzes;
            }
        }, function (err) {
            $scope.error = new ErrorInfoModel("8", $rootScope.listOfKeys.genericError, $rootScope.listOfKeys.quizzesNotDownloaded);
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
    $scope.disabled=[];
    $scope.registrationToQuiz = function (quizId,i) {
        QuizService.subscribeQuestionnaire(quizId, $routeParams.lang)
            .then(function (result) {
                alert = $mdDialog.alert()
                    .title($rootScope.listOfKeys.subscribeToQuizTitle)
                    .content($rootScope.listOfKeys.subscribeToQuiz)
                    .ok('Ok');
                $mdDialog
                    .show(alert)
                    .finally(function () {
                        alert = undefined;
                    });
                    $scope.disabled[i]=true;
            }, function (err) {
            });

    }

    $scope.showUser = function (username) {
        $location.path('/' + $routeParams.lang + '/user/' + username);
    }

    $scope.iAmAlreadySubscribed = function (quiz) {
        if($rootScope.userLogged!=undefined) {
          var check=false;
          var id= $rootScope.userLogged.getId();
          if(quiz.registeredUsers.indexOf(id)!=-1) {
            check=true;
          }
          if(quiz.activeUsers.indexOf(id)!=-1) {
            check=true;
          }
        }
        return check;
    }
}
