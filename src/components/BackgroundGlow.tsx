export function BackgroundGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black" aria-hidden="true">
      {/* High contrast geometric grid ("grits") */}
      <div className="absolute inset-0 bg-cyber-grid opacity-70" />

      {/* Multiple professional glossy color glowing auras:
          red, blue, green, yellow, pink, purple, orange, brown */}

      {/* Top Left: Glossy Red & Orange */}
      <div
        className="glossy-glow absolute -top-[15%] -left-[10%] w-[550px] h-[550px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(239, 68, 68, 0.28) 0%, rgba(249, 115, 22, 0.20) 45%, transparent 75%)",
          filter: "blur(90px)",
        }}
      />

      {/* Top Right: Glossy Blue & Purple */}
      <div
        className="glossy-glow absolute -top-[12%] -right-[10%] w-[580px] h-[580px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.28) 0%, rgba(139, 92, 246, 0.22) 50%, transparent 75%)",
          filter: "blur(95px)",
        }}
      />

      {/* Middle Left: Glossy Green & Yellow */}
      <div
        className="glossy-glow absolute top-[35%] -left-[12%] w-[520px] h-[520px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.24) 0%, rgba(234, 179, 8, 0.18) 50%, transparent 75%)",
          filter: "blur(100px)",
        }}
      />

      {/* Middle Right: Glossy Pink & Magenta */}
      <div
        className="glossy-glow absolute top-[40%] -right-[8%] w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, rgba(219, 39, 119, 0.18) 50%, transparent 75%)",
          filter: "blur(95px)",
        }}
      />

      {/* Bottom Center / Left: Glossy Brown & Amber */}
      <div
        className="glossy-glow absolute -bottom-[10%] left-[20%] w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(146, 64, 14, 0.28) 0%, rgba(245, 158, 11, 0.18) 50%, transparent 75%)",
          filter: "blur(110px)",
        }}
      />

      {/* Bottom Right: Glossy Purple & Blue */}
      <div
        className="glossy-glow absolute -bottom-[12%] right-[10%] w-[540px] h-[540px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(37, 99, 235, 0.18) 50%, transparent 75%)",
          filter: "blur(100px)",
        }}
      />

      {/* Subtle glossy sheen overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-black/60 pointer-events-none" />
    </div>
  );
}

