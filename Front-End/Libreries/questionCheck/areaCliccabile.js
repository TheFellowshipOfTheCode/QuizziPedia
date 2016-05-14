/*******************************************************************************
 * Name: QuizziPedia::Front-End::Libreries::questionCheck::areaCliccabile;
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
 * Description: Risolto problemi di incosistenza della funzione
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 * Update data: 28-04-2016;
 * Description: Creata funzione areaCliccabile
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 ********************************************************************************/



areaCliccabile = function(corpo,res){
    var campiObbligatori = false;
    var campiFacoltativi = true;

    // controllo campi obbligatori
    if(corpo.hasOwnProperty('questionText')) {
        if(corpo.hasOwnProperty('image')){
            if(corpo.hasOwnProperty('resolution')){
                if(corpo.resolution.hasOwnProperty('x') && corpo.resolution.hasOwnProperty('y')){
                    if(corpo.hasOwnProperty('answer')){
                        var key;
                        for(i = 0; i < corpo.answer.length ; i++){
                            if(corpo.answer[i].hasOwnProperty('x') && corpo.answer[i].hasOwnProperty('y')){
                                campiObbligatori = true;
                                // controllo che non ci siano altri campi inseriti
                                var facoltativi = ["x","y","text"];
                                var valido = false;
                                for(var j=0 ; j < facoltativi.length ; j++) {
                                    for (key in corpo.answer[i]) {
                                        if (key == facoltativi[j]) {
                                            valido = true;
                                            break;
                                        }
                                    }
                                }
                                if(!valido){
                                    console.log("campi in answer sconosciuti");
                                    return false;
                                }
                            }
                            else{
                                console.log("coordinate non valide");
                                return false;
                            }
                        }
                    }
                    else{
                        console.log("campo answer mancante");
                        return false;
                    }
                }
                else{
                    console.log("il campo risoluzione necessita di 2 coordinate X e Y");
                    return false;
                }
            }
            else{
                console.log("campo resolution mancante");
                return false;
            }
        } else{
            console.log("campo image mancante");
            return false;
        }
    } else{
        console.log("campo questionText mancante");
        return false;
    }
    // controllo campi facoltativi
    var facoltativiString = ["type","answer","questionText","url", "keywords", "topic", "resolution", "image"];
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
    // controllo se ci sono keyword inserite
    var i = 1;
    if(campiFacoltativi && campiObbligatori){
        return true;
    }
    else{
        return false;
    }
}