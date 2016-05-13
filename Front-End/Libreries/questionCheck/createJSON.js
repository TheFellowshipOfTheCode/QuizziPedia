/*******************************************************************************
 * Name: QuizziPedia::Front-End::Libreries::createJSON;
 * Description: questo file contiene le funzioni che permettono la generazione
 * del json a partire da un testo validato dal parser QML;
 * Creation data: 27-04-2016;
 * Author: Matteo Gnoato.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * Update data: 13-05-2016;
 * Description: Ottimizzati i cicli for delle funzioni in modo da minimizzare
 * la computazione
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 * Update data: 13-05-2016;
 * Description: Risolto problemi di formazione valida del json finale
 * per la domanda custom
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 * Update data: 13-05-2016;
 * Description: Risolto problemi di formazione valida del json finale
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 * Update data: 28-04-2016;
 * Description: Creata funzione createCustom che creea la parte
 * JSON riguardante la tipologia specifica della domanda;
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 * Update data: 28-04-2016;
 * Description: Creata funzione createCollegamentoelementi che creea la parte
 * JSON riguardante la tipologia specifica della domanda;
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 * Update data: 28-04-2016;
 * Description: Creata funzione createSpaziVuoti che creea la parte
 * JSON riguardante la tipologia specifica della domanda;
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 * Update data: 28-04-2016;
 * Description: Creata funzione createAreaCliccabile che creea la parte
 * JSON riguardante la tipologia specifica della domanda;
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 * Update data: 28-04-2016;
 * Description: Creata funzione createOrdinamentoStringhe che creea la parte
 * JSON riguardante la tipologia specifica della domanda;
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 *  * Update data: 28-04-2016;
 * Description: Creata funzione createOrdinamentoImmagini che creea la parte
 * JSON riguardante la tipologia specifica della domanda;
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 * Update data: 28-04-2016;
 * Description: Creata funzione createRispostaMultipla che creea
 * la parte JSON riguardante la tipologia specifica della domanda;
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 * Update data: 28-04-2016;
 * Description: Creata funzione createVF che creea la parte JSON riguardante
 * la tipologia specifica della domanda;
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 * Update data: 27-04-2016;
 * Description: Creata funzione che crea la parte json dei campi comuni
 * a tutte le tipologie di domanda;
 * Autore: Matteo Gnoato.
 *-------------------------------------------------------------------------------
 *******************************************************************************/





createJSON = function(corpo, res, tipologia, topic){
    var campiComuni = "{ \n " +
        "\"makeWith\" : \"qml\" , \n" +
        " \"language\" : " + "\"it\"" + ", \n";
    campiComuni = campiComuni + "\"topic\" : \"" + topic + "\" , \n " ;
    var jsonKey;
    if(corpo.hasOwnProperty('keywords')){
        jsonKey = " , \n \"keywords\" : \n [ ";
        for(i = 0 ; i < corpo.keywords.length ; i++){
            if(i == corpo.keywords.length-1){
                jsonKey = jsonKey + "\"" + corpo.keywords[i] + "\"";
            }
            else{
                jsonKey = jsonKey + "\"" + corpo.keywords[i] + "\" ,";
            }
        }
        jsonKey = jsonKey + " \n ]";
    }
   // var jsonStatistic = "\n \"level\" : 500, \n \"totalAnswers\" : 0, \n \"correctAnswers\" : 0 \n }";
    var jsonStatistic = "\n }";

    if(tipologia == "veroFalso") {
        var jsonString = createJSONVF(corpo, res);
    }
    else if(tipologia ==  "rispostaMultipla"){
        var jsonString = createJSONrispostaMultipla(corpo);
    }
    else if(tipologia == "ordinamentoStringhe"){
        var jsonString = createJSONordinamentoStringhe(corpo);
    }
    else if(tipologia == "collegamentoElementi"){
        var jsonString = createJSONcollegamentoElementi(corpo);
    }
    else if(tipologia == "ordinamentoImmagini"){
        var jsonString = createJSONordinamentoImmagini(corpo);
    }
    else if(tipologia == "areaCliccabile"){
        var jsonStirng = createJSONareaCliccabile(corpo);
    }
    else if(tipologia == "riempimentoSpaziVuoti"){
        var jsonString = createJSONriepimentoSpaziVuoti(corpo);
    }
    else if(tipologia == "custom"){
        var jsonString = createJSONcustom(corpo);
    }

    jsonString = campiComuni + jsonString + jsonKey +  jsonStatistic;
    console.log(jsonString);
    var fine = JSON.parse(jsonString);
    console.log(fine);
    return fine;
}

createJSONVF = function(corpo, res){
    var jsonString = "\n \"question\" :[ \n { \n \"type\" : \"veroFalso\"" + ", \n ";
    if(corpo.hasOwnProperty('image')){
        jsonString =  jsonString + "\n \"image\" : \" " + corpo.image + "\" , \n";
    }
    jsonString = jsonString + " \n \"answers\" : [ \n { \n \"text\" : \"" + corpo.answer[0].text + "\" , \n";
    jsonString = jsonString + " \n \"isItRight\" : " + corpo.answer[0].isItRight + "\n" + "} \n] \n} \n] \n";
    return jsonString;
}

createJSONrispostaMultipla = function(corpo){
    var jsonString = "\n \"question\": \n [ \n { \n \"type\" : \"rispostaMultipla\"" + ",";
    if(corpo.hasOwnProperty('image')){
        jsonString = jsonString + " \n \"image\" : " + "\"" + corpo.url + "\",";
    }
    if(corpo.hasOwnProperty('questionText')) {
        jsonString = jsonString + " \n \"questionText\" : " + "\"" +  corpo.questionText + "\",";
    }
    jsonString = jsonString + " \n \"answers\" : [{";
    for(i = 0 ;i < corpo.answer.length ; i++){
        if(key.hasOwnProperty('text')){
            jsonString = jsonString + " \n \"text\" : " + "\"" + corpo.answer[i].text + "\",";
        }
        if(key.hasOwnProperty('url')){
            jsonString = jsonString + " \n \"url\" :" + "\"" + corpo.answer[i].url + "\",";
        }
        if(key.hasOwnProperty('isItRight')){
            jsonString = jsonString + " \n \"isItRight\" : " +  corpo.answer[i].isItRight ;
        }
        if(i == corpo.answer.length -1) {
            jsonString = jsonString + "}";
        }
        else{
            jsonString = jsonString + "}, \n {";
        }
    }
    jsonString = jsonString + "]}]";
    return jsonString;
}

createJSONordinamentoStringhe = function(corpo){
    var jsonString = " \n \"question\" : \n [ \n {  \n \"type\" : \"ordinamentoStringhe\" ,";
    if(corpo.hasOwnProperty('questionText')){
        jsonString = jsonString + " \n \"questionText\" : " + "\"" +corpo.questionText + "\",";
    }
    if(corpo.hasOwnProperty('image')){
        jsonString = jsonString + " \n \"image\" : " + "\"" +corpo.image + "\",";
    }
    jsonString = jsonString + " \n \"answers\" : \n [ \n {";
    for(i = 0 ; i < corpo.answer.length ; i++){
        jsonString = jsonString + "\"text\" : " + "\"" + corpo.answer[i].text + "\",";
        jsonString = jsonString + "\"position\" : " + "\"" + corpo.answer[i].position + "\"";
        if(i == corpo.answer.lenght -1){
            jsonString = jsonString + "}]";
        }
        else{
            jsonString = jsonString + "}, \n {";
        }
    }
    return jsonString;
}

createJSONcollegamentoElementi = function(corpo){
    var jsonString = " \n \"question\" : \n [ \n { \n \"type\" : \"collegamentoElementi\" ,";
    jsonString = jsonString + " \n \"questionText\" : " + "\"" + corpo.questionText + "\",";
    jsonString = jsonString + " \n \"answers\" : \n [ \n {";
    for(i=0 ; i < corpo.answer.length ; i++){
        if(key.hasOwnProperty('text1')){
            jsonString = jsonString + " \n \"text1\" : \"" + corpo.answer[i].text1 + "\" ,";
        }
        if(key.hasOwnProperty('text2')){
            jsonString = jsonString + " \n \"text2\" : \"" + corpo.answer[i].text2 + "\"";
        }
        if(key.hasOwnProperty('url1')){
            jsonString = jsonString + " \n \"url1\" : \"" + corpo.answer[i].url1 + "\" ,";
        }
        if(key.hasOwnProperty('url2')){
            jsonString = jsonString + " \n \"url2\" : \"" + corpo.answer[i].url2 + "\"";
        }
        if(i == corpo.answer.length -1){
            jsonString = jsonString + "}]";
        }
        else{
            jsonString = jsonString + "}, \n {";
        }
    }
    return jsonString;
}

createJSONordinamentoImmagini = function(corpo){
    var jsonString = "\"question\" : [{ \"type\" : \"ordinamentoImmagini\" ,";
    jsonString = jsonString + "\"quesitonText\" : \"" + corpo.questionText + "\" ,";
    jsonString = jsonString + "\"answer\" : [{";
    for(i = 0 ; i < corpo.answer.length ; i++){
        jsonString = jsonString + "\"url\" \"" + corpo.answer[i].url + "\" ,";
        jsonString = jsonString + "\"position\" \"" + corpo.answer[i].position + "\"";
        if(i == corpo.answer.length -1){
            jsonString = jsonString + "}]";
        }
        else {
            jsonString = jsonString + "}, \n {";
        }
    }
    return jsonString;

}

createJSONareaCliccabile = function(corpo){
    var jsonString = "\"question\" : [{ \"type\" : \"areaCliccabile\" ,";
    jsonString = jsonString + "\"quesitonText\" : \"" + corpo.questionText + "\" ,";
    jsonString = jsonString + "\"image\" : \"" + corpo.image + "\" ,";
    jsonString = jsonString + "\"answer\" : [{";
    for(i=0 ; i < corpo.answer.length ; i++){
        jsonString = jsonString + " \n \"x\" : \"" + corpo.answer[i].x + "\" ,";
        jsonString = jsonString + " \n  \"y\" : \"" + corpo.answer[i].y + "\"";
        if(key.hasOwnProperty('text')){
            jsonString = jsonString + ", \n \"text\" : \" " + corpo.answer[i].text + "\" ,";
        }
        if(i == corpo.answer.length -1){
            jsonString = jsonString + "}]";
        }
        else{
            jsonString = jsonString + "}, \n {";
        }
    }
    return jsonString;
}

createJSONriepimentoSpaziVuoti = function(corpo){
    var jsonString = " \n \"question\" : \n [ \n { \n \"type\" : \"spaziVuoti\" ,";
    jsonString = jsonString + " \n \"quesitonText\" : \"" + corpo.questionText + "\" ,";
    jsonString = jsonString + " \n \"answer\" : [{";
    for(i=0 ; i < corpo.answer.length ; i++){
        jsonString = jsonString + " \n \"wordNumber\" : " + corpo.answer[i].parolaNumero;
        if(i == corpo.answer.length -1){
            jsonString = jsonString + "}]";
        }
        else {
            jsonString = jsonString + "}, \n {";
        }
    }
    return jsonString;
}

createJSONcustom = function(corpo){
    var jsonString;
    for(i = 0 ; i < corpo.question.length ; i++){
        if(corpo.question[i].type == "veroFalso"){
            jsonString = jsonString + createJSONVF(corpo);
        }
        else if(corpo.question[i].type == "rispostaMultipla"){
            jsonString = jsonString + createJSONrispostaMultipla(corpo);
        }
        else if(corpo.question[i].type == "ordinamentoStringhe"){
            jsonString = jsonString + createJSONordinamentoStringhe(corpo);
        }
        else if(corpo.question[i].type == "collegamentoElementi"){
            jsonString = jsonString + createJSONcollegamentoElementi(corpo);
        }
        else if(corpo.question[i].type == "ordinamentoImmagini"){
            jsonString = jsonString + createJSONordinamentoImmagini(corpo);
        }
        else if(corpo.question[i].type == "areaCliccabile"){
            jsonString = jsonString + createJSONareaCliccabile(corpo);
        }
        else if(corpo.question[i].type == "spaziVuoti"){
            jsonString = jsonString + createJSONriepimentoSpaziVuoti(corpo);
        }
        if(i == corpo.question.length -1){
            jsonString = jsonString + "}]";
        }
        else{
            jsonString = jsonString + "}, \n {";
        }
    }
    return jsonString;
}