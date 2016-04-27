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
var langSchema = new mongoose.Schema({
    lang: String,
    variables: [String]
});

let langs = mongoose.model('Lang', langSchema );

langSchema.methods.getVarlist = function(lang, callback, errback){
    if(lang === "ita"){
        callback = langSchema.findOne({lang: ita});
    }
    else if(lang === "eng"){
        callback = langSchema.findOne({lang: eng});
    }
    else{
        errback; // quando è pronta la classe QuizziPediaError aggiungere qua
                 // l'errore di Lingua sconosciuta (1600)
    }
}

module.exports = langs;