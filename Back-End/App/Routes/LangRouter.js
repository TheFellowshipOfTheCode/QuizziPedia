var LangController = require("../Controller/LangController.js");

module.exports = function(app){
  // API
  app.get('/api/:lang', function(req, res){
      console.log("/api/"+req.params.lang);
      var language = req.params.lang;
      LangController.getVarlist(language, function (result) {
          res.json(result);
      });
  });
}
