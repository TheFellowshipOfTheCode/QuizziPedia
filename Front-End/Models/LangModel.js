/*******************************************************************************
* Name: QuizziPedia::Front-End::Models::LangModel;
* Description: rappresenta le informazioni per la giusta traduzione
* dell’applicazione. Viene utilizzata per racchiudere tutte le informazioni
* riguardanti la giusta traduzione dell’applicazione;
 *
 * 
* Creation data: 27-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: LangModel_20160429;
* Update data: 29-04-2016;
* Description: Scritta la classe;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
* ID: LangModel_20160427;
* Update data: 27-04-2016;
* Description: Creato il file;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/
app.factory("LangModel", LangModel);

function LangModel () {
  //constructor
  var LangModel = function (lang, listOfKeys)
  {
    // private variables
    var listOfKeys_ = {};
    var lang_ = lang;
    listOfKeys_ = listOfKeys;
    // public functions
    this.getLang = function(){
        return lang_;
    };
    this.getListOfKeys = function(){
        return listOfKeys_;
    };
    this.setNewLang = function(lang,listOfKeys){
      lang_ = lang;
      listOfKeys_ = listOfKeys;
    };
  }
  return LangModel;
};
