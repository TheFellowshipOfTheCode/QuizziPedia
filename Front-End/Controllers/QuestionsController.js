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

        $scope.arrayDomande=domanda.getCurrentPieceOfQuestions(cont);

        console.log($scope.arrayDomande);

        //var objAnswer= [];

        $scope.objAnswer=[]; //SI


        $scope.addAnswer= function(index,typeDomanda,obj){  //SI

          //NO
          $scope.indice=index;
          $scope.tipodomanda=typeDomanda;
          $scope.rispostedate=obj;

          //SI
          $scope.objAnswer[index]={"typeDomanda": typeDomanda, answerGiven: obj}

          console.log($scope.objAnswer);
        };

        $scope.save = function(index){ //SI
          console.log(index);
          var albumNameArray = [];
          angular.forEach($scope.arrayDomande[index].answer, function(gived){
            console.log(gived);
            if (gived.selected) albumNameArray.push(gived.text);
          });
          console.log(albumNameArray);
          return albumNameArray;
        };

        $rootScope.$on("loadNewQuestion", function(event, args) { //SI
          console.log("catturo");
          console.log(args);
          delete $scope.arrayDomande;
          $scope.objAnswer=[];
          cont++;
          $scope.arrayDomande=domanda.getCurrentPieceOfQuestions(cont);

        });

        console.log($scope.variabile);

};
