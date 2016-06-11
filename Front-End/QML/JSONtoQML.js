/*******************************************************************************
 * Name: QuizziPedia::QML::JSONtoQML;
 * Description: questa classe permette di convertire il compilato JSON in QML;
 * Creation data: 30-05-2016;
 * Author: Matteo Granzotto;
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: JSONtoQML_20160530;
 * Update data: 30-05-2016;
 * Description: Creato il file;
 * Autore: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.factory('JSONtoQML', JSONtoQML);

function JSONtoQML() {
    var methods = {
        setTempQuestionID: setTempQuestionID,
        getTempQuestionID: getTempQuestionID,
        deleteTempQuestionID: deleteTempQuestionID,
        setToBeViewed: setToBeViewed
    };

    return methods;

    var idQuestion;
    var questionTemp;

    function setTempQuestionID(id) {
      idQuestion=id;
    }

    function getTempQuestionID() {
      return idQuestion;
    }

    function deleteTempQuestionID() {
      delete idQuestion;
    }

    function setToBeViewed(questionDownloaded) {
      if(questionDownloaded.question.length>1) {
        var qD={};
        qD.type="custom";
        qD.question= questionDownloaded.question;
        qD.question.forEach(function(elem){
          if(elem.type=="spaziVuoti") {
            elem.type="riempimentoSpaziVuoti";
          }
          if(elem.type=="collegamento") {
            elem.type="collegamentoElementi";
          }
          elem.answer=elem.answers;
          delete elem.answers;
        });
        qD.keywords=questionDownloaded.keywords;
        return qD;
      }
      else { // domanda non custom
          var tempAnswer=questionDownloaded.question[0].answers;
          var qD= questionDownloaded.question[0];
          delete qD.answers;
          qD.answer=tempAnswer;
          qD.keywords=questionDownloaded.keywords;
          return qD;
      }
    }
}
