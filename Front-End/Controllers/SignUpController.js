/*******************************************************************************
* Name: QuizziPedia::Front-End::Views::SingUpController
* Description: controller che gestisce l'operazione di registrazione;
*
*
* Creation data: 17-04-2016
* Author: Simone Magagna
********************************************************************************
* Updates history
 * -------------------------------------------------------------------------------
 * ID: SingUpController_20160526;
 * Update data: 26-05-2016;
 * Description: Aggiornato controller
 * Author: Franco Berton.
*-------------------------------------------------------------------------------
* ID: SingUpController_20160417
* Update data: 17-05-2016
* Description: Inserimento funzione signUp(), logIn();
* Author: Alberto Ferrara
*-------------------------------------------------------------------------------
* ID: SingUpController_20160417
* Update data: 17-04-2016
* Description: creazione della classe;
* Author: Simone Magagna
*-------------------------------------------------------------------------------
*******************************************************************************/
app.controller('SignUpController', SignUpController);

SignUpController.$inject = ['$scope', '$rootScope', '$routeParams', 'AuthService', '$location', '$mdDialog', 'ErrorInfoModel','ngMeta'];

function SignUpController ($scope, $rootScope, $routeParams, AuthService, $location, $mdDialog, ErrorInfoModel,ngMeta) {
    if ($rootScope.listOfKeys!=undefined){
        metaData();
    }
    var langDownloaded = $rootScope.$on("langDownloaded", function(event, args) {
        if(args){
            metaData();
        }
    });
    $scope.$on('$destroy', langDownloaded);

    function metaData() {
        ngMeta.setTitle($rootScope.listOfKeys.signUp);
        ngMeta.setTag('description',$rootScope.listOfKeys.signUpDescription);
    }

    $scope.user = {
            name: '',
            surname: '',
            email: '',
            username: '',
            password: '',
            passwordCheck: ''
        };

        $scope.logIn = function() {
            $location.path('/'+$routeParams.lang+'/login');
        };

        $scope.signUp = function(user) {
            if(user.password !== user.passwordCheck){
                alert = $mdDialog.alert()
                    .title($rootScope.listOfKeys.errorPasswordProfileManagement)
                    .content($rootScope.listOfKeys.passwordsAreDifferent)
                    .ok($rootScope.listOfKeys.closeIt);
                $mdDialog
                    .show( alert )
                    .finally(function() {
                        alert = undefined;
                    });
            }
            else {
                if(user.email!="") {
                  $rootScope.isDownloading=true;
                  AuthService.signUp(user.username, user.password, user.email, user.name, user.surname, $routeParams.lang)
                      .then(function (result) {
                          if (result.status == "200") {
                              $rootScope.isDownloading=false;
                              alert = $mdDialog.alert()
                                  .title($rootScope.listOfKeys.hi + " " + user.name + " " + user.surname)
                                  .content($rootScope.listOfKeys.correctSignUp)
                                  .ok($rootScope.listOfKeys.closeIt);
                              $mdDialog
                                  .show(alert)
                                  .finally(function () {
                                      alert = undefined;
                                  });
                              $location.path('/' + $routeParams.lang + '/login');
                          }
                      }, function (err) {
                          $rootScope.isDownloading=false;
                              alert = $mdDialog.alert()
                                  .title(err.data.title)
                                  .content(err.data.message)
                                  .ok('Chiudi');
                              $mdDialog
                                  .show(alert)
                                  .finally(function () {
                                      alert = undefined;
                                  });
                              $rootScope.error = new ErrorInfoModel(err.data.code, err.data.title, err.data.message);


                        })
                      }
            }
        };


}
