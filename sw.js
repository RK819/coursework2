var cacheName = 'cacheFiles-v1'; 

var appShellFiles = [
    '/coursework2/',
    '/coursework2/data/images/afterschool.png',
    '/coursework2/data/images/geography.jpg',
    '/coursework2/data/images/history.jpg',
    '/coursework2/data/images/math.jpg',
    '/coursework2/data/images/science.jpg',
    '/coursework2/data/images/design.jpg',
    '/coursework2/data/images/afterschool.png',
    '/coursework2/data/images/geography.jpg',
    '/coursework2/data/images/history.jpg',
    '/coursework2/data/images/math.jpg',
    '/coursework2/data/images/science.jpg',
    '/coursework2/data/images/design.jpg',
    '/coursework2/index.html',
    '/coursework2/server.js',
    '/coursework2/sw.js',
    '/coursework2/app.js',

];

var contentToCache = [] = appShellFiles;

self.addEventListener('install',(e)=>{
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
             console.log('[Service Worker] Caching all: app shell and content');
             return cache.addAll(contentToCache);
            })
            );
        }
 );

 self.addEventListener('fetch', function (e) {
     e.respondWith(
         caches.match(e.request).then(function(r){
             console.log('[Service Worker] Fetching resource: '+e.request.url);
             return r || fetch(e.request).then( function (response) {
                 return caches.open(cacheName).then(function (cache)
                 {
                console.log('[Service Worker] Caching new resource: '+e.request.url);
                cache.put(e.request, response.clone());
                return response;
            });
        });
    }));
});

self.addEventListener('install',(e) => {
    e.waitUntil(
    caches.open('cacheFiles-v2').then((cache) => {
        return cache.addAll(contentToCache);
    }));
});

self.addEventListener('activate',(e) => {

    e.waitUntil(
    caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => { 
    if (key !== cacheName) { 
    return caches.delete(key);
    }}
    ));
    }));
    });


  




