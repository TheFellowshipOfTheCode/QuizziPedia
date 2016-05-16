/*******************************************************************************
 * Name: QuizziPedia::Front-End::Controllers::CreateQuestionnaireController;
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

CreateQuestionnaireController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', '$mdDialog', '$cookies', '$timeout', '$mdSidenav','filterFilter', 'ErrorInfoModel', 'QuizService', 'UserDetailsModel'];

function CreateQuestionnaireController ($scope, $rootScope, $routeParams, $location, $mdDialog, $cookies, $timeout, $mdSidenav,filterFilter, ErrorInfoModel, QuizService, UserDetailsModel) {

  /*Variabili*/
  $scope.questions_selected=[];

  $scope.quiz = {
      title: '',
      author: $rootScope.userLogged.getId(),
      keyword: '',
      topic: undefined,
      questions: []
  };

  $scope.filter = {};

  /*Costruttore*/
  QuizService.getTopic($routeParams.lang)
      .then(function(result){
          if(result.data != undefined) {
              $scope.topics = result.data;

          }
      } ,function (err){
          $scope.error = new ErrorInfoModel("8", "Errore", "Caricamento domande non andato a buon fine");
          alert = $mdDialog.alert()
              .title($scope.error.getTitle())
              .content($scope.error.getMessage())
              .ok('Ok');
          $mdDialog
              .show( alert )
              .finally(function() {
                  alert = undefined;
              });
    });

    /*Funzioni pubbliche*/
    $scope.resetFilters = function () {
        // needs to be a function or it won't trigger a $watch
        $scope.search = {};
    };

    $scope.update = function()
    {
        $scope.filtered = filterFilter($scope.questions, $scope.search);
        $scope.totalItems = $scope.filtered.length;
        $scope.maxSize  = Math.ceil($scope.totalItems / $scope.numPerPage);
    }

    $scope.updateSearch = function () {
        $scope.filtered = filterFilter($scope.questions, $scope.search);
        $scope.maxSize  = Math.ceil($scope.questions / $scope.numPerPage);
    };

    $scope.currentPage= 1;
    $scope.numPerPage = 10;

    $scope.showAllQuestions=function(topic,keyword) {
        QuizService.showAllQuestions(topic, keyword, $routeParams.lang)
            .then(function (result) {
                if (result.data != undefined) {
                    $scope.questions = result.data;
                    $scope.update();

                }
            }, function (err) {
                $scope.error = new ErrorInfoModel("8", "Errore", "Caricamento domande non andato a buon fine");
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
    $scope.showAllQuestions(null,null);

    $scope.filterByYours = function (question) {
        return $scope.filter[question.author] || noFilter($scope.filter);
    };



    $scope.addQuestion=function(question){
        $scope.questions_selected.push(question);
        $scope.quiz.questions.push(question._id);
        var idx = $scope.questions.indexOf(question);
        if (idx > -1) {
            $scope.questions.splice(idx, 1);
        }
    }

    $scope.deleteQuestion=function(question){
        $scope.questions.push(question);
        var idx = $scope.questions_selected.indexOf(question);
        if (idx > -1) {
            $scope.questions_selected.splice(idx, 1);
            $scope.quiz.questions.push(idx,1)
        }
    }

    $scope.createQMLQuestion = function() {
        $location.path('/'+$routeParams.lang+'/QML');
    }

    $scope.createQuestionnaire = function(quiz) {
        QuizService.createQuestionnaire(quiz.title, quiz.author, quiz.keyword, quiz.topic,quiz.questions, $routeParams.lang)
            .then(function (result) {
                if (result) {
                    $scope.error = new ErrorInfoModel();
                    if($routeParams.lang === 'it') {
                        alert = $mdDialog.alert()
                            .title("Operazione completata con successo")
                            .content("Il questionario è stato creato!")
                            .ok('Ok');
                    } else{
                        alert = $mdDialog.alert()
                            .title("Successfully completed operation")
                            .content("Quiz is created!")
                            .ok('Ok');
                    }
                    $mdDialog
                        .show(alert)
                        .finally(function () {
                            alert = undefined;
                        });
                    $location.path('/' + $routeParams.lang + '/questionnairemanagement');
                }
            }, function (err) {
                $scope.error = new ErrorInfoModel();
                if($routeParams.lang === 'it') {
                    alert = $mdDialog.alert()
                        .title("Errore")
                        .content("Il questionario non è stato crato!")
                        .ok('Ok');
                } else {
                    alert = $mdDialog.alert()
                        .title("Error")
                        .content("Quiz is not created!")
                        .ok('Ok');
                }
                $mdDialog
                    .show(alert)
                    .finally(function () {
                        alert = undefined;
                    });
            });
    }

    /*Funzioni private*/
    function noFilter(filterObj) {
        for (var key in filterObj) {
            if (filterObj[key]) {
                return false;
            }
        }
        return true;
    }

}
