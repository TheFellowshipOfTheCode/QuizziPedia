/*******************************************************************************
 * Name: QuizziPedia::Front-End::Libreries::questionCheck::collegamentoElementi;
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
 * Description: Creata funzione ordinamentoelementi
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 ********************************************************************************/


collegamentoElementi = function(corpo,res){
    var campiObbligatori = false;
    var campiFacoltativi = true;

    // controllo campi obbligatori
    if(corpo.hasOwnProperty('questionText')) {
        if (corpo.hasOwnProperty('answer')) {
            var valido = false; // indica se le associazioni sono valide
            for(var k = 0; k < corpo.answer.length ; k++){
                // controllo che ogni oggetto ha 2 campi
                var key, count = 0;
                for(key in corpo.answer[k]){
                    count++;
                }
                if(count == 2){
                    // ora devo controllare che gli elementi siano validi
                    // nel caso di associazione di 2 stringhe
                    if(corpo.answer[k].hasOwnProperty('text1') && corpo.answer[k].hasOwnProperty('text2')){
                        valido = true;
                    }
                    // nel caso di associazione stringa - immagine
                    else if(corpo.answer[k].hasOwnProperty('text1') && corpo.answer[k].hasOwnProperty('url2')){
                        valido = true;
                    }
                    // nel caso di associazione immagine stringa
                    else if(corpo.answer[k].hasOwnProperty('url1') && corpo.answer[k].hasOwnProperty('text2')){
                        valido = true;
                    }
                    // nel caso di associazione tra 2 immagini
                    else if(corpo.answer[k].hasOwnProperty('url1') && corpo.answer[k].hasOwnProperty('ur')){
                        valido = true;
                    } else{
                        console.log("errore nell'associazioni degli elementi");
                    }
                }else{
                    console.log("gli elementi nelle answer devono essere sempre in coppia");
                    valido = false;
                    break;
                }
            }
            if(valido){
                campiObbligatori = true;
            }
        }
        else {
            console.log("campo answer non trovato");
        }
    } else{
        console.log("campo questionText mancante");
        return false;
    }
    // controllo campi facoltativi
    var facoltativiString = ["type","questionText","answer","url", "keywords", "topic"];
    var key;
    for(key in corpo) {
        var giusto = false;
        for (var j = 0; j < facoltativiString.length; j++) {
            if (key == facoltativiString[j]) {
                giusto = true;
            }
        }
        if (!giusto) {
            campiFacoltativi = false;
            break;
        }
    }
    // controllo se ci sono keyword inserite
    if(campiFacoltativi && campiObbligatori){
        return true;
    }
    else{
        return false;
    }
}