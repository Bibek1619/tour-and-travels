const CACHE_NAME = "adventure-nepal-v2";

// Only cache static shell assets — never cache API responses
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png"
];

// ── Install: pre-cache static shell ──────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// ── Activate: delete old caches ───────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch: strategy per request type ─────────────────────────────
self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // 1. API calls → Network-only (never serve stale API data)
  if (
    url.hostname.includes("onrender.com") ||
    url.pathname.startsWith("/api/") ||
    url.hostname === "localhost" && url.port === "5000"
  ) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 2. External resources (Unsplash, Cloudinary, etc.) → Network first, cache fallback
  if (url.hostname !== self.location.hostname) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 3. App shell (HTML, JS, CSS, icons) → Cache first, network fallback
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline fallback — serve the app shell for navigation requests
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }
        });
    })
  );
});
