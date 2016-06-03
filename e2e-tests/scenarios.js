'use strict';

// https://github.com/angular/protractor/blob/master/docs/toc.md

describe('my app', function() {

/*
  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/view1");
  });


  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#/view1');
    });


    it('should render view1 when user navigates to /view1', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });*/

        it('should test home view', function() {
            browser.get('http://localhost:8080/it/home');
            element(by.id('lookingfor')).sendKeys('utente ricercato');
            element(by.id('searchButton')).click();
            element(by.id('goToTrainingButton')).click();
        });

        it('should test login view', function() {
            browser.get('http://localhost:8080/it/login');

            var userNameField = element(by.model('user.username'));
            var userPassField = element(by.model('user.password'));

            userNameField.sendKeys('aferrara');
            userPassField.sendKeys('ciaociaociao');

            expect(userNameField.getAttribute('value')).toEqual('aferrara');
            expect(userPassField.getAttribute('value')).toEqual('ciaociaociao');

            element(by.id('loginButton')).click();
        });

        it('should test signup view', function() {
            browser.get('http://localhost:8080/it/signup');

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

        it('should test userpage view', function() {

            //Devo gestire il login prima di effettuar el'accesso alla pagina utente
            browser.get('http://localhost:8080/it/login');

            var userUserNameField = element(by.model('user.username'));
            var userPasswordField = element(by.model('user.password'));


            userUserNameField.sendKeys('aferrara');
            userPasswordField.sendKeys('ciaociaociao');

            expect(userUserNameField.getAttribute('value')).toEqual('aferrara');
            expect(userPasswordField.getAttribute('value')).toEqual('ciaociaociao');


            element(by.id('loginButton')).click();

            //Redirect alla pagina utente
            browser.get('http://localhost:8080/it/userpage');

        });

    /*
     it('should test training view', function() {
        browser.get('http://localhost:8080/it/training');
        element(by.model('user.username')).sendKeys('aferrara');
        element(by.model('user.password')).sendKeys('ciaociaociao');
        element(by.id('loginButton')).click();
        browser.get('http://localhost:8080/it/userpage');
    });

    //DEVO GESTIRE IL LOGIN
       it('should test profile management view', function() {
            browser.get('http://localhost:8080/it/login');
            element(by.model('user.username')).sendKeys('aferrara');
            element(by.model('user.password')).sendKeys('ciaociaociao');
            element(by.id('loginButton')).click();
            browser.get('http://localhost:8080/it/profilemanagement');
            //element(by.id('removeImage')).click();
            element(by.model('user.name')).sendKeys('Matteo');
            element(by.model('userLog.surname')).sendKeys('Granzotto');
            element(by.model('userLog.email')).sendKeys('matteo.granzotto@gmail.com');
            element(by.model('userLog.password')).sendKeys('ciaociaociao');
            element(by.model('userLog.passwordCheck')).sendKeys('ciaociaociao');
            element(by.id('confirmModifyProfile')).click();
            //element(by.id('changePrivilegeAccount')).click();
            //element(by.id('deleteAccount')).click();
         });

        it('should test quizzes view', function() {
            browser.get('http://localhost:8080/it/login');
            element(by.model('user.username')).sendKeys('aferrara');
            element(by.model('user.password')).sendKeys('ciaociaociao');
            element(by.id('loginButton')).click();
            browser.get('http://localhost:8080/it/questionnairemanagement');
            element(by.id('createQuizButton')).click();
            element(by.model('quiz.title')).sendKeys('Questionario Prova');
    });

*/
});
