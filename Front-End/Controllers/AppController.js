/*******************************************************************************
 * Nome: QuizziPedia::Front-End::Controllers::AppController;
 * Description: questa classe permette di gestire la lingua dell'applicazione e
 * tiene aggiornate le direttive di BreadBarDirective, MenuBarDirective;
 * Creation data: 30-04-2016;
 * Author: Matteo Granzotto;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: AppController_20160502;
 * Update data: 02-05-2016;
 * Description: Scritta la gestione dell'autorizzazione dell'utente;
 * Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: AppController_20160430;
 * Update data: 30-04-2016;
 * Description: Scritta la classe;
 * Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.controller('AppController', AppController);

AppController.$inject = ['$scope','$rootScope', '$mdDialog', '$location', '$routeParams', 'UserDetailsModel', 'AuthService', 'LangModel', 'LangService', 'MenuBarModel'];
function AppController ($scope, $rootScope, $mdDialog, $location, $routeParams, UserDetailsModel, AuthService, LangModel, LangService, MenuBarModel) {
    var lang;
    if(AuthService.isLogged() === "true" && $rootScope.userLogged === undefined) {
        AuthService.giveMe($routeParams.lang)
            .then(function(result){
                if(result.data != false) {
                    console.log(result.data);
                    $rootScope.userLogged = new UserDetailsModel(result.data.name, result.data.surname, result.data.email, "", result.data.username, "" , result.data.experienceLevel, result.data.privilege, result.data._id);
                    $rootScope.directivesChoose= MenuBarModel.getDirectives(location, $rootScope.userLogged.getPrivilege());
                    //$rootScope.$emit("userDownloaded", true);
                    $rootScope.$broadcast("userDownloaded", true);
                }
                else{
                    $rootScope.error = new ErrorInfoModel("6", result.message, "Errore Login");
                    AuthService.resetCookies();
                    //$rootScope.$emit("userDownloaded", false);
                    $rootScope.$broadcast("userDownloaded", false);
                }
            } ,function (err){
                $rootScope.error = new ErrorInfoModel("1", "Errore nella Login", "Login non effettuata");
            });
    }

    checkUrl($location.path());

    if($rootScope.userLogged != undefined) {
        $rootScope.directivesChoose= MenuBarModel.getDirectives(location, $rootScope.userLogged.getPrivilege());
    }

    if($rootScope.systemLang === undefined) {
        $rootScope.systemLang=$routeParams.lang;
        lang = getLang($routeParams.lang);
        lang.then(function(data){
            $rootScope.listOfKeys= data.getListOfKeys();
        });
    }

    function getLang (lang) {
        var setOfKeywords = LangService.getKeywords(lang);
        return setOfKeywords.then(function(data){
            return new LangModel(lang, data);
        });
    }

    function checkUrl(path) {
        var pathLocal = path+ '';
        var variableOfPath= pathLocal.split("/");
        var combination = "noAuth";
        if((variableOfPath.indexOf("login") != -1 || variableOfPath.indexOf("signup") != -1) && $rootScope.userLogged != undefined && $rootScope.userLogged.getPrivilege() != "")
        {
            console.log("Redirect to home");
            //$location.path('/'+$routeParams.lang+'/home');
        }
    }

}
