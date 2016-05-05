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
  downloadNextQuestionTraining();

  /*Scope function*/

  /*Function used during the creation of an empty space question*/
  $scope.splitTheText= function(index,text) {
    delete $scope.temporyObjectForView[index].list2;
    var list1 = [], list2 = [];
    var tempText = text.split(" ");
    $scope.arrayDomande[index].answer.forEach(function(elem) {
      list2.push({hideWord : tempText[elem.parolaNumero]});
      tempText[elem.parolaNumero]= "##TODELETE##";
    });
    $scope.temporyObjectForView[index]={list1,list2, emptySpaceText : tempText};
  }

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
    angular.forEach($scope.arrayDomande[index].answers, function(gived){
      if (gived.selected) albumNameArray.push(gived.text);
    });
    return albumNameArray;
  };

  /*RootScope function*/

  /*Function used to load new question*/
  $rootScope.$on("loadNewQuestion", function(event, args) {
    delete $scope.arrayDomande;
    $scope.objAnswer=[];
    downloadNextQuestionTraining();
  });

  /*Funtion to check if a question is answered */
  $rootScope.$on("isItAnswered", function(event, args) {
    var ok= true;
     if(Object.keys($scope.objAnswer).length != Object.keys($scope.arrayDomande).length) {
       ok = false;
     }
    var answer = $scope.objAnswer;
    $rootScope.$emit("doYouWannaGoOn",ok);
  });

  /*Private question*/

  /*Function to download the new question of the training mode*/
  function downloadNextQuestionTraining() {
    QuestionsService
      .getNextQuestion($routeParams.lang,"Patente")
      .then(function(result){
        $scope.question= new QuestionItemModel(result.data.id,"io", "non so", result.data.language, result.data.question);
        $scope.arrayDomande=$scope.question.getQuestion();
        $scope.objAnswer=[];
        delete $scope.temporyObjectForView;
        $scope.temporyObjectForView= [];
        $scope.arrayDomande.forEach(function(elem, index) {
          var list1 = [], list2 = [];
          elem.answers.forEach(function(elem, key) {
            list1.push({});
            list2.push(elem);

          });
          $scope.temporyObjectForView[index]={list1,list2};
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
