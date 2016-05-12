/*******************************************************************************
 * Name: QuizziPedia::Front-End::Services::;
 * Description:
 * Relations with other classes:
 * Creation data: 27-04-2016;
 * Author: Matteo Granzotto.
 *******************************************************************************
 * Updates history
 *------------------------------------------------------------------------------
 * ID: LangService_20160427;
 * Update data: 27-04-2016;
 * Description: Creato il file;
 * Autore: Matteo Granzotto.
 *------------------------------------------------------------------------------
 ******************************************************************************/


app.factory('Utils', Utils);

function Utils() {

  var methods = {
    shuffle : shuffle
  };
  return methods;

  function shuffle(array) {

    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }



}
