const CACHE = 'kroy-v8-full';
const FILES = ['./','./index.html','./style.css','./script.js','./manifest.json','./banner.jpg'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k!==CACHE ? caches.delete(k) : null))));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
    let copy = res.clone();
    caches.open(CACHE).then(c => c.put(e.request, copy));
    return res;
  })).catch(()=>caches.match('./index.html')));
});
