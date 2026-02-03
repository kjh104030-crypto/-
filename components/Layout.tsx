import React from 'react';
import { Monitor, Battery, Wifi } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onNavigate: (view: any) => void;
}

const NavButton: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      relative px-6 py-2 font-bold tracking-widest uppercase skew-x-[-15deg] transition-all duration-300
      border-2 
      ${isActive 
        ? 'bg-[#FCEE0A] text-black border-[#FCEE0A] shadow-[0_0_15px_rgba(252,238,10,0.5)]' 
        : 'bg-transparent text-[#FFD700] border-[#FFD700] hover:bg-[#FCEE0A] hover:text-black'}
    `}
  >
    <span className="block skew-x-[15deg]">{label}</span>
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 p-2 md:p-6 font-mono relative overflow-hidden flex flex-col">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{
             backgroundImage: 'linear-gradient(rgba(40,40,40,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(40,40,40,0.8) 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}>
      </div>
      
      {/* Header */}
      <header className="relative z-10 border-b-2 border-[#FFD700] pb-4 mb-6 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-[#FCEE0A] uppercase" style={{ textShadow: '2px 2px 0px #FFFFFF' }}>
            CITY ARCHIVE
          </h1>
          <p className="text-white font-mono-tech text-sm tracking-[0.2em] mt-1">
            PROTOCOL: 2077 // SECURE CONNECTION
          </p>
        </div>
        <div className="flex gap-4 items-center font-mono-tech text-xs text-[#FFD700]">
          <div className="flex items-center gap-1">
            <Wifi size={16} className="animate-pulse text-white" />
            NET: ONLINE
          </div>
          <div className="flex items-center gap-1">
            <Monitor size={16} />
            SYS: STABLE
          </div>
          <div className="flex items-center gap-1">
            <Battery size={16} />
            PWR: 98%
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="relative z-10 flex flex-wrap gap-4 mb-8 justify-center md:justify-start">
        <NavButton label="INTRO" isActive={currentView === 'INTRO'} onClick={() => onNavigate('INTRO')} />
        <NavButton label="DISTRICTS" isActive={currentView === 'DISTRICTS'} onClick={() => onNavigate('DISTRICTS')} />
        <NavButton label="ASSOCIATIONS" isActive={currentView === 'ASSOCIATIONS'} onClick={() => onNavigate('ASSOCIATIONS')} />
        <NavButton label="PERSONNEL" isActive={currentView === 'PERSONNEL'} onClick={() => onNavigate('PERSONNEL')} />
        <NavButton label="GLOSSARY" isActive={currentView === 'GLOSSARY'} onClick={() => onNavigate('GLOSSARY')} />
      </nav>

      {/* Main Content Frame */}
      <main className="relative z-10 flex-grow border-l-2 border-[#FCEE0A] pl-4 md:pl-8 ml-2 md:ml-4">
         {/* Decorative Corners */}
        <div className="absolute top-0 left-[-2px] w-2 h-16 bg-[#FCEE0A]" />
        <div className="absolute bottom-0 left-[-2px] w-2 h-16 bg-[#FCEE0A]" />
        
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12 border-t border-[#333] pt-4 text-center font-mono-tech text-xs text-gray-500">
        <p>CAUTION: UNAUTHORIZED ACCESS TO CITY ARCHIVES IS A CLASS A FELONY.</p>
        <p>© 2077 CITY ADMINISTRATION. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};