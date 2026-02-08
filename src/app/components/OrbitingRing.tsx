import React from 'react';
import { motion } from 'framer-motion';

interface OrbitingRingProps {
  text: string;
  radius: number;
  speed: number;
  direction?: number;
  opacity?: number;
}

export const OrbitingRing: React.FC<OrbitingRingProps> = ({ 
  text, 
  radius, 
  speed, 
  direction = 1, 
  opacity = 0.3 
}) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none mix-blend-difference z-0">
      <motion.div
        animate={{ rotate: direction * 360 }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        style={{ width: radius * 2, height: radius * 2, opacity }}
      >
        <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
          <path
            id={`curve-${radius}`}
            d="M 150, 150 m -120, 0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0"
            fill="transparent"
          />
          <text className="fill-white text-[8px] font-bold tracking-[0.4em] uppercase">
            <textPath href={`#curve-${radius}`}>
              {text.repeat(3)}
            </textPath>
          </text>
        </svg>
      </motion.div>
    </div>
  );
};
