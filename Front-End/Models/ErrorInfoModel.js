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

app.factory('ErrorInfoModel', ErrorInfoModel);

    function ErrorInfoModel(errorCode, errorMessage, errorTitle) {
        var errorCode_ = errorCode;
        var errorMessage_ = errorMessage;
        var errorTitle_ = errorTitle;

        var methods = {
            ErrorInfoModel: ErrorInfoModel,
            getCode: getCode,
            getMessage: getMessage,
            getTitle: getTitle
        };

        function getCode(){
            return this.errorCode_;
        }

        function getMessage(){
            return this.errorMessage_;
        }

        function getTitle(){
            return this.errorTitle_;
        }

        return ErrorInfoModel;

    }