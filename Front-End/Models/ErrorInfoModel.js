/*******************************************************************************
 * Name: QuizziPedia::Front-End::Models::ErrorInfoModel;
 * Description: rappresenta le informazioni di un errore che si è verificato eseguendo una determinata operazione;
 *
 * 
 * Creation data: 22-04-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
* Updates history
* -------------------------------------------------------------------------------
* Update data: 13-06-2016;
* Description: Corretto vari bugs;
* Author: Matteo Granzotto.
 *-------------------------------------------------------------------------------
 * ID: ErrorInfoModel_20160423
 * Update data: 28-04-2016
 * Description: Aggiornato il model con tutti i metodi getter;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 * ID: ErrorInfoModel_20160422
 * Update data: 28-04-2016
 * Description: Aggiornato il model con tutti i metodi setter;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 * ID: ErrorInfoModel_20160422
 * Update data: 27-04-2016
 * Description: Creata la classe;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.factory("ErrorInfoModel", ErrorInfoModel);

    function ErrorInfoModel() {

    var ErrorInfoModel = function(errorCode, errorMessage, errorTitle) {
        var errorCode_ = errorCode;
        var errorMessage_ = errorMessage;
        var errorTitle_ = errorTitle;


        this.getCode = function () {
            return errorCode_;
        };

        this.getMessage = function () {
            return errorMessage_;
        };

        this.getTitle = function () {
            return errorTitle_;
        };
    }

        return ErrorInfoModel;
}
