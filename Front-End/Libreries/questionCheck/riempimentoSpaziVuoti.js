riempimentoSpaziVuoti = function(corpo,res){
    var campiObbligatori = false;
    var campiFacoltativi = true;

    // controllo campi obbligatori
    if(corpo.hasOwnProperty('questionText')) {
        if (corpo.hasOwnProperty('answer')) {
            var obbligatorieAnswer = ["parolaNumero"];
            for(var k = 0; k < corpo.answer.length ; k++){
                if(corpo.answer[k].hasOwnProperty(obbligatorieAnswer[0])){
                     campiObbligatori = true;
                    }
                    else{
                        console.log("campo parolaNumero mancante");
                    return false;
                    }
                }
        }
        else {
            console.log("campo answer non trovato");
            return false;
        }
    } else{
        console.log("campo questionText mancante");
        return false;
    }
    // controllo campi facoltativi
    var facoltativiString = ["type","answer","questionText", "keywords"];
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