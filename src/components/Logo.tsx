type LogoProps = {
  variant?: "default" | "reversed";
  className?: string;
};

export function Logo({ variant = "default", className }: LogoProps) {
  const reversed = variant === "reversed";
  const capsuleLeft = reversed ? "#F5F7F1" : "#C99A3E";
  const capsuleRight = reversed ? "#F5F7F1" : "#103B3A";
  const capsuleStroke = reversed ? "#103B3A" : "#F5F7F1";
  const leaf = reversed ? "#F5F7F1" : "#1B5654";
  const textClass = reversed ? "text-paper" : "text-forest";

  return (
    <span className={`flex items-center gap-2 ${className ?? ""}`}>
      <svg viewBox="0 0 140 120" className="h-10 w-auto" aria-hidden="true">
        <defs>
          <clipPath id={`leftHalf2-${variant}`}>
            <rect x="-35" y="-13" width="35" height="26" />
          </clipPath>
          <clipPath id={`rightHalf2-${variant}`}>
            <rect x="0" y="-13" width="35" height="26" />
          </clipPath>
        </defs>
        <g transform="translate(60,64) rotate(-35)">
          <rect x="-35" y="-13" width="70" height="26" rx="13" fill={capsuleLeft} clipPath={`url(#leftHalf2-${variant})`} />
          <rect x="-35" y="-13" width="70" height="26" rx="13" fill={capsuleRight} clipPath={`url(#rightHalf2-${variant})`} />
          <rect x="-35" y="-13" width="70" height="26" rx="13" fill="none" stroke={capsuleStroke} strokeWidth="1.5" />
          <line x1="0" y1="-13" x2="0" y2="13" stroke={capsuleStroke} strokeWidth="2" />
        </g>
        <path d="M80,42 C92,24 112,22 120,32 C114,46 94,50 80,42 Z" fill={leaf} />
      </svg>
      <span className={`font-display text-lg font-semibold ${textClass}`}>
        Buona<span className="text-gold">Pharma</span>
      </span>
    </span>
  );
}
