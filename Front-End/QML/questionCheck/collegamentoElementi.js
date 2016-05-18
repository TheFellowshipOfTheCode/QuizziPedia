/*******************************************************************************
 * Name: QuizziPedia::Front-End::QML::questionCheck::collegamentoElementi;
 * Description: questo file contiene la funzione che permette la validazione
 * del testo scritto in QML per la tipologia specifica
 * Creation data: 27-04-2016;
 * Author: Matteo Gnoato.
 ********************************************************************************
 * Updates history
 * -------------------------------------------------------------------------------
 * Id: collegamentoElementi_20160427
 * Update data: 27-04-2016;
 * Description: Inseriti messaggi d'errore specifici
 * Autore: Matteo Gnoato.
 * -------------------------------------------------------------------------------
 * Id: collegamentoElementi_20160427
 * Update data: 27-04-2016;
 * Description: Risolto bug nella lettura dei campi obbligatori
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 * Id: collegamentoElementi_20160427
 * Update data: 27-04-2016;
 * Description: Creata funzione ordinamentoElementi
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 ********************************************************************************/


collegamentoElementi = function(corpo,res, $mdDialog){
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
                    alert = $mdDialog.alert()
                        .title("Errore: struttura errata")
                        .content("gli elementi nell'array \"answer\" devono essere sempre in coppia")
                        .ok('Ok');
                    $mdDialog
                        .show(alert)
                        .finally(function () {
                            alert = undefined;
                        });
                    valido = false;
                    break;
                }
            }
            if(valido){
                campiObbligatori = true;
            }
        }
        else {
            alert = $mdDialog.alert()
                .title("Errore: campi obbligatori mancanti")
                .content("campo \"answer\" non trovato, prego inserire un campo \"answer\" valido")
                .ok('Ok');
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
        }
    } else{
        alert = $mdDialog.alert()
            .title("Errore: campi obbligatori mancanti")
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