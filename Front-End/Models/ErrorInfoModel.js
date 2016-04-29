/*******************************************************************************
 * Name: QuizziPedia::Front-End::Models::ErrorInfoModel;
 * Description: rappresenta le informazioni di un errore che si è verificato eseguendo una determinata operazione;
 *
 * Relations with other classes:
 * + AuthService
 * + SearchService
 * + LangService
 * + QuizService
 * + StatisticsService
 * + QuestionsService
 * + UserDetailsService
 *
 * Creation data: 28-04-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: ErrorInfoModel_20160427
 * Update data: 28-04-2016
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
