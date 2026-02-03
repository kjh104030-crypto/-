import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = "", as: Component = 'span' }) => {
  return (
    <Component className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#00F0FF] opacity-0 group-hover:opacity-70 group-hover:translate-x-[-2px] transition-all duration-100 select-none">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#FF003C] opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 select-none">
        {text}
      </span>
    </Component>
  );
};