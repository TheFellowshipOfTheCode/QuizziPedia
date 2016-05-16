/*******************************************************************************
 * Name: QuizziPedia::Front-End::Services::Utils;
 * Description: questa classe contiene tutte le funzionalità che non appartengono
 * a nessuna classe in particolare, ma sono in comune.
 *
 *
 * Creation data: 09-05-2016;
 * Author: Matteo Granzotto.
 *******************************************************************************
 * Updates history
 *------------------------------------------------------------------------------
 * ID: Utils_20160509;
 * Update data: 09-05-2016;
 * Description: Inserito il metodo shuffle();
 * Autore: Matteo Granzotto.
 *------------------------------------------------------------------------------
 * ID: Utils_20160509;
 * Update data: 09-05-2016;
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
