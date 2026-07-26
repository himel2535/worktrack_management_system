"use client";

interface GaugeChartProps {
  score: number;
  maxScore?: number;
  size?: number;
}

export function GaugeChart({ score, maxScore = 100, size = 160 }: GaugeChartProps) {
  const percentage = (score / maxScore) * 100;
  const radius = size / 2 - 12;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return "url(#gaugeEmeraldGradient)";
    if (score >= 60) return "url(#gaugeAmberGradient)";
    return "url(#gaugeRoseGradient)";
  };

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size / 2 + 20 }}>
      <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
        <defs>
          <linearGradient id="gaugeEmeraldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="gaugeAmberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="gaugeRoseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#881337" />
            <stop offset="50%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#FB7185" />
          </linearGradient>
        </defs>
        <path
          d={`M 12 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 12} ${size / 2}`}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d={`M 12 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 12} ${size / 2}`}
          fill="none"
          stroke={getColor()}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-700"
          style={{ filter: "drop-shadow(0 0 8px rgba(5, 150, 105, 0.5))" }}
        />
      </svg>
      <div className="absolute bottom-0 flex flex-col items-center">
        <span className="text-3xl font-bold text-white">{score}</span>
        <span className="text-xs text-white/50">/ {maxScore}</span>
      </div>
    </div>
  );
}
