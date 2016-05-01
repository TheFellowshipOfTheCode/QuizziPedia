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
* ID: HomeView_20160430;
* Update data: 30-04-2016;
* Description: Scritta la classe;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.controller('AppController',AppController);

AppController.$inject = ['$scope','$rootScope', '$mdDialog', '$location', '$routeParams', 'UserDetailsModel', 'AuthService', 'LangModel', 'LangService', 'MenuBarModel'];
function AppController ($scope, $rootScope, $mdDialog, $location, $routeParams, UserDetailsModel, AuthService, LangModel, LangService, MenuBarModel) {
  var lang;
  /*Temporary variables - delete them in future*/
  var privilege = "";

  /* Scope variables and function*/
  $rootScope.directivesChoose= MenuBarModel.getDirectives(location,privilege);
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
}
