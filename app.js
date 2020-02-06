if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/coursework2/serviceworker.js');
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

    var imagesToLoad = document.querySelectorAll('img[data-src]');

var loadImages = function(image) {

	image.setAttribute('src', image.getAttribute('data-src'));

	image.onload = function() {

		image.removeAttribute('data-src');

	};

};

if('IntersectionObserver' in window) {

	var observer = new IntersectionObserver(function(items, observer) {

		items.forEach(function(item) {

			if(item.isIntersecting) {

				loadImages(item.target);

				observer.unobserve(item.target);

			}

		});

	});

	imagesToLoad.forEach(function(img) {

		observer.observe(img);

	});

}

else {

	imagesToLoad.forEach(function(img) {

		loadImages(img);

	});

}