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

QuestionsController.$inject = ['$scope', '$rootScope', '$timeout', '$mdDialog', '$location', '$routeParams', 'ErrorInfoModel', 'UserDetailsModel', 'QuestionItemModel', 'QuestionsService', 'Utils'];
function QuestionsController ($scope, $rootScope, $timeout,  $mdDialog, $location, $routeParams, ErrorInfoModel, UserDetailsModel, QuestionItemModel, QuestionsService, Utils ) {

  /*Initial set-up: at the first run of the controller*/
  //downloadNextQuestionTraining();
  //console.log("sono qui");

  var contt= 0;

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

  var istA =$rootScope.$on("loadNewQuestion", function(event, args) {
    console.log("catturato");
    $scope.objAnswer=[];
    //console.log(args);
    delete $scope.question;
    contt++;
    downloadNextQuestionTraining(args, contt);
  });

  $scope.$on('$destroy', istA);


  /*Funtion to check if a question is answered */
  var istB = $rootScope.$on("isItAnswered", function(event, args) {
    //console.log("catturo isItAnswered");
    var ok= true;
     if(Object.keys($scope.objAnswer).length != Object.keys($scope.question.getQuestion()).length) {
       ok = false;
     }
    var answer = $scope.objAnswer;
    $rootScope.$emit("doYouWannaGoOn",ok);
  });

  $scope.$on('$destroy', istB);




  /*Private question*/

  /*Function to download the new question of the training mode*/
  function downloadNextQuestionTraining(nextQuestion, cont) {
    //delete $scope.question;
    //console.log(nextQuestion);
    console.log("C entro qui per la "+cont+" volta");
    QuestionsService
      .getNextQuestion($routeParams.lang, nextQuestion)
      .then(function(result){
        //console.log(result);
        $scope.question= new QuestionItemModel(result.data._id,result.data.author, result.data.makeWith, result.data.language, result.data.question,result.data.keywords);
        console.log($scope.question);
        $rootScope.$emit("saveTheQuestion", $scope.question);
        $scope.objAnswer=[];
        delete $scope.temporyObjectForView;
        $scope.temporyObjectForView= [];
        $scope.question.getQuestion().forEach(function(elemA, index) {
          var list1 = [], list2 = [];
          var tempText;
          var text;
          if(elemA.type == "spaziVuoti") {
            //console.log(elemA);
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

          //console.log(list2);

          list2 = Utils.shuffle(list2);

          //console.log(list2);

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
