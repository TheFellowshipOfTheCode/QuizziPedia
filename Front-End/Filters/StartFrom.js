app.filter('startFrom', function() {

  return function(input, start) {
    if(input!=undefined) {
      start = +start;
      return input.slice(start);
    }
  };
});
