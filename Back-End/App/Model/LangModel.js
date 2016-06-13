/*******************************************************************************
* Name: QuizziPedia::Back-End::App::Models::LangModel
* Description: scrivere una piccola descrizione della classe (riassunto da DDP).
* Creation data: 27-04-2016
* Author: Matteo Gnoato
********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
* ID: QuizziPedia::Back-End::App::Model::LangModel_20160427
* Update data: 27-04-2016
* Description: Aggiunti i metodi getLang(), getSlang()
* Autore: Matteo Gnoato
*-------------------------------------------------------------------------------
* ID: QuizziPedia::Back-End::App::Model::LangModel_20160427
* Update data: 27-04-2016
* Description: Creata connessione con mongoose, creata la definizione dello schema
* Aggiunto metodo getVarlist.
* Autore: Matteo Gnoato
*-------------------------------------------------------------------------------
*******************************************************************************/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LangSchema = new Schema({},
{
  strict: false
});


LangSchema.statics.getVarlist = function(language, callback) {
  return this.find({lang:language}, callback);
}

LangSchema.statics.getLang = function(callback) {
  return this.distinct("correctWord", "lang",callback);
}

LangSchema.statics.getSlang = function(language, callback) {
  return this.find({correctWord: language},'lang',callback)
}

module.exports = mongoose.model('LangSchema', LangSchema, 'Variables');
