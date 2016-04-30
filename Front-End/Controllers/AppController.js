app.controller('AppController',AppController);

AppController.$inject = ['$scope','$rootScope', '$mdDialog', '$location', '$routeParams', 'UserDetailsModel', 'AuthService', 'LangModel', 'LangService', 'MenuBarModel'];
function AppController ($scope, $rootScope, $mdDialog, $location, $routeParams, UserDetailsModel, AuthService, LangModel, LangService, MenuBarModel) {
  var lang;
  /*Temporary variables - delete them in future*/
  var privilege = "pro";
  
  /* Scope variables and function*/
  $rootScope.directivesChoose= MenuBarModel.getDirectives(location,privilege);
  if($rootScope.systemLang === undefined) {
    $rootScope.systemLang=$routeParams.lang;
    lang = getLang($routeParams.lang);
    lang.then(function(data){
      console.log(data);
      $rootScope.listOfKeys= data.getListOfKeys();
    });
  }
  function getLang (lang) {
    var setOfKeywords = LangService.getKeywords(lang);
    return setOfKeywords.then(function(data){
      console.log(data);
      return new LangModel(lang, data);
    });
  }
}
