/*******************************************************************************
 * Name: QuizziPedia::Front-End::QML::questionCheck::CheckQML;
 * Description: questo file contiene la funzione che permette la validazione
 * del testo scritto in QML
 * Creation data: 27-04-2016;
 * Author: Matteo Gnoato.
 ********************************************************************************
 * Updates history
 * -------------------------------------------------------------------------------
 * Id: CheckQML_20160427
 * Update data: 27-04-2016;
 * Description: Inseriti messaggi d'errore specifici
 * Autore: Matteo Gnoato.
 * -------------------------------------------------------------------------------
 * Id: CheckQML_20160427
 * Update data: 27-04-2016;
 * Description: Risolto problemi di incosistenza della funzione
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 * Id: CheckQML_20160427
 * Update data: 27-04-2016;
 * Description: Creata funzione controlloQML
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 ********************************************************************************/

controlloQML = function(req, res, topics, $mdDialog) {

    var corpo = JSON.parse(req);
    var success;
    var tipologiaDomande = ["veroFalso", "rispostaMultipla", "ordinamentoStringhe", "ordinamentoImmagini", "collegamentoElementi", "areaCliccabile", "spaziVuoti", "custom"];
    if (corpo.hasOwnProperty('type')) {
        if(corpo.hasOwnProperty('topic')) {
            var topic = corpo.topic;
            var trovato = false;
            for (i = 0 ; i < topics.length ; i++ ) {
                if (corpo.topic == topics[i].name) {
                    trovato = true;
                    break;
                }
            }
            if (trovato) {
                if (corpo.type == tipologiaDomande[0]) {
                    success = veroFalso(corpo, res, $mdDialog);
                    if (success) {
                        return createJSON(corpo, res, "veroFalso", topic);
                    }
                }
                else if (corpo.type == tipologiaDomande[1]) {
                    success = rispostaMultipla(corpo, res, $mdDialog);
                    if (success) {
                        return createJSON(corpo, res, "rispostaMultipla", topic);
                    }
                }
                else if (corpo.type == tipologiaDomande[2]) {
                    success = ordinamentoStringhe(corpo, res, $mdDialog);
                    if (success) {
                        return createJSON(corpo, res, "ordinamentoStringhe", topic);
                    }
                }
                else if (corpo.type == tipologiaDomande[3]) {
                    success = ordinamentoImmagini(corpo, res, $mdDialog);
                    if (success) {
                        return createJSON(corpo, res, "ordinamentoImmagini", topic);
                    }
                }
                else if (corpo.type == tipologiaDomande[4]) {
                    success = collegamentoElementi(corpo, res, $mdDialog);
                    if (success) {
                        return createJSON(corpo, res, "collegamentoElementi", topic);
                    }
                }
                else if (corpo.type == tipologiaDomande[5]) {

                    success = areaCliccabile(corpo, res, $mdDialog);
                    if (success) {
                        return createJSON(corpo, res, "areaCliccabile", topic);
                    }
                }
                else if (corpo.type == tipologiaDomande[6]) {
                    success = riempimentoSpaziVuoti(corpo, res, $mdDialog);
                    if (success) {
                        return createJSON(corpo, res, "riempimentoSpaziVuoti", topic);
                    }
                }
                else if (corpo.type == tipologiaDomande[7]) {
                    success = custom(corpo, res, $mdDialog);
                    if (success) {
                        return createJSON(corpo, res, "custom", topic);
                    }
                }
                else {
                    success = false;
                    alert = $mdDialog.alert()
                        .title("Errore generico")
                        .content("tipologia di domanda sconosciuta")
                        .ok('Ok');
                    $mdDialog
                        .show(alert)
                        .finally(function () {
                            alert = undefined;
                        });
                }
                return success;
            }
            else {
                alert = $mdDialog.alert()
                    .title("Errore generico")
                    .content("Topic sconosciuto")
                    .ok('Ok');
                $mdDialog
                    .show(alert)
                    .finally(function () {
                        alert = undefined;
                    });
                res = "topic sconosciuto";
                console.log(res);
                return false;
            }
        }
        else{
            alert = $mdDialog.alert()
                .title("Errore: campi obbligatori mancanti")
                .content("campo \"topic\" non trovato, prego inserire un campo \"topic\" valido")
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
            .content("campo \"type\" non trovato, prego inserire un campo \"type\" valido")
            .ok('Ok');
        $mdDialog
            .show(alert)
            .finally(function () {
                alert = undefined;
            });
        return false;
    }
}


