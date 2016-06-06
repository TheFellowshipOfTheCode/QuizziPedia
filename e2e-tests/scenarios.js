'use strict';

// https://github.com/angular/protractor/blob/master/docs/toc.md

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
            element(by.id('lookingfor')).sendKeys('utente ricercato');
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

        browser.waitForAngular();

        //Redirect alla pagina utente
        element(by.id('userPageButton')).click();

        //browser.waitForAngular();

    });
/* OK FUNZIONA */
    it('should test profile management view', function() {
        browser.get('it/home');

        //Redirect alla pagina di gestione del profilo utente
        browser.waitForAngular();

        element(by.id('profileManagementButton')).click();

        browser.waitForAngular();

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

        browser.waitForAngular();
    });
/* OK FUNZIONA MA NON COMPLETO*/
    it('should test create questionnaire view', function() {
        browser.get('it/home');

        browser.waitForAngular();

        //Redirect alla pagina di gestione dei questionari
        element(by.id('questionnaireManagementButton')).click();

        browser.waitForAngular();

        element(by.id('createQuizButton')).click();

        var quizTitleField = element(by.model('quiz.title'));
        quizTitleField.sendKeys('Quiz di Prova');

        element.all(by.model('quiz.topic')).each(function (eachElement, index) {
            eachElement.click();    //select the select
            element(by.id('topicCreateQuestionnaire')).click();   //select the first md-option
        });

        expect(quizTitleField.getAttribute('value')).toEqual('Quiz di Prova');
    });

    it('should test training view', function() {
        browser.waitForAngular();

        browser.get('it/training');

        element.all(by.model('selectedTopic')).each(function (eachElement, index) {
            eachElement.click();                    //select the select

            element(by.id('topicTraining')).click();   //select the first md-option

        });

        element(by.id('startTraining')).click();
    });

});
