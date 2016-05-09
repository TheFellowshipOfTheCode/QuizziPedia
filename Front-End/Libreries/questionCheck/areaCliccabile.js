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
                        for(key in corpo.answer){
                            if(key.hasOwnProperty('x') && key.hasOwnProperty('y')){
                                campiObbligatori = true;
                                // controllo che non ci siano altri campi inseriti
                                var facoltativi = ["x","y","text"];
                                var valido = false;
                                for(var j=0 ; j < facoltativi.length ; j++){
                                    if(key == facoltativi[j]){
                                        valido = true;
                                        break;
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
    var facoltativiString = ["type","answer","questionText","url", "keywords"];
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