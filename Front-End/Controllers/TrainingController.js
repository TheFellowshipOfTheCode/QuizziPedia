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

app.controller('TrainingController', TrainingController);

TrainingController.$inject = ['$scope', '$rootScope', '$timeout', '$mdDialog', '$location', '$routeParams', 'ErrorInfoModel', 'UserDetailsModel', 'TrainingModeModel', 'QuestionsService'];
function TrainingController ($scope, $rootScope, $timeout,  $mdDialog, $location, $routeParams, ErrorInfoModel, UserDetailsModel, TrainingModeModel, QuestionsService ) {

  /*Private variables*/
  var keepOnMind = 0;

  /*Public variables on Scope*/
  $scope.traininIsFinished = false;
  $scope.trainingIsLoaded = false;
  $timeout(function() {
    $scope.trainingIsLoaded = true;
  }, 500);
  $scope.iQ = false;
  $scope.questionNumberOnTraining = 1;
  $scope.numberOfQuestionsOnTraining = {
    num: 1
  };
  $scope.selectedTopicOnMind = "";
  $scope.readonly = false;
  $scope.selectedItem = null;
  $scope.searchText = null;
  loadTopics(function(data) {
    $scope.topics = data;
  });
  $scope.autocompleteDemoRequireMatch = true;
  $scope.selectedKeywords = [];

  /*Functions on scope*/

  /*Function to start the training*/
  $scope.starTraining = starTraining;
  function starTraining (argument, keywords) {
    if($scope.iQ) {
      $scope.numberOfQuestionsOnTraining = {
        num: 0
      };
    }
    $scope.training = new TrainingModeModel(argument, keywords, $scope.numberOfQuestionsOnTraining.num);
    $rootScope.$emit("loadNewQuestion", {
      language  : $routeParams.lang,
      topic: $scope.training.getArgument(),
      keywords : $scope.training.getKeywords(),
      level  : $rootScope.userLogged.getLevel(),
      alreadyAnswered : [] }
    );
    window.onbeforeunload = function(event) {
        return $rootScope.listOfKeys.areYouSureToLeaveTheTraining;
    };
  };

  /*Function to set infinite question*/
  $scope.setInfiniteQuestion = setInfiniteQuestion;
  function setInfiniteQuestion(infiniteQuestion) {
    $scope.iQ=infiniteQuestion;
    if(infiniteQuestion) {
      keepOnMind = $scope.numberOfQuestionsOnTraining.num;
      $scope.numberOfQuestionsOnTraining.num = 0;
    }
    else {
      $scope.numberOfQuestionsOnTraining.num = keepOnMind;
    }
  }

  /*Function to restart the training*/
  $scope.resetTraining = resetTraining;
  function resetTraining() {
    var arg = $scope.training.getArgument(),
    keys =  $scope.training.getKeywords(),
    nums = $scope.training.getNumberOfQuestions();
    delete $scope.training;
    $scope.training = new TrainingModeModel(arg, keys, nums);
    $scope.questionNumberOnTraining = 1;
    $scope.traininIsFinished = false;
    $location.path("/"+$routeParams.lang+"/training");
    window.onbeforeunload = function(event) {
        return $rootScope.listOfKeys.areYouSureToLeaveTheTraining;
    };
  }

  /*Function to get the new question*/
  $scope.newQuestion= newQuestion;
  function newQuestion() {
    $rootScope.$emit("isItAnswered");
  };

  /*Function that stores the topic choose*/
  $scope.updateSelectedTopic= updateSelectedTopic;
  function updateSelectedTopic(topic) {
    $scope.selectedTopicOnMind = topic;
  };

  /* Search for keywords */
  $scope.querySearch = querySearch;
  function querySearch (query) {
    var results = query ? $scope.keywords.filter(createFilterFor(query)) : [];
    return results;
  }

  /*Return the proper object when the append is called*/
  $scope.transformKey = transformKey;
  function transformKey(key) {
    // If it is an object, it's already a known key
    if (angular.isObject(key)) {
      return key;
    }
    // Otherwise, create a new one, only in autocompleteDemoRequireMatch = false;
    return { name: key, type: $rootScope.listOfKeys.newOne }
  }

  /*Function that download the keywords of a determinate topic*/
  $scope.loadKeywords = loadKeywords;
  function loadKeywords (topic) {
    if(topic != undefined) {
      var keys;
      QuestionsService
        .getKeywords($routeParams.lang, topic)
        .then(function(result){
            keys = result.data;
            delete $scope.keywords;
            $scope.keywords = result.data;
            $scope.selectedKeywords = [];
            delete $chip;
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
    }
  }

  /*Function to go back to the set up page*/
  $scope.goBackToSetUp = goBackToSetUp;
  function goBackToSetUp() {
    delete $scope.training;
    $scope.questionNumberOnTraining = 1;
    $scope.traininIsFinished = false;
    $location.path("/"+$routeParams.lang+"/training");
    window.onbeforeunload = null;
    $scope.numberOfQuestionsOnTraining = {
      num: 1
    };
    $scope.iQ = false;
    delete $scope.keywords;
    $scope.selectedKeywords = [];
    delete $chip;
  }


  /*Function to finish the training*/
  $scope.endTraining = endTraining;
  function endTraining() {
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
          $scope.traininIsFinished = true;
          window.onbeforeunload = null;
        });
  }

  /*RootScope functions*/
  /*Event to go on during the training mode*/
  var doYouWannaGoOn = $rootScope.$on("doYouWannaGoOn", function(event, args) {
      if(!args) {
        alert = $mdDialog.confirm()
            .title($rootScope.listOfKeys.attention)
            .content($rootScope.listOfKeys.areYouSureToGoOn)
            .ok($rootScope.listOfKeys.yesGoOn)
            .cancel($rootScope.listOfKeys.dontGoOn);
        $mdDialog
            .show( alert )
            .then(function() {
              checkIfICouldGoOn()
            });
      }
      else {
        checkIfICouldGoOn()
      }

  });
  $scope.$on('$destroy', doYouWannaGoOn);


  /*Event to save the current question in the TrainingModeModel*/
  var saveTheQuestion = $rootScope.$on("saveTheQuestion", function(event, question) {
      $scope.training.addQuestion(question);
  });
  $scope.$on('$destroy', saveTheQuestion);

  /*Event to go back to the set up training*/
  var backToTheSetUpTraining = $rootScope.$on("backToTheSetUpTraining", function(event, args) {
      $scope.traininIsFinished = true;
      window.onbeforeunload = null;
  });
  $scope.$on('$destroy', backToTheSetUpTraining);

  /*Private functions*/

  /*Function that checks if yuo could go on or the trainging is over*/
  function checkIfICouldGoOn() {
    var arryOfQuestionsAlreadyAnswered= [];
    $scope.training.getQuestions().forEach(
      function (elem) {
        arryOfQuestionsAlreadyAnswered.push(elem.getId());
      }
    );
    if($scope.training.getNumberOfQuestions() == 0 || $scope.questionNumberOnTraining+1 <= $scope.training.getNumberOfQuestions() )
    {
      //delete $scope.question;
      $rootScope.$emit("loadNewQuestion", {
        language  : $routeParams.lang,
        topic: $scope.training.getArgument(),
        keywords : $scope.training.getKeywords(),
        level  : $rootScope.userLogged.getLevel(),
        alreadyAnswered : arryOfQuestionsAlreadyAnswered
        }
      );
      angular.element(".scrollable").scrollTop(0,0);
    }
    else {
      $scope.traininIsFinished = true;
      window.onbeforeunload = null;
    }
    $scope.questionNumberOnTraining++;
  }

  /*Create filter function for a query string*/
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function (elem) {
      if(angular.lowercase(elem).indexOf(lowercaseQuery)>=0)
        return elem;
    };
  }

  /*Function that download the the topics*/
  function loadTopics(callback) {
    QuestionsService
      .getTopics($routeParams.lang)
      .then(function(result){
          topics = result.data;
          callback(topics);
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
  }

};
