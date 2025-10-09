import React from 'react';
import { motion } from 'framer-motion';

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = ''
}) => {
  const baseClasses = `
    relative overflow-hidden
    font-semibold font-neon
    transition-all duration-300
    focus:outline-none focus:ring-4
    disabled:opacity-50 disabled:cursor-not-allowed
    group
  `;

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-neon-500 to-cyan-500
      text-white
      border border-neon-400
      hover:from-neon-400 hover:to-cyan-400
      focus:ring-neon-500/50
      shadow-lg shadow-neon-500/25
      hover:shadow-xl hover:shadow-neon-500/40
    `,
    secondary: `
      bg-gradient-to-r from-cyan-500 to-neon-500
      text-white
      border border-cyan-400
      hover:from-cyan-400 hover:to-neon-400
      focus:ring-cyan-500/50
      shadow-lg shadow-cyan-500/25
      hover:shadow-xl hover:shadow-cyan-500/40
    `,
    outline: `
      bg-transparent
      text-neon-400
      border-2 border-neon-400
      hover:bg-neon-500 hover:text-white
      focus:ring-neon-500/50
      hover:shadow-lg hover:shadow-neon-500/25
    `
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      style={{
        borderRadius: '12px',
        textShadow: '0 0 10px currentColor'
      }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -top-2 -left-2 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default NeonButton;
