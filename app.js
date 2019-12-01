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
for(var i=0; i<financas.length; i++) {
	var entry = template.replace(/POS/g,(i+1))
		.replace(/NAME/g,financas[i].name)
		.replace(/DATA/g,financas[i].data)
		.replace(/DESCRICAO/g,financas[i].descricao)
		.replace(/CATEGORIA/g,financas[i].categoria)
		.replace(/EXERCICIO/g,financas[i].exercicio);
	entry = entry.replace('<a href=\'http:///\'></a>','-');
	content += entry;
};
var content2 = '';
for(var i=0; i<incentivos.length; i++) {
	var entry2 = template.replace(/POS/g,(i+1))
		.replace(/NAME/g,incentivos[i].name)
		.replace(/DATA/g,incentivos[i].data)
		.replace(/DESCRICAO/g,incentivos[i].descricao)
		.replace(/CATEGORIA/g,incentivos[i].categoria)
		.replace(/EXERCICIO/g,incentivos[i].exercicio);
	entry2 = entry2.replace('<a href=\'http:///\'></a>','-');
	content2 += entry2;
};
var content3 = '';
for(var i=0; i<outros.length; i++) {
	var entry3 = template.replace(/POS/g,(i+1))
		.replace(/NAME/g,outros[i].name)
		.replace(/DATA/g,outros[i].data)
		.replace(/DESCRICAO/g,outros[i].descricao)
		.replace(/CATEGORIA/g,outros[i].categoria)
		.replace(/EXERCICIO/g,outros[i].exercicio);
	entry3 = entry3.replace('<a href=\'http:///\'></a>','-');
	content3 += entry3;
};
var content4 = '';
for(var i=0; i<seguranca.length; i++) {
	var entry4 = template.replace(/POS/g,(i+1))
		.replace(/NAME/g,seguranca[i].name)
		.replace(/DATA/g,seguranca[i].data)
		.replace(/DESCRICAO/g,seguranca[i].descricao)
		.replace(/CATEGORIA/g,seguranca[i].categoria)
		.replace(/EXERCICIO/g,seguranca[i].exercicio);
	entry4 = entry4.replace('<a href=\'http:///\'></a>','-');
	content4 += entry4;
};
var content5 = '';
for(var i=0; i<servidor.length; i++) {
	var entry5 = template.replace(/POS/g,(i+1))
		.replace(/NAME/g,servidor[i].name)
		.replace(/DATA/g,servidor[i].data)
		.replace(/DESCRICAO/g,servidor[i].descricao)
		.replace(/CATEGORIA/g,servidor[i].categoria)
		.replace(/EXERCICIO/g,servidor[i].exercicio);
	entry5 = entry5.replace('<a href=\'http:///\'></a>','-');
	content5 += entry5;
};
var content6 = '';
for(var i=0; i<zoneamento.length; i++) {
	var entry6 = template.replace(/POS/g,(i+1))
		.replace(/NAME/g,zoneamento[i].name)
		.replace(/DATA/g,zoneamento[i].data)
		.replace(/DESCRICAO/g,zoneamento[i].descricao)
		.replace(/CATEGORIA/g,zoneamento[i].categoria)
		.replace(/EXERCICIO/g,zoneamento[i].exercicio);
	entry6 = entry6.replace('<a href=\'http:///\'></a>','-');
	content6 += entry6;
};
//document.getElementById('content').innerHTML = content;
 if(link == "https://leiscruzce.azurewebsites.net/leis.html"){
	document.getElementById('content').innerHTML = content;
}
if(link == "https://leiscruzce.azurewebsites.net/leis2.html"){
	document.getElementById('content').innerHTML = content2;
}
if(link == "https://leiscruzce.azurewebsites.net/leis3.html"){
	document.getElementById('content').innerHTML = content3;
}
if(link == "https://leiscruzce.azurewebsites.net/leis4.html"){
	document.getElementById('content').innerHTML = content4;
}
if(link == "https://leiscruzce.azurewebsites.net00/leis5.html"){
	document.getElementById('content').innerHTML = content5;
}
if(link == "https://leiscruzce.azurewebsites.net/leis6.html"){
	document.getElementById('content').innerHTML = content6;
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
	var randomItem = Math.floor(Math.random()*financas.length);
	var notifTitle = financas[randomItem].name;
	var notifBody = 'Created by '+financas[randomItem].data+'.';
	var notifImg = 'data/img/'+financas[randomItem].slug+'.jpg';
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