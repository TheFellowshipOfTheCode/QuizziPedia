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
    $scope.training.questionNumber++;
    console.log($rootScope.objAnswer);
    $rootScope.$emit("isItAnswered","ciao");
    }

  /*  $scope.canIgoOn= function(objAnswer) {


      alert = $mdDialog.confirm()
          .title($rootScope.listOfKeys.logOut)
          .content($rootScope.listOfKeys.areYouSure)
          .ok($rootScope.listOfKeys.yesLogoutMe)
          .cancel($rootScope.listOfKeys.dontLogoutMe);
      $mdDialog
          .show( alert )
          .finally(function() {
              alert = undefined;
          })
          .then(function() {
            $scope.training.questionNumber++;
            $rootScope.$emit("loadNewQuestion","ciao");

          });

      }
*/
      $rootScope.$on("doYouWannaGoHome", function(event, args) { //SI
        if(!args) {
          alert = $mdDialog.confirm()
              .title($rootScope.listOfKeys.logOut)
              .content($rootScope.listOfKeys.areYouSure)
              .ok($rootScope.listOfKeys.yesLogoutMe)
              .cancel($rootScope.listOfKeys.dontLogoutMe);
          $mdDialog
              .show( alert )
              .finally(function() {
                  alert = undefined;
              })
              .then(function() {
                $scope.training.questionNumber++;
                $rootScope.$emit("loadNewQuestion","ciao");

              });
        }
      });
};
