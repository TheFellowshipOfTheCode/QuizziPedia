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
 * -------------------------------------------------------------------------------
 * ID: EditorQMLController_20160526;
 * Update data: 26-05-2016;
 * Description: Aggiornato controller
 * Author: Franco Berton.
 *-------------------------------------------------------------------------------
 *
 * ID: EditorQMLController_20160510
 * Update data: 10-05-2016
 * Description: Aggiornato il controller alla versiona finalecon il metodo
 * goToWizard();
 * Author: Alberto Ferrara.
 * *-------------------------------------------------------------------------------
 * ID: EditorQMLController_20160505
 * Update data: 05-05-2016
 * Description: Aggiunti i metodi submitQuestion();
 * Author: Alberto Ferrara.
 * -------------------------------------------------------------------------------
 * ID: EditorQMLController_20160503
 * Update data: 03-05-2016
 * Description: Creato il controller;
 * Author: Alberto Ferrara.
 *-------------------------------------------------------------------------------
 *******************************************************************************/
app.controller('EditorQMLController', EditorQMLController);

EditorQMLController.$inject = ['$scope', '$rootScope', '$routeParams', 'QuestionsService', '$location', '$mdDialog', 'ErrorInfoModel','ngMeta', 'JSONtoQML'];

function EditorQMLController($scope, $rootScope, $routeParams, QuestionsService, $location, $mdDialog, ErrorInfoModel, ngMeta, JSONtoQML) {

    //loadTopics(function(data) {
    //});

    if ($rootScope.listOfKeys!=undefined){
        metaData();
    }
    var langDownloaded = $rootScope.$on("langDownloaded", function(event, args) {
        if(args){
            metaData();
        }
    });
    $scope.$on('$destroy', langDownloaded);

    function metaData() {
        ngMeta.setTitle($rootScope.listOfKeys.titleLangQML);
        ngMeta.setTag('description',$rootScope.listOfKeys.QMLDescription);
    }

    $scope.images=[]
    $scope.id = $routeParams.idQuestion;
    if ($scope.id) {
        QuestionsService.getQuestion($scope.id, $routeParams.lang)
            .then(function (result) {
                var questionDownloaded = result.data;
                var topic=result.data.topic;
                console.log(questionDownloaded);
                JSONtoQML.setTempQuestionID(questionDownloaded._id);

                questionDownloaded=JSONtoQML.setToBeViewed(questionDownloaded);
                var topics;
                loadTopics(function(data) {
                  console.log(data);
                  topics = data.filter(function(elem){
                    return elem.name==topic;
                  });

                  console.log(topics[0]);
                  $scope.selectedTopic=topics[0];
                  $scope.question = JSON.stringify(questionDownloaded, null, 2);
                  $scope.topics = data;
                });
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
    else {
      loadTopics(function(data) {
        $scope.topics = data;
      });
    }
    $scope.submitQuestion = function (selectedTopic) {
      console.log(selectedTopic);
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
                //result._id=JSONtoQML.getTempQuestionID();

                //result.topic=selectedTopic.name;
                console.log(result);
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
                        
                        var resultQML = controlloQML(question, res, selectedTopic.name, topics, $mdDialog);
                        resultQML._id=JSONtoQML.getTempQuestionID();
                        if (resultQML) {
                            QuestionsService.sendQuestion(resultQML, $routeParams.lang, $routeParams.idQuestion)
                                .then(function (result) {
                                    if (result) {
                                        QuestionsService.uploadImageQuestion(result.data.questionId,$scope.images,$routeParams.lang)
                                            .then(function (result) {
                                                alert = $mdDialog.alert()
                                                    .title("Inserimento avvenuto con successo")
                                                    .content("La domanda è stata inserita!")
                                                    .ok('Ok');
                                                $mdDialog
                                                    .show(alert)
                                                    .finally(function () {
                                                        alert = undefined;
                                                    });
                                                JSONtoQML.deleteTempQuestionID();
                                                $location.path('/' + $routeParams.lang + '/questions');
                                            }, function (err) {
                                                $scope.error = new ErrorInfoModel();
                                                alert = $mdDialog.alert()
                                                    .title("Errore")
                                                    .content("Inserimento Immagini non andato a buon fine")
                                                    .ok('Ok');
                                                $mdDialog
                                                    .show(alert)
                                                    .finally(function () {
                                                        alert = undefined;
                                                    });
                                            })
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

  
    $scope.uploadImage = function(image){
        if (image)
            $scope.images.push(image)

    }

    $scope.removeImage=function(image){
        var idx = $scope.images.indexOf(image);
        if (idx > -1) {
            $scope.images.splice(idx, 1);
        }
    }

    function loadTopics(callback) {
      QuestionsService
        .getTopics($routeParams.lang)
        .then(function(result){
            topics = result.data;
            callback(topics);
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
