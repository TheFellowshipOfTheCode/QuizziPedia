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

AppController.$inject = ['$scope','$rootScope', '$mdDialog', '$location', '$routeParams', 'UserDetailsModel', 'AuthService', 'LangModel', 'LangService', 'MenuBarModel', 'Utils', '$cookies', '$window'];
function AppController ($scope, $rootScope, $mdDialog, $location, $routeParams, UserDetailsModel, AuthService, LangModel, LangService, MenuBarModel, Utils, $cookies, $window) {
    var lang;
    if(AuthService.isLogged() === "true" && $rootScope.userLogged === undefined) {
        AuthService.giveMe($routeParams.lang)
            .then(function(result){
                if(result.data != false) {
                    //console.log(result.data);
                    $rootScope.userLogged = new UserDetailsModel(result.data.name, result.data.surname, result.data.email, "", result.data.username, "" , result.data.experienceLevel, result.data.privilege, result.data._id);
                    $rootScope.directivesChoose= MenuBarModel.getDirectives(location, $rootScope.userLogged.getPrivilege());
                    $rootScope.$emit("userDownloaded", true);

                }
                else{
                    $rootScope.error = new ErrorInfoModel("6", result.message, "Errore Login");
                    AuthService.resetCookies();
                    $rootScope.$emit("userDownloaded", false);
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


    if(localStorage.sessionBrowser != sessionStorage.sessionBrowser) {
    alert = $mdDialog.confirm()
        .title("1")
        .content("2")
        .ok("OK")
        .cancel("NO");
    $mdDialog
        .show( alert )
        .then(function() {
          localStorage.sessionBrowser = sessionStorage.sessionBrowser;
        }, function (err){
            window.open('','_self').close()
          });
    }

    if(!localStorage.numberOfPages) {
      localStorage.numberOfPages = 1;
    }

    if (!sessionStorage.sessionBrowser) { // no
      var random = Math.random().toString();
      sessionStorage.sessionBrowser = random;
      localStorage.numberOfPages = parseInt(localStorage.numberOfPages) + 1;
      if(!localStorage.sessionBrowser) { // no
        localStorage.sessionBrowser = sessionStorage.sessionBrowser;
        console.log("Ok sei nella pagina dell'applicazione principale");
      }
      else { //si
          console.log("non si possono avere due pagine dell'applicazione");
      }
    }
    else { // si
      if(localStorage.sessionBrowser) { // si
        if(localStorage.sessionBrowser == sessionStorage.sessionBrowser) { //si
          console.log("Ok sei nella pagina dell'applicazione principale");
          localStorage.numberOfPages = parseInt(localStorage.numberOfPages) + 1;
        }
        else { // no
          console.log("non si possono avere due pagine dell'applicazione");
          localStorage.numberOfPages = parseInt(localStorage.numberOfPages) + 1;
        }
      }
      else { // no
        localStorage.sessionBrowser = sessionStorage.sessionBrowser;
        localStorage.numberOfPages = parseInt(localStorage.numberOfPages) + 1;
        console.log("Setto nuova app principale");
        console.log("Ok sei nella pagina dell'applicazione principale");
      }
    }

    console.log(sessionStorage.sessionBrowser);
    console.log(localStorage.sessionBrowser);
    console.log($cookies.get("sessionBrowser"));
    console.log(localStorage.numberOfPages);

    $(window).unload(function() {
      localStorage.numberOfPages = parseInt(localStorage.numberOfPages) - 1;
      if(localStorage.numberOfPages == 0) {
        delete localStorage.sessionBrowser;
        console.log("cancello localStorage.sessionBrowser");
      }
      else {
        console.log("non cancello localStorage.sessionBrowser");
      }
    });

    var onFocus = function(){
      if(localStorage.sessionBrowser != sessionStorage.sessionBrowser) {
      alert = $mdDialog.confirm()
          .title($rootScope.listOfKeys.attention)
          .content($rootScope.listOfKeys.areYouSureToGoOn)
          .ok($rootScope.listOfKeys.yesGoOn)
          .cancel($rootScope.listOfKeys.dontGoOn);
      $mdDialog
          .show( alert )
          .then(function() {
            localStorage.sessionBrowser = sessionStorage.sessionBrowser;
          }, function (err){
            window.open('','_self').close();
          });
      }
    }
    $window.onfocus = onFocus;

    /*$(window).onfocus = function () {
      if(localStorage.sessionBrowser != sessionStorage.sessionBrowser) {
      alert = $mdDialog.confirm()
          .title($rootScope.listOfKeys.attention)
          .content($rootScope.listOfKeys.areYouSureToGoOn)
          .ok($rootScope.listOfKeys.yesGoOn)
          .cancel($rootScope.listOfKeys.dontGoOn);
      $mdDialog
          .show( alert )
          .then(function() {
            localStorage.sessionBrowser = sessionStorage.sessionBrowser;
          });
      }
    };*/

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

String.prototype.hashCode = function(){
  var hash = 0;
  if (this.length == 0) return hash;
  for (i = 0; i < this.length; i++) {
    char = this.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}
