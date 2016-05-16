/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Routers::LangRouter;
 * Description: classe che gestisce le richieste relative alle impostazioni
 * della lingua;
 * Creation data: 27-04-2016;
 * Author: Matteo Gnoato.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: QuestionRouter_20160428;
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
