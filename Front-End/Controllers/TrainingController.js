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


  console.log($rootScope.userLogged);

  /*Private variables*/
  var keepOnMind = 0;

  /*Public variables on Scope*/
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
  $scope.starTraining = function (argument, keywords) {
    if($scope.iQ) {
      $scope.numberOfQuestionsOnTraining = {
        num: 0
      };
    }
    console.log(argument);
    console.log(keywords);
    $scope.training = new TrainingModeModel(argument, keywords, $scope.numberOfQuestionsOnTraining.num);
    /*{
            language: lang,
            topic: topic,
            keywords:["Strada","Guida"],
            level:500,
            alreadyAnswered:["5729c0fdc80eb653c3029c4e"]
        }*/
    $rootScope.$emit("loadNewQuestion", {
      language  : $routeParams.lang,
      topic: $scope.training.getArgument(),
      keywords : $scope.training.getKeywords(),
      level  : $rootScope.userLogged.getLevel(),
      alreadyAnswered : [] }
    );
    console.log("arrivo qui");
  };


  $scope.setInfiniteQuestion = function(infiniteQuestion) {
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
  $scope.newQuestion= function() {
    //console.log("ci clicco");
    $rootScope.$emit("isItAnswered");
  };

  /*Function that store the topic choose*/
  $scope.updateSelectedTopic= function(topic) {
    $scope.selectedTopicOnMind = topic;
    console.log(topic);
    console.log($scope.selectedTopicOnMind);
  };

  // Search for keywords.
  $scope.querySearch = querySearch;
  function querySearch (query) {
    var results = query ? $scope.keywords.filter(createFilterFor(query)) : [];
    return results;
  }

  //Return the proper object when the append is called.
  $scope.transformKey = transformKey;
  function transformKey(key) {
    // If it is an object, it's already a known key
    if (angular.isObject(key)) {
      return key;
    }

    // Otherwise, create a new one, only in autocompleteDemoRequireMatch = false;
    return { name: key, type: $rootScope.listOfKeys.newOne }
  }

  $scope.loadKeywords = function (topic) {
    if(topic != undefined) {
      console.log($scope.selectedTopicOnMind);
    var keys;
    QuestionsService
      .getKeywords($routeParams.lang, topic)
      .then(function(result){
          keys = result.data;
          //console.log($scope.keywords);
          delete $scope.keywords;
          $scope.keywords = result.data;
          //console.log($scope.keywords);
          $scope.selectedKeywords = [];
          delete $chip;
          //callback(keys);
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
    //console.log("Emesso");
      if(!args) {
        alert = $mdDialog.confirm()
            .title($rootScope.listOfKeys.attention)
            .content($rootScope.listOfKeys.areYouSureToGoOn)
            .ok($rootScope.listOfKeys.yesGoOn)
            .cancel($rootScope.listOfKeys.dontGoOn);
        $mdDialog
            .show( alert )
            .then(function() {
              if($scope.questionNumberOnTraining+1 > $scope.training.getNumberOfQuestions() )
              {
                //console.log($scope.training.getNumberOfQuestions());
                if($scope.training.getNumberOfQuestions() == 0) {
                  $rootScope.$emit("loadNewQuestion", {
                    language  : $routeParams.lang,
                    topic: $scope.training.getArgument(),
                    keywords : $scope.training.getKeywords(),
                    level  : $rootScope.userLogged.getLevel(),
                    alreadyAnswered : [] }
                  );
                  angular.element(".scrollable").scrollTop(0,0);
                }
                else {
                  //console.log("allenamento terminato1");
                }
              }
              else {
                //console.log("continuo1");
                $rootScope.$emit("loadNewQuestion", {
                  language  : $routeParams.lang,
                  topic: $scope.training.getArgument(),
                  keywords : $scope.training.getKeywords(),
                  level  : $rootScope.userLogged.getLevel(),
                  alreadyAnswered : [] }
                );
                angular.element(".scrollable").scrollTop(0,0);
              }
              $scope.questionNumberOnTraining++;
            });
      }
      else {
        if($scope.questionNumberOnTraining+1 > $scope.training.getNumberOfQuestions() )
        {
          //console.log($scope.training.getNumberOfQuestions());
          if($scope.training.getNumberOfQuestions() == 0) {
            $rootScope.$emit("loadNewQuestion",  {
              language  : $routeParams.lang,
              topic: $scope.training.getArgument(),
              keywords : $scope.training.getKeywords(),
              level  : $rootScope.userLogged.getLevel(),
              alreadyAnswered : [] }
            );
            angular.element(".scrollable").scrollTop(0,0);
          }
          else {
            //console.log("allenamento terminato1");
          }
        }
        else {
          //console.log("continuo2");
          $rootScope.$emit("loadNewQuestion",  {
            language  : $routeParams.lang,
            topic: $scope.training.getArgument(),
            keywords : $scope.training.getKeywords(),
            level  : $rootScope.userLogged.getLevel(),
            alreadyAnswered : [] }
          );
          angular.element(".scrollable").scrollTop(0,0);
        }
        $scope.questionNumberOnTraining++;
      }

  });

  /*Private functions*/

  //Create filter function for a query string
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function (elem) {
      if(angular.lowercase(elem).indexOf(lowercaseQuery)>=0)
        return elem;
    };
  }


  function loadTopics(callback) {
    QuestionsService
      .getTopics($routeParams.lang)
      .then(function(result){
        //console.log(result);
        //console.log(result.data);
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
