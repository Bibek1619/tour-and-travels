import { useState, useEffect } from "react";
import { Download, X, Smartphone } from "lucide-react";

/**
 * PWAInstallPrompt
 * - On Android/Chrome: catches the beforeinstallprompt event and shows a banner
 * - On iOS Safari: detects iOS and shows manual instructions (iOS doesn't support the event)
 * - Dismissed state is persisted in localStorage for 7 days
 */
const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Already installed (running as standalone PWA)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Check if dismissed recently
    const dismissed = localStorage.getItem("pwa-prompt-dismissed");
    if (dismissed && Date.now() - Number(dismissed) < 7 * 24 * 60 * 60 * 1000) return;

    // Detect iOS Safari (no beforeinstallprompt support)
    const ios =
      /iphone|ipad|ipod/i.test(navigator.userAgent) &&
      !window.MSStream &&
      !/crios/i.test(navigator.userAgent); // exclude Chrome on iOS
    setIsIOS(ios);

    if (ios) {
      // Only show on iOS Safari if not already installed
      const isInStandaloneMode = window.navigator.standalone;
      if (!isInStandaloneMode) {
        setTimeout(() => setShowBanner(true), 3000);
      }
      return;
    }

    // Android / Chrome / Edge — listen for install prompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setShowBanner(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => {
      setShowBanner(false);
      setIsInstalled(true);
    });

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("pwa-prompt-dismissed", String(Date.now()));
  };

  if (!showBanner || isInstalled) return null;

  // ── iOS Instructions Banner ────────────────────────────────────
  if (isIOS) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-[9999] p-3 bg-white border-t border-gray-200 shadow-xl">
        <div className="max-w-lg mx-auto">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm mb-0.5">Install Adventure Nepal</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Tap the{" "}
                <span className="inline-flex items-center gap-0.5 font-semibold text-gray-700">
                  Share
                  <svg className="w-3.5 h-3.5 inline" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 5l-1.42 1.42-1.59-1.59V16h-1.98V4.83L9.42 6.42 8 5l4-4 4 4zm4 5v11c0 1.1-.9 2-2 2H6a2 2 0 0 1-2-2V10c0-1.11.89-2 2-2h3v2H6v11h12V10h-3V8h3a2 2 0 0 1 2 2z"/>
                  </svg>
                </span>{" "}
                button, then tap{" "}
                <span className="font-semibold text-gray-700">"Add to Home Screen"</span>
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 shrink-0"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Android / Chrome Install Banner ───────────────────────────
  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9999] max-w-sm mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4">
        <div className="flex items-start gap-3">
          <img
            src="/icon-192.png"
            alt="Adventure Nepal"
            className="w-12 h-12 rounded-xl shrink-0 object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 text-sm leading-tight">Adventure Nepal</p>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
              Install the app for faster access to tours, treks &amp; bookings
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleInstall}
                className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Install
              </button>
              <button
                onClick={handleDismiss}
                className="text-xs text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Not now
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 shrink-0 mt-0.5"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
