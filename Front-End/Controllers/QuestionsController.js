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

QuestionsController.$inject = ['$scope', '$rootScope', '$timeout', '$mdDialog', '$location', '$routeParams', 'ErrorInfoModel', 'UserDetailsModel', 'QuestionItemModel'];
function QuestionsController ($scope, $rootScope, $timeout,  $mdDialog, $location, $routeParams, ErrorInfoModel, UserDetailsModel, QuestionItemModel ) {

        var cont=0; //NO

        var domanda= new QuestionItemModel(); //SI viene passato un oggetto dal service e la domanda

        downloadQuestion(cont);

        $scope.splitTheText= function(index,text) {
          delete $scope.temporyObjectForView[index].list2;


          var list1 = [], list2 = [];
          var tempText = text.split(" ");
          $scope.arrayDomande[index].answer.forEach(function(elem) {
            list1.push("a");
            list2.push({hideWord : tempText[elem.parolaNumero]});
            tempText[elem.parolaNumero]= "##TODELETE##";
          });

          $scope.temporyObjectForView[index]={list1,list2, emptySpaceText : tempText};

        }

        $scope.dragnNDropQuestions= function(event, ui,index,typeDomanda,obj) {
          $scope.addAnswer(index,typeDomanda,obj)
        }

        $scope.addAnswer= function(index,typeDomanda,obj){  //SI

          //NO
          $scope.indice=index;
          $scope.tipodomanda=typeDomanda;
          $scope.rispostedate=obj;

          //SI
          $scope.objAnswer[index]={"typeDomanda": typeDomanda, answerGiven: obj}

        };

        $scope.save = function(index){ //SI
          var albumNameArray = [];
          angular.forEach($scope.arrayDomande[index].answer, function(gived){
            if (gived.selected) albumNameArray.push(gived.text);
          });
          return albumNameArray;
        };

        $rootScope.$on("loadNewQuestion", function(event, args) { //SI
          delete $scope.arrayDomande;
          $scope.objAnswer=[];
          cont++;
          downloadQuestion(cont);

        });

        $rootScope.$on("isItAnswered", function(event, args) { //SI
          var ok= true;

           if(Object.keys($scope.objAnswer).length != Object.keys($scope.arrayDomande).length) {
             ok = false;
           }

          var answer = $scope.objAnswer;
          $rootScope.$emit("doYouWannaGoOn",ok);
        });



        /**/

        function downloadQuestion(cont) {
          $scope.arrayDomande=domanda.getCurrentPieceOfQuestions(cont);


          $scope.objAnswer=[]; //SI


          /*set-up drag and drop questions*/
          delete $scope.list1;
          delete $scope.list2;
          delete $scope.temporyObjectForView;
          $scope.list1 = [];
          $scope.list2 = [];
          $scope.temporyObjectForView= [];

          $scope.arrayDomande.forEach(function(elem, index) {
            var list1 = [], list2 = [];
            elem.answer.forEach(function(elem, key) {
              list1.push({});
              list2.push(elem);

            });
            $scope.temporyObjectForView[index]={list1,list2};
          });

          delete $scope.emptySpaceText;
          $scope.emptySpaceText = [];


        }




};
