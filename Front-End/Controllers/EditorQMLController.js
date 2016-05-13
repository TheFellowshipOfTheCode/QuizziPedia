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

EditorQMLController.$inject = ['$scope', '$rootScope', '$routeParams', 'QuestionsService', '$location', '$mdDialog', 'QuestionItemModel', 'ErrorInfoModel' , 'QuestionsService'];

function EditorQMLController($scope, $rootScope, $routeParams, QuestionsService, $location, $mdDialog, QuestionItemModel, ErrorInfoModel, QuestionsService){

    //delete $scope.id;
    $scope.id = $routeParams.idQuestion;
    if($scope.id){
        //console.log($routeParams.idQuestion);
        //metto dentro l'editor il testo

        QuestionsService.getQuestion($scope.id, $routeParams.lang)
            .then(function(result){
                console.log(result);
                var questionDownloaded = result.data;

                $scope.question = JSON.stringify(questionDownloaded, null, 2);
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
    $scope.submitQuestion = function(){
        var question = document.getElementById('Juiceeditor').value;
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
                result = jsonlint.parse(question);
                console.log("result: " + result);
            }
            catch(e){
                console.log(e.message);
                alert = $mdDialog.alert()
                    .title("Errore con la domanda")
                    .content(e.message)
                    .ok('Ok');
                $mdDialog
                    .show(alert)
                    .finally(function () {
                        alert = undefined;
                    });
                return;
            }

            if (result) {
                    console.log("result è valido");
                    var res = '';
                QuestionsService
                    .getTopics($routeParams.lang)
                    .then(function(result){
                        var topics = result.data;

                        // inserire qua
                        var resultQML = controlloQML(question, res, topics);
                        if(resultQML){
                            console.log("resultQML: " + resultQML);
                            QuestionsService.sendQuestion(resultQML, $routeParams.lang, $routeParams.idQuestion)
                                .then(function (result) {
                                    if (result) {
                                        // $rootScope.question = new QuestionItemModel("", $rootScope.userLogged, "makeWith", q.lang, q.question); // da sistemare perche non carica (problema JSON forse)
                                        //console.log($rootScope.question.getMadeWith() + " " + $rootScope.question.getLanguage() + " " + $rootScope.question.getQuestion())
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
                                    console.log(err);
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

                    } ,function (err){
                        $scope.error = new ErrorInfoModel(err.data.code,  err.data.message, err.data.title);
                        alert = $mdDialog.alert()
                            .title($scope.error.getTitle())
                            .content($scope.error.getCode()+": "+$scope.error.getMessage())
                            .ok('Ok');
                        $mdDialog
                            .show( alert )
                            .finally(function() {
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
