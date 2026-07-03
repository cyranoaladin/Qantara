export function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <svg
        viewBox="0 0 480 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-hidden="true"
      >
        {/* Background circles */}
        <circle cx="240" cy="210" r="160" fill="url(#hero-grad-1)" opacity="0.12" />
        <circle cx="240" cy="210" r="110" fill="url(#hero-grad-2)" opacity="0.08" />
        <circle
          cx="240"
          cy="210"
          r="160"
          stroke="rgba(34,211,238,0.15)"
          strokeWidth="1"
          strokeDasharray="6 6"
          fill="none"
        />
        <circle
          cx="240"
          cy="210"
          r="110"
          stroke="rgba(214,168,90,0.12)"
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
        />

        {/* Connection lines */}
        <line x1="240" y1="50" x2="240" y2="100" stroke="rgba(34,211,238,0.3)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="240" y1="320" x2="240" y2="370" stroke="rgba(34,211,238,0.3)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="80" y1="210" x2="130" y2="210" stroke="rgba(214,168,90,0.3)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="350" y1="210" x2="400" y2="210" stroke="rgba(214,168,90,0.3)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Diagonal connections */}
        <line x1="140" y1="110" x2="180" y2="145" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />
        <line x1="340" y1="110" x2="300" y2="145" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />
        <line x1="140" y1="310" x2="180" y2="275" stroke="rgba(214,168,90,0.2)" strokeWidth="1" />
        <line x1="340" y1="310" x2="300" y2="275" stroke="rgba(214,168,90,0.2)" strokeWidth="1" />

        {/* Center hub */}
        <rect x="190" y="175" width="100" height="70" rx="12" fill="rgba(11,18,32,0.9)" stroke="rgba(34,211,238,0.35)" strokeWidth="1.5" />
        <text x="240" y="200" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="600" letterSpacing="0.12em">QANTARA AI</text>
        <text x="240" y="218" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">IA Pilotée</text>
        <text x="240" y="234" textAnchor="middle" fill="#94a3b8" fontSize="8">Décider · Former · Déployer</text>

        {/* Top node - Audit */}
        <rect x="200" y="30" width="80" height="50" rx="10" fill="rgba(11,18,32,0.85)" stroke="rgba(34,211,238,0.25)" strokeWidth="1" />
        <circle cx="220" cy="48" r="8" fill="rgba(34,211,238,0.15)" stroke="rgba(34,211,238,0.4)" strokeWidth="1" />
        <text x="220" y="52" textAnchor="middle" fill="#22d3ee" fontSize="8" fontWeight="700">1</text>
        <text x="252" y="52" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600">Audit</text>
        <text x="240" y="68" textAnchor="middle" fill="#94a3b8" fontSize="7">Diagnostic 360°</text>

        {/* Bottom node - Mesure */}
        <rect x="200" y="340" width="80" height="50" rx="10" fill="rgba(11,18,32,0.85)" stroke="rgba(214,168,90,0.25)" strokeWidth="1" />
        <circle cx="220" cy="358" r="8" fill="rgba(214,168,90,0.15)" stroke="rgba(214,168,90,0.4)" strokeWidth="1" />
        <text x="220" y="362" textAnchor="middle" fill="#d6a85a" fontSize="8" fontWeight="700">5</text>
        <text x="252" y="362" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600">Mesure</text>
        <text x="240" y="378" textAnchor="middle" fill="#94a3b8" fontSize="7">ROI & adoption</text>

        {/* Left node - Formation */}
        <rect x="50" y="185" width="80" height="50" rx="10" fill="rgba(11,18,32,0.85)" stroke="rgba(34,211,238,0.25)" strokeWidth="1" />
        <circle cx="70" cy="203" r="8" fill="rgba(34,211,238,0.15)" stroke="rgba(34,211,238,0.4)" strokeWidth="1" />
        <text x="70" y="207" textAnchor="middle" fill="#22d3ee" fontSize="8" fontWeight="700">3</text>
        <text x="107" y="207" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600">Former</text>
        <text x="90" y="223" textAnchor="middle" fill="#94a3b8" fontSize="7">Équipes & outils</text>

        {/* Right node - Déployer */}
        <rect x="350" y="185" width="80" height="50" rx="10" fill="rgba(11,18,32,0.85)" stroke="rgba(214,168,90,0.25)" strokeWidth="1" />
        <circle cx="370" cy="203" r="8" fill="rgba(214,168,90,0.15)" stroke="rgba(214,168,90,0.4)" strokeWidth="1" />
        <text x="370" y="207" textAnchor="middle" fill="#d6a85a" fontSize="8" fontWeight="700">4</text>
        <text x="405" y="207" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600">Déployer</text>
        <text x="390" y="223" textAnchor="middle" fill="#94a3b8" fontSize="7">RAG · Agents · Auto</text>

        {/* Top-left - Prioriser */}
        <rect x="95" y="85" width="80" height="50" rx="10" fill="rgba(11,18,32,0.85)" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />
        <circle cx="115" cy="103" r="8" fill="rgba(34,211,238,0.15)" stroke="rgba(34,211,238,0.4)" strokeWidth="1" />
        <text x="115" y="107" textAnchor="middle" fill="#22d3ee" fontSize="8" fontWeight="700">2</text>
        <text x="150" y="107" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600">Prioriser</text>
        <text x="135" y="123" textAnchor="middle" fill="#94a3b8" fontSize="7">Impact / effort</text>

        {/* Top-right - Gouverner */}
        <rect x="305" y="85" width="80" height="50" rx="10" fill="rgba(11,18,32,0.85)" stroke="rgba(214,168,90,0.2)" strokeWidth="1" />
        <circle cx="325" cy="103" r="8" fill="rgba(214,168,90,0.15)" stroke="rgba(214,168,90,0.4)" strokeWidth="1" />
        <text x="325" y="107" textAnchor="middle" fill="#d6a85a" fontSize="8" fontWeight="700">G</text>
        <text x="358" y="107" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600">Gouverner</text>
        <text x="345" y="123" textAnchor="middle" fill="#94a3b8" fontSize="7">Charte & données</text>

        {/* Bottom-left - Academy */}
        <rect x="95" y="285" width="80" height="50" rx="10" fill="rgba(11,18,32,0.85)" stroke="rgba(34,211,238,0.2)" strokeWidth="1" />
        <circle cx="115" cy="303" r="8" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.4)" strokeWidth="1" />
        <text x="115" y="307" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="700">A</text>
        <text x="150" y="307" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600">Academy</text>
        <text x="135" y="323" textAnchor="middle" fill="#94a3b8" fontSize="7">Parcours & ateliers</text>

        {/* Bottom-right - Studio */}
        <rect x="305" y="285" width="80" height="50" rx="10" fill="rgba(11,18,32,0.85)" stroke="rgba(214,168,90,0.2)" strokeWidth="1" />
        <circle cx="325" cy="303" r="8" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.4)" strokeWidth="1" />
        <text x="325" y="307" textAnchor="middle" fill="#8b5cf6" fontSize="8" fontWeight="700">S</text>
        <text x="358" y="307" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600">Studio</text>
        <text x="345" y="323" textAnchor="middle" fill="#94a3b8" fontSize="7">Prototypes & API</text>

        {/* Animated dots on connection lines */}
        <circle r="3" fill="#22d3ee" opacity="0.7">
          <animateMotion dur="4s" repeatCount="indefinite" path="M240 100 L240 175" />
        </circle>
        <circle r="3" fill="#d6a85a" opacity="0.7">
          <animateMotion dur="4s" repeatCount="indefinite" path="M350 210 L290 210" />
        </circle>
        <circle r="3" fill="#22d3ee" opacity="0.7">
          <animateMotion dur="5s" repeatCount="indefinite" path="M130 210 L190 210" />
        </circle>
        <circle r="3" fill="#d6a85a" opacity="0.7">
          <animateMotion dur="4s" repeatCount="indefinite" path="M240 245 L240 340" />
        </circle>

        {/* Gradients */}
        <defs>
          <radialGradient id="hero-grad-1" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="hero-grad-2" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#d6a85a" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
