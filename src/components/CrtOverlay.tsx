export default function CrtOverlay() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 100, // On top of everything
      pointerEvents: "none", // Let clicks pass through
      overflow: "hidden"
    }}>
      {/* SVG Filters for Chromatic Aberration */}
      <svg style={{ width: 0, height: 0, position: "absolute" }}>
        <defs>
          <filter id="chromaticAberration" x="-20%" y="-20%" width="140%" height="140%">
            <feOffset dx="1" dy="0" in="SourceGraphic" result="red-shift" />
            <feOffset dx="-1" dy="0" in="SourceGraphic" result="blue-shift" />
            <feOffset dx="0" dy="0" in="SourceGraphic" result="green-shift" />
            <feMerge>
              <feMergeNode in="red-shift" />
              <feMergeNode in="green-shift" />
              <feMergeNode in="blue-shift" />
            </feMerge>
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 0.5 0"
            />
          </filter>
        </defs>
      </svg>

      {/* Screen Curvature & Vignette */}
      <div style={{
        position: "absolute",
        inset: 0,
        boxShadow: "inset 0 0 100px rgba(0,0,0,0.9)",
        background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.4) 100%)",
      }} />

      {/* Scanlines */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1))",
        backgroundSize: "100% 4px",
        opacity: 0.8
      }} />

      {/* Subtle CRT Flicker */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "rgba(255,255,255,0.02)",
        animation: "flicker 0.15s infinite alternate",
        opacity: 0.5
      }} />

      <style>
        {`
          @keyframes flicker {
            0% { opacity: 0.3; }
            100% { opacity: 0.6; }
          }
          
          /* We can optionally apply the chromatic filter to the body or main container if desired */
          body {
            /* filter: url(#chromaticAberration); */
          }
        `}
      </style>
    </div>
  );
}
