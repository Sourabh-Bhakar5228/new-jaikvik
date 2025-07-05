import React, { useState, useEffect } from "react";

interface DottedNeonProgressProps {
  duration?: number;
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
}

const DottedNeonProgress: React.FC<DottedNeonProgressProps> = ({
  duration = 10000,
  size = 320,
  strokeWidth = 10,
  showPercentage = true,
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [rotationOffset, setRotationOffset] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (currentProgress / 100) * circumference;

  // Style configuration - exactly as original
  const styleConfig = {
    dashArray: "8,4,2,4,8,15",
    glowColor: "#fca5a5",
    animation: "animate-pulse",
    name: "Jaikvik Technology India Private Limited",
  };

  useEffect(() => {
    // Auto-start the animation exactly as original
    setIsAnimating(true);
    setCurrentProgress(0);

    const interval = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnimating(false);
          return 100;
        }
        return prev + 100 / (duration / 60);
      });
    }, 60);

    return () => clearInterval(interval);
  }, [duration]);

  // Continuous rotation animation - unchanged
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotationOffset((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(rotationInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background grid - unchanged */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(239, 68, 68, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
            animation: "backgroundShift 20s linear infinite",
          }}
        />
      </div>

      {/* Dynamic background glow - unchanged */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at center, ${styleConfig.glowColor}15 0%, ${styleConfig.glowColor}08 30%, transparent 70%)`,
          transform: `rotate(${rotationOffset}deg)`,
        }}
      />

      <div className="relative z-10 text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 mb-2">
          {styleConfig.name.toUpperCase()}
        </h1>
      </div>

      {/* Main Dotted Neon Progress Ring - completely unchanged */}
      <div className="relative">
        <div className="relative">
          {/* Outer particle ring - unchanged */}
          <svg
            width={size + 40}
            height={size + 40}
            className="absolute -top-5 -left-5 animate-spin"
            style={{ animationDuration: "30s" }}
          >
            {[...Array(24)].map((_, i) => {
              const angle = i * 15 * (Math.PI / 180);
              const x = (size + 40) / 2 + (radius + 25) * Math.cos(angle);
              const y = (size + 40) / 2 + (radius + 25) * Math.sin(angle);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="2"
                  fill={styleConfig.glowColor}
                  className="opacity-40 animate-pulse"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    filter: `drop-shadow(0 0 4px ${styleConfig.glowColor})`,
                  }}
                />
              );
            })}
          </svg>

          {/* Main progress SVG - unchanged */}
          <svg
            width={size}
            height={size}
            className="transform -rotate-90 relative z-10"
            style={{
              filter: `drop-shadow(0 0 20px ${styleConfig.glowColor}) drop-shadow(0 0 40px ${styleConfig.glowColor}80) drop-shadow(0 0 60px ${styleConfig.glowColor}40)`,
            }}
          >
            {/* Background dotted track - unchanged */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="rgba(55, 65, 81, 0.6)"
              strokeWidth={strokeWidth + 2}
              fill="transparent"
              strokeDasharray={styleConfig.dashArray}
              className="opacity-30"
            />

            {/* Inner shadow track - unchanged */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius - 5}
              stroke="rgba(0, 0, 0, 0.8)"
              strokeWidth={strokeWidth - 4}
              fill="transparent"
              strokeDasharray="2,4"
              className="opacity-50"
            />

            {/* Main dotted progress circle - unchanged */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="url(#dottedGradient)"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={styleConfig.dashArray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
            />

            {/* Animated highlight overlay - unchanged */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="url(#highlightGradient)"
              strokeWidth={strokeWidth / 3}
              fill="transparent"
              strokeDasharray={`${
                parseFloat(styleConfig.dashArray.split(",")[0]) * 0.8
              },${parseFloat(styleConfig.dashArray.split(",")[1]) * 1.2}`}
              strokeDashoffset={strokeDashoffset - 10}
              strokeLinecap="round"
              className={`transition-all duration-300 ease-out ${styleConfig.animation}`}
              style={{ animationDuration: "1.5s" }}
            />

            {/* Progress end glow dot - unchanged */}
            <circle
              cx={
                size / 2 +
                radius * Math.cos((currentProgress / 100) * 2 * Math.PI)
              }
              cy={
                size / 2 +
                radius * Math.sin((currentProgress / 100) * 2 * Math.PI)
              }
              r="6"
              fill={styleConfig.glowColor}
              className="animate-pulse"
              style={{
                filter: `drop-shadow(0 0 10px ${styleConfig.glowColor}) drop-shadow(0 0 20px ${styleConfig.glowColor}80)`,
              }}
            />

            {/* Gradient definitions - unchanged */}
            <defs>
              <linearGradient
                id="dottedGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#dc2626">
                  <animate
                    attributeName="stop-color"
                    values="#dc2626;#ef4444;#f87171;#dc2626"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="50%" stopColor="#ef4444">
                  <animate
                    attributeName="stop-color"
                    values="#ef4444;#f87171;#fca5a5;#ef4444"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#f87171">
                  <animate
                    attributeName="stop-color"
                    values="#f87171;#fca5a5;#fed7d7;#f87171"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>

              <radialGradient id="highlightGradient">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
                <stop offset="70%" stopColor="rgba(255, 255, 255, 0.3)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
              </radialGradient>
            </defs>
          </svg>

          {/* Center content with enhanced glow - unchanged */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {showPercentage && (
                <>
                  <div
                    className="text-5xl font-bold text-red-400 mb-2 transition-all duration-300 tabular-nums"
                    style={{
                      textShadow: `0 0 20px ${styleConfig.glowColor}, 0 0 40px ${styleConfig.glowColor}80, 0 0 60px ${styleConfig.glowColor}40`,
                      fontFamily: "monospace",
                    }}
                  >
                    {Math.round(currentProgress)}%
                  </div>
                  <div
                    className="text-red-300 text-sm font-semibold tracking-[0.2em] uppercase"
                    style={{
                      textShadow: `0 0 10px ${styleConfig.glowColor}60`,
                    }}
                  >
                    {isAnimating
                      ? "●●● LOADING ●●●"
                      : currentProgress === 100
                      ? "★ COMPLETE ★"
                      : "○○○ READY ○○○"}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Floating progress indicators - unchanged */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => {
            const angle = i * 45 * (Math.PI / 180);
            const distance = radius + 40;
            const x = size / 2 + distance * Math.cos(angle) - 4;
            const y = size / 2 + distance * Math.sin(angle) - 4;
            const isActive = (currentProgress / 100) * 8 > i;

            return (
              <div
                key={i}
                className={`absolute w-2 h-2 rounded-full transition-all duration-500 ${
                  isActive ? "bg-red-400 animate-pulse" : "bg-gray-600"
                }`}
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  boxShadow: isActive
                    ? `0 0 10px ${styleConfig.glowColor}`
                    : "none",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes backgroundShift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
      `}</style>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DottedNeonProgress
      duration={10000}
      showPercentage={true}
      size={320}
      strokeWidth={10}
    />
  );
};

export default App;
