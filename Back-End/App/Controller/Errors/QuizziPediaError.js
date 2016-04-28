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
"use strict";

module.exports = class QuizziPediaError  {
    constructor(code, title, message) {
        this.code = code;
        this.title = title;
        this.message = message;
    }

    getCode() {
        return this.code;
    }

    getTitle() {
        return this.title;
    }

    getMessage() {
        return this.message;
    }

    // da sistemare, in javascript le variabili tra virgolette non vengono parsate
    toJSON() {
        return this;
    }

    toString() {
        return this.code + ' ' + this.title + ': ' + this.message + '.';
    }
}

