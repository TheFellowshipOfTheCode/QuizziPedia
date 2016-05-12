controlloQML = function(req, res) {

    var corpo = JSON.parse(req);
    var success;
    var tipologiaDomande = ["veroFalso", "rispostaMultipla", "ordinamentoStringhe", "ordinamentoImmagini", "collegamentoElementi", "areaCliccabile", "riempimentoSpaziVuoti", "custom"];
    if (corpo.hasOwnProperty('type')) {
        if(corpo.hasOwnProperty('topic')) {
            var topic = corpo.topic;
            if (corpo.type == tipologiaDomande[0]) {
                success = veroFalso(corpo, res, topic);
                if (success) {
                    createJSON(corpo, res, "veroFalso");
                }
            }
            else if (corpo.type == tipologiaDomande[1]) {
                success = rispostaMultipla(corpo, res);
                if (success) {
                    createJSON(corpo, res, "rispostaMultipla", topic);
                }
            }
            else if (corpo.type == tipologiaDomande[2]) {
                success = ordinamentoStringhe(corpo, res);
                if (success) {
                    createJSON(corpo, res, "ordinamentoStringhe", topic);
                }
            }
            else if (corpo.type == tipologiaDomande[3]) {
                success = ordinamentoImmagini(corpo, res);
                if (success) {
                    createJSON(corpo, res, "ordinamentoImmagini", topic);
                }
            }
            else if (corpo.type == tipologiaDomande[4]) {
                success = collegamentoElementi(corpo, res);
                if (success) {
                    createJSON(corpo, res, "collegamentoElementi", topic);
                }
            }
            else if (corpo.type == tipologiaDomande[5]) {
                success = areaCliccabile(corpo, res);
                if (success) {
                    createJSON(corpo, res, "areaCliccabile", topic);
                }
            }
            else if (corpo.type == tipologiaDomande[6]) {
                success = riempimentoSpaziVuoti(corpo, res);
                if (success) {
                    createJSON(corpo, res, "riempimentoSpaziVuoti", topic);
                }
            }
            else if (corpo.type == tipologiaDomande[7]) {
                success = custom(corpo, res);
                if (success) {
                    createJSON(corpo, res, "custom", topic);
                }
            }
            else {
                success = false;
                console.log("tipologia di domanda sconosciuta");
            }
            return success;
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


