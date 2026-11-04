/* Hors connexion : l'appli et ses modules (pdf.js, pdf-lib, polices) sont gardés en cache.
   La page est d'abord demandée au réseau (pour recevoir les mises à jour), le cache sert si le réseau manque ;
   les modules, aux adresses versionnées, sont servis depuis le cache. */
const CACHE = "report-metre-v1";
const SHELL = [
  "./", "./index.html", "./manifest.webmanifest",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./icons/apple-touch-icon.png",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js",
  "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
];
const LIBS = /^https:\/\/(cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;

self.addEventListener("install", e => {
  /* un module indisponible n'empêche pas l'installation : il sera mis en cache à sa première utilisation */
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (LIBS.test(req.url)) {
    e.respondWith(caches.match(req, {ignoreVary: true}).then(hit => hit || fetch(req).then(res => {
      if (res && (res.ok || res.type === "opaque")) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); }
      return res;
    })));
    return;
  }
  if (url.origin !== location.origin) return;
  /* fichiers de l'appli : réseau d'abord, cache si hors connexion */
  e.respondWith(fetch(req).then(res => {
    if (res && res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req.mode === "navigate" ? "./index.html" : req, cp)); }
    return res;
  }).catch(() => caches.match(req, {ignoreSearch: req.mode === "navigate"})
    .then(hit => hit || (req.mode === "navigate" ? caches.match("./index.html") : undefined))
    .then(hit => hit || new Response("Hors connexion", {status: 503, headers: {"Content-Type": "text/plain; charset=utf-8"}}))));
});
