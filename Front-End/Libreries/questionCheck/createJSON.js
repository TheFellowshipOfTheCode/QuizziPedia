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
    var jsonString = "\n \"question\" :[ \n { \n";
    var jsonKey = "";
    if(corpo.hasOwnProperty('keywords')){
        jsonKey = " , \n \"keywords\" : \n [ ";
        for(k = 0 ; k < corpo.keywords.length ; k++){
            if(i == corpo.keywords.length-1){
                jsonKey = jsonKey + "\"" + corpo.keywords[k] + "\"";
            }
            else{
                jsonKey = jsonKey + "\"" + corpo.keywords[k] + "\" ,";
            }
        }
        jsonKey = jsonKey + " \n ]";
    }
    var jsonStatistic = "\n }";

    if(tipologia == "veroFalso") {
         jsonString = jsonString + createJSONVF(corpo, res);
    }
    else if(tipologia ==  "rispostaMultipla"){
         jsonString = jsonString + createJSONrispostaMultipla(corpo, res);
    }
    else if(tipologia == "ordinamentoStringhe"){
         jsonString = jsonString + createJSONordinamentoStringhe(corpo, res);
    }
    else if(tipologia == "collegamentoElementi"){
         jsonString = jsonString + createJSONcollegamentoElementi(corpo, res);
    }
    else if(tipologia == "ordinamentoImmagini"){
         jsonString = jsonString + createJSONordinamentoImmagini(corpo, res);
    }
    else if(tipologia == "areaCliccabile"){
         jsonString = jsonString + createJSONareaCliccabile(corpo, res);
    }
    else if(tipologia == "riempimentoSpaziVuoti"){
        jsonString = jsonString + createJSONriepimentoSpaziVuoti(corpo, res);
    }
    else if(tipologia == "custom"){
        jsonString = jsonString + createJSONcustom(corpo, res);
    }

    jsonString = jsonString + "\n ]"; // questi dovrebbero chiudere il tag "question"
    jsonString = campiComuni + jsonString + jsonKey +  jsonStatistic;
    console.log(jsonString);
    var fine = JSON.parse(jsonString);
    console.log(fine);
    return fine;
}

createJSONVF = function(corpo, res){
    var jsonString = " \"type\" : \"veroFalso\"" + ", \n ";
    if(corpo.hasOwnProperty('image')){
        jsonString =  jsonString + "\n \"image\" : \" " + corpo.image + "\" , \n";
    }
    jsonString = jsonString + " \n \"answers\" : [ \n { \n \"text\" : \"" + corpo.answer[0].text + "\" , \n";
    jsonString = jsonString + " \n \"isItRight\" : " + corpo.answer[0].isItRight + "\n" + "} \n] \n} \n";
    return jsonString;
}

createJSONrispostaMultipla = function(corpo){
    var jsonString = "\"type\" : \"rispostaMultipla\"" + ",";
    if(corpo.hasOwnProperty('image')){
        jsonString = jsonString + " \n \"image\" : " + "\"" + corpo.url + "\",";
    }
    if(corpo.hasOwnProperty('questionText')) {
        jsonString = jsonString + " \n \"questionText\" : " + "\"" +  corpo.questionText + "\",";
    }
    jsonString = jsonString + " \n \"answers\" : [{";
    for(var j = 0 ;j < corpo.answer.length ; j++){
        if(corpo.answer[j].hasOwnProperty('text')){
            jsonString = jsonString + " \n \"text\" : " + "\"" + corpo.answer[j].text + "\",";
        }
        if(corpo.answer[j].hasOwnProperty('url')){
            jsonString = jsonString + " \n \"url\" :" + "\"" + corpo.answer[j].url + "\",";
        }
        if(corpo.answer[j].hasOwnProperty('isItRight')){
            jsonString = jsonString + " \n \"isItRight\" : " +  corpo.answer[j].isItRight ;
        }
        if(j == corpo.answer.length -1) {
            jsonString = jsonString + "}";
        }
        else{
            jsonString = jsonString + "}, \n {";
        }
    }
    jsonString = jsonString + "]}";
    return jsonString;
}

createJSONordinamentoStringhe = function(corpo){
    var jsonString = "\"type\" : \"ordinamentoStringhe\" ,";
    if(corpo.hasOwnProperty('questionText')){
        jsonString = jsonString + " \n \"questionText\" : " + "\"" +corpo.questionText + "\",";
    }
    if(corpo.hasOwnProperty('image')){
        jsonString = jsonString + " \n \"image\" : " + "\"" +corpo.image + "\",";
    }
    jsonString = jsonString + " \n \"answers\" : \n [ \n {";
    for(j = 0 ; j < corpo.answer.length ; j++){
        jsonString = jsonString + "\"text\" : " + "\"" + corpo.answer[j].text + "\",";
        jsonString = jsonString + "\"position\" : " + "\"" + corpo.answer[j].position + "\"";
        if(j == corpo.answer.length -1){
            jsonString = jsonString + "}";
        }
        else{
            jsonString = jsonString + "}, \n {";
        }
    }
    jsonString = jsonString + "]}";
    return jsonString;
}

createJSONcollegamentoElementi = function(corpo){
    var jsonString = "\"type\" : \"collegamentoElementi\" ,";
    jsonString = jsonString + " \n \"questionText\" : " + "\"" + corpo.questionText + "\",";
    jsonString = jsonString + " \n \"answers\" : \n [ \n {";
    for(j=0 ; j < corpo.answer.length ; j++){
        if(corpo.answer[j].hasOwnProperty('text1')){
            jsonString = jsonString + " \n \"text1\" : \"" + corpo.answer[j].text1 + "\" ,";
        }
        if(corpo.answer[j].hasOwnProperty('text2')){
            jsonString = jsonString + " \n \"text2\" : \"" + corpo.answer[j].text2 + "\"";
        }
        if(corpo.answer[j].hasOwnProperty('url1')){
            jsonString = jsonString + " \n \"url1\" : \"" + corpo.answer[j].url1 + "\" ,";
        }
        if(corpo.answer[j].hasOwnProperty('url2')){
            jsonString = jsonString + " \n \"url2\" : \"" + corpo.answer[j].url2 + "\"";
        }
        if(j == corpo.answer.length -1){
            jsonString = jsonString + " \n }";
        }
        else{
            jsonString = jsonString + " \n }, \n {";
        }
    }
    jsonString = jsonString + "]}";
    return jsonString;
}

createJSONordinamentoImmagini = function(corpo){
    var jsonString = "\"type\" : \"ordinamentoImmagini\" ,";
    jsonString = jsonString + "\"quesitonText\" : \"" + corpo.questionText + "\" ,";
    jsonString = jsonString + "\"answers\" : [{";
    for(j = 0 ; j < corpo.answer.length ; j++){
        jsonString = jsonString + "\"url\" \"" + corpo.answer[j].url + "\" ,";
        jsonString = jsonString + "\"position\" \"" + corpo.answer[j].position + "\"";
        if(j == corpo.answer.length -1){
            jsonString = jsonString + "}]";
        }
        else {
            jsonString = jsonString + "}, \n {";
        }
    }
    return jsonString;

}

createJSONareaCliccabile = function(corpo){
    var jsonString = "\"type\" : \"areaCliccabile\" ,";
    jsonString = jsonString + "\n \"questionText\" : \"" + corpo.questionText + "\" ,";
    jsonString = jsonString + " \n \"image\" : \"" + corpo.image + "\" ,";
    jsonString = jsonString + " \n \"resolution\" : { \n \"x\" : " + corpo.resolution.x + ", \n \"y\" : " + corpo.resolution.y + "\n }, \n";
    jsonString = jsonString + " \n \"answers\" : [ \n { ";
    for(j=0 ; j < corpo.answer.length ; j++){
        jsonString = jsonString + " \n \"x\" : \"" + corpo.answer[j].x + "\" ,";
        jsonString = jsonString + " \n  \"y\" : \"" + corpo.answer[j].y + "\"";
        if(corpo.answer[j].hasOwnProperty('text')){
            jsonString = jsonString + ", \n \"text\" : \" " + corpo.answer[j].text + "\"";
        }
        if(j == corpo.answer.length -1){
            jsonString = jsonString + " \n } \n ]";
        }
        else{
            jsonString = jsonString + " \n }, \n {";
        }
    }
    jsonString = jsonString + "}";
    return jsonString;
}

createJSONriepimentoSpaziVuoti = function(corpo){
    var jsonString = "\"type\" : \"spaziVuoti\" ,";
    jsonString = jsonString + " \n \"quesitonText\" : \"" + corpo.questionText + "\" ,";
    jsonString = jsonString + " \n \"answer\" : [{";
    for(var j=0 ; j < corpo.answer.length ; j++){
        jsonString = jsonString + " \n \"wordNumber\" : " + corpo.answer[j].parolaNumero;
        if(j == corpo.answer.length -1){
            jsonString = jsonString + "}]";
        }
        else {
            jsonString = jsonString + "}, \n {";
        }
    }
    jsonString = jsonString + "}";
    return jsonString;
}

createJSONcustom = function(corpo){
    var jsonString = "";
    for(var i = 0 ; i < corpo.question.length ; i++){
        if(corpo.question[i].type == "veroFalso"){
            jsonString = jsonString + createJSONVF(corpo.question[i]);
        }
        else if(corpo.question[i].type == "rispostaMultipla"){
            jsonString = jsonString + createJSONrispostaMultipla(corpo.question[i]);
        }
        else if(corpo.question[i].type == "ordinamentoStringhe"){
            jsonString = jsonString + createJSONordinamentoStringhe(corpo.question[i]);
        }
        else if(corpo.question[i].type == "collegamentoElementi"){
            jsonString = jsonString + createJSONcollegamentoElementi(corpo.question[i]);
        }
        else if(corpo.question[i].type == "ordinamentoImmagini"){
            jsonString = jsonString + createJSONordinamentoImmagini(corpo.question[i]);
        }
        else if(corpo.question[i].type == "areaCliccabile"){
            jsonString = jsonString + createJSONareaCliccabile(corpo.question[i]);
        }
        else if(corpo.question[i].type == "spaziVuoti"){
            jsonString = jsonString + createJSONriepimentoSpaziVuoti(corpo.question[i]);
        }
        if(i == corpo.question.length -1){
           // jsonString = jsonString + "}]";   lasciare commentato
        }
        else{
            jsonString = jsonString + ", \n {";
        }
    }
    return jsonString;
}