const C='liftlog-v1',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 const net=()=>fetch(r).then(n=>{const c=n.clone();caches.open(C).then(x=>x.put(r,c));return n});
 e.respondWith(r.mode==='navigate'?net().catch(()=>caches.match('index.html')):caches.match(r).then(m=>m||net().catch(()=>m)))});
