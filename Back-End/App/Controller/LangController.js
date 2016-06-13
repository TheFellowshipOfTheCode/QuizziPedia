/*******************************************************************************
* Name: QuizziPedia::Back-End::App::Controllers::LangController
* Description: classe controller che gestisce gli errori Back-End dell'applicazione.
* Creation data: 09-05-2016
* Author: Matteo Granzotto
********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
* ID: ErrorsHandler_20160503
* Update data: 09-05-2016
* Description: Creata classe.
* Autore: Matteo Granzotto
*-------------------------------------------------------------------------------
* ID: ErrorsHandler_20160503
* Update data: 10-05-2016
* Description: Creati metodi: getVarlist(), getLang(), getSlang().
* Autore: Matteo Granzotto
*-------------------------------------------------------------------------------
*******************************************************************************/
var LangModel = require("../Model/LangModel.js");


exports.getVarlist=function(req,res,next){
  LangModel.getVarlist(req.params.lang,function(err,result){
    if(err || result.length==0)
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
