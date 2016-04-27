var AppRun = function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/:lang/login', {
        templateUrl: '/Views/LoginView.html',
        controller:"LoginController"
      })
      .otherwise({
        redirectTo: '/ita'
      });
  };

var app = angular.module('QuizziPedia', ['ngRoute', 'ngAnimate', 'ngMaterial']);
app.config(AppRun);
