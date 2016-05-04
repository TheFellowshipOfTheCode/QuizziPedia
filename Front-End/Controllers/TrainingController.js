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
  $scope.training= {questionNumber:1};
  $scope.newQuestion= function() {
    $rootScope.$emit("isItAnswered");
  };

    $rootScope.$on("doYouWannaGoOn", function(event, args) { //SI
      if(!args) {
        alert = $mdDialog.confirm()
            .title($rootScope.listOfKeys.attention)
            .content($rootScope.listOfKeys.areYouSureToGoOn)
            .ok($rootScope.listOfKeys.yesLogoutMe)
            .cancel($rootScope.listOfKeys.dontLogoutMe);
        $mdDialog
            .show( alert )
            .then(function() {
              $scope.training.questionNumber++;
              $rootScope.$emit("loadNewQuestion");

            });
      }
      else {
        $scope.training.questionNumber++;
        $rootScope.$emit("loadNewQuestion");
      }
    });
};
