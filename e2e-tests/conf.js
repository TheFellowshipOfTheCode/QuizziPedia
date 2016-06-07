exports.config = {
  allScriptsTimeout: 30000,

  specs: [
    'scenarios.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  onPrepare: function() {
    var disableNgAnimate = function() {
      angular.module('disableNgAnimate', []).run(function($animate) {
        $animate.enabled(false);
      });
    };
    browser.addMockModule('disableNgAnimate', disableNgAnimate);
  },


  baseUrl: 'http://localhost:8080/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
