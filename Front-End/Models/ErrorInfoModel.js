/*******************************************************************************
 * Name: QuizziPedia::Front-End::Models::ErrorInfoModel;
 * Description: rappresenta le informazioni di un errore che si è verificato eseguendo una determinata operazione;
 *
 * 
 * Creation data: 28-04-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: ErrorInfoModel_20160428
 * Update data: 28-04-2016
 * Description: Ultimato il model con tutti i metodi;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 * ID: ErrorInfoModel_20160427
 * Update data: 27-04-2016
 * Description: Creato il model;
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
