/*******************************************************************************
 * Name: QuizziPedia::Front-End::Libreries::questionCheck::riempimentospaziVuoti;
 * Description: questo file contiene la funzione che permette la validazione
 * del testo scritto in QML per la tipologia specifica
 * Creation data: 27-04-2016;
 * Author: Matteo Gnoato.
 ********************************************************************************
 * Updates history
 * -------------------------------------------------------------------------------
 * Update data: 28-04-2016;
 * Description: Inseriti messaggi d'errore specifici
 * Autore: Matteo Gnoato.
 * -------------------------------------------------------------------------------
 *  * Update data: 28-04-2016;
 * Description: Risolto bug nella lettura dei campi obbligatori
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 * Update data: 28-04-2016;
 * Description: Creata funzione spaziVuoti
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 ********************************************************************************/


riempimentoSpaziVuoti = function(corpo,res){
    var campiObbligatori = false;
    var campiFacoltativi = true;

    // controllo campi obbligatori
    if(corpo.hasOwnProperty('questionText')) {
        if (corpo.hasOwnProperty('answer')) {
            var obbligatorieAnswer = ["parolaNumero"];
            for(var k = 0; k < corpo.answer.length ; k++){
                if(corpo.answer[k].hasOwnProperty(obbligatorieAnswer[0])){
                     campiObbligatori = true;
                    }
                    else{
                        console.log("campo parolaNumero mancante");
                    return false;
                    }
                }
        }
        else {
            console.log("campo answer non trovato");
            return false;
        }
    } else{
        console.log("campo questionText mancante");
        return false;
    }
    // controllo campi facoltativi
    var facoltativiString = ["type","answer","questionText", "keywords", "topic"];
    var key;
    for(key in corpo) {
        var giusto = false;
        for (var j = 0; j < facoltativiString.length; j++) {
            if (key == facoltativiString[j]) {
                giusto = true;
            }
        }
        if (!giusto) {
            console.log("inseriti campi sconosciuti");
            campiFacoltativi = false;
            break;
        }
    }
    if(campiFacoltativi && campiObbligatori){
        return true;
    }
    else{
        return false;
    }
}