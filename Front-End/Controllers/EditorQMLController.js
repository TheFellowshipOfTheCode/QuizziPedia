/*******************************************************************************
 * Name: QuizziPedia::Front-End::Controllers::EditorQMLController;
 * Description: questa classe permette di gestire l'inserimento delle domande QML
 *
 *
 * Creation data: 03-05-2016;
 * Author: Alberto Ferrara;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: EditorQMLController_20160513
 * Update data: 03-05-2016
 * Description: Aggiornato il controller alla versiona finale;
 * Author: Alberto Ferrara.
 * *-------------------------------------------------------------------------------
 * ID: EditorQMLController_20160510
 * Update data: 03-05-2016
 * Description: Aggiunti i metodi per le varie operazioni;
 * Author: Alberto Ferrara.
 * -------------------------------------------------------------------------------
 * ID: EditorQMLController_20160503
 * Update data: 03-05-2016
 * Description: Creato il controller;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/
app.controller('EditorQMLController', EditorQMLController);

EditorQMLController.$inject = ['$scope', '$rootScope', '$routeParams', 'QuestionsService', '$location', '$mdDialog', 'ErrorInfoModel'];

function EditorQMLController($scope, $rootScope, $routeParams, QuestionsService, $location, $mdDialog, ErrorInfoModel) {

    $scope.id = $routeParams.idQuestion;
    if ($scope.id) {
        QuestionsService.getQuestion($scope.id, $routeParams.lang)
            .then(function (result) {
                var questionDownloaded = result.data;
                $scope.question = JSON.stringify(questionDownloaded, null, 2);
            }, function (err) {
                $scope.error = new ErrorInfoModel("9", "Errore", "Caricamento domanda tramite id non andato a buon fine");
                alert = $mdDialog.alert()
                    .title($scope.error.getTitle())
                    .content($scope.error.getMessage())
                    .ok('Ok');
                $mdDialog
                    .show(alert)
                    .finally(function () {
                        alert = undefined;
                    });
            });
    }
    $scope.submitQuestion = function () {
        var question = document.getElementById('Juiceeditor').value;
        if (question == undefined) {
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
        else {
            var result = '';
            try {
                result = jsonlint.parse(question);
            }
            catch (e) {
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
                var res = '';
                QuestionsService
                    .getTopics($routeParams.lang)
                    .then(function (result) {
                        var topics = result.data;
                        var resultQML = controlloQML(question, res, topics);
                        if (resultQML) {
                            QuestionsService.sendQuestion(resultQML, $routeParams.lang, $routeParams.idQuestion)
                                .then(function (result) {
                                    if (result) {
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

                    }, function (err) {
                        $scope.error = new ErrorInfoModel(err.data.code, err.data.message, err.data.title);
                        alert = $mdDialog.alert()
                            .title($scope.error.getTitle())
                            .content($scope.error.getCode() + ": " + $scope.error.getMessage())
                            .ok('Ok');
                        $mdDialog
                            .show(alert)
                            .finally(function () {
                                alert = undefined;
                            });
                    });


            }
        }
    };

    $scope.goToWizard = function () {
        $location.path('/' + $routeParams.lang + '/wizard');
    };
}

