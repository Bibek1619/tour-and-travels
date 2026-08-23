const CACHE_NAME = "adventure-nepal-v3";

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png"
];

// ── Install ───────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// ── Activate: clean old caches ────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── Helper: is this an API request? ──────────────────────────────
function isApiRequest(url) {
  // Any path starting with /api/ on any host
  if (url.pathname.startsWith("/api/")) return true;
  // Render backend
  if (url.hostname.includes("onrender.com")) return true;
  // Local backend on port 5000
  if (url.hostname === "localhost" && url.port === "5000") return true;
  if (url.hostname === "127.0.0.1" && url.port === "5000") return true;
  return false;
}

// ── Fetch ─────────────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // 1. API calls → always network-only, never cache, never intercept errors
  if (isApiRequest(url)) {
    // Don't call event.respondWith — let the browser handle it natively
    // This avoids the "promise rejected" SW error when the server is down
    return;
  }

  // 2. External images (Unsplash, Cloudinary) → network first, cache fallback
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

  // 3. App shell (JS, CSS, icons, HTML) → cache first, network fallback
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
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }
        });
    })
  );
});
