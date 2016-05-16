<!--
/*******************************************************************************
* Name: QuizziPedia::Front-End::Filters::StartForm;
* Description: classe che permette di restituire una sezione di un array;
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: CreateQuestionnaireView_20160305;
* Update data: 03-05-2016;
* Description: Creata la classe;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/
-->

app.filter('startFrom', function() {

  return function(input, start) {
    if(input!=undefined) {
      start = +start;
      return input.slice(start);
    }
  };
});
