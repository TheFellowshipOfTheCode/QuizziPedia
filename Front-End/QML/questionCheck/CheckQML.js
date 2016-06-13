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

controlloQML = function(req, res,selectedTopic, topics, lang, $mdDialog) {

    console.log(req.toString());
    var corpo = JSON.parse(req);
    corpo.topic=selectedTopic;
    var success;
    var tipologiaDomande = ["veroFalso", "rispostaMultipla", "ordinamentoStringhe", "ordinamentoImmagini", "collegamentoElementi", "areaCliccabile", "riempimentoSpaziVuoti", "custom"];
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
                        return createJSON(corpo, res, "veroFalso", topic, lang);
                    }
                }
                else if (corpo.type == tipologiaDomande[1]) {
                    success = rispostaMultipla(corpo, res, $mdDialog);
                    if (success) {
                        return createJSON(corpo, res, "rispostaMultipla", topic, lang);
                    }
                }
                else if (corpo.type == tipologiaDomande[2]) {
                    success = ordinamentoStringhe(corpo, res, $mdDialog);
                    if (success) {
                        return createJSON(corpo, res, "ordinamentoStringhe", topic, lang);
                    }
                }
                else if (corpo.type == tipologiaDomande[3]) {
                    success = ordinamentoImmagini(corpo, res, $mdDialog);
                    if (success) {
                        return createJSON(corpo, res, "ordinamentoImmagini", topic, lang);
                    }
                }
                else if (corpo.type == tipologiaDomande[4]) {
                  console.log("CheckQML collegamentoElementi");
                    success = collegamentoElementi(corpo, res, $mdDialog);
                    if (success) {
                      console.log("CheckQML collegamentoElementi controllato e passato");
                        return createJSON(corpo, res, "collegamentoElementi", topic, lang);
                    }
                    else {
                      console.log("CheckQML collegamentoElementi controllato e non passato");
                    }
                }
                else if (corpo.type == tipologiaDomande[5]) {

                    success = areaCliccabile(corpo, res, $mdDialog);
                    if (success) {
                        return createJSON(corpo, res, "areaCliccabile", topic, lang);
                    }
                }
                else if (corpo.type == tipologiaDomande[6]) {
                    success = riempimentoSpaziVuoti(corpo, res, $mdDialog);
                    if (success) {
                        return createJSON(corpo, res, "riempimentoSpaziVuoti", topic, lang);
                    }
                }
                else if (corpo.type == tipologiaDomande[7]) {
                    success = custom(corpo, res, $mdDialog);
                    if (success) {
                        return createJSON(corpo, res, "custom", topic, lang);
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
