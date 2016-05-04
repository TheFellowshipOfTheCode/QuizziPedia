/*******************************************************************************
 * Name: QuizziPedia::Front-End::Controllers::EditorQMLController;
 * Description: questa classe permette di gestire l'inserimento delle domande QML
 *
 * Relations with other classes:
 * +
 *
 * Creation data: 03-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: EditorQMLController_20160503
 * Update data: 03-05-2016
 * Description: Creato il controller;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/
app.controller('EditorQMLController', EditorQMLController);

EditorQMLController.$inject = ['$scope', '$rootScope', '$routeParams', 'QuestionsService', '$location', '$mdDialog', 'QuestionItemModel', 'ErrorInfoModel'];

function EditorQMLController($scope, $rootScope, $routeParams, QuestionsService, $location, $mdDialog, QuestionItemModel, ErrorInfoModel){

    if($routeParams.idQuestion){
        //console.log($routeParams.idQuestion);
        //metto dentro l'edito il testo

        QuestionsService.getQuestion($routeParams.idQuestion)
            .then(function(result){
                var questionDownloaded = result.data;
                console.log("singola:" + result);
                $scope.question = questionDownloaded;
            } ,function (err){
                console.log(err);
                $scope.error = new ErrorInfoModel("9", "Errore", "Caricamento domanda tramite id non andato a buon fine");
                alert = $mdDialog.alert()
                    .title($scope.error.getTitle())
                    .content($scope.error.getMessage())
                    .ok('Ok');
                $mdDialog
                    .show( alert )
                    .finally(function() {
                        alert = undefined;
                    });
            });
    }
    $scope.submitQuestion = function(question){
        //Parser della domanda
        if(question == undefined){
            alert = $mdDialog.alert()
                .title("Errore con la domanda")
                .content("Domanda Vuota!")
                .ok('Ok');
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
        }
        else{
            var result = '';
            try{
            result = jsonlint.parse(question);}
            catch(e){
                console.log(e);
                alert = $mdDialog.alert()
                    .title("Errore con la domanda")
                    .content("Ci sono degli errori nella sintassi!")
                    .ok('Ok');
                $mdDialog
                    .show(alert)
                    .finally(function () {
                        alert = undefined;
                    });
                return;
            }

            if (result) {
            var q = JSON.stringify(result, null, "  ");
            console.log('q: ' + q);
            QuestionsService.sendQuestion(q, $routeParams.lang)
                .then(function (result) {
                    if (result) {
                        $rootScope.question = new QuestionItemModel();
                        $scope.error = new ErrorInfoModel();
                        alert = $mdDialog.alert()
                            .title("Inserimento avvenuto con successo")
                            .content("La domanda è stata inserita!")
                            .ok('Ok');
                        $mdDialog
                            .show(alert)
                            .finally(function () {
                                alert = undefined;
                            });
                        $location.path('/' + $routeParams.lang + '/home');
                    }
                }, function (err) {
                    $scope.error = new ErrorInfoModel();
                    alert = $mdDialog.alert()
                        .title("Errore")
                        .content("La richiesta di inserimento domanda non è andata a buon fine")
                        .ok('Ok');
                    $mdDialog
                        .show(alert)
                        .finally(function () {
                            alert = undefined;
                        });
                });
        }
        }
    }

    $scope.goToWizard = function () {
        $location.path('/'+$routeParams.lang+'/wizard');
    };

}
