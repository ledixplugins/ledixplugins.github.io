// Arquivo antigo (enviado por engano na raiz): apaga o cache e o service worker e devolve o site ao normal.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil((async()=>{ for(const k of await caches.keys()) await caches.delete(k); await self.registration.unregister(); const cs=await self.clients.matchAll(); cs.forEach(c=>c.navigate(c.url)); })()));
