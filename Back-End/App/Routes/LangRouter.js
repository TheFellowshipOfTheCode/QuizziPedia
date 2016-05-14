var LangController = require("../Controller/LangController.js");

module.exports = function(app){
  // API
  app.get('/api/:lang', function(req, res){
      var language = req.params.lang;
      LangController.getVarlist(language, function (result) {
        if(result.length === 0) {
          return res.status(500).json({code: 1601, title: "getVarlistErrror", message: "error"});
        }
          res.json(result);
      });
  });

  app.get('/api/supported/lang/give/me', function(req, res){
      LangController.getLang( function (result) {
          res.json(result);
      });
  });

  app.get('/api/supported/lang/give/me/:language', function(req, res){
      var language = req.params.language;
      console.log(language);
      LangController.getSlang(language, function (result) {
          res.json(result);
      });
  });
}
