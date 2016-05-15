

controlloQML = function(req, res, topics) {

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
                    success = veroFalso(corpo, res);
                    if (success) {
                        return createJSON(corpo, res, "veroFalso", topic);
                    }
                }
                else if (corpo.type == tipologiaDomande[1]) {
                    console.log("controlloQML: prima di controllare campi di risposta multipla");
                    success = rispostaMultipla(corpo, res);
                    if (success) {
                        console.log("tipologia risposta multipla validata");
                        return createJSON(corpo, res, "rispostaMultipla", topic);
                    }
                }
                else if (corpo.type == tipologiaDomande[2]) {
                    success = ordinamentoStringhe(corpo, res);
                    if (success) {
                        return createJSON(corpo, res, "ordinamentoStringhe", topic);
                    }
                }
                else if (corpo.type == tipologiaDomande[3]) {
                    success = ordinamentoImmagini(corpo, res);
                    if (success) {
                        return createJSON(corpo, res, "ordinamentoImmagini", topic);
                    }
                }
                else if (corpo.type == tipologiaDomande[4]) {
                    console.log("chiamo funzione collegamento Elementi");
                    success = collegamentoElementi(corpo, res);
                    if (success) {
                        console.log("parser ha validato il collegamento elementi e adesso creo il JSON");
                        return createJSON(corpo, res, "collegamentoElementi", topic);
                    }
                }
                else if (corpo.type == tipologiaDomande[5]) {

                    success = areaCliccabile(corpo, res);
                    if (success) {
                        return createJSON(corpo, res, "areaCliccabile", topic);
                    }
                }
                else if (corpo.type == tipologiaDomande[6]) {
                    console.log("chiamo funzione spazi vuoti");
                    success = riempimentoSpaziVuoti(corpo, res);
                    if (success) {
                        console.log("parser ha validato gli spazi vuoti, adesso creo il JSON");
                        return createJSON(corpo, res, "riempimentoSpaziVuoti", topic);
                    }
                }
                else if (corpo.type == tipologiaDomande[7]) {
                    success = custom(corpo, res);
                    if (success) {
                        return createJSON(corpo, res, "custom", topic);
                    }
                }
                else {
                    success = false;
                    console.log("tipologia di domanda sconosciuta");
                }
                return success;
            }
            else {
                res = "topic sconosciuto";
                console.log(res);
                return false;
            }
        }
        else{
            res = "topic non trovato";
            console.log(res);
            return false;
        }
    }
    else{
        res = "type non trovato";
        console.log(res);
        return false;
    }
}


