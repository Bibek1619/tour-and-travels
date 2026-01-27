import { Outlet } from "react-router-dom";
import { Mountain, Compass } from "lucide-react";

export default function Auth() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-5 bg-background">

      {/* LEFT — Image Section (60%) */}
      <div className="hidden lg:col-span-3 lg:flex relative overflow-hidden">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop"
          alt="Adventure Nepal"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-black/40 to-green-800/60" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <Mountain className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Adventure Nepal
              </h1>
              <p className="text-xs text-white/80">
                Explore • Travel • Discover
              </p>
            </div>
          </div>

          {/* Center Text */}
          <div className="max-w-lg space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
              <Compass className="w-4 h-4" />
              <span className="text-sm font-medium">
                Trusted Nepal Travel Partner
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Experience Nepal like never before
            </h2>

            <p className="text-lg text-white/90">
              Book tours, hotels, vehicles, and adventures with a trusted
              travel company having 26+ years of experience.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              {["Trekking", "Tours", "Hotels", "Vehicles"].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-sm text-white/70">
            © 2026 Adventure Nepal. All rights reserved.
          </p>
        </div>
      </div>

  {/* RIGHT — Form Section (40%) */}
<div className="col-span-1 lg:col-span-2 relative flex items-center justify-center p-6 sm:p-8 lg:p-12">

  {/* Mobile Background Image */}
  <div className="absolute inset-0 lg:hidden">
    <img
      src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop"
      alt="Adventure Nepal"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/50" />
  </div>

  {/* Content */}
  <div className="relative z-10 w-full max-w-md bg-background/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-lg">

    {/* Mobile Logo */}
    <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
      <div className="p-2 rounded-xl bg-white text-black">
        <Mountain className="w-6 h-6" />
      </div>
      <h1 className="text-2xl font-bold text-black">
        Adventure Nepal
      </h1>
    </div>

    {/* Login / Register */}
    <Outlet />

    {/* Mobile Footer */}
    <div className="mt-8 text-center space-y-4 text-sm text-muted-foreground">
      <div className="flex justify-center gap-6">
        <a href="#" className="hover:text-accent">Privacy</a>
        <span>•</span>
        <a href="#" className="hover:text-accent">Terms</a>
        <span>•</span>
        <a href="#" className="hover:text-accent">Help</a>
      </div>
      <p className="lg:hidden text-xs">
        © 2026 Adventure Nepal
      </p>
    </div>
  </div>
</div>

    </div>
  );
}
