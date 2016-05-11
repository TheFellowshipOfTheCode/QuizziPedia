veroFalso = function(corpo,res){
    var campiObbligatori = false;
    var campiFacoltativi = true;
  
            // controllo campi obbligatori
            if(corpo.hasOwnProperty('answer')){
                if(corpo.answer[0].hasOwnProperty('text') && corpo.answer[0].hasOwnProperty("isItRight")){
                    if(corpo.answer[0].isItRight == "false" || corpo.answer[0].isItRight == "true"){
                        campiObbligatori = true;
                    }
                    else{
                        campiObbligatori = false;
                        console.log("campo isItRight non valido");
                    }
                }
                else{
                    campiObbligatori = false;
                    console.log("campo text o isItRight mancante");
                }
            }
            else {
                console.log("campo answer non trovato");
                }
            // controllo campi
            var facoltativiString = ["type","answer","image", "keywords"];
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