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

TrainingController.$inject = ['$scope', '$rootScope', '$timeout', '$mdDialog', '$location', '$routeParams', 'ErrorInfoModel', 'UserDetailsModel', 'TrainingModeModel'];
function TrainingController ($scope, $rootScope, $timeout,  $mdDialog, $location, $routeParams, ErrorInfoModel, UserDetailsModel, TrainingModeModel ) {

  /*Public variables on Scope*/
  $scope.training= {questionNumber:1};

  /*Scope functions*/
  /*Evet to check if a question is aswered*/
  $scope.newQuestion= function() {
    $rootScope.$emit("isItAnswered");
  };

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
            $scope.training.questionNumber++;
            $rootScope.$emit("loadNewQuestion");
            angular.element(".scrollable").scrollTop(0,0);
          });
    }
    else {
      $scope.training.questionNumber++;
      $rootScope.$emit("loadNewQuestion");
      angular.element(".scrollable").scrollTop(0,0);
    }
  });
};
