self.importScripts('data/financas.js');
self.importScripts('data/incentivos.js');
self.importScripts('data/outros.js');
self.importScripts('data/seguranca.js');
self.importScripts('data/servidor.js');
self.importScripts('data/zoneamento.js');

// Files to cache
// Arquivos para armazenar em cache
var cacheName = 'leisPWA-v1';
var appShellFiles = [
  '/',
  '/index.html',
  '/categorias.html',
  '/leis.html',
  '/leis2.html',
  '/leis3.html',
  '/leis4.html',
  '/leis5.html',
  '/leis6.html',
  '/app.js',
  '/style.css',
  '/fonts/graduate.eot',
  '/fonts/graduate.ttf',
  '/fonts/graduate.woff',
  '/favicon.ico',
  '/img/logo.png',
  '/img/bg.png',
  '/icons/icon-32.png',
  '/icons/icon-64.png',
  '/icons/icon-96.png',
  '/icons/icon-128.png',
  '/icons/icon-168.png',
  '/icons/icon-192.png',
  '/icons/icon-256.png',
  '/icons/icon-512.png'
];
var financasImages = [];
for(var i=0; i<financas.length; i++) {
  financasImages.push('data/img/'+financas[i].slug+'.jpg');
}
var contentToCache = appShellFiles.concat(financasImages);

// Installing Service Worker
// Instalando Service Worker
self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});

// Fetching content using Service Worker
// Buscando conteúdo usando o Service Worker
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});