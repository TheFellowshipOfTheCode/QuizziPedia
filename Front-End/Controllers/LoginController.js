/*******************************************************************************
 * Name: QuizziPedia::Front-End::Controllers::LoginController;
 * Description: questa classe permette di gestire l'autenticazione dell'utente al sistema;
 *
 *
 * Creation data: 27-04-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: LoginController_20160502;
 * Update data: 02-05-2016;
 * Description: Scritto il metodo goToPasswordForgotPage();
 * Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: LoginController_20160427
 * Update data: 27-04-2016
 * Description: Creato il controller con i metodi logIn();
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/
app.controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$rootScope', '$routeParams', 'AuthService', '$location', '$mdDialog', '$cookies', 'UserDetailsModel', 'ErrorInfoModel'];

function LoginController($scope, $rootScope, $routeParams, AuthService, $location, $mdDialog, $cookies, UserDetailsModel, ErrorInfoModel){

    $scope.logIn = function(username, password){

        if(!username || username.length<1 || !password || password.length<1) return;
        AuthService.signIn(username, password, $routeParams.lang)
            .then(function(result){
                if(result.data.user != undefined) {
                    console.log("result" + result.data.user.userImg);

                    var profileImg = false;
                    if(result.data.user.userImg != undefined) {
                      profileImg=result.data.user.userImg;
                    }
                    $rootScope.userLogged = new UserDetailsModel(result.data.user.name, result.data.user.surname, result.data.user.email, profileImg, result.data.user.username, result.data.user.statistics , result.data.user.experienceLevel, result.data.user.privilege, result.data.user._id);
                    $location.path('/' + $routeParams.lang + '/home');
                }
            } ,function (err){
                $scope.error = new ErrorInfoModel(err.data.code,  err.data.message, err.data.title);
                alert = $mdDialog.alert()
                    .title($scope.error.getTitle())
                    .content($scope.error.getCode()+": "+$scope.error.getMessage())
                    .ok('Ok');
                $mdDialog
                    .show( alert )
                    .finally(function() {
                        alert = undefined;
                    });
            });
    }
    $scope.goToPasswordForgotPage = function () {
        $location.path('/'+$routeParams.lang+'/passwordforgot');
    };




}
