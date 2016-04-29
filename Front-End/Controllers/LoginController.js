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
     var result = AuthService.signIn(email, password);
     return result
         .then(function(data){
            return new UserDetailsModel(data.name, data. surname);
     })
         .catch(function(response){
            console.error('Gists error', response.status, response.data);
            return new ErrorInfoModel("1", "Errore nella Login", "Login non effettuata");

 })
/*
OPPURE COSì, DA VEDERE
      if (response.success) {
       $cookies.put('logged', true);
    $rootScope.user = new UserDetailsModel();
    var lang = $routeParams.lang;
    $location.path('/' + lang);
   } else {
        var error = new ErrorInfoModel("1", "Errore nella Login", "Login non effettuata");
   }
  });
*/

 }
}



