var Variables = require("../Model/LangModel.js");

var getVarlist = function(language,callback) {
  Variables.find({lang:language}, function(err, documents) {
    if (err) {
      throw err;
    }
    callback(documents);
  });
}

var getLang = function(callback) {
  Variables.distinct("correctWord", "lang", function(err, documents) {
    if (err) {
      throw err;
    }
    console.log(documents);
    callback(documents);
  });
}

var getSlang = function(language, callback) {
  Variables.find({correctWord: language},'lang', function(err, documents) {
    if (err) {
      throw err;
    }
    console.log(documents);
    callback(documents);
  });
}

exports.getSlang = getSlang;
exports.getLang = getLang;
exports.getVarlist = getVarlist;
