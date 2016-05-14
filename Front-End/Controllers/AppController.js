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

AppController.$inject = ['$scope','$rootScope', '$mdDialog', '$location', '$routeParams', 'UserDetailsModel', 'AuthService', 'LangModel', 'LangService', 'MenuBarModel', 'Utils', '$cookies', '$window', '$mdBottomSheet'];
function AppController ($scope, $rootScope, $mdDialog, $location, $routeParams, UserDetailsModel, AuthService, LangModel, LangService, MenuBarModel, Utils, $cookies, $window, $mdBottomSheet) {
    var lang;
    if(AuthService.isLogged() === "true" && $rootScope.userLogged === undefined) {
        AuthService.giveMe($routeParams.lang)
            .then(function(result){
                if(result.data != false) {
                  var profileImg = false;
                  if(result.data.userImg != undefined) {
                    profileImg=result.data.user.userImg;
                  }
                  $rootScope.userLogged = new UserDetailsModel(result.data.name, result.data.surname, result.data.email, profileImg, result.data.username, result.data.statistics , result.data.experienceLevel, result.data.privilege, result.data._id);
                  $rootScope.directivesChoose= MenuBarModel.getDirectives(location, $rootScope.userLogged.getPrivilege());
                  $rootScope.$emit("userDownloaded", true);
                  checkUrl($location.path());
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
    else {
      checkUrl($location.path());
    }


    if($rootScope.userLogged != undefined) {
        $rootScope.directivesChoose= MenuBarModel.getDirectives(location, $rootScope.userLogged.getPrivilege());
    }

    if($rootScope.systemLang === undefined) {
        $rootScope.systemLang=$routeParams.lang;
        lang = getLang($routeParams.lang);
        lang.then(function(data){
            $rootScope.listOfKeys= data.getListOfKeys();
            $rootScope.$emit("langDownloaded", true);
        }, function(err) {
          $location.path("/it/home");
          lang = getLang("it");
          lang.then(function(data){
              $rootScope.systemLang = "it";
              $rootScope.listOfKeys= data.getListOfKeys();
          });
        }
      );
    }
    else {
      console.log("devo cammbiare lingua di nuovo");
      console.log($rootScope.systemLang);
      console.log($routeParams.lang);
      if($rootScope.systemLang != $routeParams.lang) {
        console.log("sono diverse");
        lang = getLang($routeParams.lang);
        lang.then(function(data){
            $rootScope.systemLang = $routeParams.lang;
            $rootScope.listOfKeys= data.getListOfKeys();
            $rootScope.$emit("langDownloaded", true);
        }, function(err) {
          $location.path("/it/home");
          lang = getLang("it");
          lang.then(function(data){
            $rootScope.systemLang = "it";
              $rootScope.listOfKeys= data.getListOfKeys();
          });
        });
      }
      else {
        console.log("ok è apposto");
        $rootScope.isDownloading=false;
        console.log($rootScope.isDownloading);
      }
    }

    function getLang (lang) {
        checkLang();
        var setOfKeywords = LangService.getKeywords(lang);
        return setOfKeywords.then(function(data){
            return new LangModel(lang, data);
        });
    }

    function checkUrl(path) {
        var pathLocal = path+ '';
        console.log(pathLocal);
        var variableOfPath= pathLocal.split("/");
        console.log(variableOfPath);
        var combination = "noAuth";
        console.log((variableOfPath.indexOf("login") != -1 || variableOfPath.indexOf("signup") != -1));
        console.log($rootScope.userLogged != undefined);
        if((variableOfPath.indexOf("login") != -1 || variableOfPath.indexOf("signup") != -1) && $rootScope.userLogged != undefined && $rootScope.userLogged.getPrivilege() != "")
        {
            console.log("Redirect to home");
            $location.path('/'+$routeParams.lang+'/home');
        }
    }

    function checkLang() {
      if($rootScope.supportedLang === undefined) {
      LangService
        .getSupportedLang()
        .then(function(langsupported){
          $rootScope.supportedLang = langsupported;

        });

      }
    }









}
