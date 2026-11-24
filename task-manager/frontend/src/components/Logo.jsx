export default function Logo({ size = "md", showText = true, className = "" }) {
  // Size mappings
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-16 h-16",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon SVG */}
      <div
        className={`${iconSizes[size] || iconSizes.md} relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-blue-900 p-2 shadow-md shadow-indigo-950/20 ring-1 ring-white/20 transition-transform duration-200 group-hover:scale-105 shrink-0`}
      >
        {/* Glow backdrop inside squircle */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-600/30 via-indigo-500/20 to-cyan-400/30 blur-xs pointer-events-none" />

        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10"
        >
          <defs>
            {/* Primary Gradient (Cyan to Electric Blue) */}
            <linearGradient id="tf-grad-1" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="0.5" stopColor="#3B82F6" />
              <stop offset="1" stopColor="#6366F1" />
            </linearGradient>

            {/* Secondary Accent Gradient (Violet to Pink/Coral) */}
            <linearGradient id="tf-grad-2" x1="28" y1="8" x2="10" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A855F7" />
              <stop offset="0.7" stopColor="#6366F1" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>

            {/* Checkmark Flow Glow */}
            <linearGradient id="tf-check" x1="10" y1="18" x2="26" y2="18" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#E0F2FE" />
            </linearGradient>
          </defs>

          {/* Background Layer 1: Stylized Task Card Layer */}
          <rect
            x="6"
            y="7"
            width="20"
            height="18"
            rx="4"
            fill="url(#tf-grad-2)"
            opacity="0.35"
            transform="rotate(-8 16 16)"
          />

          {/* Background Layer 2: Main Active Task Card */}
          <rect
            x="8"
            y="9"
            width="20"
            height="18"
            rx="4"
            fill="url(#tf-grad-1)"
            opacity="0.85"
            transform="rotate(4 18 18)"
          />

          {/* Front Checkmark / Speed Surge Mark */}
          <path
            d="M12 18.5L16.2 22.8L25 13.5"
            stroke="url(#tf-check)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Sparkle node on check apex */}
          <circle cx="25" cy="13.5" r="1.5" fill="#38BDF8" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="leading-none text-left">
          <div className="flex items-center gap-2">
            <span
              className={`font-black ${textSizes[size] || textSizes.md} tracking-tight text-slate-900`}
            >
              Task
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Flow
              </span>
            </span>
            <span className="text-[10px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-200/70">
              v2.0
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium tracking-normal mt-0.5 hidden sm:block">
            Intelligent Task Workspace
          </p>
        </div>
      )}
    </div>
  );
}
