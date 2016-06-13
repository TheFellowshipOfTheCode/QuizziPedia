module.exports = function(config){
  config.set({

    basePath : './',

    preprocessors: {
      'Front-End/Directives/**/*.html' : ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'Front-End/',
      moduleName: 'templates'
    },

    frameworks: ['jasmine'],

    files : [
      'Front-End/bower_components/angular/angular.js',
      'Front-End/bower_components/angular-route/angular-route.js',
      'Front-End/bower_components/jquery/dist/jquery.min.js',
      'Front-End/bower_components/angular-animate/angular-animate.min.js',
      'Front-End/bower_components/angular-aria/angular-aria.js',
      'Front-End/bower_components/angular-loader/angular-loader.min.js',
      'Front-End/bower_components/angular-material/angular-material.js',
      'Front-End/bower_components/angular-css/angular-css.min.js',
      'Front-End/bower_components/angular-messages/angular-messages.min.js',
      'Front-End/bower_components/angular-mocks/angular-mocks.js',
      'Front-End/bower_components/angular-cookies/angular-cookies.min.js',
      'Front-End/bower_components/bootstrap/dist/js/bootstrap.min.js',
      'Front-End/bower_components/angular-cookies/angular-cookies.min.js',
      'Front-End/bower_components/angular-dragdrop/src/angular-dragdrop.min.js',
      'Front-End/bower_components/angular-dragdrop/src/angular-dragdrop.min.js',
      'Front-End/bower_components/angular-number-picker/angular-number-picker.min.js',
      'Front-End/bower_components/chartjs/Chart.min.js',
      'Front-End/bower_components/angles/angles.js',
      'Front-End/bower_components/ng-file-upload/ng-file-upload-shim.min.js',
      'Front-End/bower_components/ng-file-upload/ng-file-upload.min.js',
      'Front-End/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'Front-End/bower_components/ngMeta/dist/ngMeta.min.js',
      'Front-End/bower_components/webcomponentsjs/webcomponents.js',
      'Front-End/bower_components/marked/lib/marked.js',
      'Front-End/bower_components/angular-marked/dist/angular-marked.js',
      'Front-End/QML/json2.js',
      'Front-End/QML/jsonlint.js',
      'Front-End/QML/questionCheck/CheckQML.js',
      'Front-End/QML/questionCheck/rispostaMultipla.js',
      'Front-End/QML/questionCheck/areaCliccabile.js',
      'Front-End/QML/questionCheck/collegamentoElementi.js',
      'Front-End/QML/questionCheck/ordinamentoImmagini.js',
      'Front-End/QML/questionCheck/ordinamentoStringhe.js',
      'Front-End/QML/questionCheck/riempimentoSpaziVuoti.js',
      'Front-End/QML/questionCheck/VeroFalso.js',
      'Front-End/QML/questionCheck/custom.js',
      'Front-End/QML/questionCheck/createJSON.js',
      'Front-End/AppRun.js',
      'Front-End/AppRouter.js',
      'Front-End/Controllers/**/*.js',
      'Front-End/Models/**/*.js',
      'Front-End/Directives/*.js',
      'Front-End/Directives/**/*.html',
      'Front-End/Views/**/*.html',
      'Front-End/Services/**/*.js',
      'Front-End/Tests/**/*.js',
      'Front-End/QML/JSONtoQML.js'
    ],



    autoWatch : true,

    browsers : ['Chrome', 'Firefox'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
