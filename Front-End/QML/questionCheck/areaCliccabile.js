/*******************************************************************************
 * Name: QuizziPedia::Front-End::QML::questionCheck::areaCliccabile;
 * Description: questo file contiene la funzione che permette la validazione
 * del testo scritto in QML per la tipologia specifica
 * Creation data: 27-04-2016;
 * Author: Matteo Gnoato.
 ********************************************************************************
 * Updates history
 * -------------------------------------------------------------------------------
 * Id: areaCliccabile_20160427
 * Update data: 27-04-2016;
 * Description: Inseriti messaggi d'errore specifici
 * Autore: Matteo Gnoato.
 * -------------------------------------------------------------------------------
 * Id: areaCliccabile_20160427
 * Update data: 27-04-2016;
 * Description: Risolto problemi di incosistenza della funzione
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 * Id: areaCliccabile_20160427
 * Update data: 27-04-2016;
 * Description: Creata funzione areaCliccabile
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 ********************************************************************************/



areaCliccabile = function(corpo,res, $mdDialog){
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
                                    alert = $mdDialog.alert()
                                        .title("Errore: campi sconosciuti")
                                        .content("hai inserito dei campi sconosciuti nell' array Answer")
                                        .ok('Ok');
                                    $mdDialog
                                        .show(alert)
                                        .finally(function () {
                                            alert = undefined;
                                        });
                                    return false;
                                }
                            }
                            else{
                                alert = $mdDialog.alert()
                                    .title("Errore: coordinate non valide")
                                    .content("Le coordinate inserite nell'array Answer non sono valide")
                                    .ok('Ok');
                                $mdDialog
                                    .show(alert)
                                    .finally(function () {
                                        alert = undefined;
                                    });
                                return false;
                            }
                        }
                    }
                    else{
                        alert = $mdDialog.alert()
                            .title("Errore: campi obbligatori mancanti")
                            .content("nessun campo Answer trovato, prego inserire un array di Answer")
                            .ok('Ok');
                        $mdDialog
                            .show(alert)
                            .finally(function () {
                                alert = undefined;
                            });
                        return false;
                    }
                }
                else{
                    alert = $mdDialog.alert()
                        .title("Errore: campi non validi")
                        .content("il campo \"risoluzione\" necessita di 2 coordinate valide, \"x\" e \"y\"")
                        .ok('Ok');
                    $mdDialog
                        .show(alert)
                        .finally(function () {
                            alert = undefined;
                        });
                    return false;
                }
            }
            else{
                alert = $mdDialog.alert()
                    .title("Errore: campi obbligatori mancanti")
                    .content("campo \"resolution\" non trovato, prego inserire un campo \"resolution\" valido")
                    .ok('Ok');
                $mdDialog
                    .show(alert)
                    .finally(function () {
                        alert = undefined;
                    });
                return false;
            }
        } else{
            alert = $mdDialog.alert()
                .title("Errore: campi obbligatori mancanti")
                .content("campo \"image\" non trovato, prego inserire un campo \"image\" valido")
                .ok('Ok');
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
            return false;
        }
    } else{
        alert = $mdDialog.alert()
            .title("Errore: campo obbligatori mancanti")
            .content("campo \"questionText\" non trovato, prego inserire un campo \"questionText\" valido")
            .ok('Ok');
        $mdDialog
            .show(alert)
            .finally(function () {
                alert = undefined;
            });
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
            alert = $mdDialog.alert()
                .title("Errore generico")
                .content("inseriti campi sconosciuti")
                .ok('Ok');
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
            campiFacoltativi = false;
            return false;
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