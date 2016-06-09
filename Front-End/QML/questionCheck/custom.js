/*******************************************************************************
 * Name: QuizziPedia::Front-End::QML::questionCheck::custom;
 * Description: questo file contiene la funzione che permette la validazione
 * del testo scritto in QML per la tipologia specifica
 * Creation data: 27-04-2016;
 * Author: Matteo Gnoato.
 ********************************************************************************
 * Updates history
 * -------------------------------------------------------------------------------
 * Id: custom_20160427
 * Update data: 27-04-2016;
 * Description: Inseriti tutti i casi di domanda custom specifica, inseriti
 * inoltre dei messaggi d'errore specifici per i casi in cui manchino dei campi
 * obbligatori nel testo QML
 * Autore: Matteo Gnoato.
 * -------------------------------------------------------------------------------
 * Id: custom_20160427
 * Update data: 27-04-2016;
 * Description: creata funzione richiamaFunzione, inseriti parzialmente
 * i casi specifici per la verifica della domanda custom
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 * Id: custom_20160427
 * Update data: 27-04-2016;
 * Description: Creata funzione custom
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 ********************************************************************************/

custom = function(corpo,res, $mdDialog){
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
                    consistente = richiamaFunzione(corpo.question[k].type, corpo.question[k], $mdDialog);
                    campiObbligatori = true;
                }
                else {
                    valido = richiamaFunzione(corpo.question[k].type, corpo.question[k], $mdDialog);
                }
                if (!valido || !consistente){
                    return false;
                }
            }
            else {
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
    }
    else{
        alert = $mdDialog.alert()
            .title("Errore: struttura errata")
            .content("le domande di tipologia custom devono avere un array 'question' contenenti le domande interne")
            .ok('Ok');
        $mdDialog
            .show(alert)
            .finally(function () {
                alert = undefined;
            });
        return false;
    }
    if(campiFacoltativi && campiObbligatori){
        return true;
    }
    else{
        return false;
    }
}

richiamaFunzione = function(tipologia, corpo, $mdDialog){
    if(tipologia == "veroFalso"){
      return consistenzaVeroFalso(corpo, $mdDialog);
    }
    else if(tipologia == "rispostaMultipla"){
        return consistenzaRispostaMultipla(corpo, $mdDialog);
    }
    else if(tipologia == "ordinamentoStringhe"){
        return consistenzaOrdinamentoStringhe(corpo, $mdDialog);
    }
    else if(tipologia == "ordinamentoImmagini"){
        return consistenzaOrdinamentoImmagini(corpo, $mdDialog);
    }
    else if(tipologia == "riempimentoSpaziVuoti"){
        return consistenzaRiempimentoSpaziVutoi(corpo, $mdDialog);
    }
    else if(tipologia == "collegamentoElementi"){
        return consistenzaCollegamentoElementi(corpo, $mdDialog);
    }
    else if(tipologia == "areaCliccabile"){
        return consistenzaAreaCliccabile(corpo, $mdDialog);
    }
    else{
        return false;
    }
}

consistenzaVeroFalso = function(corpo, $mdDialog){
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
                alert = $mdDialog.alert()
                    .title("Errore generico")
                    .content("contenuto del campo 'isItRight' non valido, inserire \"true\" o \"false\"")
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
            campiObbligatori = false;
            alert = $mdDialog.alert()
                .title("Errore: campi obbligatori mancanti")
                .content("campo 'text' o 'isItRight' mancanti, prego inserire dei campi validi")
                .ok('Ok');
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
            return false;
        }
    }
    else {
        alert = $mdDialog.alert()
            .title("Errore: campi obbligatori mancanti")
            .content("campo 'answer' non trovato, prego inserire un campo \"answer\" valdo")
            .ok('Ok');
        $mdDialog
            .show(alert)
            .finally(function () {
                alert = undefined;
            });
        return false;
    }
    // controllo campi
    var facoltativiString = ["type","answer","image", "keywords", "topic"];
    var key;
    for(key in corpo) {
        var giusto = false;
        for (var j = 0; j < facoltativiString.length; j++) {
            if (key == facoltativiString[j]) {
                giusto = true;
            }
        }
        if (!giusto) {
            alert = $mdDialog.alert()
                .title("Errore generico")
                .content("inseriti campi sconosciuti")
                .ok('Ok');
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
            campiFacoltativi = false;
            return false;
        }
    }
    if(campiFacoltativi && campiObbligatori){
        return true;
    }
    else{
        return false;
    }
}

consistenzaRispostaMultipla = function(corpo, $mdDialog){
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
                            for(g in corpo.answer[k]) {                                                                 // per ogni oggetto nell'array answer in posizione k
                              var giusto = false;                                                                       // se questa diventa true la keyword è giusta
                                for (var j = 0; j < keywordAnswer.length; j++) {                                        // per ogni keyword possibile
                                    if (g == keywordAnswer[j]) {
                                        giusto = true;
                                    }
                                }
                                // controllo la variabile giusto
                                if(!giusto){
                                    // se arrivo qua la keyword non ha riscontrato un match con le parole target
                                    alert = $mdDialog.alert()
                                        .title("Errore generico")
                                        .content("inseriti campi sconosciuti")
                                        .ok('Ok');
                                    $mdDialog
                                        .show(alert)
                                        .finally(function () {
                                            alert = undefined;
                                        });
                                    campiFacoltativi = false;
                                    return false;;
                                }
                            }
                        }
                        else{
                            alert = $mdDialog.alert()
                                .title("Errore generico")
                                .content("valore di 'isItRight' non valido, prego inserire un \"true\" o \"false\"")
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
                            .content("campo 'isItRight' mancante, prego inserire un campo \"isItRight\" valido")
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
                        .content("campo 'text' non trovato, prego inserire un campo \"text\" valido")
                        .ok('Ok');
                    $mdDialog
                        .show(alert)
                        .finally(function () {
                            alert = undefined;
                        });
                    return false;
                }
            }
        }
        else {
            alert = $mdDialog.alert()
                .title("Errore: campi obbligatori mancanti")
                .content("campo 'answer' non trovato, prego inserire un campo \"answer\" valido")
                .ok('Ok');
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
            return false;
        }
    } else{
        alert = $mdDialog.alert()
            .title("Errore: campi obbligatori mancanti")
            .content("campo 'questionText' non trovato, prego inserire un campo \"questionText\" valido")
            .ok('Ok');
        $mdDialog
            .show(alert)
            .finally(function () {
                alert = undefined;
            });
        return false;
    }
    // controllo campi facoltativi
    var facoltativiString = ["type","answer","questionText","url", "keywords" , "topic"];
    var key;
    for(key in corpo) {
        var giusto = false;
        for (var j = 0; j < facoltativiString.length; j++) {
            if (key == facoltativiString[j]) {
                giusto = true;
            }
        }
        if (!giusto) {
            alert = $mdDialog.alert()
                .title("Errore generico")
                .content("inseriti campi sconosciuti")
                .ok('Ok');
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
            campiFacoltativi = false;
            return false;
        }
    }
    if(campiFacoltativi && campiObbligatori){
        return true;
    }
    else{
        return false;
    }

}

consistenzaOrdinamentoStringhe = function(corpo, $mdDialog){
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
                        campiObbligatori = true;
                    }
                    else{
                        alert = $mdDialog.alert()
                            .title("Errore: campi obbligatori mancanti")
                            .content("campo 'position' non trovato, prego inserire un campo \"position\" valido")
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
                        .content("campo 'text' non trovato, prego inserire un campo \"text\" valido")
                        .ok('Ok');
                    $mdDialog
                        .show(alert)
                        .finally(function () {
                            alert = undefined;
                        });
                    return false;
                }
            }
        }
        else {
            alert = $mdDialog.alert()
                .title("Errore: campi obbligatori mancanti")
                .content("campo 'answer' non trovato, prego inserire un campo \"answer\" valido")
                .ok('Ok');
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
            return false;
        }
    } else{
        alert = $mdDialog.alert()
            .title("Errore: campi obbligatori mancanti")
            .content("campo 'questionText' non trovato, prego inserire un campo \"questionText\" valido")
            .ok('Ok');
        $mdDialog
            .show(alert)
            .finally(function () {
                alert = undefined;
            });
        return false;
    }
    // controllo campi facoltativi
    var facoltativiString = ["type","questionText","answer" ,"url", "keywords", "topic"];
    var key;
    for(key in corpo) {
        var giusto = false;
        for (var j = 0; j < facoltativiString.length; j++) {
            if (key == facoltativiString[j]) {
                giusto = true;
            }
        }
        if (!giusto) {
            alert = $mdDialog.alert()
                .title("Errore generico")
                .content("inseriti campi sconosciuti")
                .ok('Ok');
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
            campiFacoltativi = false;
            return false;
        }
    }
    if(campiFacoltativi && campiObbligatori){
        return true;
    }
    else{
        return false;
    }
}

consistenzaOrdinamentoImmagini = function(corpo, $mdDialog){
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
                        campiObbligatori = true;
                    }
                    else{
                        alert = $mdDialog.alert()
                            .title("Errore: campi obbligatori mancanti")
                            .content("campo 'position' non trovato, prego inserire un campo \"position\" valido")
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
                        .content("campo 'url' non trovato, prego inserire un campo \"url\" valido")
                        .ok('Ok');
                    $mdDialog
                        .show(alert)
                        .finally(function () {
                            alert = undefined;
                        });
                    return false;
                }
            }
        }
        else {
            alert = $mdDialog.alert()
                .title("Errore: campi obbligatori mancanti")
                .content("campo 'answer' non trovato, prego inserire un campo \"answer\" valido")
                .ok('Ok');
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
            return false;
        }
    } else{
        alert = $mdDialog.alert()
            .title("Errore: campi obbligatori mancanti")
            .content("campo 'questionText' non trovato, prego inserire un campo \"questionText\" valido")
            .ok('Ok');
        $mdDialog
            .show(alert)
            .finally(function () {
                alert = undefined;
            });
        return false;
    }
    // controllo campi facoltativi
    var facoltativiString = ["type","questionText","answer","url", "keywords", "topic"];
    var key;
    for(key in corpo) {
        var giusto = false;
        for (var j = 0; j < facoltativiString.length; j++) {
            if (key == facoltativiString[j]) {
                giusto = true;
            }
        }
        if (!giusto) {
            alert = $mdDialog.alert()
                .title("Errore generico")
                .content("inseriti campi sconosciuti")
                .ok('Ok');
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
            campiFacoltativi = false;
            return false;
        }
    }
    if(campiFacoltativi && campiObbligatori){
        return true;
    }
    else{
        return false;
    }
}

consistenzaRiempimentoSpaziVutoi = function(corpo, $mdDialog){
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
                    alert = $mdDialog.alert()
                        .title("Errore: campi obbligatori mancanti")
                        .content("campo 'parolaNumero' non trovato, prego inserire un campo \"parolaNumero\" valido")
                        .ok('Ok');
                    $mdDialog
                        .show(alert)
                        .finally(function () {
                            alert = undefined;
                        });
                    return false;
                }
            }
        }
        else {
            alert = $mdDialog.alert()
                .title("Errore: campi obbligatori mancanti")
                .content("campo 'answer' non trovato, prego inserire un campo \"answer\" valido")
                .ok('Ok');
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
            return false;
        }
    } else{
        alert = $mdDialog.alert()
            .title("Errore: campi obbligatori mancanti")
            .content("campo 'questionText' non trovato, prego inserire un campo \"questionText\" valido")
            .ok('Ok');
        $mdDialog
            .show(alert)
            .finally(function () {
                alert = undefined;
            });
        return false;
    }
    // controllo campi facoltativi
    var facoltativiString = ["type","answer","questionText", "keywords", "topic"];
    var key;
    for(key in corpo) {
        var giusto = false;
        for (var j = 0; j < facoltativiString.length; j++) {
            if (key == facoltativiString[j]) {
                giusto = true;
            }
        }
        if (!giusto) {
            alert = $mdDialog.alert()
                .title("Errore generico")
                .content("inseriti campi sconosciuti")
                .ok('Ok');
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
            campiFacoltativi = false;
            return false;
        }
    }
    if(campiFacoltativi && campiObbligatori){
        return true;
    }
    else{
        return false;
    }

}

consistenzaCollegamentoElementi = function(corpo, $mdDialog){
    var campiObbligatori = false;
    var campiFacoltativi = true;

                                                                                                                        // controllo campi obbligatori
    if(corpo.hasOwnProperty('questionText')) {
        if (corpo.hasOwnProperty('answer')) {
            var valido = false;                                                                                         // indica se le associazioni sono valide
            for(var k = 0; k < corpo.answer.length ; k++){
                                                                                                                        // controllo che ogni oggetto ha 2 campi
                var key, count = 0;
                for(key in corpo.answer[k]){
                    count++;
                }
                if(count == 2){
                                                                                                                        // ora devo controllare che gli elementi siano validi
                                                                                                                        // nel caso di associazione di 2 stringhe
                    if(corpo.answer[k].hasOwnProperty('text1') && corpo.answer[k].hasOwnProperty('text2')){
                        valido = true;
                    }
                                                                                                                        // nel caso di associazione stringa - immagine
                    else if(corpo.answer[k].hasOwnProperty('text1') && corpo.answer[k].hasOwnProperty('url2')){
                        valido = true;
                    }
                                                                                                                        // nel caso di associazione immagine stringa
                    else if(corpo.answer[k].hasOwnProperty('url1') && corpo.answer[k].hasOwnProperty('text2')){
                        valido = true;
                    }
                                                                                                                        // nel caso di associazione tra 2 immagini
                    else if(corpo.answer[k].hasOwnProperty('url1') && corpo.answer[k].hasOwnProperty('ur')){
                        valido = true;
                    } else{
                        alert = $mdDialog.alert()
                            .title("Errore: struttura errata")
                            .content("errore nell'associazione degli elementi")
                            .ok('Ok');
                        $mdDialog
                            .show(alert)
                            .finally(function () {
                                alert = undefined;
                            });
                        return false;
                    }
                }else{
                    alert = $mdDialog.alert()
                        .title("Errore: struttura errata")
                        .content("gli elementi nelle 'answer' devono essere sempre in coppia")
                        .ok('Ok');
                    $mdDialog
                        .show(alert)
                        .finally(function () {
                            alert = undefined;
                        });
                    valido = false;
                    return false;
                }
            }
            if(valido){
                campiObbligatori = true;
            }
        }
        else {
            alert = $mdDialog.alert()
                .title("Errore: campi obbligatori mancanti")
                .content("campo 'answer' non trovato, prego inserire un campo \"answer\" valido")
                .ok('Ok');
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
            return false;
        }
    } else{
        alert = $mdDialog.alert()
            .title("Errore: campi obbligatori mancanti")
            .content("campo 'questionText' non trovato, prego inserire un campo \"questionText\" valido")
            .ok('Ok');
        $mdDialog
            .show(alert)
            .finally(function () {
                alert = undefined;
            });
        return false;
    }
    // controllo campi facoltativi
    var facoltativiString = ["type","questionText","answer","url", "keywords", "topic"];
    var key;
    for(key in corpo) {
        var giusto = false;
        for (var j = 0; j < facoltativiString.length; j++) {
            if (key == facoltativiString[j]) {
                giusto = true;
            }
        }
        if (!giusto) {
            alert = $mdDialog.alert()
                .title("Errore generico")
                .content("inseriti campi sconosciuti")
                .ok('Ok');
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
            campiFacoltativi = false;
            return false;
        }
    }
    if(campiFacoltativi && campiObbligatori){
        return true;
    }
    else{
        return false;
    }

}

consistenzaAreaCliccabile = function(corpo, $mdDialog){
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
                                    alert = $mdDialog.alert()
                                        .title("Errore generico")
                                        .content("campo in 'answer' sconosciuti")
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
                                    .title("Errore: struttura errata")
                                    .content("coordinate non valide")
                                    .ok('Ok');
                                $mdDialog
                                    .show(alert)
                                    .finally(function () {
                                        alert = undefined;
                                    });
                                return false;
                            }
                        }
                    }
                    else{
                        alert = $mdDialog.alert()
                            .title("Errore: campi obbligatori mancanti")
                            .content("campo 'answer' non trovato, prego inserire un campo \"answer\" valido")
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
                        .title("Errore: struttura errata")
                        .content("campo 'resolution' necessita di 2 coordinate, \"x\" e \"y\"")
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
                    .content("campo 'resolution' non trovato, prego inserire un campo \"resolution\" valido")
                    .ok('Ok');
                $mdDialog
                    .show(alert)
                    .finally(function () {
                        alert = undefined;
                    });
                return false;
            }
        } else{
            alert = $mdDialog.alert()
                .title("Errore: campi obbligatori mancanti")
                .content("campo 'image' non trovato, prego inserire un campo \"image\" valido")
                .ok('Ok');
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
            return false;
        }
    } else{
        alert = $mdDialog.alert()
            .title("Errore: campi obbligatori mancanti")
            .content("campo 'questionText' non trovato, prego inserire un campo \"questionText\" valido")
            .ok('Ok');
        $mdDialog
            .show(alert)
            .finally(function () {
                alert = undefined;
            });
        return false;
    }
    // controllo campi facoltativi
    var facoltativiString = ["type","answer","questionText","url", "keywords" , "topic" ,"resolution" , "image"];
    var key;
    for(key in corpo) {
        var giusto = false;
        for (var j = 0; j < facoltativiString.length; j++) {
            if (key == facoltativiString[j]) {
                giusto = true;
            }
        }
        if (!giusto) {
            alert = $mdDialog.alert()
                .title("Errore generico")
                .content("inseriti campi sconosciuti")
                .ok('Ok');
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
            campiFacoltativi = false;
            return false;
        }
    }
    if(campiFacoltativi && campiObbligatori){
        return true;
    }
    else{
        return false;
    }
}
