/*******************************************************************************
* Name: QuizziPedia::Front-End::Controllers::FillingQuestionnaireController;
* Description: Controller che permette di gestire la compilazione dei questionari;
*
*
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: FillingQuestionnaireController_20160510;
* Update data: 10-05-2016;
* Description: Aggiunte le funzioni goToHome(), endQuiz() e
* graphResultAfterFinishedATraining();
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
* ID: FillingQuestionnaireController_20160505;
* Update data: 05-05-2016;
* Description: Aggiunte le funzioni downloadQuiz(), startQuizClick() e
 * nextQuestion();
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
* ID: FillingQuestionnaireController_20160503;
* Update data: 03-05-2016;
* Description: Creata la classe;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.controller('FillingQuestionnaireController', FillingQuestionnaireController);

FillingQuestionnaireController.$inject = ['$scope', '$rootScope', '$timeout', '$mdDialog', '$location', '$routeParams', 'ErrorInfoModel', 'UserDetailsModel', 'QuestionnaireModel', 'QuestionsService', 'QuizService'];
function FillingQuestionnaireController ($scope, $rootScope, $timeout,  $mdDialog, $location, $routeParams, ErrorInfoModel, UserDetailsModel, QuestionnaireModel, QuestionsService, QuizService ) {

  /*Public variables on Scope*/
  $scope.quizIsLoaded = false;
  $scope.questionNumberOnQuiz = 0;
  $scope.quizIsLoaded = false;
  $timeout(function() {
    $scope.quizIsLoaded = true;
  }, 500);
  $scope.startQuiz= false;
  $scope.noStart= false;
  $scope.started= false;
  $scope.quizIsLoaded = true;
  $scope.quizIsFinished = false;
  $scope.noAuth = false;

  var questions = [];

  /*Functions on scope*/

  /* This function downloads the questionnaire */
  $scope.downloadQuiz = downloadQuiz;
  function downloadQuiz () {
    QuizService
      .getQuiz($routeParams.lang, $routeParams.id)
      .then(function(result){
          $scope.quiz= new QuestionnaireModel(result.data.author, result.data.title, result.data.keywords, result.data.topic, result.data.questions, result.data._id);
          questions = $scope.quiz.getQuestions();
          $scope.quizIsLoaded = true;
          if(result.data.active == true){
            $scope.startQuiz= true;
          }
          else {
            $scope.noStart= true;
          }
      } ,function (err){
          $scope.error = new ErrorInfoModel(err.data.code,  err.data.message, err.data.title);
          if($scope.error.getMessage().toString() === "Utente non autorizzato") {
            $scope.noAuth = true;
          }
          if($scope.error.getMessage().toString() === "Questionario non abilitato") {
            $scope.noStart = true;
          }
      });
  };

  /*Function to start the quiz*/
  $scope.goToHome = goToHome;
  function goToHome () {
    $location.path("/"+$routeParams.lang+"/home");
  };

  /*Function to start the quiz*/
  $scope.startQuizClick = startQuizClick;
  function startQuizClick () {
    $scope.stopToGoBack = true;
    $scope.started = true;
    $scope.startQuiz = false;
    $rootScope.$emit("loadNewQuestionQuiz", questions[0], 0);
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
          if($scope.questionNumberOnQuiz+1 < $scope.quiz.getNumberOfQuestions() )
          {
            $scope.questionNumberOnQuiz++;
            $rootScope.$emit("loadNewQuestionQuiz", questions[$scope.questionNumberOnQuiz], $scope.questionNumberOnQuiz, $scope.quiz.getArgument(), $rootScope.userLogged.getLevel());
            angular.element(".scrollable").scrollTop(0,0);
          }
          else {
            $rootScope.$emit("checkAnswerEvent",$scope.quiz.getArgument(), $scope.userLogged.getLevelByTopic($scope.quiz.getArgument()));
            $scope.stopToGoBack = false;
            graphResultAfterFinishedATraining();
            QuizService.setQuizResult($routeParams.lang,
              {
                  language: $routeParams.lang,
                  quiz: $scope.quiz.getId(),
                  answers: $scope.quiz.getResultSummary()
              }
            )
            .then(function(result){
              $scope.quiz.setMark(result.data.mark);
            });
            $scope.quizIsFinished = true;
            window.onbeforeunload = null;
          }
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
          $rootScope.$emit("checkAnswerEvent",$scope.quiz.getArgument(), $scope.userLogged.getLevelByTopic($scope.quiz.getArgument()));
          $scope.stopToGoBack = false;
          graphResultAfterFinishedATraining();
          for(var i= $scope.questionNumberOnQuiz++; i < $scope.getNumberOfQuestions; i++) {
            $scope.quiz.addResult(questions[i]._id, false);
          }
          QuizService.setQuizResult($routeParams.lang,
            {
                language: $routeParams.lang,
                quiz: $scope.quiz.getId(),
                answers: $scope.quiz.getResultSummary()
            }
          )
          .then(function(result){
            $scope.quiz.setMark(result.data.mark);
          });
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
  var addResult = $rootScope.$on("addResult", function(event, id, args) {
      $scope.quiz.addResult(id,args)
  });
  $scope.$on('$destroy', addResult);

  /*Private functions*/

  /* Set the varaibles to create the statistics graph */
  function graphResultAfterFinishedATraining(){
    $scope.myChartDataDoughnut = [
          {
              value: $scope.quiz.getResult(),
              color: "#86FC72",
              label: $rootScope.listOfKeys.questionsRight
          },
          {
              value : $scope.quiz.getNumberOfQuestions() - $scope.quiz.getResult(),
              color : "#F7464A",
              label: $rootScope.listOfKeys.questionsWrong
          }
      ];
      $scope.myChartOptionsDoughnut = {
          egmentShowStroke : false,
          animateScale : true
      };
  }


  /*actions to do on the start of the loading of teh page*/
  
  if($rootScope.userLogged != undefined ){
    $scope.downloadQuiz();
  }
  else {
    var userDownloaded = $rootScope.$on('userDownloaded', function(event, args){
      if(args) {
        $scope.downloadQuiz();
      }
    });
    $scope.$on('$destroy', userDownloaded);
  }

};
