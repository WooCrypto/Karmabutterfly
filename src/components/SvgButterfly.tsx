import { motion } from 'motion/react';

// Create deterministic paths based on seed strings for distinct patterns
const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

interface SvgButterflyProps {
  variant?: 'light' | 'shadow' | 'nexus';
  size?: number;
  glowColor?: string;
  className?: string;
  flappingSpeed?: 'slow' | 'fast' | 'normal' | 'none';
  seed?: string;
  evolved?: boolean;
}

export default function SvgButterfly({
  variant = 'light',
  size = 200,
  glowColor,
  className = '',
  flappingSpeed = 'normal',
  seed = 'karma',
  evolved = false,
}: SvgButterflyProps) {
  // Derive colors and styles from seed or variant
  const getColors = () => {
    if (evolved) {
      const h = hashString(seed);
      const schemes = [
        { primary: '#e879f9', secondary: '#a855f7', tertiary: '#831843', glowColor: 'rgba(232, 121, 249, 0.75)' }, // Celestial Orchid / Fuchsia
        { primary: '#38bdf8', secondary: '#6366f1', tertiary: '#1e1b4b', glowColor: 'rgba(56, 189, 248, 0.75)' }, // Abyssal Frost / Cyan-Blue
        { primary: '#f43f5e', secondary: '#eab308', tertiary: '#881337', glowColor: 'rgba(244, 63, 94, 0.75)' }, // Solar Flare / Crimson Gold
        { primary: '#34d399', secondary: '#059669', tertiary: '#022c22', glowColor: 'rgba(52, 211, 153, 0.75)' }, // Abyssal Jade / Emerald
        { primary: '#fb923c', secondary: '#db2777', tertiary: '#500724', glowColor: 'rgba(251, 146, 60, 0.75)' }, // Cosmic Sunset / Orange Magenta
        { primary: '#f472b6', secondary: '#c084fc', tertiary: '#3b0764', glowColor: 'rgba(244, 114, 182, 0.75)' }, // Twilight Neon / Pink Purple
        { primary: '#a7f3d0', secondary: '#06b6d4', tertiary: '#083344', glowColor: 'rgba(167, 243, 208, 0.75)' }, // Cyber Aurora / Mint Teal
        { primary: '#e9d5ff', secondary: '#d946ef', tertiary: '#2e1065', glowColor: 'rgba(233, 213, 255, 0.75)' }, // Astral Lavender / Purple
        { primary: '#cbd5e1', secondary: '#475569', tertiary: '#0f172a', glowColor: 'rgba(203, 213, 225, 0.75)' }, // Lunar Ash / Monochrome Cosmic
      ];
      const scheme = schemes[h % schemes.length];
      return {
        primary: scheme.primary,
        secondary: scheme.secondary,
        tertiary: scheme.tertiary,
        glow: `drop-shadow(0 0 25px ${scheme.glowColor})`,
      };
    }
    if (glowColor) {
      return {
        primary: glowColor,
        secondary: '#00f2fe',
        glow: `drop-shadow(0 0 15px ${glowColor})`,
      };
    }
    switch (variant) {
      case 'shadow':
        return {
          primary: '#c084fc', // purple-400
          secondary: '#ec4899', // pink-500
          glow: 'drop-shadow(0 0 20px rgba(192, 132, 252, 0.6))',
        };
      case 'nexus':
        return {
          primary: '#10b981', // emerald-500
          secondary: '#8b5cf6', // violet-600
          glow: 'drop-shadow(0 0 25px rgba(16, 185, 129, 0.5)) drop-shadow(0 0 25px rgba(139, 92, 246, 0.5))',
        };
      case 'light':
      default:
        return {
          primary: '#34d399', // emerald-400
          secondary: '#67e8f9', // cyan-300
          glow: 'drop-shadow(0 0 20px rgba(52, 211, 153, 0.6))',
        };
    }
  };

  const colors = getColors();

  const h = hashString(seed);
  const wingRoundness = 5 + (h % 30); // Customize wing curvatures
  const wingWidthFactor = 0.8 + ((h % 5) / 15);
  const detailIndex = h % 3;

  // Flapping speed timing
  const speedSecs = {
    slow: 3,
    normal: 1.5,
    fast: 0.5,
    none: 0,
  }[flappingSpeed];

  // Antennas path
  const antennaL = "M100 70 Q 75 40 65 30 Q 60 25 55 25";
  const antennaR = "M100 70 Q 125 40 135 30 Q 140 25 145 25";

  if (evolved) {
    // Evolved wing shape variables
    const evW1 = 80 - (h % 8);     // 72 to 80
    const evW2 = 55 - (h % 10);    // 45 to 55
    const evW3 = 25 - (h % 12);    // 13 to 25
    const evW4 = 10 - (h % 6);     // 4 to 10
    
    const leftEvolvedWingPath = `M 100 100 L ${evW1} ${50 + (h % 4)} C ${evW2} 25, ${evW3} ${evW4}, 12 40 C 2 ${52 + (h % 5)}, 2 68, 12 ${78 - (h % 4)} L 22 83 C 8 93, 6 108, 22 116 L 28 119 C 18 134, 23 152, 40 160 C ${58 + (h % 5)} 168, 78 150, 100 100 Z`;
    
    const rightEvolvedWingPath = `M 100 100 L ${200 - evW1} ${50 + (h % 4)} C ${200 - evW2} 25, ${200 - evW3} ${evW4}, 188 40 C 198 ${52 + (h % 5)}, 198 68, 188 ${78 - (h % 4)} L 178 83 C 192 93, 194 108, 178 116 L 172 119 C 182 134, 177 152, 160 160 C ${200 - (58 + (h % 5))} 168, 122 150, 100 100 Z`;

    const cellY1 = 75 + (h % 4);
    const cellY2 = 108 - (h % 5);
    const cellX1 = 45 - (h % 6);
    const cellX2 = 42 + (h % 6);

    const leftCell1 = `M 94 92 C 80 ${cellY1}, 65 65, ${cellX1} 60 C 35 68, 42 85, 75 95 Z`;
    const leftCell2 = `M 85 105 C 72 ${cellY2}, 60 115, ${cellX2} 122 C 45 132, 58 138, 78 120 Z`;

    const rightCell1 = `M 106 92 C 120 ${cellY1}, 135 65, ${200 - cellX1} 60 C 165 68, 158 85, 125 95 Z`;
    const rightCell2 = `M 115 105 C 128 ${cellY2}, 140 115, ${200 - cellX2} 122 C 155 132, 142 138, 122 120 Z`;

    return (
      <div
        className={`relative select-none flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        {/* Soft backdrop glow customized to the butterfly's primary color */}
        <div
          className="absolute inset-4 rounded-full bg-radial opacity-30 blur-2xl transition-all duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${colors.primary} 0%, rgba(124, 58, 237, 0.15) 60%, transparent 100%)`
          }}
        />

        <svg
          viewBox="0 0 200 200"
          className="w-full h-full overflow-visible"
          style={{ filter: colors.glow }}
        >
          <defs>
            <linearGradient id={`evolvedWingGrad-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.tertiary || "#831843"} /> {/* rich tertiary */}
              <stop offset="35%" stopColor={colors.secondary} /> {/* secondary */}
              <stop offset="70%" stopColor={colors.primary} /> {/* primary */}
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0.85} /> {/* white shine */}
            </linearGradient>

            <linearGradient id={`wingGlowCell-${seed}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.9} />
              <stop offset="50%" stopColor={colors.primary} stopOpacity={0.4} />
              <stop offset="100%" stopColor={colors.secondary} stopOpacity={0.05} />
            </linearGradient>

            <radialGradient id={`evolvedBodyGrad-${seed}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={colors.secondary} stopOpacity={0.5} />
              <stop offset="70%" stopColor="#091325" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
          </defs>

          {/* Radar scope circular grid - rotated deterministically */}
          <g opacity="0.25" stroke={colors.primary} strokeWidth="0.5" fill="none" transform={`rotate(${(h % 8) * 45}, 100, 100)`}>
            <circle cx="100" cy="100" r="75" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="55" />
            <circle cx="100" cy="100" r="35" strokeDasharray="1.5 1.5" />
            <line x1="100" y1="10" x2="100" y2="190" strokeWidth="0.25" />
            <line x1="10" y1="100" x2="190" y2="100" strokeWidth="0.25" />
          </g>

          {/* Outer glowing dust cells */}
          <g className="animate-pulse">
            <circle cx={40 + (h % 10)} cy={45 + (h % 10)} r="1.5" fill={colors.primary} opacity="0.6" />
            <circle cx={160 - (h % 10)} cy={45 + (h % 10)} r="1.5" fill={colors.primary} opacity="0.6" />
            <circle cx={30 + (h % 12)} cy={110 + (h % 15)} r="1" fill={colors.secondary} opacity="0.5" />
            <circle cx={170 - (h % 12)} cy={110 + (h % 15)} r="1" fill={colors.secondary} opacity="0.5" />
            <circle cx="20" cy="80" r="2.2" fill={colors.primary} opacity="0.45" className="animate-ping" style={{ animationDelay: '0.4s' }} />
            <circle cx="180" cy="80" r="2.2" fill={colors.primary} opacity="0.45" className="animate-ping" style={{ animationDelay: '0.8s' }} />
          </g>

          {/* Curving dragon horns with procedural skew */}
          <g stroke={colors.primary} strokeWidth="1" fill="#030712" opacity="0.95">
            {/* left horn */}
            <path d={`M 96 55 C 93 42, ${85 - (h % 4)} 30, ${78 - (h % 4)} 24 C 84 34, 91 44, 95 49 Z`} fill={`url(#evolvedBodyGrad-${seed})`} />
            <path d={`M 93 40 C 90 35, ${84 - (h % 4)} 28, ${80 - (h % 4)} 25 C 84 30, 88 35, 91 38 Z`} fill={colors.primary} opacity="0.45" />
            {/* right horn */}
            <path d={`M 104 55 C 107 42, ${115 + (h % 4)} 30, ${122 + (h % 4)} 24 C 116 34, 109 44, 105 49 Z`} fill={`url(#evolvedBodyGrad-${seed})`} />
            <path d={`M 107 40 C 110 35, ${116 + (h % 4)} 28, ${120 + (h % 4)} 25 C 116 30, 112 35, 109 38 Z`} fill={colors.primary} opacity="0.45" />
          </g>

          {/* Left Wing Group (Spiky edge nodes) */}
          {flappingSpeed !== 'none' ? (
            <motion.g
              animate={{
                scaleX: [1, 0.18, 1],
                skewY: [0, -3.5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: speedSecs,
                ease: 'easeInOut',
              }}
              style={{ originX: '100px', originY: '100px' }}
            >
              {/* Outer spiky shape (Left) */}
              <path
                d={leftEvolvedWingPath}
                fill={`url(#evolvedWingGrad-${seed})`}
                stroke={colors.primary}
                strokeWidth="1.25"
                opacity="0.95"
              />
              {/* Glowing wing cell nodes */}
              <path
                d={leftCell1}
                fill={`url(#wingGlowCell-${seed})`}
                stroke={colors.primary}
                strokeWidth="1"
                opacity="0.75"
              />
              <path
                d={leftCell2}
                fill={`url(#wingGlowCell-${seed})`}
                stroke={colors.secondary}
                strokeWidth="0.75"
                opacity="0.6"
              />

              {/* Hand-drawn spiky ridges */}
              <path d={`M 80 50 L ${63 - (h % 4)} ${20 + (h % 3)} L 58 35`} fill="none" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" />
              <path d={`M 58 40 L ${38 - (h % 3)} ${10 + (h % 4)} L 35 22`} fill="none" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" />
              <path d={`M 42 105 L ${12 - (h % 3)} ${95 + (h % 3)} L 22 102`} fill="none" stroke={colors.primary} strokeWidth="1.25" strokeLinecap="round" />
              <path d={`M 52 125 L ${15 - (h % 4)} ${135 + (h % 3)} L 25 140`} fill="none" stroke={colors.primary} strokeWidth="1.25" strokeLinecap="round" />
            </motion.g>
          ) : (
            <g>
              <path
                d={leftEvolvedWingPath}
                fill={`url(#evolvedWingGrad-${seed})`}
                stroke={colors.primary}
                strokeWidth="1.25"
                opacity="0.95"
              />
              <path
                d={leftCell1}
                fill={`url(#wingGlowCell-${seed})`}
                stroke={colors.primary}
                strokeWidth="1"
                opacity="0.7"
              />
            </g>
          )}

          {/* Right Wing Group (Spiky edge nodes) */}
          {flappingSpeed !== 'none' ? (
            <motion.g
              animate={{
                scaleX: [1, 0.18, 1],
                skewY: [0, 3.5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: speedSecs,
                ease: 'easeInOut',
              }}
              style={{ originX: '100px', originY: '100px' }}
            >
              {/* Outer spiky shape (Right) */}
              <path
                d={rightEvolvedWingPath}
                fill={`url(#evolvedWingGrad-${seed})`}
                stroke={colors.primary}
                strokeWidth="1.25"
                opacity="0.95"
              />
              {/* Glowing wing cell nodes */}
              <path
                d={rightCell1}
                fill={`url(#wingGlowCell-${seed})`}
                stroke={colors.primary}
                strokeWidth="1"
                opacity="0.75"
              />
              <path
                d={rightCell2}
                fill={`url(#wingGlowCell-${seed})`}
                stroke={colors.secondary}
                strokeWidth="0.75"
                opacity="0.6"
              />

              {/* Hand-drawn spiky ridges */}
              <path d={`M 120 50 L ${137 + (h % 4)} ${20 + (h % 3)} L 142 35`} fill="none" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" />
              <path d={`M 142 40 L ${162 + (h % 3)} ${10 + (h % 4)} L 165 22`} fill="none" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" />
              <path d={`M 158 105 L ${188 + (h % 3)} ${95 + (h % 3)} L 178 102`} fill="none" stroke={colors.primary} strokeWidth="1.25" strokeLinecap="round" />
              <path d={`M 148 125 L ${185 + (h % 4)} ${135 + (h % 3)} L 175 140`} fill="none" stroke={colors.primary} strokeWidth="1.25" strokeLinecap="round" />
            </motion.g>
          ) : (
            <g>
              <path
                d={rightEvolvedWingPath}
                fill={`url(#evolvedWingGrad-${seed})`}
                stroke={colors.primary}
                strokeWidth="1.25"
                opacity="0.95"
              />
              <path
                d={rightCell1}
                fill={`url(#wingGlowCell-${seed})`}
                stroke={colors.primary}
                strokeWidth="1"
                opacity="0.7"
              />
            </g>
          )}

          {/* Reptilian Segmented Tail with Scorpion Hook */}
          <g id="evolved-tail">
            {/* Primary body spine */}
            <rect x="94" y="65" width="12" height="42" rx="4" fill={`url(#evolvedBodyGrad-${seed})`} stroke={colors.primary} strokeWidth="1.5" />
            
            {/* Segmented node-scaled curving chain */}
            <path
              d="M 100 105 Q 100 130 96 150 Q 92 165 83 175 C 77 180, 84 186, 92 181 C 102 173, 106 155, 104 135 Q 102 115 100 105 Z"
              fill={`url(#evolvedBodyGrad-${seed})`}
              stroke={colors.primary}
              strokeWidth="1.25"
            />
            {/* segmented node ribbing */}
            <line x1="97" y1="114" x2="103" y2="114" stroke={colors.primary} strokeWidth="1.5" />
            <line x1="96" y1="124" x2="102" y2="123" stroke={colors.primary} strokeWidth="1.5" />
            <line x1="95" y1="134" x2="101" y2="132" stroke={colors.primary} strokeWidth="1.5" />
            <line x1="93" y1="144" x2="99" y2="141" stroke={colors.primary} strokeWidth="1.5" />
            <line x1="90" y1="154" x2="96" y2="150" stroke={colors.primary} strokeWidth="1.5" />
            <line x1="86" y1="164" x2="92" y2="159" stroke={colors.primary} strokeWidth="1.5" />
            
            {/* scorpion barb */}
            <path d="M 85 178 L 78 185 L 83 173 Z" fill={colors.primary} />
          </g>

          {/* Glowing chest crystal node - matching the primary glow color */}
          <g transform="translate(100, 75) scale(0.9) translate(-10, -10)">
            <path
              d="M 10 18 C 10 18, 2 12, 2 6 C 2 2.5, 4.5 0, 7.5 0 C 9.5 0, 10.5 1.5, 11 2 C 11.5 1.5, 12.5 0, 14.5 0 C 17.5 0, 20 2.5, 20 6 C 20 12, 12 18, 12 18 Z"
              fill={colors.primary}
              className="animate-pulse"
            />
            <path
              d="M 10 16 C 10 16, 4 11, 4 6 Q 4 4 6 4 Q 8 4 9 5 L 10 6 L 11 5 Q 12 4 14 4 Q 16 4 16 6 C 16 11, 10 16, 10 16 Z"
              fill="#ffffff"
              opacity="0.9"
            />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative select-none flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Background glow canvas aura */}
      <div
        className="absolute inset-0 rounded-full bg-radial opacity-15 blur-2xl transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`
        }}
      />

      <svg
        viewBox="0 0 200 200"
        className="w-full h-full overflow-visible"
        style={{ filter: colors.glow }}
      >
        <defs>
          {/* Gradient for wings */}
          <linearGradient id={`wingGrad-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="50%" stopColor={colors.secondary} />
            <stop offset="100%" stopColor={colors.primary} stopOpacity={0.4} />
          </linearGradient>

          {/* Glowing pattern details */}
          <linearGradient id={`wingAccent-${seed}`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.8} />
            <stop offset="100%" stopColor={colors.primary} stopOpacity={0.1} />
          </linearGradient>

          {/* Soft inner shadowing */}
          <radialGradient id="bodyGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="70%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
        </defs>

        {/* Outer glowing dust particles */}
        <g className="animate-pulse">
          <circle cx="100" cy="100" r="1.5" fill={colors.secondary} opacity="0.6" className="animate-ping" style={{ animationDelay: '0.2s' }} />
          <circle cx="50" cy="60" r="1" fill={colors.primary} opacity="0.5" />
          <circle cx="150" cy="60" r="1.2" fill={colors.secondary} opacity="0.4" />
          <circle cx="70" cy="150" r="1.5" fill={colors.primary} opacity="0.6" />
          <circle cx="130" cy="155" r="1" fill={colors.secondary} opacity="0.5" />
        </g>

        {/* Antennas */}
        <path
          d={antennaL}
          fill="none"
          stroke={colors.primary}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.8"
        />
        <circle cx="55" cy="25" r="2.5" fill={colors.secondary} />
        <path
          d={antennaR}
          fill="none"
          stroke={colors.primary}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.8"
        />
        <circle cx="145" cy="25" r="2.5" fill={colors.secondary} />

        {/* Left Wing Group */}
        {flappingSpeed !== 'none' ? (
          <motion.g
            animate={{
              scaleX: [1, 0.1, 1],
              skewY: [0, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: speedSecs,
              ease: 'easeInOut',
            }}
            style={{ originX: '100px', originY: '100px' }}
          >
            {/* Top West Wing */}
            <path
              d={`M100 100 C 70 ${40 - wingRoundness / 2}, 30 ${30 + wingRoundness}, 10 ${60 + wingRoundness / 2} C -3 ${78 * wingWidthFactor}, 25 110, 100 100 Z`}
              fill={`url(#wingGrad-${seed})`}
              stroke={colors.primary}
              strokeWidth="0.75"
              opacity="0.9"
            />
            {/* Internal Wing Circuits */}
            {detailIndex === 0 && (
              <path
                d="M100 100 Q 55 70 30 75 Q 45 85 100 100"
                fill="none"
                stroke={`url(#wingAccent-${seed})`}
                strokeWidth="1.5"
                opacity="0.6"
              />
            )}
            {detailIndex === 1 && (
              <g opacity="0.6">
                <circle cx="60" cy="70" r="6" fill="none" stroke={colors.secondary} strokeWidth="1" />
                <line x1="100" y1="100" x2="60" y2="70" stroke={colors.secondary} strokeWidth="0.5" />
              </g>
            )}
            {detailIndex === 2 && (
              <path
                d="M100 100 C 80 80, 60 85, 45 70 C 60 90, 80 95, 100 100"
                fill={`url(#wingAccent-${seed})`}
                opacity="0.5"
              />
            )}

            {/* Bottom West Wing */}
            <path
              d={`M100 100 C 75 110, 40 135, 25 155 C 10 170, 35 180, 65 160 C 85 145, 95 125, 100 100 Z`}
              fill={`url(#wingGrad-${seed})`}
              stroke={colors.primary}
              strokeWidth="0.5"
              opacity="0.8"
            />
          </motion.g>
        ) : (
          <g>
            <path
              d={`M100 100 C 70 ${40 - wingRoundness / 2}, 30 ${30 + wingRoundness}, 10 ${60 + wingRoundness / 2} C -3 ${78 * wingWidthFactor}, 25 110, 100 100 Z`}
              fill={`url(#wingGrad-${seed})`}
              stroke={colors.primary}
              strokeWidth="0.75"
              opacity="0.9"
            />
            <path
              d={`M100 100 C 75 110, 40 135, 25 155 C 10 170, 35 180, 65 160 C 85 145, 95 125, 100 100 Z`}
              fill={`url(#wingGrad-${seed})`}
              stroke={colors.primary}
              strokeWidth="0.5"
              opacity="0.8"
            />
          </g>
        )}

        {/* Right Wing Group */}
        {flappingSpeed !== 'none' ? (
          <motion.g
            animate={{
              scaleX: [1, 0.1, 1],
              skewY: [0, 5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: speedSecs,
              ease: 'easeInOut',
            }}
            style={{ originX: '100px', originY: '100px' }}
          >
            {/* Top East Wing */}
            <path
              d={`M100 100 C 130 ${40 - wingRoundness / 2}, 170 ${30 + wingRoundness}, 190 ${60 + wingRoundness / 2} C 203 ${78 * wingWidthFactor}, 175 110, 100 100 Z`}
              fill={`url(#wingGrad-${seed})`}
              stroke={colors.primary}
              strokeWidth="0.75"
              opacity="0.9"
            />
            {/* Internal Wing Circuits */}
            {detailIndex === 0 && (
              <path
                d="M100 100 Q 145 70 170 75 Q 155 85 100 100"
                fill="none"
                stroke={`url(#wingAccent-${seed})`}
                strokeWidth="1.5"
                opacity="0.6"
              />
            )}
            {detailIndex === 1 && (
              <g opacity="0.6">
                <circle cx="140" cy="70" r="6" fill="none" stroke={colors.secondary} strokeWidth="1" />
                <line x1="100" y1="100" x2="140" y2="70" stroke={colors.secondary} strokeWidth="0.5" />
              </g>
            )}
            {detailIndex === 2 && (
              <path
                d="M100 100 C 120 80, 140 85, 155 70 C 140 90, 120 95, 100 100"
                fill={`url(#wingAccent-${seed})`}
                opacity="0.5"
              />
            )}

            {/* Bottom East Wing */}
            <path
              d={`M100 100 C 125 110, 160 135, 175 155 C 190 170, 165 180, 135 160 C 115 145, 105 125, 100 100 Z`}
              fill={`url(#wingGrad-${seed})`}
              stroke={colors.primary}
              strokeWidth="0.5"
              opacity="0.8"
            />
          </motion.g>
        ) : (
          <g>
            <path
              d={`M100 100 C 130 ${40 - wingRoundness / 2}, 170 ${30 + wingRoundness}, 190 ${60 + wingRoundness / 2} C 203 ${78 * wingWidthFactor}, 175 110, 100 100 Z`}
              fill={`url(#wingGrad-${seed})`}
              stroke={colors.primary}
              strokeWidth="0.75"
              opacity="0.9"
            />
            <path
              d={`M100 100 C 125 110, 160 135, 175 155 C 190 170, 165 180, 135 160 C 115 145, 105 125, 100 100 Z`}
              fill={`url(#wingGrad-${seed})`}
              stroke={colors.primary}
              strokeWidth="0.5"
              opacity="0.8"
            />
          </g>
        )}

        {/* Slim Center Body (Thorax & Abdomen) */}
        <g id="body">
          {/* Subtle outline glowing capsule */}
          <rect
            x="94"
            y="65"
            width="12"
            height="85"
            rx="6"
            fill="url(#bodyGrad)"
            stroke={colors.secondary}
            strokeWidth="1.5"
          />
          {/* Inner core capsule */}
          <rect
            x="97"
            y="70"
            width="6"
            height="75"
            rx="3"
            fill={colors.primary}
            opacity="0.8"
            className="animate-pulse"
          />
          {/* Head */}
          <circle cx="100" cy="62" r="5" fill="#1e293b" stroke={colors.primary} strokeWidth="1" />
          <circle cx="100" cy="62" r="2.5" fill={colors.secondary} className="animate-pulse" />
        </g>
      </svg>
    </div>
  );
}
