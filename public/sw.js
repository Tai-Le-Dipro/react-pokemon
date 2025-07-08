/* eslint-disable no-restricted-globals */

const CACHE_NAME = "pokemon-app-v1";
const API_CACHE = "pokemon-api-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/manifest.json",
  "/favicon.ico",
  "/logo192.png",
  "/logo512.png",
];

// Install Event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch Event
self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  // Nếu là request tới PokeAPI
  if (url.includes("pokeapi.co")) {
    event.respondWith(
      caches.open(API_CACHE).then((cache) =>
        fetch(event.request)
          .then((response) => {
            // Nếu fetch thành công, clone và lưu vào cache
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(() => {
            // Nếu offline, trả về dữ liệu đã cache (nếu có)
            return cache.match(event.request).then((cachedResponse) => {
              return (
                cachedResponse ||
                new Response(JSON.stringify({ error: "Offline and no cached data" }), {
                  status: 503,
                  headers: { "Content-Type": "application/json" },
                })
              );
            });
          })
      )
    );
    return;
  }

  // Xử lý các request khác như bình thường
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request).catch(() => {
        if (event.request.mode === "navigate") {
          return caches.match("/index.html");
        }
        return new Response("Offline", { status: 503 });
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        // eslint-disable-next-line array-callback-return
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle background sync logic here
  console.log("Background sync triggered");
  return Promise.resolve();
}
