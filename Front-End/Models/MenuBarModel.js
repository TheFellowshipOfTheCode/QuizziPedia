/*******************************************************************************
* Name: QuizziPedia::Front-End::Models::MenuBarModel;
* Description: questa classe racchiude i dati necessari per la creazione
* dinamica della barra menù posizionata in modo fisso su ogni pagina. Viene
* utilizzata per memorizzare i dati necessari per la creazione dinamica della
* barra menù posizionata in modo fisso su ogni pagina;
 *
 * 
* Creation data: 26-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: MenuBarModel_20160426;
* Update data: 26-04-2016;
* Description: Scritti metodo getDirectives();
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
* ID: MenuBarModel_20160426;
* Update data: 26-04-2016;
* Description: Creato il file;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.factory('MenuBarModel', MenuBarModel);

function MenuBarModel() {
    var arrayOfDirectives = [
      "loginBarDirective",
      "logoutBarDirective",
      "profileManagementBarDirective",
      "questionnaireManagementBarDirective",
      "questionsManagementBarDirective",
      "searchDirective",
      "signUpBarDirective",
      "userBarDirective"
    ];
    var combinations= {
      "noAuth": [0,6],
      "authNormalHome": [1,2,4,7],
      "authNormal": [1,2,4,5,7],
      "authProHome":[1,2,3,4,7],
      "authPro":[1,2,3,4,5,7]
    }
    return {
        getDirectives: getDirectives
    };

    function getDirectives(path, privilege) {
      var pathLocal = path+ '';
      var variableOfPath= pathLocal.split("/");
      var combination = "noAuth";
      if(variableOfPath.indexOf("home") != -1 && privilege == "normal")
      {
        combination = "authNormalHome";
      }
      if(variableOfPath.indexOf("home") != -1 && privilege == "pro")
      {
        combination = "authProHome";
      }
      if(variableOfPath.indexOf("home") == -1 && privilege == "normal")
      {
        combination = "authNormal";
      }
      if(variableOfPath.indexOf("home") == -1 && privilege == "pro")
      {
        combination = "authPro";
      }
      var directives = {};
      combinations[combination].forEach(function (directive){
        directives[arrayOfDirectives[directive]] = true;
      });
      return directives;
    }
}
