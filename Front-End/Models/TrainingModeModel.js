/*******************************************************************************
* Name: QuizziPedia::Front-End::Models::;
* Description:
* Relations with other classes:
* +
* Creation data: 03-05-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: _20160503;
* Update data: 03-05-2016;
* Description: Creato il file;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

app.factory('TrainingModeModel', TrainingModeModel);

function TrainingModeModel() {
  //constructor
  var TrainingModeModel = function ()
  {
    // private variables
    var lang_ = lang;
    // public functions
    this.getSomething = function(){
        return lang_;
    };
    
  }
  return TrainingModeModel;
}
