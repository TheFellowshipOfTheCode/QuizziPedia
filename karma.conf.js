module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'Front-End/bower_components/angular/angular.js',
      'Front-End/bower_components/angular-route/angular-route.js',
      'Front-End/bower_components/angular-mocks/angular-mocks.js',
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
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
