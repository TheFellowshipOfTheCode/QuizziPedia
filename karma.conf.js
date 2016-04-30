module.exports = function(config){
  config.set({



    basePath : './',

    preprocessors: {
      'Front-End/Directives/**/*.html' : ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      moduleName: 'templates'
    },

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
      'Front-End/AppRun.js',
      'Front-End/AppRouter.js',
      'Front-End/Controllers/**/*.js',
      'Front-End/Models/**/*.js',
      'Front-End/Directives/*.js',
      'Front-End/Directives/**/*.html',
      'Front-End/Services/**/*.js',
      'Front-End/Tests/**/*.js',
      'Back-End/Tests/**/*.js'
    ],



    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

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
