/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-21c76a0';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./prima_sezona_01.html","./prima_sezona_02.html","./prima_sezona_03.html","./prima_sezona_04.html","./prima_sezona_05.html","./prima_sezona_06.html","./prima_sezona_07.html","./prima_sezona_08.html","./prima_sezona_09.html","./prima_sezona_10.html","./prima_sezona_11.html","./prima_sezona_12.html","./prima_sezona_13.html","./prima_sezona_14.html","./prima_sezona_15.html","./prima_sezona_16.html","./prima_sezona_17.html","./prima_sezona_18.html","./prima_sezona_19.html","./prima_sezona_20.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/obalka.jpg","./resources/obr_01.jpg","./resources/obr_02.jpg","./resources/obr_03.jpg","./resources/obr_04.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});