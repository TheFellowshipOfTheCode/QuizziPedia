/*******************************************************************************
* Name: QuizziPedia::Back-End::App::Routers::LangRouter;
* Description: classe che gestisce le richieste relative alle impostazioni
* della lingua;
* Creation data: 27-04-2016;
* Author: Matteo Gnoato.
********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
* ID: QuestionRouter_20160427;
* Update data: 27-04-2016;
* Description: Creata classe e aggiunte prime REST;
* Autore: Franco Berton.
*-------------------------------------------------------------------------------
*******************************************************************************/

var LangController = require("../Controller/LangController.js");

module.exports = function(app){
  // API
  app.route('/api/:lang')
      .get(LangController.getVarlist)

  app.route('/api/supported/lang/give/me')
      .get(LangController.getLang)

  app.route('/api/supported/lang/give/me/:language')
      .get(LangController.getSlang)
}
