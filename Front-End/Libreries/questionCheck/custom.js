custom = function(corpo,res){
    var campiObbligatori = false;
    var campiFacoltativi = true;

    // in una domanda custom i campi obbligatori sono almeno i campi che possono formare una domanda consistente
    // bisogna inserire delle keyword che indicano il tipo di domanda che si sta creando

    var consistente = false;
    // la variabile consistente diventa true quando il parser riesce a concludere una definizione consistente di una tipologia di domanda
    // se la variabile resta false la domanda custom nonha uno schema valido, quidni ritorno false dando un errore semantico

    //per prima cosa controllo il tipo di domanda principale che si vuole realizzare
    if(corpo.hasOwnProperty('question')) {
        // la variabile valido serve per testare se oltre alla prima tipologia di domanda (che deve essere consisntente) le altre, se ci sono, siano ben formate
        // quindi viene settata a true inizialmente, perchè il caso base è che non si sono altre tipologie inserite, se invece ce ne sono di mal formate, la variabile viene settata false dalla fuznione di controllo consistenza
        // e il parser termina con un errore di semantica
        var valido = true;
        // controllo che la domanda dentro l'array question abbia il type
        for(var k = 0; k < corpo.question.length ; k++) {
            if (corpo.question[k].hasOwnProperty('type')){
                if (!consistente) {
                    consistente = richiamaFunzione(corpo.question[k].type, corpo.question[k]);
                    campiObbligatori = true;
                }
                else {
                    valido = richiamaFunzione(corpo.question[k].type, corpo.question[k]);
                }
                if (!valido || !consistente){
                    return false;
                }
            }
            else {
                console.log("campo type inesistente nell'array question");
            }
        }
    }
    else{
        console.log("le domande di tipologia custom devono avere un array 'question' contenenti le domande");
        return false;
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

richiamaFunzione = function(tipologia, corpo){
    if(tipologia == "veroFalso"){
      return consistenzaVeroFalso(corpo);
    }
    else if(tipologia == "rispostaMultipla"){
        return consistenzaRispostaMultipla(corpo);
    }
    else if(tipologia == "ordinamentoStringhe"){
        return consistenzaOrdinamentoStringhe(corpo);
    }
    else if(tipologia == "ordinamentoImmagini"){
        return consistenzaOrdinamentoImmagini(corpo);
    }
    else if(tipologia == "riempimentoSpaziVuoti"){
        return consistenzaRiempimentoSpaziVutoi(corpo);
    }
    else if(tipologia == "collegamentoElementi"){
        return consistenzaCollegamentoElementi(corpo);
    }
    else if(tipologia == "areaCliccabile"){
        return consistenzaAreaCliccabile(corpo);
    }
    else{
        console.log("tipologia di domanda sconosciuta");
        return false;
    }
}

consistenzaVeroFalso = function(corpo){
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
    if(campiFacoltativi && campiObbligatori){
        return true;
    }
    else{
        return false;
    }
}

consistenzaRispostaMultipla = function(corpo){
    var campiObbligatori = false;
    var campiFacoltativi = true;

    // controllo campi obbligatori
    if(corpo.hasOwnProperty('questionText')) {
        if (corpo.hasOwnProperty('answer')) {
            var obbligatorieAnswer = ["text", "isItRight"];
            var keywordAnswer = ["text", "isItRight", "url"];
            for(var k = 0; k < corpo.answer.length ; k++){
                if(corpo.answer[k].hasOwnProperty(obbligatorieAnswer[0])){
                    if(corpo.answer[k].hasOwnProperty(obbligatorieAnswer[1])){
                        if(corpo.answer[k].isItRight == "true" || corpo.answer[k].isItRight == "false"){
                            // se arrivo qua i campi obbligatori ci sono tutti
                            campiObbligatori = true;
                            // devo controllare però i campi facoltativi di ogni answer
                            for(g in corpo.answer[k]) { // per ogni oggetto nell'array answer in posizione k
                                var giusto = false; // se questa diventa true la keyword è giusta
                                for (var j = 0; j < keywordAnswer.length; j++) { // per ogni keyword possibile
                                    if (g == keywordAnswer[j]) {
                                        giusto = true;
                                    }
                                }
                                // controllo la variabile giusto
                                if(!giusto){
                                    // se arrivo qua la keyword non ha riscontrato un match con le parole target
                                    console.log(g + " non è una parola chiave");
                                    campiFacoltativi = false;
                                    break;
                                }
                            }
                        }
                        else{
                            console.log("valore di isItRight non valido");
                        }
                    }
                    else{
                        console.log("campo isItRight mancante");
                    }
                }
                else{
                    console.log("campo text mancante");
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
    if(campiFacoltativi && campiObbligatori){
        return true;
    }
    else{
        return false;
    }

}

consistenzaOrdinamentoStringhe = function(corpo){
    var campiObbligatori = false;
    var campiFacoltativi = true;

    // controllo campi obbligatori
    if(corpo.hasOwnProperty('questionText')) {
        if (corpo.hasOwnProperty('answer')) {
            var obbligatorieAnswer = ["text", "position"];
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
                    console.log("campo text mancante");
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
    var facoltativiString = ["type","questionText","answer" ,"url", "keywords"];
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
    if(campiFacoltativi && campiObbligatori){
        return true;
    }
    else{
        return false;
    }
}

consistenzaOrdinamentoImmagini = function(corpo){
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
    if(campiFacoltativi && campiObbligatori){
        return true;
    }
    else{
        return false;
    }
}

consistenzaRiempimentoSpaziVutoi = function(corpo){
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
    if(campiFacoltativi && campiObbligatori){
        return true;
    }
    else{
        return false;
    }

}

consistenzaCollegamentoElementi = function(corpo){
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
                    if(corpo.answer[k].hasOwnProperty('text_' + k+1 + '_A') && corpo.answer[k].hasOwnProperty('text_' + k+1 + '_B')){
                        valido = true;
                    }
                    // nel caso di associazione stringa - immagine
                    else if(corpo.answer[k].hasOwnProperty('text_' + k+1 + '_A') && corpo.answer[k].hasOwnProperty('url_' + k+1 + '_B')){
                        valido = true;
                    }
                    // nel caso di associazione immagine stringa
                    else if(corpo.answer[k].hasOwnProperty('url_' + k+1 + '_A') && corpo.answer[k].hasOwnProperty('text_' + k+1 + '_B')){
                        valido = true;
                    }
                    // nel caso di associazione tra 2 immagini
                    else if(corpo.answer[k].hasOwnProperty('url_' + k+1 + '_A') && corpo.answer[k].hasOwnProperty('url_' + k+1 + '_B')){
                        valido = true;
                    } else{
                        console.log("errore nell'associazioni degli elementi");
                    }
                }else{
                    console.log("gli elementi nelle answer devono essere sempre in coppia");
                    valido = false;
                    break;
                }
            }
            if(valido){
                campiObbligatori = true;
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
    if(campiFacoltativi && campiObbligatori){
        return true;
    }
    else{
        return false;
    }

}

consistenzaAreaCliccabile = function(corpo){
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
    if(campiFacoltativi && campiObbligatori){
        return true;
    }
    else{
        return false;
    }
}

/*
* question : array di domande
*  in question: text, url, attributeForTforMultiple : isItRight, attributeForSorting
*  attributesForLinking, attributesForCliccableArea, attributesForEmptySpaces,
* */