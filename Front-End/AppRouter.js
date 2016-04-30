/*******************************************************************************
* Name: QuizziPedia::Front-End::AppRouter;
* Description: classe che gestisce i routes dell’applicazione, utilizza il
* servizio $routeProvider per associare ad ogni route un controllerG e una
* view. Viene utilizzata per associare un URL alle varie view dell’applicazione;
* Creation data: 27-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: AppRouter_20160427
* Update data: 27-04-2016
* Description: Creata la classe e scritti tutti i router per la funzionalità
* di autenticazione;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/

var AppRouter = function ($routeProvider, $locationProvider, $mdThemingProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/:lang/login', {
        templateUrl: '/Views/LoginView.html',
        controller:"LoginController"
      })
      .when('/:lang/signup', {
        templateUrl: '/Views/SignUpView.html',
          controller:"SignUpController"
      })
      .when('/:lang/password-forgotten', {
        templateUrl: '/Views/PasswordForgottenView.html'
      })
      .when('/:lang', {
        templateUrl: '/Views/HomeView.html',
        controller:"HomeController",
        css: [
            {
              href: 'css/home-main.css'
            },
            {
              href: 'css/home-medium.css',
              media: 'handheld, screen and (max-width:960px), only screen and (max-device-width:960px)'
            },
            {
              href: 'css/home-small.css',
              media: 'handheld, screen and (max-width:480px), only screen and (max-device-width:480px)'
            }
          ]
      })
      .otherwise({
        redirectTo: '/it'
      });
  };

app.config(AppRouter);
