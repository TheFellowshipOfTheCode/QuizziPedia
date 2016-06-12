/*******************************************************************************
 * Nome: QuizziPedia::Front-End::Controllers::ErrorController;
 * Creation data: 01-06-2016;
 * Author: Matteo Granzotto;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: ErrorController_20160601;
 * Update data: 01-06-2016;
 * Description: Scritta la classe;
 * Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.controller('ErrorController', ErrorController);

ErrorController.$inject = ['$rootScope','LangModel', 'LangService'];
function ErrorController ($rootScope, LangModel, LangService) {

    $('.sheep-head').plaxify({"xRange":35,"yRange":35});
    $.plax.enable();

    var language="it";

    lang = getLang(language);
    lang.then(function(data){
        $rootScope.listOfKeys= data.getListOfKeys();
    }, function(err) {
      $location.path("/it/home");
      lang = getLang("it");
      lang.then(function(data){
          $rootScope.systemLang = "it";
          $rootScope.listOfKeys= data.getListOfKeys();
      });
    });


    function getLang (lang) {
        checkLang();
        var setOfKeywords = LangService.getKeywords(lang);
        return setOfKeywords.then(function(data){
            return new LangModel(lang, data);
        });
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
