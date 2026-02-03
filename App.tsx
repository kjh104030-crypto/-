import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { GlitchText } from './components/GlitchText';
import { ViewState } from './types';
import { INTRO_TEXT, DISTRICTS, ASSOCIATIONS, TERMS, CHARACTERS } from './data/lore';
import { MapPin, Shield, Search, BookOpen, Skull, Building2, Terminal, User, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.INTRO);
  const [typedText, setTypedText] = useState('');

  // Typing effect for intro
  useEffect(() => {
    if (currentView === ViewState.INTRO) {
      setTypedText('');
      let i = 0;
      const speed = 15;
      const timer = setInterval(() => {
        if (i < INTRO_TEXT.length) {
          setTypedText((prev) => prev + INTRO_TEXT.charAt(i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, speed);
      return () => clearInterval(timer);
    }
  }, [currentView]);

  const renderIntro = () => (
    <div className="max-w-4xl animate-fade-in relative group">
       <div className="mb-6 p-4 border border-[#FF003C] bg-red-900/10 inline-block">
        <h2 className="text-[#FF003C] font-bold uppercase tracking-widest flex items-center gap-2">
          <Terminal size={20} />
          Incoming Encrypted Message
        </h2>
      </div>
      <div className="font-mono-tech text-lg md:text-xl leading-relaxed text-[#00F0FF] min-h-[300px] whitespace-pre-wrap shadow-[0_0_20px_rgba(0,240,255,0.1)] p-6 bg-black/80 border-l-4 border-[#00F0FF] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00F0FF] opacity-50 animate-pulse"></div>
        {typedText}
        <span className="inline-block w-3 h-5 bg-[#FCEE0A] ml-1 animate-pulse"/>
      </div>
      {/* Decorative Glitch Element behind */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#FF003C] to-[#FCEE0A] opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-xl -z-10"></div>
    </div>
  );

  const renderDistricts = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 pb-12">
      {DISTRICTS.map((district) => (
        <div 
          key={district.id}
          className="group relative bg-[#121212] border border-gray-800 p-6 hover:border-[#FCEE0A] transition-all duration-300 hover:shadow-[0_0_15px_rgba(252,238,10,0.15)] flex flex-col"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-gray-800 group-hover:border-r-[#FCEE0A] transition-colors" />
          
          <div className="flex justify-between items-start mb-4 border-b border-gray-800 pb-2 group-hover:border-[#FCEE0A]/50 transition-colors">
            <h3 className="text-4xl font-black text-white group-hover:text-[#FCEE0A] transition-colors italic tracking-tighter" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}>
              {district.id}
            </h3>
            <span className="text-[10px] font-mono text-gray-500 border border-gray-700 px-2 py-1 rounded bg-black">SECTOR // {district.id}</span>
          </div>
          
          <h4 className="text-xl font-bold mb-3 text-[#00F0FF] group-hover:text-white transition-colors">{district.name}</h4>
          <p className="text-gray-400 text-sm leading-7 mb-4 font-mono-tech flex-grow">{district.description}</p>
          
          {district.associations && (
            <div className="mt-auto pt-4 border-t border-dashed border-gray-700">
              <span className="text-xs text-[#FF003C] font-bold uppercase tracking-wider flex items-center gap-2 mb-2">
                <Building2 size={12} />
                Jurisdiction:
              </span>
              <div className="flex flex-wrap gap-2">
                {district.associations.map(assoc => (
                  <span key={assoc} className="text-xs bg-[#FF003C]/10 border border-[#FF003C]/30 text-[#FF003C] px-2 py-1">
                    {assoc}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderAssociations = () => (
    <div className="space-y-6 pb-12">
      {ASSOCIATIONS.map((assoc, idx) => (
        <div key={idx} className="bg-neutral-900/80 border-l-4 border-[#FCEE0A] p-6 relative overflow-hidden group hover:bg-neutral-900 transition-colors">
           {/* Background number */}
           <div className="absolute -right-4 -top-6 text-[8rem] font-black text-white/5 pointer-events-none select-none transition-transform duration-500 group-hover:translate-x-2">
            {(idx + 1).toString().padStart(2, '0')}
           </div>

           <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-start">
             <div className="flex-shrink-0 w-24 h-24 bg-[#FCEE0A] flex flex-col items-center justify-center text-black font-black skew-x-[-10deg] shadow-[5px_5px_0px_#000]">
               <span className="text-xs tracking-widest uppercase mb-1 skew-x-[10deg]">Sector</span>
               <span className="text-4xl skew-x-[10deg]">{assoc.location.replace('구역', '')}</span>
             </div>
             
             <div className="flex-grow">
               <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                 <GlitchText text={assoc.name} as="h3" className="text-2xl font-bold text-white uppercase tracking-wider" />
                 <span className="text-[#00F0FF] font-mono-tech text-sm bg-[#00F0FF]/10 px-2 py-1">[{assoc.role}]</span>
               </div>
               <p className="text-gray-300 max-w-3xl leading-relaxed text-sm md:text-base border-t border-gray-800 pt-2 mt-2">{assoc.description}</p>
             </div>

             <div className="flex-shrink-0 flex flex-row md:flex-col items-start md:items-end gap-2 text-xs font-mono text-gray-500 mt-4 md:mt-0">
               <span className="border border-gray-700 px-2 py-1 bg-black text-[#FCEE0A]">HQ: {assoc.location}</span>
               <span className="border border-gray-700 px-2 py-1 bg-black text-[#00F0FF]">STATUS: ACTIVE</span>
             </div>
           </div>
        </div>
      ))}
    </div>
  );

  const renderPersonnel = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
      {CHARACTERS.map((char, idx) => (
        <div key={idx} className="bg-black/80 border border-gray-700 p-4 flex flex-col gap-4 relative overflow-hidden group hover:border-[#FF003C] transition-colors">
          <div className="absolute top-0 right-0 bg-gray-800 px-2 py-1 text-[10px] font-mono text-gray-400 group-hover:bg-[#FF003C] group-hover:text-black transition-colors">
            ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </div>
          
          <div className="flex items-start gap-4 border-b border-gray-800 pb-4">
            <div className="w-16 h-16 bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-600 group-hover:text-[#FF003C] group-hover:border-[#FF003C] transition-colors">
              <User size={32} />
            </div>
            <div>
              <GlitchText text={char.name} as="h3" className="text-xl font-bold text-white uppercase" />
              <div className="text-sm text-[#FCEE0A] font-mono-tech mt-1">{char.affiliation}</div>
              <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <MapPin size={10} />
                {char.location}
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <span className="text-[#00F0FF] text-xs font-bold uppercase block mb-1">Personality Matrix</span>
              <p className="text-gray-300">{char.personality}</p>
            </div>
            <div>
              <span className="text-[#00F0FF] text-xs font-bold uppercase block mb-1">Appearance Data</span>
              <p className="text-gray-400 font-mono-tech leading-tight">{char.appearance}</p>
            </div>
            {char.notes && (
              <div className="bg-[#FF003C]/10 border-l-2 border-[#FF003C] p-2 mt-2">
                <span className="text-[#FF003C] text-[10px] font-bold uppercase flex items-center gap-1 mb-1">
                  <AlertTriangle size={10} />
                  Addendum
                </span>
                <p className="text-gray-300 text-xs italic">{char.notes}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderGlossary = () => {
    // Group terms
    const categories = {
      'general': 'General Knowledge',
      'entity': 'Threats & Entities',
      'org': 'Organizations & Structures',
      'combat': 'Combat & Regulations'
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
        {(Object.keys(categories) as Array<keyof typeof categories>).map((catKey) => (
          <div key={catKey} className="mb-8">
             <h3 className="text-[#FCEE0A] font-bold text-xl mb-6 uppercase border-b-2 border-[#FCEE0A] pb-2 flex items-center gap-2 inline-block">
               <Search size={18} />
               {categories[catKey]}
             </h3>
             <div className="space-y-4">
               {TERMS.filter(t => t.category === catKey).map((term, i) => (
                 <div key={i} className="bg-[#1a1a1a] p-4 border-l-2 border-gray-700 hover:border-[#00F0FF] hover:bg-[#222] transition-all duration-200 group">
                   <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-lg">
                     <span className="group-hover:text-[#00F0FF] transition-colors">{term.term}</span>
                     {catKey === 'entity' && <Skull size={14} className="text-[#FF003C]" />}
                   </h4>
                   <p className="text-sm text-gray-400 font-mono-tech leading-relaxed border-t border-gray-800 pt-2">{term.definition}</p>
                 </div>
               ))}
             </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      <div className="max-w-7xl mx-auto">
        {/* Content Header */}
        <div className="mb-8 relative">
           <h2 className="text-6xl md:text-8xl font-black text-[#222] uppercase select-none absolute right-0 top-0 -z-10 opacity-50 transform translate-x-10 -translate-y-10 overflow-hidden pointer-events-none">
             {currentView}
           </h2>
           <div className="h-1 w-20 bg-[#FCEE0A] mb-4"></div>
        </div>

        {currentView === ViewState.INTRO && renderIntro()}
        {currentView === ViewState.DISTRICTS && renderDistricts()}
        {currentView === ViewState.ASSOCIATIONS && renderAssociations()}
        {currentView === ViewState.PERSONNEL && renderPersonnel()}
        {currentView === ViewState.GLOSSARY && renderGlossary()}
      </div>
    </Layout>
  );
};

export default App;