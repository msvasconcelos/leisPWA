// Generating content based on the template
// Gerando conteúdo com base no modelo
var link = window.location.href;
var template = "<article>\n\
	<h3>Lei: NAME</h3>\n\
	<ul>\n\
	<li><span>Data:</span> <strong>DATA</strong></li>\n\
	<li><span>Descrição:</span> <a href='data/img/NAME.jpg'>DESCRICAO</a></li>\n\
	<li><span>Categoria:</span> <a>CATEGORIA</a></li>\n\
	<li><span>Exercício:</span> <a>EXERCICIO</a></li>\n\
	</ul>\n\
</article>";

var content = '';
for(var i=0; i<games.length; i++) {
	var entry = template.replace(/POS/g,(i+1))
		.replace(/NAME/g,games[i].name)
		.replace(/DATA/g,games[i].data)
		.replace(/DESCRICAO/g,games[i].descricao)
		.replace(/CATEGORIA/g,games[i].categoria)
		.replace(/EXERCICIO/g,games[i].exercicio);
	entry = entry.replace('<a href=\'http:///\'></a>','-');
	content += entry;
};
//document.getElementById('content').innerHTML = content;
 if(link == "http://localhost:3000/leis.html"){
	document.getElementById('content').innerHTML = content;
}
// Registering Service Worker
// Registrando Service Worker
if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js');
};

// Requesting permission for Notifications after clicking on the button
// Solicitando permissão para notificações depois de clicar no botão
var button = document.getElementById("notifications");
button.addEventListener('click', function(e) {
	Notification.requestPermission().then(function(result) {
		if(result === 'granted') {
			randomNotification();
		}
	});
});

// Setting up random Notification
// Configurando notificação aleatória
function randomNotification() {
	var randomItem = Math.floor(Math.random()*games.length);
	var notifTitle = games[randomItem].name;
	var notifBody = 'Created by '+games[randomItem].data+'.';
	var notifImg = 'data/img/'+games[randomItem].slug+'.jpg';
	var options = {
		body: notifBody,
		icon: notifImg
	}
	var notif = new Notification(notifTitle, options);
	setTimeout(randomNotification, 30000);
};

// Progressive loading images
// Carregamento progressivo de imagens
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