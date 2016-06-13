'use strict';

describe('my app', function() {
    beforeEach(function() {
        var width = 1260;
        var height = 800;
        browser.driver.manage().window().setSize(width, height);

    });

    afterEach(function() {
        //browser.get('it/home');
        //element(by.id('logoutButton')).click();
    });

/* OK FUNZIONA */
  it('should test home view', function() {
            browser.get('it/home');
            //element(by.id('lookingfor')).sendKeys('utente ricercato');
            element(by.id('searchButton')).click();
            element(by.id('goToTrainingButton')).click();
        });

/* OK FUNZIONA */
  it('should test signup view', function() {
            browser.get('it/signup');

            var userNameField = element(by.model('user.name'));
            var userSurNameField = element(by.model('user.surname'));
            var userUserNameField = element(by.model('user.username'));
            var userEmailField = element(by.model('user.email'));
            var userPasswordField = element(by.model('user.password'));
            var userPasswordCheckField = element(by.model('user.passwordCheck'));


            userNameField.sendKeys('Alberto');
            userSurNameField.sendKeys('Ferrara');
            userUserNameField.sendKeys('aferrara');
            userEmailField.sendKeys('albertoferrara92@gmail.com');
            userPasswordField.sendKeys('password');
            userPasswordCheckField.sendKeys('password');

            expect(userNameField.getAttribute('value')).toEqual('Alberto');
            expect(userSurNameField.getAttribute('value')).toEqual('Ferrara');
            expect(userUserNameField.getAttribute('value')).toEqual('aferrara');
            expect(userEmailField.getAttribute('value')).toEqual('albertoferrara92@gmail.com');
            expect(userPasswordField.getAttribute('value')).toEqual('password');
            expect(userPasswordCheckField.getAttribute('value')).toEqual('password');


            element(by.id('signupButton')).click();
            //element(by.id('goToLoginButton')).click();
        });

/* OK FUNZIONA */
  it('should test login view', function() {
        browser.get('it/login');

        var userNameField = element(by.model('user.username'));
        var userPassField = element(by.model('user.password'));

        userNameField.sendKeys('aferrara');
        userPassField.sendKeys('ciaociao');

        expect(userNameField.getAttribute('value')).toEqual('aferrara');
        expect(userPassField.getAttribute('value')).toEqual('ciaociao');

        element(by.id('loginButton')).click();
    });

/* OK FUNZIONA */
  it('should test userpage view', function() {
        browser.waitForAngular();

        browser.get('it/home');

      //Redirect alla pagina utente
        element(by.id('userPageButton')).click();

    });

/* OK FUNZIONA */
  it('should test profile management view', function() {
        browser.get('it/home');

        //Redirect alla pagina di gestione del profilo utente
        browser.waitForAngular();

        element(by.id('profileManagementButton')).click();

        var userNameField = element(by.model('userLog.name'));
        var userSurnameField = element(by.model('userLog.surname'));
        var userEmailField = element(by.model('userLog.email'));
        var userPPasswordField = element(by.model('userLog.password'));
        var userPasswordFieldCheck = element(by.model('userLog.passwordCheck'));

        userNameField.clear();
        userSurnameField.clear();
        userEmailField.clear();
        userPPasswordField.clear();
        userPasswordFieldCheck.clear();

        userNameField.sendKeys('Alberto');
        userSurnameField.sendKeys('Ferrara');
        userEmailField.sendKeys('alberto92@gmail.com');
        userPPasswordField.sendKeys('ciaociao');
        userPasswordFieldCheck.sendKeys('ciaociao');


        expect(userNameField.getAttribute('value')).toEqual('Alberto');
        expect(userSurnameField.getAttribute('value')).toEqual('Ferrara');
        expect(userEmailField.getAttribute('value')).toEqual('alberto92@gmail.com');
        expect(userPPasswordField.getAttribute('value')).toEqual('ciaociao');
        expect(userPasswordFieldCheck.getAttribute('value')).toEqual('ciaociao');

        //element(by.id('confirmModifyProfile')).click();
   });

/* NON COMPLETO, MANCA SELEZIONE TOPIC*/
 /*   it('should test create questionnaire view', function() {
        browser.waitForAngular();

        browser.get('it/home');


        //Redirect alla pagina di gestione dei questionari
        element(by.id('questionnaireManagementButton')).click();


        element(by.id('createQuizButton')).click();

        var quizTitleField = element(by.model('quiz.title'));
        quizTitleField.sendKeys('Quiz di Prova');

        element.all(by.model('quiz.topic')).each(function (eachElement, index) {
            eachElement.click();    //select the select
            element(by.id('topicCreateQuestionnaire')).click();   //select the first md-option
        });
        var firstTopicName = element(by.repeater('topic in topics').
        row(4)).click();

        expect(quizTitleField.getAttribute('value')).toEqual('Quiz di Prova');
    });
*/
/* NON COMPLETO, MANCA RISPOSTA DOMANDE*/
 /*   it('should test training view', function() {
        browser.waitForAngular();

        browser.get('it/training');

        element.all(by.model('selectedTopic')).click();
        element(by.id('topicTraining')).click();
        element(by.id('startTraining')).click();
    });
*/
    /* NON COMPLETO, MANCA CHIUSA POPUP*/
/*    it('should test a questionnaire view', function() {

        browser.waitForAngular();

        browser.get('it/home');


        //Redirect alla pagina utente
        element(by.id('userPageButton')).click();




        browser.get('it/quiz/57569a41851bc6e252a40ca3');


        element(by.id('startQuizButton')).click();

        element(by.id('trueButton')).click();
        element(by.id('nextQuestionButton')).click();

        //browser.waitForAngular().then(function(){element(by.id('GoNextQuestionButton')).click();});


        var EC = protractor.ExpectedConditions;
// Waits for the element with id 'abc' to be present on the dom.
        browser.wait(EC.presenceOf($('#GoNextQuestionButton')), 5000);
        element(by.id('GoNextQuestionButton')).click();

        element(by.id('falseButton')).click();

        element(by.id('nextQuestionButton')).click();
        element(by.id('GoNextButton')).click();

       // element(by.id('endQuizButton')).click();

    });
*/
/* NON COMPLETO, MANCA SELEZIONE TOPIC*/
    /*
    it('should test creation question view', function() {
        browser.waitForAngular();

        browser.get('it/home');

        element(by.id('questionsManagementButton')).click();

        element(by.id('newQuestionQMLButton')).click();
        element(by.id('Juiceeditor')).sendKeys('PROVA');


    });*/
});
