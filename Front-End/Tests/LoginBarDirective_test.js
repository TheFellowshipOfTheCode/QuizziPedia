describe('Unit testing great quotes', function() {

  beforeEach(angular.mock.module("QuizziPedia"));

  describe("template", function () {
    var $compile;
    var $scope;
    var $httpBackend;

    beforeEach(module('templates'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
                 $compile = _$compile_;
                 $scope = _$rootScope_.$new();
    }));

    it('should create clickable titles', inject(function() {

    }));

  });

});
