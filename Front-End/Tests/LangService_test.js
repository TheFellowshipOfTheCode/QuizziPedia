/*******************************************************************************
 * Name: LangServiceTest;
 * Description: test di unità per la classe
 * QuizziPedia::Front-End::Tests::LangService_test;
 * Creation data: 01-06-2016;
 * Author: Marco Prelaz;
 * License: MIT.
 ********************************************************************************
 * Updates history
 *-------------------------------------------------------------------------------
 * ID: LangServiceTest_20160601;
 * Update data: 01-06-2016;
 * Description: Scritto il test;
 * Author: Marco Prelaz.
 *-------------------------------------------------------------------------------
 *******************************************************************************/


"use strict";
/*1-Respons object*/
var objRes1 =
{
    "variables": {
        "logIn": "Accedi",
        "signUp": "Registrati",
        "home": "Home",
        "profileManagement": "Gestione profilo",
        "questionnaireManagement": "Gestione questionari",
        "questionsManagement": "Gestione domande",
        "logOut": "Disconnettiti",
        "training": "Modalità allenamento",
        "whatIs": "Che cos'è?",
        "whatIsTraining": "La modalità allenamento ti permette di esercitarti su qualsiasi argomento tu voglia. Premi il pussante per iniziare!",
        "goToTraining": "Inizia l'allenamento",
        "search": "Ricerca",
        "whatIsSearch": "E' possibile ricercare sia utenti che questionari.",
        "searchFor": "Cosa vuoi cercare?",
        "makeSearch": "Ricerca",
        "titleLangSignUp": "Registrazione",
        "nameLangSignUp": "Nome",
        "surnameLangSignUp": "Cognome",
        "usernameLangSignUp": "Nome utente",
        "errorUser": "Username non valida",
        "emailLangSignUp": "E-Mail",
        "errorEmail": "L'email inserita non è corretta. Deve essere del formato mario@rossi.it",
        "errorPassword": "La password deve avere almeno 8 caratteri",
        "buttonLangSignUp": "Registrati",
        "loginButtonLangSignUp": "Accedi",
        "footerDescription": "Quizzipedia è un applicativo web in grado di gestire questionari online",
        "titleLangPasswordForgot": "Recupero password",
        "passwordForgot": "Hai dimenticato la password?",
        "recoveryButtonLangPasswordForgot": "Recupera password",
        "loginButtonLangPasswordForgot": "Accedi",
        "with": "con",
        "developed": "sviluppato",
        "by": "da",
        "footerLinks": "Collegamenti",
        "areYouSure": "Sei sicuro che vuoi effettuare il logout?",
        "yesLogoutMe": "Si, disconnettimi",
        "dontLogoutMe": "No, rimango con voi",
        "titleLangQML": "Inserimento domanda tramite editor QML",
        "buttonConfirmLangQML": "Conferma creazione della domanda",
        "buttonLoadImageLangQML": "Carica un'immagine per il testo",
        "titleLangCreateQuestionnaire": "Crea un questionario",
        "nameLangCreateQuestionnaire": "Nome questionario",
        "keywordTopicKeywordsDirective": "Parola chiave",
        "argumentTopicKeywordsDirective": "Argomento",
        "trueButton": "Vero",
        "falseButton": "Falso",
        "questionNumberLang": "Domanda numero",
        "ofLang": "di",
        "buttonNextQuestionLang": "Rispondi e prosegui",
        "goToWizard": "Passa alla creazione con Wizard",
        "createWizard": "Creazione della domanda con Wizard",
        "writeHereLang": "Scrivi qui sotto il tuo codice QML",
        "titleLangQuestionsManagement": "Gestione delle tue domande",
        "modifyButtonOneQuestion": "Modifica questa domanda",
        "argumentsTopicKeywordsDirective": "Argomenti",
        "titleCreateQuestionnaireView": "Titolo",
        "titleErrorQuestionnaire": "Il campo titolo è obbligatorio",
        "buttonConfirmLangCreateQuestionnaire": "Crea il questionario",
        "creationQML": "Crea con l'editor QML",
        "creationWizard": "Crea con i Wizard",
        "buttonLangCreateQMLQuestion": "Crea domanda QML",
        "buttonConfirmEditLangQML": "Conferma modifica della domanda",
        "wordsInRightPlace": "Trascina le parole nella posizione corretta",
        "titleLangQuestionnaireManagement": "Gestione Questionari",
        "buttonNewQuestionnaireLangQuestionnaireManagement": "Crea un nuovo questionario",
        "attention": "Attenzione!",
        "areYouSureToGoOn": "Sei sicuro di voler proseguire?",
        "yesGoOn": "Si!",
        "dontGoOn": "No, ho premuto per sbaglio",
        "buttonEndTrainingLang": "Termina l'allenamento",
        "keywords": "Parole chiave",
        "question": "domanda",
        "questions": "domande",
        "noStop": "Non impostare un limite di domande",
        "endOfTraining": "Riepilogo dell'allenamento",
        "restartTraining": "Ricomincia l'allenemento",
        "newOne": "Nuova Keywords",
        "buttonLangAddNewQuestion": "Aggiungi nuova domanda",
        "lookingForANewKey": "Cerca una parola chiave",
        "buttonShowAllCreatedQuestionnaires": "Visualizza questionari creati",
        "titleShowAllCreatedQuestionnaires": "Questionari creati",
        "selectedTopicLang": "Selezione l'argomento",
        "topic": "Argomento",
        "chooseArgumentLang": "Argomento",
        "stopTraining": "Alleamento finito",
        "chooseKeywordsLang": "Parole Chiave",
        "areYouSureToLeaveTheTraining": "Ricaricando la pagina tornerai alla pagina principale della modalità allenamento.",
        "goBackToSetUp": "Torna alle impostazioni",
        "endOfTheTrainingAreYouSure": "Sei sicuro di voler terminare l'allenamento?",
        "dontDoIt": "No",
        "registrationButton": "Registrati al quiz",
        "profileButton": "Visualizza il profilo",
        "resultOfTrainingLang": "Hai risposto correttamete a",
        "questionsRight": "Domande risposte correttamente",
        "questionsWrong": "Domanda risposte in modo sbagliato",
        "chooseQuestionLang": "Numero di domande",
        "genericObbligatoryFiled": "Questo campo è obbligatorio.",
        "doYouWannaGoBakLang": "Vuoi davero tornare indietro? Così terminerai l'llenamento. Le tue statistiche fino ad ora verranno comunque salvate.",
        "userSearched": "Utenti ricercati",
        "quizzesSearched": "Questionari ricercati",
        "userNameResult": "Nome",
        "userSurnameResult": "Cognome",
        "userUsernameResult": "Username",
        "quizTitleResult": "Titolo del quiz",
        "titleLangUserView": "ll tuo profilo",
        "userUsername": "Username",
        "userName": "Nome",
        "userSurname": "Cognome",
        "quizName": "Nome del questionario",
        "quizAuthor": "Autore del questionario",
        "quizTopic": "Argomento del questionario",
        "quizMark": "Valutazione del questionario",
        "stayHere": "Usa Quizzipedia in questa pagina",
        "endOfQuiz": "Questionario terminato",
        "generalInfoQuiz": "Informazioni sul questionario",
        "numberOfQuestions": "Numero di domande",
        "summaryQuizEnded": "Resoconto finale del questionario",
        "correctLang": "Corretta",
        "wrongLang": "Sbagliata",
        "titleLangRegistrationManagement": "Gestione iscrizione ai questionari",
        "buttonAddLang": "Approva l'iscrizione",
        "buttonDeleteLang": "Disapprova l'iscrizione",
        "genericError": "Errore",
        "quizIsNotStarted": "Il questionario non è ancora iniziato, torna fra un po'.",
        "noAuthToDoQuiz": "Non sei autorizzato a fare questo questionario.",
        "changeLang": "Cambia la lingua",
        "quizTopicResult": "Argomento del quiz",
        "goToSubscribeManagement": "Gestisci le iscrizioni",
        "levelLang": "Lv.",
        "historyQuizzesLang": "Cronologia questionari",
        "pageLang": "Pagina",
        "subscribedQuizzesLang": "Questionari a cui ti sei iscritto",
        "statisticsLang": "Statistiche personali",
        "thereIsNoDoneQuiz": "Ci sono 0 questionari svolti.",
        "thereIsNoSubscribedQuiz": "Ci sono 0 questionari a cui ti sei iscritto.",
        "noQuizCreatedLang": "Non hai creato alcun quiz.",
        "startQuizLang": "Abilita alla compilazione",
        "endQuizLang": "Termina il questionario",
        "backToHome": "Torna in home",
        "approvedQuizzesLang": "Questionari approvati",
        "thereIsNoApprovedQuiz": "Ci sono 0 questionari a cui sei stato abilitato",
        "QuizTitleResult": "Titolo del questionario",
        "thereIsLang": "C'è",
        "thereAreLang": "Ci sono",
        "userLang": "utente",
        "usersLang": "utenti",
        "thereIsQuiz": "questionario",
        "thereAreQuizzes": "questionari",
        "questionCreatedWith": "Domanda creata con",
        "questionsLang": "domande",
        "questionLang": "domanda",
        "questionTypeLang": "Tipologia della domanda",
        "questionTextLang": "Testo della domanda",
        "createANewQuestionLang": "Crea una nuova domanda",
        "titleLangProfileManagementView": "Modifica profilo",
        "profileManagementName": "Modifica nome",
        "profileManagementSurname": "Modifica cognome",
        "profileManagementEmail": "Modifica email",
        "profileManagementPassword": "Inserisci nuova password",
        "profileManagementConfirmPassword": "Conferma nuova passowrd",
        "buttonLangModifyProfile": "Conferma modifiche",
        "buttonLangChangeAccountTipologyPro": "Passa a utente pro",
        "buttonLangChangeAccountTipologyNormal": "Torna a utente normale",
        "titleDeleteProfile": "Elimina account",
        "textDeleteAccount": "Desidero eliminare il mio account",
        "buttonLangDeleteProfile": "Conferma eliminazione",
        "loginDescription": "Funzionalità di autenticazione dell'utente in QuizziPedia.",
        "signUpDescription": "Funzionalità di registrazione in QuizziPedia.",
        "passwordForgotDescription": "Funzionalità di recupero password in QuizziPedia.",
        "homeDescription": "Home di QuizziPedia.",
        "titleLangUserViewDescription": "",
        "titleLangRegistrationManagementDescription": "",
        "searchDescription": "",
        "fillingQuiz": "Compilazione questionario",
        "fillingQuizDescription": "Compilazione di un questionario.",
        "trainingDescription": "Modalità allenamento.",
        "questionsManagementDescription": "Funzionalità di gestione delle domande.",
        "createQuestionnaireDescription": "Funzionalità di creare questionario in QuizziPedia.",
        "QMLDescription": "Funzionalità di creare una domanda in QML in QuizziPedia.",
        "questionnaireManagementDescription": "Funzionalità di gestione dei questionari in QuizziPedia.",
        "profileManagementDescription": "Pagina per la gestione del proprio profilo.",
        "titleChangeAccount": "Cambia tipologia account",
        "textChangeAccount": "Desidero cambiare la tipologia del mio account",
        "choosenTopicLang": "Argomento della domanda",
        "showTutorial": "Mostra la guida QML",
        "hideTutorial": "Nascondi la guida QML",
        "goToTutorial": "Mostra la guida QML in un'altra pagina",
        "otherProfile": "Visualizzazione Profilo di",
        "otherProfileDescription": "Funzionalità di visualizzazione di un profilo di utente cercato"
      }
};

var objRes2 = [ 'English', 'Italiano' ];


var objRes3 =
{
    _id: '57237ec7c80eb66928eb3ca5',
    lang: 'it'
};


describe("LangService api rest unit test", function () {
    var redditService, httpBackend;


    beforeEach(function() {
        module('QuizziPedia');
        inject(function (_LangService_, _$httpBackend_) {
            LangService = _LangService_;
            httpBackend = _$httpBackend_;
        });

        /*2-Back-End simulato*/
        httpBackend.whenGET("/api/it").respond(objRes1);
        httpBackend.whenGET("/api/supported/lang/give/me").respond(objRes2);
        httpBackend.whenGET("/api/supported/lang/give/me/Italiano").respond(objRes3);


    });

    /*3-Test veri e propri*/
    it("should give back to the server the list of keywords in the corrected language", function () {
        httpBackend.expectGET("/api/it");
        httpBackend.whenGET(/Views/).respond(200, '');
        LangService.getKeywords("it").then(function(result) {
                expect(JSON.stringify(result)).toEqual(
                    JSON.stringify(objRes1.variables)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should give back to the server the existing languages", function () {
        httpBackend.expectGET("/api/supported/lang/give/me");
        httpBackend.whenGET(/Views/).respond(200, '');
        LangService.getSupportedLang().then(function(result) {
            console.log(result);
                expect(JSON.stringify(result)).toEqual(
                    JSON.stringify(objRes2)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

    it("should give back to the server the abbreviation of a language", function () {
        httpBackend.expectGET("/api/supported/lang/give/me/Italiano");
        httpBackend.whenGET(/Views/).respond(200, '');
        LangService.getSlang("Italiano").then(function(result) {
            console.log(result);
                expect(JSON.stringify(result)).toEqual(
                    JSON.stringify(objRes3)
                );
            }, function(err) {
                console.log(err);
            }
        );
        httpBackend.flush();
    });

});
