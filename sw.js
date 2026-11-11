/* E-Collecte SEN-CSU — service worker : fonctionnement hors ligne et mises à jour.
   Le numéro de version change à chaque publication ; les appareils se mettent à jour d'eux-mêmes. */
const VERSION = 'ecollecte-e1b0f491';
const SHELL = [
"./",
"css/app.css",
"fonts/atkinson-hyperlegible-latin-400-normal.woff2",
"fonts/atkinson-hyperlegible-latin-700-normal.woff2",
"forms/dakar_ancar.xlsx",
"forms/dakar_camp.xlsx",
"forms/dakar_cec.xlsx",
"forms/dakar_cmu_eleve.xlsx",
"forms/dakar_familiale.xlsx",
"forms/dakar_ndongo_daara.xlsx",
"forms/guediawaye_cmu_eleve.xlsx",
"forms/guediawaye_familiale.xlsx",
"forms/guediawaye_ndongo_daara.xlsx",
"forms/index.json",
"forms/keurmassar_cmu_eleve.xlsx",
"forms/keurmassar_familiale.xlsx",
"forms/keurmassar_ndongo_daara.xlsx",
"icons/apple-touch-icon.png",
"icons/favicon-64.png",
"icons/icon-192.png",
"icons/icon-512.png",
"icons/maskable-512.png",
"index.html",
"js/app.js",
"js/db.js",
"js/xlsform.js",
"js/xpath.js",
"manifest.webmanifest",
"media/logo_sencsu.png",
"media/qr_orange.jpg",
"media/qr_wave.jpg",
"vendor/jszip.min.js",
"vendor/xlsx.full.min.js"
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('ecollecte-') && k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', (e) => { if (e.data === 'skipWaiting') self.skipWaiting(); });
self.addEventListener('fetch', (e) => {
  const req = e.request; const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return; // envois vers le serveur : jamais en cache
  // formulaires : réseau d'abord (pour recevoir les nouvelles versions), cache si hors ligne
  if (url.pathname.includes('/forms/')) {
    e.respondWith(fetch(req).then((r) => { const copy = r.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return r; }).catch(() => caches.match(req, { ignoreSearch: true })));
    return;
  }
  // reste de l'application : cache d'abord, réseau sinon
  e.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).catch(() => caches.match('./'))));
});
