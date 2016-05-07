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

app.controller('QuestionsController', QuestionsController);

QuestionsController.$inject = ['$scope', '$rootScope', '$timeout', '$mdDialog', '$location', '$routeParams', 'ErrorInfoModel', 'UserDetailsModel', 'QuestionItemModel', 'QuestionsService'];
function QuestionsController ($scope, $rootScope, $timeout,  $mdDialog, $location, $routeParams, ErrorInfoModel, UserDetailsModel, QuestionItemModel, QuestionsService ) {

  /*Initial set-up: at the first run of the controller*/
  //downloadNextQuestionTraining();
  console.log("sono qui");

  /*Scope function*/

  /*Function used to drag and drop element on monitor*/
  $scope.dragnNDropQuestions= function(event, ui,index,typeDomanda,obj) {
    $scope.addAnswer(index,typeDomanda,obj)
  }

  /*Function used to create the array of answer given*/
  $scope.addAnswer= function(index,typeDomanda,obj){
    $scope.objAnswer[index]={"typeDomanda": typeDomanda, answerGiven: obj}
  };

  /*Function used to save the elements selected in multiple choice answer*/
  $scope.save = function(index){
    var albumNameArray = [];
    angular.forEach($scope.question.getQuestion()[index].answers, function(gived){
      if (gived.selected) albumNameArray.push(gived.text);
    });
    return albumNameArray;
  };

  /*RootScope function*/

  /*Function used to load new question*/
/*
{
        language: lang,
        topic: topic,
        keywords:["Strada","Guida"],
        level:500,
        alreadyAnswered:["5729c0fdc80eb653c3029c4e"]
    }
*/

  $rootScope.$on("loadNewQuestion", function(event, args) {
    console.log("catturato");
    $scope.objAnswer=[];
    console.log(args);
    downloadNextQuestionTraining(args);
  });

  /*Funtion to check if a question is answered */
  $rootScope.$on("isItAnswered", function(event, args) {
    console.log("catturo isItAnswered");
    var ok= true;
     if(Object.keys($scope.objAnswer).length != Object.keys($scope.question.getQuestion()).length) {
       ok = false;
     }
    var answer = $scope.objAnswer;
    $rootScope.$emit("doYouWannaGoOn",ok);
  });

  /*Private question*/

  /*Function to download the new question of the training mode*/
  function downloadNextQuestionTraining(nextQuestion) {
    QuestionsService
      .getNextQuestion($routeParams.lang, nextQuestion)
      .then(function(result){
        console.log(result);
        $scope.question= new QuestionItemModel(result.data.id,"io", "non so", result.data.language, result.data.question,result.data.keywords);
        $scope.objAnswer=[];
        delete $scope.temporyObjectForView;
        $scope.temporyObjectForView= [];
        $scope.question.getQuestion().forEach(function(elemA, index) {
          var list1 = [], list2 = [];
          var tempText;
          var text;
          if(elemA.type == "spaziVuoti") {
            console.log(elemA);
            text = elemA.questionText;
            tempText = text.split(" ");
          }
          elemA.answers.forEach(function(elemB, key) {
            if(elemA.type == "spaziVuoti") {
              list2.push({hideWord : tempText[elemB.parolaNumero]});
              tempText[elemB.parolaNumero]= "##TODELETE##";
            }
            else {
              list1.push({});
              list2.push(elemB);
            }

          });

          if(elemA.type == "spaziVuoti") {
            $scope.temporyObjectForView[index]={list1,list2, emptySpaceText : tempText};
          }
          else {
            $scope.temporyObjectForView[index]={list1,list2};
          }

        });
      },
      function (err) {
        $scope.error = new ErrorInfoModel(err.data.code,  err.data.message, err.data.title);
        alert =
          $mdDialog
            .alert()
            .title($scope.error.getTitle())
            .content($scope.error.getCode()+": "+$scope.error.getMessage())
            .ok('OK');
        $mdDialog
            .show( alert )
            .finally(function() {
                alert = undefined;
            });
        }
    );
  }
};
