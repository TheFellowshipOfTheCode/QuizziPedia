var Variables = require("../Model/LangModel.js");

var getVarlist = function(language,callback) {
  Variables.find({lang:language}, function(err, documents) {
    if (err) {
      throw err;
    }
    console.log(documents);
    callback(documents);
  });
}

exports.getVarlist = getVarlist;
