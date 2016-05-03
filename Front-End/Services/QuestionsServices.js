app.factory("QuestionsServices", [function() {
    return {
      getCurrentQuestion : function (){
              var result = $http.get('/api/projects');
              console.log(result);
              return result;
      }
    }
}]);
