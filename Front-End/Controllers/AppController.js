/*******************************************************************************
 * Nome: QuizziPedia::Front-End::Controllers::AppController;
 * Description: questa classe permette di gestire la lingua dell'applicazione e
 * tiene aggiornate le direttive di BreadBarDirective, MenuBarDirective;
 * Creation data: 30-04-2016;
 * Author: Matteo Granzotto;
 * License: MIT.
 ********************************************************************************
 * Updates history
 * -------------------------------------------------------------------------------
 * ID: AppController_20160505;
 * Update data: 05-05-2016;
 * Description: Completata la stesura della classe, scritti i metodi getLang(),
 * checkLang() e getUrl();
 * Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: AppController_20160502;
 * Update data: 02-05-2016;
 * Description: Aggiornata la gestione dell'autorizzazione dell'utente;
 * Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: AppController_20160430;
 * Update data: 20-04-2016;
 * Description: Scritta la classe e la gestione dell'autenticazione;
 * Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.controller('AppController', AppController);

AppController.$inject = ['$rootScope', '$location', '$routeParams', 'UserDetailsModel', 'AuthService', 'LangModel', 'LangService', 'MenuBarModel', 'Utils'];
function AppController ($rootScope, $location, $routeParams, UserDetailsModel, AuthService, LangModel, LangService, MenuBarModel) {
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
      if($rootScope.systemLang != $routeParams.lang) {
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
        $rootScope.isDownloading=false;
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
        var variableOfPath= pathLocal.split("/");
        var combination = "noAuth";
        if((variableOfPath.indexOf("login") != -1 || variableOfPath.indexOf("signup") != -1) && $rootScope.userLogged != undefined )
        {
            $location.path('/'+$routeParams.lang+'/home');
        }
        if(variableOfPath.indexOf("questionnairemanagement") != -1  && $rootScope.userLogged != undefined && $rootScope.userLogged.getPrivilege() == "normal")
        {
            $location.path('/'+$routeParams.lang+'/home');
        }
        if((variableOfPath.indexOf("search") != -1 || variableOfPath.indexOf("questions") != -1 || variableOfPath.indexOf("questionnairemanagement") != -1 ||  variableOfPath.indexOf("userpage") != -1 || variableOfPath.indexOf("quiz") != -1) && $rootScope.userLogged === undefined)
        {
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
