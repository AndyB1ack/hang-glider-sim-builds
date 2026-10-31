// Hang Glider Sim — работа без интернета. Сборка b391.
const CACHE = 'hgs-b391';
// Озвучка — отдельный кэш, не сбрасывается с обновлением страницы: пока озвучка та же (?v=), не качаем 6–8 МБ заново.
const DATA = 'hgs-data';
const VOICE_V = 'a1756fd3a5';
// Файлы районов: путь → [отпечаток, байт].
const REG = {"regions/ager/airspace.json":["f7fe43a4d2",1239],"regions/ager/base.jpg":["2cc3fb78ac",1288913],"regions/ager/base.png":["5ebdb6bd9f",4960647],"regions/ager/bld.json":["31ef17aa11",1487632],"regions/ager/detail-0.jpg":["eb3ecbcb9e",30577],"regions/ager/detail-0.png":["2b607c6a9e",127441],"regions/ager/detail-1.jpg":["153af694a8",18450],"regions/ager/detail-1.png":["878829f29d",106216],"regions/ager/detail-2.jpg":["eee788cfcb",27630],"regions/ager/detail-2.png":["894b00ebc6",117694],"regions/ager/detail-3.jpg":["ef73ac3a6f",22638],"regions/ager/detail-3.png":["548aea02ab",105715],"regions/ager/meta.json":["47ffcf0d4b",27914],"regions/ager/vec.json":["6f3555fadb",2062712],"regions/forbes/base.jpg":["3e7dfb7ec6",775824],"regions/forbes/base.png":["a481a61a58",1746079],"regions/forbes/bld.json":["ec680ec9bc",88950],"regions/forbes/detail-0.jpg":["170ce62cc7",23589],"regions/forbes/detail-0.png":["ec9bda34a1",40471],"regions/forbes/meta.json":["d6302af3ca",60414],"regions/forbes/vec.json":["09bafa45e0",425149],"regions/friuli/airspace.json":["02c4d87b4a",8649],"regions/friuli/base.jpg":["d112098799",366576],"regions/friuli/base.png":["15d5519ce4",1759418],"regions/friuli/bld.json":["68aec8216e",8539952],"regions/friuli/detail-0.jpg":["455f277046",14283],"regions/friuli/detail-0.png":["ab72217819",97827],"regions/friuli/detail-1.jpg":["1968f36ffc",18611],"regions/friuli/detail-1.png":["1c3133eaa3",106281],"regions/friuli/detail-2.jpg":["7fc2d208d6",14393],"regions/friuli/detail-2.png":["aeb8dc0728",115685],"regions/friuli/meta.json":["ce3c601e6d",37427],"regions/friuli/vec.json":["ce603105d6",3971075],"regions/krushevo/base.jpg":["49e8cd108e",517487],"regions/krushevo/base.png":["3c9fe20da6",2525487],"regions/krushevo/bld.json":["030bb7c949",431819],"regions/krushevo/detail-0.jpg":["71a7b8a943",28173],"regions/krushevo/detail-0.png":["04a25ee2cf",111763],"regions/krushevo/meta.json":["09d92151ee",12625],"regions/krushevo/vec.json":["b7e4292ce8",1758503],"regions/north/airspace.json":["58c71b3096",22162],"regions/north/base.jpg":["01b3ed3ea4",691448],"regions/north/base.png":["c3bdbcb676",1741214],"regions/north/bld.json":["640e0a934f",2814312],"regions/north/detail-0.jpg":["7d164d98a1",30625],"regions/north/detail-0.png":["cecb815dec",52206],"regions/north/detail-1.jpg":["516aa0e28b",35051],"regions/north/detail-1.png":["f4f4a97092",77132],"regions/north/detail-2.jpg":["594a632c0c",148087],"regions/north/detail-2.png":["a02597c37f",297985],"regions/north/detail-3.jpg":["5f722bf430",359776],"regions/north/detail-3.png":["44132feeef",854224],"regions/north/detail-4.jpg":["01f4c4e307",27165],"regions/north/detail-4.png":["adba2e8cf9",66261],"regions/north/detail-5.jpg":["ef45a3c9ae",23896],"regions/north/detail-5.png":["5752051b82",67789],"regions/north/meta.json":["7b1852e58f",43324],"regions/north/vec.json":["c1ec762eb4",2851602],"regions/record/airspace.json":["68a328c50d",16835],"regions/record/base.jpg":["7e325e2680",452523],"regions/record/base.png":["859bb97020",2194461],"regions/record/bld.json":["ef678dbb60",4671512],"regions/record/detail-0.jpg":["e5ae38c5b6",17339],"regions/record/detail-0.png":["6d1b1de415",61644],"regions/record/meta.json":["3213dac7f6",6175],"regions/record/vec.json":["2755544bbf",3047096],"regions/sderot/airspace.json":["45b499764d",4171],"regions/sderot/base.jpg":["618c1e3181",301479],"regions/sderot/base.png":["e5bb7a0839",1416252],"regions/sderot/bld.json":["e769bc4839",1054967],"regions/sderot/detail-0.jpg":["ee7ac83473",25330],"regions/sderot/detail-0.png":["048ef7b9e5",42545],"regions/sderot/meta.json":["b66e3dd0b7",3832],"regions/sderot/vec.json":["ce0dffc72e",999738],"regions/south/airspace.json":["3029698574",2730],"regions/south/base.jpg":["493f5d4d72",208903],"regions/south/base.png":["eca2e2fe3e",995310],"regions/south/bld.json":["3800af1481",210699],"regions/south/detail-0.jpg":["8b543bb9fc",15894],"regions/south/detail-0.png":["393f82b2ce",107112],"regions/south/detail-1.jpg":["cc132fe60a",12588],"regions/south/detail-1.png":["c1464e9961",69074],"regions/south/detail-2.jpg":["1d93c100d3",20427],"regions/south/detail-2.png":["fd0e4c9b30",140688],"regions/south/detail-3.jpg":["fb7d4ea158",20342],"regions/south/detail-3.png":["ae90ce6381",76038],"regions/south/meta.json":["7dbcda47ff",34648],"regions/south/vec.json":["fde96464bf",472202],"regions/valle/base.jpg":["a49878de98",443831],"regions/valle/base.png":["be086645c9",1963810],"regions/valle/bld.json":["4bed08e018",195151],"regions/valle/detail-0.jpg":["9a5eacaab3",18066],"regions/valle/detail-0.png":["3e728699c3",95653],"regions/valle/meta.json":["77d40c0808",15962],"regions/valle/vec.json":["8f8a405e0e",560880]};
const RCACHE = 'hgs-regions';
const BASE = self.registration.scope;
const regKey = (rel) => BASE + rel + '?h=' + REG[rel][0];
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'pwa/icon-192.png', 'pwa/icon-512.png', 'pwa/apple-touch-icon.png'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('hgs-') && k !== CACHE && k !== DATA && k !== RCACHE).map((k) => caches.delete(k))))
    // Из районов — файлы, которых в этой сборке нет или они изменились (другой отпечаток).
    .then(() => caches.open(RCACHE)).then((c) => c.keys().then((rs) => { const ok = new Set(Object.keys(REG).map(regKey)); return Promise.all(rs.filter((r) => !ok.has(r.url)).map((r) => c.delete(r))); }))
    // Из кэша озвучки — старые версии (другая ?v=).
    .then(() => caches.open(DATA)).then((c) => c.keys().then((rs) => Promise.all(rs.filter((r) => new URL(r.url).searchParams.get('v') !== VOICE_V).map((r) => c.delete(r)))))
    .then(() => self.clients.claim()));
});
const relOf = (u) => { const s = String(u).split('?')[0].split('#')[0]; return s.startsWith(BASE) ? s.slice(BASE.length) : null; };
/** Файл района: из постоянного кэша, иначе из сети (и в кэш). */
async function regionFile(rel, req) {
  const c = await caches.open(RCACHE);
  const key = regKey(rel);
  const hit = await c.match(key);
  if (hit) return hit;
  const r = await fetch(req || BASE + rel);
  if (r.ok) await c.put(key, r.clone());
  return r;
}
// «Скачать всё для полёта без интернета» (Слава, 31.10.2026): все районы и голос языка; страница получает ход загрузки.
async function offlineAll(voice, port) {
  const items = Object.keys(REG).map((rel) => ({ rel, size: REG[rel][1] }));
  const total = items.reduce((a, b) => a + b.size, 0) + voice.length * 9e6;
  let done = 0;
  let fail = 0;
  const rc = await caches.open(RCACHE);
  const dc = await caches.open(DATA);
  const send = (fin) => port.postMessage({ type: 'offProgress', done, total, fail, fin });
  for (const it of items) {
    try {
      if (!(await rc.match(regKey(it.rel)))) await regionFile(it.rel);
    } catch (_) { fail++; }
    done += it.size;
    send(false);
  }
  for (const u of voice) {
    try {
      const url = new URL(u, BASE).href;
      if (!(await dc.match(url))) { const r = await fetch(url); if (r.ok) await dc.put(url, r); else fail++; }
    } catch (_) { fail++; }
    done += 9e6;
    send(false);
  }
  send(true);
}
async function offlineStatus(voice, port) {
  const rc = await caches.open(RCACHE);
  const dc = await caches.open(DATA);
  let have = 0;
  let total = 0;
  for (const rel of Object.keys(REG)) {
    total += REG[rel][1];
    if (await rc.match(regKey(rel))) have += REG[rel][1];
  }
  let vHave = 0;
  for (const u of voice) if (await dc.match(new URL(u, BASE).href)) vHave++;
  port.postMessage({ type: 'offStatus', have, total, vHave, vTotal: voice.length });
}
// Страница присылает то, что скачала до того, как service worker её взял (первый запуск), — кладём в кэш.
self.addEventListener('message', (e) => {
  const d = e.data;
  if (d && (d.type === 'offAll' || d.type === 'offStatus') && e.ports[0]) {
    const voice = Array.isArray(d.voice) ? d.voice.filter((u) => typeof u === 'string').slice(0, 20) : [];
    e.waitUntil(d.type === 'offAll' ? offlineAll(voice, e.ports[0]) : offlineStatus(voice, e.ports[0]));
    return;
  }
  if (!d || d.type !== 'keep' || !Array.isArray(d.urls)) return;
  e.waitUntil(Promise.all(d.urls.slice(0, 2000).map(async (u) => {
    try {
      const url = new URL(u);
      if (url.origin !== self.location.origin) return;
      const rel = relOf(u);
      if (rel && REG[rel]) { await regionFile(rel, new Request(u, { cache: 'force-cache' })); return; }
      const voice = /voice-[a-z]+(-[0-9]+)?[.]json$/.test(url.pathname);
      const c = await caches.open(voice ? DATA : CACHE);
      if (await c.match(u)) return;
      const r = await fetch(u, { cache: 'force-cache' });
      if (r.ok) await c.put(u, r);
    } catch (_) { /* нет сети — в другой раз */ }
  })));
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
    // cache: 'no-cache' — мимо HTTP-кэша браузера (GitHub Pages отдаёт страницу с max-age=600): «Обновить» сразу даёт новую сборку.
    // Сеть не ответила за 3 с — сразу своя копия (Слава, 31.10.2026: без интернета ~40 с белого экрана); ответит позже — обновим копию.
    e.respondWith(new Promise((res) => {
      let done = false;
      const fallback = () => caches.match('index.html').then((h) => { if (h && !done) { done = true; res(h); } return h; });
      const timer = setTimeout(fallback, 3000);
      fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }).then((r) => {
        const c = r.clone();
        caches.open(CACHE).then((k) => k.put('index.html', c));
        if (!done) { done = true; clearTimeout(timer); res(r); }
      }).catch(() => fallback().then((h) => { if (!done) { done = true; res(h || Response.error()); } }));
    }));
    return;
  }
  // Районы — свой постоянный кэш по отпечатку файла.
  { const rel = relOf(req.url); if (rel && REG[rel]) { e.respondWith(regionFile(rel, req)); return; } }
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
