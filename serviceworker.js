self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
   caches.open(cacheName).then((cache) => { 
   console.log('[Service Worker] Caching all: app shell and content');
   return cache.addAll(contentToCache);
   })
   );
   });

var cacheName = 'js13kpwa.webmanifest'; 
var appShellFiles = [ 
    '/Desktop\coursework2/geography.jpg',
    '/Desktop\coursework2/history.jpg',
    '/Desktop\coursework2/math.jpg',
    '/Desktop\coursework2/science.jpg',
    '/Desktop\coursework2/design.jpg',
    '/Desktop\coursework2/index.html',
    '/Desktop\coursework2/server.js',
    '/Desktop\coursework2/serviceworker.js',
    '/Desktop\coursework2/app.js',

];

var gamesImages = [];
for(var i=0; i<games.length; i++) {
    gamesImages.push('data/img/'+games[i].slug+'.jpg');
}
var contentToCache = appShellFiles.concat(gamesImages);


self.addEventListener('fetch', (e) => {
console.log('[Service Worker] Fetched resource '+e.request.url);
});

self.addEventListener('install', function(e) {

    console.log('[Serviceworker] Install');
  
    e.waitUntil(
  
      caches.open(cacheName).then(function(cache) {
  
        console.log('[Service Worker] Caching all: app shell and content');
  
        return cache.addAll(contentToCache);
  
      })
  
    );
  
  });



//fecthing = conten using service worker


self.addEventListener('fetch', function (e) { 
    e.respondWith(
        caches.match(e.request).then(function (r) {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    console.log('[Service Worker] Caching new resource: ' + e.request.url);
                    cache.put(e.request, response.clone()); 
                    return response; 
                }); 
            }); 

        }) 

        );

    });

  




