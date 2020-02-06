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

var cacheName = 'manifest.js'; 
var appShellFiles = [ 
    '/Desktop\coursework2/geography.jpg',
    '/Desktop\web_app_course_work_2/history.jpg',
    '/Desktop\web_app_course_work_2/math.jpg',
    '/Desktop\web_app_course_work_2/science.jpg',
    '/Desktop\web_app_course_work_2/design.jpg',
    '/Desktop\web_app_course_work_2/index.html',
    '/Desktop\web_app_course_work_2/server.js',
    '/Desktop\web_app_course_work_2/serviceworker.js',
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

    var cacheName = 'js13kPWA-v1';
    self.addEventListener('install', (e) => { 
        e.waitUntil(  
            caches.open('js13kPWA-v2').then((cache) => {   
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

<link rel="manifest" href="js13kpwa.webmanifest"></link>

{
    "name": "js13kGames Progressive Web App",
    "short_name": "js13kPWA",
    "description": "Progressive Web App that lists games submitted to the A-Frame
    category in the js13kGames 2017 competition.",
    "icons": [ 
        { 
            "src": "icons/icon-32.png",
            "sizes": "32x32",
            "type": "image/png"
        },

        { 
            "src": "icons/icon-512.png",
            "sizes": "512x512",
            "type": "image/png" 
        }

    ],
    "start_url": "/pwa-examples/js13kpwa/index.html", 
    "display": "fullscreen", 
    "theme_color": "#B12A34",
    "background_color": "#B12A34"
}
