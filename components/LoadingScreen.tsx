import React, { useState, useEffect } from 'react';
import { Building2, Cpu } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random increment for realistic loading effect
        return Math.min(prev + Math.random() * 15, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Grid Effect */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Icon Container */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-[#FCEE0A] blur-3xl opacity-20 animate-pulse" />
          <Building2 size={80} className="text-[#FCEE0A] relative z-10 animate-bounce-slight" />
          <Cpu size={24} className="text-white absolute -bottom-2 -right-2 z-20 animate-spin-slow" />
        </div>

        {/* Main Text - Removed animate-glitch for stability */}
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-2 relative" style={{ textShadow: '4px 4px 0px #FFD700' }}>
          BARANTRUM
        </h1>
        
        {/* Subtitle */}
        <div className="flex items-center gap-3 text-[#FFD700] font-mono-tech tracking-[0.3em] text-sm md:text-base mb-12">
          <span className="w-2 h-2 bg-white animate-pulse" />
          SYSTEM INITIALIZATION
          <span className="w-2 h-2 bg-white animate-pulse" />
        </div>

        {/* Progress Bar - Increased height to h-4 */}
        <div className="w-64 md:w-96 h-4 bg-gray-900 border border-[#333] relative overflow-hidden">
          <div 
            className="h-full bg-[#FCEE0A] shadow-[0_0_15px_#FCEE0A]"
            style={{ width: `${progress}%`, transition: 'width 0.2s ease-out' }}
          />
        </div>
        
        {/* Status Text */}
        <div className="mt-2 w-64 md:w-96 flex justify-between font-mono-tech text-[10px] text-gray-500 uppercase">
          <span>Loading Assets...</span>
          <span className="text-[#FFD700]">{Math.floor(progress)}%</span>
        </div>
      </div>
    </div>
  );
};