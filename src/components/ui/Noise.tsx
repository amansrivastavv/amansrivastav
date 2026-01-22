export const Noise = () => {
  return (
    <div className="fixed inset-0 z-9999 pointer-events-none opacity-[0.03] mix-blend-overlay">
      <svg className="w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.6" 
            stitchTiles="stitch" 
            numOctaves="3" 
            result="turbulence" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};
