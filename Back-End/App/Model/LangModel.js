/*******************************************************************************
 * Name: QuizziPedia::Back-End::App::Models::LangModel
 * Description: scrivere una piccola descrizione della classe (riassunto da DDP).
 * Relations with other classes:
 * + NomeAltraClasse1
 * + NomeAltraClasse2
 * Creation data: 27-04-2016
 * Author: Matteo Gnoato
 ********************************************************************************
 * Updates history
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

var Lang = mongoose.model('LangSchema', LangSchema, 'Variables');

module.exports = Lang;
