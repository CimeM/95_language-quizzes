import React from 'react';
import { motion } from 'framer-motion';
import { MedalType } from '../types';

interface MedalDisplayProps {
  medal: MedalType;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

const MedalDisplay: React.FC<MedalDisplayProps> = ({ medal, size = 'md', animate = false }) => {
  if (medal === 'none') return null;
  
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-base',
  };
  
  const medalColor = {
    bronze: 'bg-amber-500',
    silver: 'bg-neutral-300',
    gold: 'bg-accent-500',
  };
  
  const medalLabel = {
    bronze: 'B',
    silver: 'S',
    gold: 'G',
  };
  
  const medalAnimation = animate ? {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: { 
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: 0.2
    }
  } : {};
  
  return (
    <motion.div 
      className={`flex items-center justify-center rounded-full ${sizeClasses[size]} ${medalColor[medal]} text-white font-bold shadow-md`}
      {...medalAnimation}
    >
      {medalLabel[medal]}
    </motion.div>
  );
};

export default MedalDisplay;