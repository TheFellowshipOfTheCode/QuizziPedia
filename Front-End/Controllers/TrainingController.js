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

  /*Evet to check if a question is aswered*/
  $scope.newQuestion= newQuestion;
  function newQuestion() {
    $rootScope.$emit("isItAnswered");
  };

  /*Function that store the topic choose*/
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

  /*RootScope functions*/
  /*Event to go on during the training mode*/
  $rootScope.$on("doYouWannaGoOn", function(event, args) {
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

  /*Event to go on during the training mode*/
  $rootScope.$on("saveTheQuestion", function(event, question) {
    console.log("catturo: salvo la domanda");
    console.log(question.getKeywords());
    console.log(question.getId());
      $scope.training.addQuestion(question);
      console.log($scope.training.getQuestions());
  });


  /*Private functions*/

  function addId(elem) {
    console.log(elem);
    return elem.getId();
  }

  /*Function that checks if yuo could go on or the trainging is over*/
  function checkIfICouldGoOn() {
    var arryOfQuestionsAlreadyAnswered= [];
    $scope.training.getQuestions().forEach(
      function (elem) {
        arryOfQuestionsAlreadyAnswered.push(elem.getId());
      }
    );
    console.log(arryOfQuestionsAlreadyAnswered);

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
      console.log("allenamento finito");
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
