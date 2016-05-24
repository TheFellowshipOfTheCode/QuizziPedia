/*******************************************************************************
 * Name: QuizziPedia::Front-End::Controllers::CreateQuestionnaireController;
 * Description: Controller che gestisce la creazione dei questionari;
 *
 *
 * Creation data: 03-05-2016;
 * Author: Simone Magagna;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: CreateQuestionnaireController_20160504;
 * Update data: 04-05-2016;
 * Description: Ultimata la classe ci metodi createQMLQuestion(),
 * createQuestionnaire() e noFilter();
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 * ID: AppController_20160502;
 * Update data: 02-05-2016;
 * Description: Scritti i metodi getTopic(), resetFilters(), filterByYours(),
 * addQuestion(), deleteQuestion();
 * Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: CreateQuestionnaireController_2016426;
 * Update data: 26-04-2016;
 * Description: Creata la classe e i metodi showAllQuestions();
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

    $scope.moreInfo={
        selected:[],
        found:[]
    };

    $scope.toggle = function(type,index) {
        if(type=='found')
            $scope.moreInfo.found[index] = !$scope.moreInfo.found[index];
        else
            $scope.moreInfo.selected[index] = !$scope.moreInfo.selected[index];
    };

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

    $scope.currentPage= 1;
    $scope.numPerPage = 10;

    $scope.update = function()
    {
        $scope.filtered = filterFilter($scope.questions, $scope.search);
        $scope.totalItems = $scope.filtered.length;
        $scope.maxSize  = Math.ceil($scope.totalItems / $scope.numPerPage);
    }

    $scope.updateSearch = function () {
        $scope.filtered = filterFilter($scope.questions, {name: $scope.search.name});
        $scope.maxSize  = Math.ceil($scope.questions / $scope.numPerPage);
    };

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
        if ($scope.moreInfo.found[idx])
            $scope.moreInfo.found[idx] = !$scope.moreInfo.found[idx]
    }

    $scope.deleteQuestion=function(question){
        $scope.questions.push(question);
        var idx = $scope.questions_selected.indexOf(question);
        if (idx > -1) {
            $scope.questions_selected.splice(idx, 1);
            $scope.quiz.questions.push(idx,1)
        }

        if ($scope.moreInfo.selected[idx])
            $scope.moreInfo.selected[idx] = !$scope.moreInfo.selected[idx]
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
