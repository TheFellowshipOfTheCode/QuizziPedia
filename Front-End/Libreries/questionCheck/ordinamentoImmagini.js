ordinamentoImmagini = function(corpo,res){
    var campiObbligatori = false;
    var campiFacoltativi = true;

    // controllo campi obbligatori
    if(corpo.hasOwnProperty('questionText')) {
        if (corpo.hasOwnProperty('answer')) {
            var obbligatorieAnswer = ["url", "position"];
            for(var k = 0; k < corpo.answer.length ; k++){
                if(corpo.answer[k].hasOwnProperty(obbligatorieAnswer[0])){
                    if(corpo.answer[k].hasOwnProperty(obbligatorieAnswer[1])){
                        // qua bisogna controllare il tipo di "position" che deve essere un numero,
                        // meglio se si riesce anche a controllare che la numerazione sia giusta
                    }
                    else{
                        console.log("campo position mancante");
                    }
                }
                else{
                    console.log("campo url mancante");
                }
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
    var facoltativiString = ["type","questionText","answer","url", "keywords"];
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
    var i = 1;
    if(corpo.hasOwnProperty('keywords')){
        var key;
        for(key in corpo.keywords[0]){
            if(key == "keyword_" + i){
                i++;
            }
            else{
                campiFacoltativi = false;
                console.log("keywords non valide");
                break;
            }
        }
    }
    if(campiFacoltativi && campiObbligatori){
        return true;
    }
    else{
        return false;
    }
}