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
        AuthService.signIn(email, password)
            .success(function(result){
                $rootScope.user = new UserDetailsModel(result.user.name, result.user.surname);
                $location.path("/");
            })
            .error(function(response){
                console.error('Error', response.status, response.data);
                $rootScope.error = new ErrorInfoModel("1", "Errore nella Login", "Login non effettuata");

            })

    }
}



