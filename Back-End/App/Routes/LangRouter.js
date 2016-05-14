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
