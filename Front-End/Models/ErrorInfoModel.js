/*******************************************************************************
 * Name: QuizziPedia::Front-End::Models::ErrorInfoModel;
 * Description: ;
 * Relations with other classes:
 * +
 * Creation data: 28-04-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: LangModel_20160427
 * Update data: 28-04-2016
 * Description: Creato il model;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/

app.factory('ErrorInfoModel', ErrorInfoModel);

    function ErrorInfoModel() {
        var methods = {
            ErrorInfoModel: ErrorInfoModel,
            getCode: getCode,
            getMessage: getMessage,
            getTitle: getTitle
        };
        
        function ErrorInfoModel(errorCode, errorMessage, errorTitle) {
            if(errorCode && errorMessage && errorTitle){
                this.errorCode = errorCode;
                this.errorMessage = errorMessage;
                this.errorTitle = errorTitle;
            }
        }

        function getCode(){
            return this.errorCode;
        }

        function getMessage(){
            return this.errorMessage;
        }

        function getTitle(){
            return this.errorTitle;
        }

        return ErrorInfoModel;

    }