import React from 'react';
import { motion } from 'framer-motion';
import { MedalType } from '../types';

interface MedalDisplayProps {
  medal: MedalType;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

const sizeMap = {
  sm: 32,
  md: 56,
  lg: 96,
};

const ringColor = {
  bronze: '#FBBF24', // amber-400
  silver: '#A3A3A3', // neutral-400
  gold: '#FDE047',   // yellow-400
};

const medalColor = {
  bronze: '#F59E42', // amber-500
  silver: '#E5E7EB', // neutral-300 (plain silver color)
  gold: '#FFD700',   // gold
};

const medalLabel = {
  bronze: 'B',
  silver: 'S',
  gold: 'G',
};

const MedalDisplay: React.FC<MedalDisplayProps> = ({
  medal,
  size = 'md',
  animate = false,
}) => {
  if (medal === 'none') return null;

  const px = sizeMap[size];
  const ringWidth = size === 'lg' ? 4 : size === 'md' ? 3 : 2;

  // Radius of the medal circle (solid filled)
  const medalRadius = (px - ringWidth * 4) / 2;
  
  // Unique pattern ID for each instance
  const patternId = `medalPattern-${medal}-${size}`;
  
  // Radius of the outer ring (halo), slightly bigger than medalRadius
  const ringRadius = medalRadius + ringWidth * 1.5;

  // Animation props
  const medalAnimation = animate
    ? {
        initial: { scale: 0, rotate: -180 },
        animate: { scale: 1, rotate: 0 },
        transition: { type: 'spring', stiffness: 260, damping: 20, delay: 0.2 },
      }
    : {};

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: px, height: px }}
    >
      <svg
        width={px}
        height={px}
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      >
        <defs>
          {/* Simple diagonal line pattern */}
          {/* <pattern
            id={patternId}
            patternUnits="userSpaceOnUse"
            width="6"
            height="6"
            patternTransform="rotate(45)"
          >
            <rect x="0" y="0" width="3" height="6" fill="rgba(0,0,0,0.04)" />
          </pattern> */}

          {/* Waves */}
          <pattern id={patternId} width="12" height="6" patternUnits="userSpaceOnUse">
            <path d="M0,3 Q3,6 6,3 T12,3" stroke="rgba(0,0,0,0.08)" patternTransform="rotate(45)" fill="none" />
          </pattern>

          {/* dots */}
          {/* <pattern id={patternId} width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.5" fill="rgba(0,0,0,0.06)" />
          </pattern> */}

        </defs>
        
        {/* Outer ring (halo) */}
        <circle
          cx={px / 2}
          cy={px / 2}
          r={ringRadius}
          fill="none"
          stroke={ringColor[medal]}
          strokeWidth={ringWidth}
          opacity={0.7}
        />

        {/* Medal circle - solid fill, no pattern */}
        <motion.circle
          cx={px / 2}
          cy={px / 2}
          r={medalRadius}
          fill={medalColor[medal]}
          stroke={medal === 'silver' ? '#9CA3AF' : 'transparent'} // subtle border for silver
          strokeWidth={medal === 'silver' ? 2 : 0}
          {...medalAnimation}
        />
        {/* Pattern overlay */}
        <motion.circle
          cx={px / 2}
          cy={px / 2}
          r={medalRadius}
          fill={`url(#${patternId})`}
          pointerEvents="none"
          {...medalAnimation}
        />
      </svg>

      {/* Medal label centered */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-white font-bold select-none"
        style={{
          fontSize: size === 'lg' ? 36 : size === 'md' ? 20 : 14,
          zIndex: 2,
          color: '#fff',
          textShadow: '0 2px 8px rgba(0,0,0,0.16)',
          pointerEvents: 'none',
        }}
        {...medalAnimation}
      >
        {medalLabel[medal]}
      </motion.div>
    </div>
  );
};

export default MedalDisplay;
