controlloQML = function(req, res) {
    var corpo = JSON.parse(req);
    var success;
    var tipologiaDomande = ["veroFalso", "rispostaMultipla", "ordinamentoStringhe", "ordinamentoImmagini", "collegamentoElementi", "areaCliccabile", "riempimentoSpaziVuoti", "custom"];
    if (corpo.hasOwnProperty('type')) {
        if (corpo.type == tipologiaDomande[0]) {
             success = veroFalso(corpo,res);
        }
        else if(corpo.type == tipologiaDomande[1]){
            success = rispostaMultipla(corpo,res);
        }
        else if(corpo.type == tipologiaDomande[2]){
            success = ordinamentoStringhe(corpo,res);
        }
        else if(corpo.type == tipologiaDomande[3]){
            success = ordinamentoImmagini(corpo,res);
        }
        else if(corpo.type == tipologiaDomande[4]){
            success = collegamentoElementi(corpo,res);
        }
        else if(corpo.type == tipologiaDomande[5]){
            success = areaCliccabile(corpo,res);
        }
        else if(corpo.type == tipologiaDomande[6]){
            success = riempimentoSpaziVuoti(corpo,res);
        }
        else if(corpo.type == tipologiaDomande[7]){
            success = custom(corpo,res);
        }
        else{
            success = false;
            console.log("tipologia di domanda sconosciuta");
        }
        return success;
    }
    else{
        res = "type non trovato";
        console.log(res);
        return false;
    }
}
