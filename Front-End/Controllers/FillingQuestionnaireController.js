/*******************************************************************************
* Name: QuizziPedia::Front-End::Controllers::;
* Description: ;
* Relations with other classes:
* +
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: _20160503;
* Update data: 03-05-2016;
* Description: Creata la classe;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.controller('FillingQuestionnaireController', FillingQuestionnaireController);

FillingQuestionnaireController.$inject = ['$scope', '$rootScope', '$timeout', '$mdDialog', '$location', '$routeParams', 'ErrorInfoModel', 'UserDetailsModel', 'QuestionnaireModel', 'QuestionsService', 'QuizService'];
function FillingQuestionnaireController ($scope, $rootScope, $timeout,  $mdDialog, $location, $routeParams, ErrorInfoModel, UserDetailsModel, QuestionnaireModel, QuestionsService, QuizService ) {

  /*actions to do on the start of the loading of teh page*/

  var userDownloaded = $rootScope.$on('userDownloaded', function(event, args){
    console.log(args);
    if(args) {
      $scope.downloadQuiz();
    }
  });
  $scope.$on('$destroy', userDownloaded);

  /*Private variables*/
  var keepOnMind = 0;

  /*Public variables on Scope*/

  $scope.iQ = false;
  $scope.numberOfQuestionsOnTraining = {
    num: 1
  };
  $scope.selectedTopicOnMind = "";
  $scope.readonly = false;
  $scope.selectedItem = null;
  $scope.searchText = null;
  $scope.autocompleteDemoRequireMatch = true;
  $scope.selectedKeywords = [];
  $scope.problemWithTopic = false;
  $scope.stopToGoBack = false;
  $scope.temporaryLevel = 500;

  /*Si*/
  $scope.quizIsLoaded = false;
  $scope.questionNumberOnQuiz = 1;
  $scope.quizIsLoaded = false;
  $timeout(function() {
    $scope.quizIsLoaded = true;
  }, 500);
  $scope.startQuiz= false;
  $scope.noStart= false;
  $scope.started= false;
  $scope.quizIsLoaded = true;
  $scope.quizIsFinished = false;

  var questions = [];
  /*Functions on scope*/

  /* This function downloads the questionnaire */
  $scope.downloadQuiz = downloadQuiz;
  function downloadQuiz () {
    console.log("entro");
    console.log($routeParams.lang);
    console.log($routeParams.id);
    console.log($rootScope.userLogged.getId());

    QuizService
      .getQuiz($routeParams.lang, $routeParams.id)
      .then(function(result){
          console.log(result);
          //$scope.quiz=result.data;
           //function (author, name, keyword, argument, questions, id)
          $scope.quiz= new QuestionnaireModel(result.data.author, result.data.title, result.data.keywords, result.data.topic, result.data.questions, result.data._id);
          questions = $scope.quiz.getQuestions();
          console.log(questions);
          $scope.quizIsLoaded = true;
          if(result.data.active == true){
            $scope.startQuiz= true;
          }
          else {
            $scope.noStart= true;
          }
          console.log($scope.startQuiz);
          console.log($scope.noStart);
      } ,function (err){
          $scope.error = new ErrorInfoModel(err.data.code,  err.data.message, err.data.title);
          alert = $mdDialog.alert()
              .title($scope.error.getTitle())
              .content($scope.error.getCode()+": "+$scope.error.getMessage())
              .ok('Ok');
          $mdDialog
              .show( alert )
              .finally(function() {
                  alert = undefined;
              });
      });

  };

  /*Function to start the quiz*/
  $scope.startQuizClick = startQuizClick;
  function startQuizClick () {
    console.log("entro");
    $scope.stopToGoBack = true;
    $scope.started = true;
    $scope.startQuiz = false;
    console.log(questions);
    console.log(questions[0]);
    $rootScope.$emit("loadNewQuestionQuiz", questions[0], 0)
  };

  /*Function to get the next question*/
  $scope.nextQuestion= nextQuestion;
  function nextQuestion() {
    alert = $mdDialog.confirm()
        .title($rootScope.listOfKeys.attention)
        .content($rootScope.listOfKeys.areYouSureToGoOn)
        .ok($rootScope.listOfKeys.yesGoOn)
        .cancel($rootScope.listOfKeys.dontGoOn);
    $mdDialog
        .show( alert )
        .then(function() {
          checkIfICouldGoOn();
        });
  };


  /*Function to finish the training*/
  $scope.endQuiz = endQuiz;
  function endQuiz() {
    alert = $mdDialog.confirm()
        .title($rootScope.listOfKeys.buttonEndTrainingLang)
        .content($rootScope.listOfKeys.endOfTheTrainingAreYouSure)
        .ok("Ok")
        .cancel($rootScope.listOfKeys.dontDoIt);
    $mdDialog
        .show( alert )
        .finally(function() {
            alert = undefined;
        })
        .then(function() {
          $scope.stopToGoBack = false;
          graphResultAfterFinishedAQuiz();
          $scope.quizIsFinished = true;
          window.onbeforeunload = null;
        });
  }

  /*RootScope functions*/

  /*Event to not allow the use of back button*/
  $scope.$on('$locationChangeStart', function (event, next, current) {
          if ($scope.stopToGoBack && !confirm($rootScope.listOfKeys.doYouWannaGoBakLang)) {
              event.preventDefault();
          }
  });

  /*Event to go back to the set up training*/
  var addResult = $rootScope.$on("addResult", function(event, args) {
      $scope.quiz.addResult(args)
  });
  $scope.$on('$destroy', addResult);

  /*Private functions*/

  /*Function that checks if yuo could go on or the trainging is over*/
  function checkIfICouldGoOn() {
    var arryOfQuestionsAlreadyAnswered= [];
    $scope.training.getQuestions().forEach(
      function (elem) {
        arryOfQuestionsAlreadyAnswered.push(elem.getId());
      }
    );
    var level;
    if($rootScope.userLogged != undefined) {
      level = $rootScope.userLogged.getLevel();
    }
    else {
      level = $scope.temporaryLevel;
    }
    if($scope.training.getNumberOfQuestions() == 0 || $scope.questionNumberOnTraining+1 <= $scope.training.getNumberOfQuestions() )
    {
      $rootScope.$emit("loadNewQuestion", {
        language  : $routeParams.lang,
        topic: $scope.training.getArgument(),
        keywords : $scope.training.getKeywords(),
        level  : level,
        alreadyAnswered : arryOfQuestionsAlreadyAnswered
        }
      );
      angular.element(".scrollable").scrollTop(0,0);
    }
    else {
      console.log("entro qui");
      console.log($scope.training.getArgument());
      console.log(level);
      $rootScope.$emit("checkAnswerEvent",$scope.training.getArgument(), level);
      $scope.stopToGoBack = false;
      graphResultAfterFinishedATraining();
      $scope.traininIsFinished = true;
      window.onbeforeunload = null;
    }
    $scope.questionNumberOnTraining++;
  }

  function graphResultAfterFinishedATraining(){
    $scope.myChartDataDoughnut = [
          {
              value: $scope.training.getResult(),
              color: "#FDB45C",
              label: $rootScope.listOfKeys.questionsQuizRight
          },
          {
              value : $scope.training.getNumberOfQuestionsAnswered() - $scope.training.getResult(),
              color : "#F7464A",
              label: $rootScope.listOfKeys.questionsQuizWrong
          }
      ];
      $scope.myChartOptionsDoughnut = {
          egmentShowStroke : false,
          animateScale : true
      };
  }

};
