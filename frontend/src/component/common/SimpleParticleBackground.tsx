import React from 'react';

interface SimpleParticleBackgroundProps {
  className?: string;
}

const SimpleParticleBackground: React.FC<SimpleParticleBackgroundProps> = ({ className = "" }) => {
  return (
    <div className={`fixed inset-0 z-0 ${className}`}>
      {/* Simple animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Animated dots */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-neon-400 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-ping opacity-50"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-neon-300 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-500 rounded-full animate-bounce opacity-60"></div>
        
        {/* More animated elements */}
        <div className="absolute top-1/6 right-1/6 w-4 h-4 border border-cyan-400 rounded-full animate-spin opacity-20"></div>
        <div className="absolute bottom-1/6 left-1/6 w-3 h-3 border border-neon-400 rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-2/3 right-1/2 w-2 h-2 bg-gradient-to-r from-cyan-400 to-neon-400 rounded-full animate-pulse opacity-40"></div>
      </div>
    </div>
  );
};

export default SimpleParticleBackground;
