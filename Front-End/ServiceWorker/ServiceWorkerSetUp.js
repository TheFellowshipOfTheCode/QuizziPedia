if ('serviceWorker' in navigator) {
 navigator.serviceWorker.register('QuizziPediaServiceWorker.js').then(function(reg) {
 }).catch(function(err) {
 });
}
