export function DocumentMockup() {
  return (
    <div className="relative mx-auto w-56 animate-float" aria-hidden="true">
      <svg
        viewBox="0 0 200 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full drop-shadow-2xl"
      >
        {/* Page shadow */}
        <rect x="12" y="12" width="176" height="236" rx="8" fill="rgba(0,0,0,0.3)" />
        {/* Page */}
        <rect
          x="6"
          y="6"
          width="176"
          height="236"
          rx="8"
          fill="#0f1729"
          stroke="rgba(34,211,238,0.2)"
          strokeWidth="1"
        />
        {/* Header bar */}
        <rect x="6" y="6" width="176" height="36" rx="8" fill="rgba(34,211,238,0.08)" />
        <rect x="6" y="34" width="176" height="1" fill="rgba(34,211,238,0.15)" />
        {/* Logo area */}
        <circle
          cx="28"
          cy="24"
          r="8"
          fill="rgba(34,211,238,0.15)"
          stroke="rgba(34,211,238,0.3)"
          strokeWidth="1"
        />
        <text
          x="28"
          y="27"
          textAnchor="middle"
          fill="#22d3ee"
          fontSize="7"
          fontWeight="700"
        >
          Q
        </text>
        <text x="56" y="22" fill="#f8fafc" fontSize="7" fontWeight="600">
          Checklist IA
        </text>
        <text x="56" y="31" fill="#94a3b8" fontSize="5">
          Qantara AI
        </text>

        {/* Checklist items */}
        <rect
          x="20"
          y="50"
          width="10"
          height="10"
          rx="2"
          fill="rgba(34,211,238,0.1)"
          stroke="rgba(34,211,238,0.3)"
          strokeWidth="1"
        />
        <path
          d="M23 55 L25 57 L28 53"
          stroke="#22d3ee"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="38" y="52" width="80" height="4" rx="2" fill="rgba(248,250,252,0.12)" />
        <rect x="38" y="58" width="50" height="3" rx="1.5" fill="rgba(148,163,184,0.1)" />

        <rect
          x="20"
          y="72"
          width="10"
          height="10"
          rx="2"
          fill="rgba(34,211,238,0.1)"
          stroke="rgba(34,211,238,0.3)"
          strokeWidth="1"
        />
        <path
          d="M23 77 L25 79 L28 75"
          stroke="#22d3ee"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="38" y="74" width="100" height="4" rx="2" fill="rgba(248,250,252,0.12)" />
        <rect x="38" y="80" width="65" height="3" rx="1.5" fill="rgba(148,163,184,0.1)" />

        <rect
          x="20"
          y="94"
          width="10"
          height="10"
          rx="2"
          fill="rgba(34,211,238,0.1)"
          stroke="rgba(34,211,238,0.3)"
          strokeWidth="1"
        />
        <path
          d="M23 99 L25 101 L28 97"
          stroke="#22d3ee"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="38" y="96" width="70" height="4" rx="2" fill="rgba(248,250,252,0.12)" />
        <rect
          x="38"
          y="102"
          width="90"
          height="3"
          rx="1.5"
          fill="rgba(148,163,184,0.1)"
        />

        <rect
          x="20"
          y="116"
          width="10"
          height="10"
          rx="2"
          fill="rgba(214,168,90,0.1)"
          stroke="rgba(214,168,90,0.3)"
          strokeWidth="1"
        />
        <rect
          x="38"
          y="118"
          width="110"
          height="4"
          rx="2"
          fill="rgba(248,250,252,0.12)"
        />
        <rect
          x="38"
          y="124"
          width="55"
          height="3"
          rx="1.5"
          fill="rgba(148,163,184,0.1)"
        />

        <rect
          x="20"
          y="138"
          width="10"
          height="10"
          rx="2"
          fill="rgba(214,168,90,0.1)"
          stroke="rgba(214,168,90,0.3)"
          strokeWidth="1"
        />
        <rect x="38" y="140" width="85" height="4" rx="2" fill="rgba(248,250,252,0.12)" />
        <rect
          x="38"
          y="146"
          width="70"
          height="3"
          rx="1.5"
          fill="rgba(148,163,184,0.1)"
        />

        {/* Divider */}
        <rect x="20" y="162" width="148" height="1" fill="rgba(148,163,184,0.1)" />

        {/* Matrix section */}
        <text
          x="20"
          y="178"
          fill="#d6a85a"
          fontSize="6"
          fontWeight="600"
          letterSpacing="0.1em"
        >
          MATRICE RISQUES
        </text>
        {/* Mini grid */}
        <rect
          x="20"
          y="184"
          width="30"
          height="18"
          rx="3"
          fill="rgba(52,211,153,0.12)"
          stroke="rgba(52,211,153,0.2)"
          strokeWidth="0.5"
        />
        <rect
          x="54"
          y="184"
          width="30"
          height="18"
          rx="3"
          fill="rgba(34,211,238,0.12)"
          stroke="rgba(34,211,238,0.2)"
          strokeWidth="0.5"
        />
        <rect
          x="88"
          y="184"
          width="30"
          height="18"
          rx="3"
          fill="rgba(251,113,133,0.12)"
          stroke="rgba(251,113,133,0.2)"
          strokeWidth="0.5"
        />
        <text x="35" y="196" textAnchor="middle" fill="#34d399" fontSize="5">
          Faible
        </text>
        <text x="69" y="196" textAnchor="middle" fill="#22d3ee" fontSize="5">
          Moyen
        </text>
        <text x="103" y="196" textAnchor="middle" fill="#fb7185" fontSize="5">
          Élevé
        </text>

        <rect
          x="20"
          y="206"
          width="30"
          height="18"
          rx="3"
          fill="rgba(34,211,238,0.12)"
          stroke="rgba(34,211,238,0.2)"
          strokeWidth="0.5"
        />
        <rect
          x="54"
          y="206"
          width="30"
          height="18"
          rx="3"
          fill="rgba(251,113,133,0.12)"
          stroke="rgba(251,113,133,0.2)"
          strokeWidth="0.5"
        />
        <rect
          x="88"
          y="206"
          width="30"
          height="18"
          rx="3"
          fill="rgba(251,113,133,0.15)"
          stroke="rgba(251,113,133,0.3)"
          strokeWidth="0.5"
        />
        <text x="35" y="218" textAnchor="middle" fill="#22d3ee" fontSize="5">
          Moyen
        </text>
        <text x="69" y="218" textAnchor="middle" fill="#fb7185" fontSize="5">
          Élevé
        </text>
        <text x="103" y="218" textAnchor="middle" fill="#fb7185" fontSize="5">
          Critique
        </text>
      </svg>
    </div>
  );
}
