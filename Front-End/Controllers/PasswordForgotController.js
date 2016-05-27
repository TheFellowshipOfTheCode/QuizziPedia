/*******************************************************************************
* Name: QuizziPedia::Front-End::Views::PasswordForgotController
* Description: controller che gestisce il recupero della password;
*
*
* Creation data: 26-04-2016
* Author: Simone Magagna
********************************************************************************
* Updates history
 * -------------------------------------------------------------------------------
 * ID: PasswordForgotController_20160526;
 * Update data: 26-05-2016;
 * Description: Aggiornato controller
 * Author: Franco Berton.
*-------------------------------------------------------------------------------
* ID: PasswordForgotController_20160505;
* Update data: 05-05-2016;
* Description: Aggiunti i metodi logIn() e passwordForgot();
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
* ID: PasswordForgotController_20160426
* Update data: 26-04-2016
* Description: creazione della classe;
* Author: Simone Magagna
*-------------------------------------------------------------------------------
*******************************************************************************/

app.controller('PasswordForgotController', PasswordForgotController);

PasswordForgotController.$inject = ['$scope', '$location', '$mdDialog', '$routeParams', 'AuthService','ngMeta'];

function PasswordForgotController ($scope, $location, $routeParams, $mdDialog, AuthService,ngMeta) {
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
        ngMeta.setTitle($rootScope.listOfKeys.titleLangPasswordForgot);
        ngMeta.setTag('description',$rootScope.listOfKeys.passwordForgotDescription);
    }

    $scope.user = {
        email: ''
    }

    $scope.logIn = function() {
        $location.path('/'+$routeParams.lang+'/login');
    }

    $scope.passwordForgot = function (user) {
        AuthService.getNewPassword(user.email, $routeParams.lang)

            .success(function(result){
                $location.path('/'+$routeParams.lang+'/login');
            })

            .error(function(response){
                $rootScope.error = new ErrorInfoModel("4", "Il recupero password non è andato a buon fine", "Recupero password " +
                    "non effettuato");

            });
    }
}
