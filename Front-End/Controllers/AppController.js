app.controller('AppController',AppController);

AppController.$inject = ['$scope','$rootScope', '$mdDialog', '$location', '$routeParams', 'UserDetailsModel', 'AuthService', 'LangModel', 'LangService'];
function AppController ($scope,$rootScope, $mdDialog, $location, $routeParams, UserDetailsModel, AuthService, LangModel, LangService) {
  var lang;

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
