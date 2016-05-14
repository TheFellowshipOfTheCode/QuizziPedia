var LangModel = require("../Model/LangModel.js");


exports.getVarlist=function(req,res,next){
  console.log(req.params.lang)
  LangModel.getVarlist(req.params.lang,function(err,result){
    console.log(result)
    if(err)
      return res.status(500).json({code: 1601, title: "getVarlistErrror", message: "error"});
    return res.send(result);
  })
}

exports.getLang=function(req,res,next){
  LangModel.getLang(function(err,result){
    if(err)
      return res.status(500).json({code: 1601, title: "getLangErrror", message: "error"});
    return res.send(result);
  })
}

exports.getSlang=function(req,res,next){ {
  LangModel.getSlang(req.params.language,function(err,result){
    if(err)
      return res.status(500).json({code: 1601, title: "getSlangErrror", message: "error"});
    return res.send(result);
  })
}}
