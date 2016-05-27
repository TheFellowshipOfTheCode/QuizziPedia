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

var AppRouter = function ($routeProvider, $locationProvider, $mdThemingProvider, ngMetaProvider) {
    $locationProvider.html5Mode(true);

    ngMetaProvider.useTitleSuffix(true);
    ngMetaProvider.setDefaultTitleSuffix(' | QuizziPedia');

    $routeProvider
      .when('/:lang/login', {
        templateUrl: '/Views/LoginView.html',
        controller:"LoginController",
        css: [
            {
              href: 'css/auth-main.css'
            },
            {
              href: 'css/auth-medium.css',
              media: 'handheld, screen and (max-width:960px), only screen and (max-device-width:960px)'
            },
            {
              href: 'css/auth-small.css',
              media: 'handheld, screen and (max-width:480px), only screen and (max-device-width:480px)'
            }
          ]
      })
      .when('/:lang/signup', {
        templateUrl: '/Views/SignUpView.html',
        controller:"SignUpController",
        css: [
            {
              href: 'css/auth-main.css'
            },
            {
              href: 'css/auth-medium.css',
              media: 'handheld, screen and (max-width:960px), only screen and (max-device-width:960px)'
            },
            {
              href: 'css/auth-small.css',
              media: 'handheld, screen and (max-width:480px), only screen and (max-device-width:480px)'
            }
          ]
      })
      .when('/:lang/passwordforgot', {
        templateUrl: '/Views/PasswordForgotView.html',
        controller:"PasswordForgotController",
        css: [
            {
              href: 'css/auth-main.css'
            },
            {
              href: 'css/auth-medium.css',
              media: 'handheld, screen and (max-width:960px), only screen and (max-device-width:960px)'
            },
            {
              href: 'css/auth-small.css',
              media: 'handheld, screen and (max-width:480px), only screen and (max-device-width:480px)'
            }
          ]
      })
      .when('/:lang/home', {
        templateUrl: '/Views/HomeView.html',
        controller:"HomeController",
        meta: {
          'title':'Home',
          'description':'Homepage QuizziPedia.'
        },
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
        .when('/:lang/createquestionnaire', {
            templateUrl: '/Views/CreateQuestionnaireView.html',
            controller:"CreateQuestionnaireController",
            css: [
                {
                    href: 'css/auth-main.css'
                },
                {
                    href: 'css/auth-medium.css',
                    media: 'handheld, screen and (max-width:960px), only screen and (max-device-width:960px)'
                },
                {
                    href: 'css/auth-small.css'
                }
            ]
        })
        .when('/:lang/QML', {
            templateUrl: '/Views/EditorQMLView.html',
            controller:"EditorQMLController",
            css: [
                {

                    href: 'css/create-question-main.css'
                },
                {
                    href: 'css/create-question-medium.css',
                    media: 'handheld, screen and (max-width:960px), only screen and (max-device-width:960px)'
                },
                {
                    href: 'css/create-question-small.css',
                    media: 'handheld, screen and (max-width:480px), only screen and (max-device-width:480px)'
                }
            ]
        })
        .when('/:lang/questionnairemanagement', {
            templateUrl: '/Views/QuestionnaireManagementView.html',
            controller: "QuestionnaireManagementController",
            css: [
                {
                    href: 'css/auth-main.css'
                },
                {
                    href: 'css/auth-medium.css',
                    media: 'handheld, screen and (max-width:960px), only screen and (max-device-width:960px)'
                },
                {
                    href: 'css/auth-small.css'
                },
                {

                    href: 'css/quiz-management-main.css'
                },
                {
                    href: 'css/quiz-management-medium.css',
                    media: 'handheld, screen and (max-width:960px), only screen and (max-device-width:960px)'
                },
                {
                    href: 'css/quiz-management-small.css',
                    media: 'handheld, screen and (max-width:480px), only screen and (max-device-width:480px)'
                }
            ]
        })
        .when('/:lang/QML/:idQuestion', {
            templateUrl: '/Views/EditorQMLView.html',
            controller:"EditorQMLController",
            css: [
                {

                    href: 'css/create-question-main.css'
                },

                {
                    href: 'css/create-question-medium.css',
                    media: 'handheld, screen and (max-width:960px), only screen and (max-device-width:960px)'
                },
                {
                    href: 'css/create-question-small.css',
                    media: 'handheld, screen and (max-width:480px), only screen and (max-device-width:480px)'
                }
            ]
        })
        .when('/:lang/wizard', {
            templateUrl: '/Views/CreateWithWizardView.html',
            controller:"",
            css: [
                {
                    href: 'css/create-question-main.css'
                },
                {
                    href: 'css/create-question-medium.css',
                    media: 'handheld, screen and (max-width:960px), only screen and (max-device-width:960px)'
                },
                {
                    href: 'css/create-question-small.css',
                    media: 'handheld, screen and (max-width:480px), only screen and (max-device-width:480px)'
                }
            ]
        })
        .when('/:lang/questions', {
            templateUrl: '/Views/QuestionsManagementView.html',
            controller: "QuestionsManagementController",
            css: [
                {

                    href: 'css/create-question-main.css'
                },
                {
                    href: 'css/create-question-medium.css',
                    media: 'handheld, screen and (max-width:960px), only screen and (max-device-width:960px)'
                },
                {
                    href: 'css/create-question-small.css',
                    media: 'handheld, screen and (max-width:480px), only screen and (max-device-width:480px)'
                }
            ]
        })

        .when('/:lang/training', {
        templateUrl: '/Views/TrainingView.html',
        controller:"TrainingController",
        css: [
            {
              href: 'css/training-main.css'
            },
            {
              href: 'css/training-medium.css',
              media: 'handheld, screen and (max-width:960px), only screen and (max-device-width:960px)'
            },
            {
              href: 'css/training-small.css',
              media: 'handheld, screen and (max-width:480px), only screen and (max-device-width:480px)'
            },
            {
              href: 'css/question-main.css'
            },
            {
              href: 'css/question-medium.css',
              media: 'handheld, screen and (max-width:960px), only screen and (max-device-width:960px)'
            },
            {
              href: 'css/question-small.css',
              media: 'handheld, screen and (max-width:480px), only screen and (max-device-width:480px)'
            }
          ]
      })
      .when('/:lang/quiz/:id', {
            templateUrl: '/Views/FillingQuestionnaireView.html',
            controller:"FillingQuestionnaireController",
            css: [
                {
                  href: 'css/quiz-main.css'
                },
                {
                  href: 'css/quiz-medium.css',
                  media: 'handheld, screen and (max-width:960px), only screen and (max-device-width:960px)'
                },
                {
                  href: 'css/quiz-small.css',
                  media: 'handheld, screen and (max-width:480px), only screen and (max-device-width:480px)'
                },
                {
                  href: 'css/question-main.css'
                },
                {
                  href: 'css/question-medium.css',
                  media: 'handheld, screen and (max-width:960px), only screen and (max-device-width:960px)'
                },
                {
                  href: 'css/question-small.css',
                  media: 'handheld, screen and (max-width:480px), only screen and (max-device-width:480px)'
                }
              ]
      })
      .when('/:lang/search/:tosearch', {
          templateUrl: '/Views/ResultsView.html',
          controller: "SearchController",
          css: [
              {

                  href: 'css/search-main.css'
              },
              {
                  href: 'css/search-medium.css',
                  media: 'handheld, screen and (max-width:960px), only screen and (max-device-width:960px)'
              },
              {
                  href: 'css/search-small',
                  media: 'handheld, screen and (max-width:480px), only screen and (max-device-width:480px)'
              }
          ]
      })
        .when('/:lang/userpage', {
            templateUrl: '/Views/UserView.html',
            controller: "UserDetailsController",
            css: [
                {

                    href: 'css/userview-main.css'
                },
                {
                    href: 'css/userview-medium.css',
                    media: 'handheld, screen and (max-width:960px), only screen and (max-device-width:960px)'
                },
                {
                    href: 'css/userview-small.css',
                    media: 'handheld, screen and (max-width:480px), only screen and (max-device-width:480px)'
                }
            ]
        })
        .when('/:lang/managementsubscription/:idQuiz', {
            templateUrl: '/Views/RegistrationManagementView.html',
            controller: "RegistrationManagementController",
            css: [
                {

                    href: 'css/subscription-management-main.css'
                },
                {
                    href: 'css/subscription-management-medium.css',
                    media: 'handheld, screen and (max-width:960px), only screen and (max-device-width:960px)'
                },
                {
                    href: 'css/subscription-management-small.css',
                    media: 'handheld, screen and (max-width:480px), only screen and (max-device-width:480px)'
                }
            ]
        })
        .when('/:lang/profilemanagement', {
            templateUrl: '/Views/ProfileManagementView.html',
            controller: "ProfileManagementController",
            css: [
                {
                    href: 'css/profilemanagement-main.css'
                },
                {
                    href: 'css/profilemanagement-medium.css',
                    media: 'handheld, screen and (max-width:960px), only screen and (max-device-width:960px)'
                },
                {
                    href: 'css/profilemanagement-small.css',
                    media: 'handheld, screen and (max-width:480px), only screen and (max-device-width:480px)'
                }
            ]
        })
      .otherwise({
        redirectTo: '/it/home'
      })
    }



app.config(AppRouter)
.run(['ngMeta', function(ngMeta) {
  ngMeta.init();
}]);
