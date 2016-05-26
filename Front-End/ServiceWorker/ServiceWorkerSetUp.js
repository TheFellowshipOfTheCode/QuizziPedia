if ('serviceWorker' in navigator) {
 console.log('Service Worker is supported');
 navigator.serviceWorker.register('QuizziPediaServiceWorker.js').then(function(reg) {
   console.log(':^)', reg);
   // TODO
 }).catch(function(err) {
   console.log(':^(', err);
 });
}

/*if (navigator.serviceWorker.controller) {
  // A ServiceWorker controls the site on load and therefor can handle offline
  // fallbacks.
  console.log('DEBUG: serviceWorker.controller is truthy');
  debug(navigator.serviceWorker.controller.scriptURL + ' (onload)', 'controller');
}

else {
  // Register the ServiceWorker
  console.log('DEBUG: serviceWorker.controller is falsy');
  navigator.serviceWorker.register('QuizziPediaServiceWorker.js', {
    scope: './'
  }).then(function(reg) {
    debug(reg.scope, 'register');
  });
}
  */
