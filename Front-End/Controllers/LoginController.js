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
  AuthService.signIn(email, password, function (response) {
   if (response.success) {
       $cookies.put('logged', true);
    $rootScope.user = new UserDetailsModel();
    var lang = $routeParams.lang;
    $location.path('/' + lang);
   } else {
        var error = new ErrorInfoModel("1", "Errore nella Login", "Login non effettuata");
   }
  });

 }
}



