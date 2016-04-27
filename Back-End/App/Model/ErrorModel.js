/*******************************************************************************
 * Name: Nome della classe da DDP; (QuizziPedia::ciao::prova::...)
 * Description: scrivere una piccola descrizione della classe (riassunto da DDP).
 * Relations with other classes:
 * + NomeAltraClasse1
 * + NomeAltraClasse2
 * Creation data: 27-04-2016
 * Author: Nome Cognome
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: NomeClasse_aaaammgg
 * Update data: gg-mm-aaaa
 * Description: descrizione della modifica fatta.
 * Autore: Nome Cognome
 *-------------------------------------------------------------------------------
 *******************************************************************************/
let mongoose = require('mongoose');

let errorSchema = new mongoose.Schema({
    errorCode: Number,
    errorMessage: String,
    errorTitle : String
});

errorSchema.methods.getCode = function() {
    return this.errorCode;
};

errorSchema.methods.getMessage = function() {
    return this.errorMessage;
};

errorSchema.methods.getTitle = function() {
    return this.errorTitle;
};

errorSchema.on('init', function() {

})

let Errors = mongoose.model('Errors', errorSchema);
errorSchema.add


module.exports = Errors;