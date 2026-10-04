// Hang Glider Sim — работа без интернета. Сборка b211.
const CACHE = 'hgs-b211';
// Озвучка — отдельный кэш, не сбрасывается с обновлением страницы: пока озвучка та же (?v=), не качаем 6–8 МБ заново.
const DATA = 'hgs-data';
const VOICE_V = 'd72e787b8e';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'pwa/icon-192.png', 'pwa/icon-512.png', 'pwa/apple-touch-icon.png'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('hgs-') && k !== CACHE && k !== DATA).map((k) => caches.delete(k))))
    // Из кэша озвучки — старые версии (другая ?v=).
    .then(() => caches.open(DATA)).then((c) => c.keys().then((rs) => Promise.all(rs.filter((r) => new URL(r.url).searchParams.get('v') !== VOICE_V).map((r) => c.delete(r)))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Проверка обновлений (APK и веб-версии) — всегда из сети.
  if (url.hostname === 'raw.githubusercontent.com' || url.hostname === 'api.github.com' || url.pathname.endsWith('/version.json')) return;
  // Песня в меню — аудио по частям (Range): плеер берёт из сети/HTTP-кэша сам, мимо service worker.
  if (url.pathname.includes('/music/')) return;
  // Страница — сначала сеть (новая сборка), без сети — из кэша.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((r) => { const c = r.clone(); caches.open(CACHE).then((k) => k.put('index.html', c)); return r; }).catch(() => caches.match('index.html')));
    return;
  }
  // Озвучка — свой постоянный кэш.
  if (/voice-[a-z]+(-[0-9]+)?[.]json$/.test(url.pathname)) {
    e.respondWith(caches.open(DATA).then((c) => c.match(req).then((hit) => hit || fetch(req).then((r) => { if (r.ok) c.put(req, r.clone()); return r; }))));
    return;
  }
  // Остальное (карты районов, шрифты) — из кэша, если есть; иначе из сети и в кэш.
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((r) => {
    if (r.ok || r.type === 'opaque') { const c = r.clone(); caches.open(CACHE).then((k) => k.put(req, c)); }
    return r;
  })));
});
