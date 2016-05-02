/*******************************************************************************
 * Name: QuizziPedia::Front-End::Controllers::LoginController;
 * Description: questa classe permette di gestire l'autenticazione dell'utente al sistema;
 *
 * Relations with other classes:
 * + LoginModelView
 * + AuthService
 *
 * Creation data: 28-04-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: LoginController_20160428
 * Update data: 28-04-2016
 * Description: Creato il controller;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/
app.controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$rootScope', '$routeParams', 'AuthService', '$location', '$mdDialog', '$cookies', 'UserDetailsModel', 'ErrorInfoModel'];

function LoginController($scope, $rootScope, $routeParams, AuthService, $location, $mdDialog, $cookies, UserDetailsModel, ErrorInfoModel){

    $scope.logIn = function(email, password){
        
        if(!email || email.length<1 || !password || password.length<1) return;
        AuthService.signIn(email, password, $routeParams.lang)
            .then(function(result){
                console.log(result.data.user);
                if(result.data.user != undefined) {
                    $rootScope.userLogged = new UserDetailsModel(result.data.user.name, result.data.user.surname, result.data.user.email, "", result.data.user.username, "" , result.data.user.experienceLevel, result.data.user.privilege, result.data.user._id);
                    console.log($rootScope.userLogged);
                    $location.path('/' + $routeParams.lang + '/home');
                }
                else{
                    $rootScope.error = new ErrorInfoModel("6", result.message, "Errore Login");
                    console.log($rootScope.error.getMessage());
                }

            })
            ,function (err){
                console.error('Entra' + err);
                $rootScope.error = new ErrorInfoModel("1", "Errore nella Login", "Login non effettuata");
            }

    }
    $scope.goToPasswordForgotPage = function () {
        $location.path('/'+$routeParams.lang+'/passwordforgot');
    };



    
}



