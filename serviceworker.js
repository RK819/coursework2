if('serviceWorker' in navigator) {
 navigator.serviceWorker.register('/coursework2/sw.js');
};

var button = document.getElementById("notifications");
button.addEventListener('click', function(e) {
Notification.requestPermission().then(function(result) { 
if(result === 'granted') { 
randomNotification(); 
}
});
});

function randomNotification() {
var randomItem = Math.floor(Math.random()*games.length);
var notifTitle = games[randomItem].name;
var notifBody = 'Created by '+games[randomItem].author+'.';
var notifImg = 'data/img/'+games[randomItem].slug+'.jpg';
var options = { 
body: notifBody, 
icon: notifImg 
}
var notif = new Notification(notifTitle, options); 
setTimeout(randomNotification, 30000); 
}



self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install'); 
});    

var cacheName = 'cache1'; 
var appShellFiles = [ 
    '/Desktop\coursework2/geography.jpg',
    '/Desktop\coursework2/history.jpg',
    '/Desktop\coursework2/math.jpg',
    '/Desktop\coursework2/science.jpg',
    '/Desktop\coursework2/design.jpg',
    '/Desktop\coursework2/index.html',
    '/Desktop\coursework2/server.js',
    '/Desktop\coursework2/serviceworker.js',
];

var gamesImages = [];
for(var i=0; i<games.length; i++) {
    gamesImages.push('data/img/'+games[i].slug+'.jpg');
}
var contentToCache = appShellFiles.concat(gamesImages);

self.addEventListener('install', (e) => {
 console.log('[Service Worker] Install');
 e.waitUntil(
caches.open(cacheName).then((cache) => { 
console.log('[Service Worker] Caching all: app shell and content');
return cache.addAll(contentToCache);
})
);
});

self.addEventListener('fetch', (e) => {
console.log('[Service Worker] Fetched resource '+e.request.url);
});

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

    var cacheName = 'cache1';
    self.addEventListener('install', (e) => { 
        e.waitUntil(  
            caches.open('cache1').then((cache) => {   
                return cache.addAll(contentToCache); 
            })
            );
        });

        self.addEventListener('activate', (e) => { 
            e.waitUntil( 
                caches.keys().then((keyList) => { 
                    return Promise.all(keyList.map((key) => {
                        if(key !== cacheName) {
                            return caches.delete(key)
                        }
                    })); 
                })
                );
            });




