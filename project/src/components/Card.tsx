import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { MedalType } from '../types';

interface CardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  onClick?: () => void;
  medal?: MedalType;
  className?: string;
  children?: ReactNode;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  description, 
  icon, 
  onClick, 
  medal = 'none',
  className = '',
  children
}) => {
  const isInteractive = !!onClick;
  
  return (
    <motion.div
      whileHover={isInteractive ? { scale: 1.02 } : {}}
      whileTap={isInteractive ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`card ${isInteractive ? 'card-interactive' : ''} ${className}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-bold">{title}</h3>
          {description && (
            <p className="text-neutral-600 text-sm mt-1">{description}</p>
          )}
        </div>
        
        {icon && (
          <div className="text-primary-500 ml-4">
            {icon}
          </div>
        )}
      </div>
      
      {children && <div className="mt-4">{children}</div>}
      
      {medal !== 'none' && (
        <div className="mt-4 flex">
          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full medal-${medal} text-white text-xs`}>
            {medal === 'bronze' ? 'B' : medal === 'silver' ? 'S' : 'G'}
          </span>
          <span className="ml-2 text-sm text-neutral-600">
            {medal === 'bronze' ? 'Bronze Medal' : medal === 'silver' ? 'Silver Medal' : 'Gold Medal'}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default Card;