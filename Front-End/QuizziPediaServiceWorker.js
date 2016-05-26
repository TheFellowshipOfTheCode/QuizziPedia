
importScripts('/ServiceWorker/cache-polyfill.js');

/*console.log('Started', self);

self.addEventListener('install', function(e) {
  self.skipWaiting();
  console.log('Installed', e);
  e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/ServiceWorker/Views/OfflineIndex.html',
       '/ServiceWorker/Views/OfflineIndex.html?homescreen=1',
       '/?homescreen=1',
       '/ServiceWorker/css/main-offline.css',
       '/ServiceWorker/Images/Icons/logo.png'

     ]);
   })
 );
});

self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});
self.addEventListener('push', function(event) {
  console.log('Push message received', event);
  // TODO
});

self.addEventListener('fetch', function(event) {
 console.log(event.request.url);
 event.respondWith(
   caches.match(event.request).then(function(response) {
       return response || fetch(event.request);
     })
 );
});*/

self.addEventListener('install', function(event) {
  // Put `offline.html` page into cache
  console.log('Installed', event);

  var offlineRequest = new Request('/ServiceWorker/Views/OfflineIndex.html');
  event.waitUntil(
    fetch(offlineRequest).then(function(response) {
      return caches.open('offline').then(function(cache) {
        return cache.put(offlineRequest, response);
      });
    })
  );
});

self.addEventListener('fetch', function(event) {
  // Only fall back for HTML documents.
  var request = event.request;
  // && request.headers.get('accept').includes('text/html')
  if (request.method === 'GET') {
    // `fetch()` will use the cache when possible, to this examples
    // depends on cache-busting URL parameter to avoid the cache.
    event.respondWith(
      fetch(request).catch(function(error) {
        // `fetch()` throws an exception when the server is unreachable but not
        // for valid HTTP responses, even `4xx` or `5xx` range.
        return caches.open('offline').then(function(cache) {
          return cache.match('/ServiceWorker/Views/OfflineIndex.html');
        });
      })
    );

  }
  // Any other handlers come here. Without calls to `event.respondWith()` the
  // request will be handled without the ServiceWorker.
});
