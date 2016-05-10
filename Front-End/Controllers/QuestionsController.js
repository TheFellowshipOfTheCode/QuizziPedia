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

  /*Scope function*/

  /*Function used to drag and drop element on monitor*/
  $scope.dragnNDropQuestions = dragnNDropQuestions;
  function dragnNDropQuestions(event, ui,index,type,obj) {
    $scope.addAnswer(index,type,obj)
  }

  /*Function used to create the array of answer given*/
  $scope.addAnswer = addAnswer;
  function addAnswer(index,type,obj){
    $scope.objAnswer[index]={"type": type, "answerGiven" :  obj}
  };

  /*Function used to save the elements selected in multiple choice answer*/
  $scope.save = save;
  function save(index){
    var albumNameArray = [];
    angular.forEach($scope.question.getQuestion()[index].answers, function(gived){
      if (gived.selected) albumNameArray.push(gived.text);
    });
    return  albumNameArray;
  };

  /*RootScope function*/

  /*Function used to load new question*/
  var loadNewQuestion =$rootScope.$on("loadNewQuestion", function(event, args) {
    checkAnswer($scope.question, $scope.objAnswer, args.topic);
    $scope.objAnswer=[];
    delete $scope.question;
    downloadNextQuestionTraining(args);
  });
  $scope.$on('$destroy', loadNewQuestion);

  /*Function used to load new question*/
  var checkAnswerEvent =$rootScope.$on("checkAnswerEvent", function(event, args) {
    checkAnswer($scope.question, $scope.objAnswer, args.topic);
  });
  $scope.$on('$destroy', checkAnswerEvent);

  /*Private question*/

  /*Function to download the new question of the training mode*/
  function downloadNextQuestionTraining(nextQuestion) {
    QuestionsService
      .getNextQuestion($routeParams.lang, nextQuestion)
      .then(function(result){
        $scope.question= new QuestionItemModel(result.data._id,result.data.author, result.data.makeWith, result.data.language, result.data.question,result.data.keywords);
        $rootScope.$emit("saveTheQuestion", $scope.question);
        $scope.objAnswer=[];
        delete $scope.temporyObjectForView;
        $scope.temporyObjectForView= [];
        $scope.question.getQuestion().forEach(function(elemA, index) {
          var list1 = [], list2 = [];
          var tempText;
          var text;
          if(elemA.type == "spaziVuoti") {
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
              if(elemA.type == "collegamento"){
                if(elemB.text2 != undefined) {
                  list2.push({"text2":elemB.text2});
                }
                if(elemB.url2 != undefined) {
                  list2.push({"url2" : elemB.url2});
                }
              }
              else {
                list2.push(elemB);
              }
            }

          });

          $scope.objAnswer[index]={"type": elemA.type, "answerGiven" :  list2};

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
            })
            .then(function(){
              $rootScope.$emit("backToTheSetUpTraining");
            });
        }
    );
  }

  /*Function to check the given answers*/
  function checkAnswer(question, answersGiven, topic) {
    if(question != undefined) {
      if(Object.keys(question.getQuestion()).length == Object.keys(answersGiven).length) {
        var partsOfQuestion = question.getQuestion();
        var answerCheckA= true;
        partsOfQuestion.forEach(function(elem, index) {
          var answerCheckB= true;
          switch(elem.type) {
            case "ordinamentoStringhe":
            case "ordinamentoImmagini":
                var answersCopy = elem.answers;
                answersCopy.sort(function compare(a,b) {
                  if (a.position < b.position)
                    return -1;
                  else if (a.position > b.position)
                    return 1;
                  else
                    return 0;
                });
                answersCopy.forEach(function (answer, indexAnswerGiven) {
                  if(answer.position != answersGiven[index].answerGiven[indexAnswerGiven].position && answerCheckB) {
                    answerCheckB = false;
                  }
                });
                console.log(answerCheckB);
                break;
            case "collegamento":
                console.log("collegamento");
                elem.answers.forEach(function (answer, indexAnswerGiven) {
                  if(answer.text2 != undefined && (answersGiven[index].answerGiven[indexAnswerGiven].text2 === undefined || (answer.text2 != answersGiven[index].answerGiven[indexAnswerGiven].text2 && answerCheckB))) {
                    answerCheckB = false;
                  }
                  if(answer.url2 != undefined && (answersGiven[index].answerGiven[indexAnswerGiven].url2 === undefined || (answer.url2 != answersGiven[index].answerGiven[indexAnswerGiven].url2 && answerCheckB))) {
                    answerCheckB = false;
                  }
                });
                console.log(answerCheckB);
                break;
            case "veroFalso":
                console.log("veroFalso");
                elem.answers.forEach(function (answer) {
                  if(answer.isItRight != answersGiven[index].answerGiven && answerCheckB) {
                    answerCheckB = false;
                  }
                });
                console.log(answerCheckB);
                break;
            case "rispostaMultipla":
                console.log("rispostaMultipla");
                answersGiven[index].answerGiven.forEach(function (answerGived) {
                  elem.answers.forEach(function (answer) {
                    if(answerGived == answer.text) {
                      if(answer.isItRight == false && answerCheckB) {
                        answerCheckB = false;
                      }
                    }
                  });
                });
                console.log(answerCheckB);
                break;
            case "spaziVuoti":
                console.log("spaziVuoti");
                var text1 = elem.questionText;
                var tempText2 = text1.split(" ");
                var answersSorted = elem.answers;
                answersSorted.sort(function compare(a,b) {
                  if (a.parolaNumero < b.parolaNumero)
                    return -1;
                  else if (a.parolaNumero > b.parolaNumero)
                    return 1;
                  else
                    return 0;
                });
                var arrayCopy = answersGiven[index].answerGiven;
                var arrayCopy = arrayCopy.filter(function () {
                  if(elem != null) {
                    return elem;
                  }
                });

                answersSorted.forEach(function (answer, indexAnswerGiven) {
                  if(tempText2[answer.parolaNumero] != arrayCopy[indexAnswerGiven].hideWord && answerCheckB) {
                    answerCheckB = false;
                  }
                });
                console.log(answerCheckB);
                break;
          }

          if(answerCheckA) {
            answerCheckA = answerCheckB;
          }

        });
      }
      $rootScope.$emit("addResult", answerCheckA);
      console.log(answerCheckA);
      if($rootScope.userLogged != undefined) {
        QuestionsService.updateStatisticsUser($routeParams.lang,
          {
              language: $routeParams.lang,
              userId: $rootScope.userLogged.getId(),
              topic: topic,
              difficultyLevel: $scope.question.getLevel(),
              isCorrected: answerCheckA
          }
        );
      }
      /* Update question statistics
      var level = 500;
      if($rootScope.userLogged != undefined) {
        level = $rootScope.userLogged.getLevel();
      }
      QuestionsService.updateStatisticsQuestion(
        {
            questionId: $scope.question.getId(),
            userLevel: level,
            isCorrected: answerCheckA
        }
      );*/
    }
  }

};
