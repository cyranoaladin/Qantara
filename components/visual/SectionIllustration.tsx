import { cn } from "@/lib/utils";

export function DataFlowIllustration({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)} aria-hidden="true">
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto opacity-90"
      >
        {/* Background glow */}
        <circle cx="200" cy="150" r="120" fill="url(#flow-grad)" opacity="0.08" />

        {/* Data flow paths */}
        <path
          d="M40 80 C100 80 120 150 200 150"
          stroke="rgba(34,211,238,0.3)"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <path
          d="M40 150 C100 150 120 150 200 150"
          stroke="rgba(214,168,90,0.25)"
          strokeWidth="2"
        />
        <path
          d="M40 220 C100 220 120 150 200 150"
          stroke="rgba(52,211,153,0.25)"
          strokeWidth="2"
          strokeDasharray="6 4"
        />

        <path
          d="M200 150 C280 150 300 80 360 80"
          stroke="rgba(34,211,238,0.3)"
          strokeWidth="2"
        />
        <path
          d="M200 150 C280 150 300 150 360 150"
          stroke="rgba(214,168,90,0.25)"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <path
          d="M200 150 C280 150 300 220 360 220"
          stroke="rgba(139,92,246,0.25)"
          strokeWidth="2"
        />

        {/* Input nodes */}
        <rect
          x="10"
          y="65"
          width="55"
          height="30"
          rx="6"
          fill="rgba(11,18,32,0.9)"
          stroke="rgba(34,211,238,0.3)"
          strokeWidth="1"
        />
        <text
          x="37"
          y="84"
          textAnchor="middle"
          fill="#22d3ee"
          fontSize="8"
          fontWeight="500"
        >
          Données
        </text>

        <rect
          x="10"
          y="135"
          width="55"
          height="30"
          rx="6"
          fill="rgba(11,18,32,0.9)"
          stroke="rgba(214,168,90,0.3)"
          strokeWidth="1"
        />
        <text
          x="37"
          y="154"
          textAnchor="middle"
          fill="#d6a85a"
          fontSize="8"
          fontWeight="500"
        >
          Processus
        </text>

        <rect
          x="10"
          y="205"
          width="55"
          height="30"
          rx="6"
          fill="rgba(11,18,32,0.9)"
          stroke="rgba(52,211,153,0.3)"
          strokeWidth="1"
        />
        <text
          x="37"
          y="224"
          textAnchor="middle"
          fill="#34d399"
          fontSize="8"
          fontWeight="500"
        >
          Équipes
        </text>

        {/* Center hub */}
        <circle
          cx="200"
          cy="150"
          r="30"
          fill="rgba(11,18,32,0.95)"
          stroke="rgba(34,211,238,0.35)"
          strokeWidth="1.5"
        />
        <circle cx="200" cy="150" r="22" fill="rgba(34,211,238,0.08)" />
        <text
          x="200"
          y="146"
          textAnchor="middle"
          fill="#22d3ee"
          fontSize="7"
          fontWeight="600"
        >
          QANTARA
        </text>
        <text
          x="200"
          y="158"
          textAnchor="middle"
          fill="#f8fafc"
          fontSize="8"
          fontWeight="600"
        >
          AI
        </text>

        {/* Output nodes */}
        <rect
          x="335"
          y="65"
          width="55"
          height="30"
          rx="6"
          fill="rgba(11,18,32,0.9)"
          stroke="rgba(34,211,238,0.3)"
          strokeWidth="1"
        />
        <text
          x="362"
          y="84"
          textAnchor="middle"
          fill="#22d3ee"
          fontSize="8"
          fontWeight="500"
        >
          Roadmap
        </text>

        <rect
          x="335"
          y="135"
          width="55"
          height="30"
          rx="6"
          fill="rgba(11,18,32,0.9)"
          stroke="rgba(214,168,90,0.3)"
          strokeWidth="1"
        />
        <text
          x="362"
          y="154"
          textAnchor="middle"
          fill="#d6a85a"
          fontSize="8"
          fontWeight="500"
        >
          Prototype
        </text>

        <rect
          x="335"
          y="205"
          width="55"
          height="30"
          rx="6"
          fill="rgba(11,18,32,0.9)"
          stroke="rgba(139,92,246,0.3)"
          strokeWidth="1"
        />
        <text
          x="362"
          y="224"
          textAnchor="middle"
          fill="#8b5cf6"
          fontSize="8"
          fontWeight="500"
        >
          Mesure
        </text>

        {/* Animated particles */}
        <circle className="motion-safe-smil" r="2.5" fill="#22d3ee" opacity="0.8">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M40 80 C100 80 120 150 200 150"
          />
        </circle>
        <circle className="motion-safe-smil" r="2.5" fill="#d6a85a" opacity="0.8">
          <animateMotion
            dur="3.5s"
            repeatCount="indefinite"
            path="M200 150 C280 150 300 150 360 150"
          />
        </circle>
        <circle className="motion-safe-smil" r="2.5" fill="#34d399" opacity="0.8">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path="M40 220 C100 220 120 150 200 150"
          />
        </circle>
        <circle className="motion-safe-smil" r="2" fill="#8b5cf6" opacity="0.8">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M200 150 C280 150 300 220 360 220"
          />
        </circle>

        <defs>
          <radialGradient id="flow-grad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

export function ShieldIllustration({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)} aria-hidden="true">
      <svg
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto w-40 h-auto"
      >
        <path
          d="M100 20 L170 55 L170 120 C170 165 140 195 100 210 C60 195 30 165 30 120 L30 55 Z"
          fill="rgba(11,18,32,0.8)"
          stroke="rgba(214,168,90,0.35)"
          strokeWidth="1.5"
        />
        <path
          d="M100 40 L150 65 L150 115 C150 150 130 175 100 185 C70 175 50 150 50 115 L50 65 Z"
          fill="rgba(214,168,90,0.06)"
          stroke="rgba(214,168,90,0.15)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {/* Check mark */}
        <path
          d="M75 110 L92 127 L128 88"
          stroke="#d6a85a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Text */}
        <text
          x="100"
          y="155"
          textAnchor="middle"
          fill="#d6a85a"
          fontSize="8"
          fontWeight="600"
          letterSpacing="0.1em"
        >
          GOUVERNANCE
        </text>
        <text x="100" y="168" textAnchor="middle" fill="#94a3b8" fontSize="7">
          Données protégées
        </text>

        {/* Animated glow */}
        <circle
          className="motion-safe-smil"
          cx="100"
          cy="108"
          r="35"
          fill="none"
          stroke="rgba(214,168,90,0.15)"
          strokeWidth="1"
        >
          <animate
            attributeName="r"
            values="35;42;35"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;0.1;0.3"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
