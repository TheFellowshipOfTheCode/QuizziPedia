/*******************************************************************************
* Name: QuizziPedia::Front-End::AppRun;
* Description: classe che verifica se l’utente sia autenticato e che abbia le
* giuste autorizzazioni per la pagina in cui si trova. Viene utilizzata per
* verificare che l’utente sia autenticato e che abbia la giusta autorizzazione
* per la pagina in cui si trova;
* Relations with other classes:
* + LangService;
* + LangModel;
* + UserDetailsModel;
* + AuthService.
* Creation data: 27-04-2016;
* Author: Matteo Granzotto;
* License: MIT.
********************************************************************************
* Updates history
*-------------------------------------------------------------------------------
* ID: AppRun_20160427
* Update data: 27-04-2016
* Description: Creata la classe;
* Author: Matteo Granzotto.
*-------------------------------------------------------------------------------
*******************************************************************************/


var app = angular.module('QuizziPedia', ['ngRoute','ngAnimate', 'ngMaterial', 'ngMessages', 'ngCookies','ngFileUpload', 'angularCSS','ui.bootstrap', 'ngDragDrop', 'angularNumberPicker', 'angles'])


var InitialSetting = function ($mdThemingProvider) {

    $mdThemingProvider.theme('default')
    .primaryPalette('amber', {
      'default': '400', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('orange', {
      'default': '200' // use shade 200 for default, and keep all other shades the same
    });

  };

app.config(InitialSetting);
