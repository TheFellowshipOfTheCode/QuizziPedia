/*******************************************************************************
* Name: QuizziPedia::Front-End::Views::PasswordForgotController
* Description:
* Relations with other classes:
* + PasswordForgoView
* + AuthService
* Creation data: 27-04-2016
* Author: Simone Magagna
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: PasswordForgotController_20160427
* Update data: 27-04-2016
* Description: creazione
* Author: Simone Magagna
*-------------------------------------------------------------------------------
*******************************************************************************/

app.controller('PasswordForgotController', PasswordForgotController);

PasswordForgotController.$inject = ['$scope', '$location', '$mdDialog', '$routeParams', 'AuthService'];

function PasswordForgotController ($scope, $location, $routeParams, $mdDialog, AuthService) {

    $scope.user = {
        email: ''
    }

    $scope.logIn = function() {
        $location.path('/'+$routeParams.lang+'/login');
    }

    $scope.passwordForgot = function (user) {
        AuthService.getNewPassword(user.email)

            .success(function(result){
                $location.path('/'+$routeParams.lang+'/login');
            })

            .error(function(response){
                console.error('Error', response.status, response.data);
                $rootScope.error = new ErrorInfoModel("4", "Il recupero password non è andato a buon fine", "Recupero password " +
                    "non effettuato");

            })
    }
}
