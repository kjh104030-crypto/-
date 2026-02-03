import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { GlitchText } from './components/GlitchText';
import { LoadingScreen } from './components/LoadingScreen';
import { ViewState, Association, Character } from './types';
import { INTRO_TEXT, DISTRICTS, ASSOCIATIONS, TERMS, CHARACTERS } from './data/lore';
import { MapPin, Search, BookOpen, Skull, Building2, Terminal, User, AlertTriangle, X, FileText, Stamp } from 'lucide-react';

// Helper to get association specific colors
const getAssocColor = (name: string) => {
  // Existing Associations
  if (name.includes('데이갈')) return '#FF4444'; // Red (Bright for dark bg)
  if (name.includes('듀르')) return '#FFD700';   // Gold
  if (name.includes('세르다')) return '#FFFFFF'; // White
  if (name.includes('나드')) return '#E0E0E0';   // Black & White (Light Gray/White for visibility)
  if (name.includes('다세오')) return '#00FF41'; // Green (Matrix Green)
  if (name.includes('여실')) return '#FFA500';   // Orange
  if (name.includes('차르일')) return '#D946EF'; // Purple (Fuchsia)
  if (name.includes('여달')) return '#0096FF';   // Blue
  if (name.includes('나홈')) return '#DEB887';   // Brown (Burlywood/Light Brown)
  if (name.includes('티아슬')) return '#A0A0A0'; // Gray
  
  // New Affiliations
  if (name.includes('미끼먹이')) return '#9ACD32'; // YellowGreen
  if (name.includes('알레')) return '#191970'; // MidnightBlue
  if (name.includes('나겔')) return '#40E0D0'; // Turquoise/Mint
  if (name.includes('아테나이에')) return '#00008B'; // DarkBlue
  if (name.includes('무소속')) return '#FFFFFF';

  return '#FCEE0A'; // Default Gold
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.INTRO);
  const [typedText, setTypedText] = useState('');
  
  // Modal States
  const [selectedAssoc, setSelectedAssoc] = useState<Association | null>(null);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);

  // Loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 seconds loading time
    return () => clearTimeout(timer);
  }, []);

  // Typing effect for intro
  useEffect(() => {
    if (!loading && currentView === ViewState.INTRO) {
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
  }, [loading, currentView]);

  if (loading) {
    return <LoadingScreen />;
  }

  // --- Modals Renderers ---

  const renderAssociationModal = () => {
    if (!selectedAssoc) return null;
    const color = getAssocColor(selectedAssoc.name);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedAssoc(null)}>
        <div 
          className="relative w-full max-w-3xl bg-[#0a0a0a] border-2 p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
          style={{ borderColor: color, boxShadow: `0 0 30px ${color}33` }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background Decor */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: `repeating-linear-gradient(45deg, ${color} 0, ${color} 1px, transparent 0, transparent 50%)`, backgroundSize: '10px 10px' }} />
          
          <button 
            onClick={() => setSelectedAssoc(null)}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 transition-colors"
            style={{ color: color }}
          >
            <X size={24} />
          </button>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6 border-b pb-4" style={{ borderColor: `${color}44` }}>
              <div className="p-4 bg-black border" style={{ borderColor: color }}>
                <Building2 size={40} style={{ color: color }} />
              </div>
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tighter" style={{ color: color }}>{selectedAssoc.name}</h2>
                <div className="flex gap-2 mt-2 font-mono-tech text-sm">
                  <span className="px-2 py-0.5 bg-white/10 text-gray-300">HQ: {selectedAssoc.location}</span>
                  <span className="px-2 py-0.5 border text-gray-300" style={{ borderColor: color }}>ROLE: {selectedAssoc.role}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-white">
                  <Terminal size={16} style={{ color: color }} />
                  ARCHIVE DATA
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg font-light">
                  {selectedAssoc.description}
                </p>
                
                <div className="mt-8 p-4 bg-white/5 border border-dashed" style={{ borderColor: `${color}44` }}>
                  <p className="font-mono-tech text-xs text-gray-500 mb-1">SYSTEM NOTE:</p>
                  <p className="text-sm text-gray-400">
                    This organization operates under City Protocol 2077. Direct interference with {selectedAssoc.name} operations without proper clearance is a Class B violation.
                  </p>
                </div>
              </div>

              <div className="border-l pl-6 space-y-6" style={{ borderColor: `${color}44` }}>
                <div>
                   <span className="text-xs font-mono-tech text-gray-500 block mb-1">SECURITY LEVEL</span>
                   <div className="text-2xl font-black" style={{ color: color }}>Grade A+</div>
                </div>
                <div>
                   <span className="text-xs font-mono-tech text-gray-500 block mb-1">JURISDICTION</span>
                   <div className="text-white">{selectedAssoc.location}</div>
                </div>
                <div>
                   <span className="text-xs font-mono-tech text-gray-500 block mb-1">STATUS</span>
                   <div className="flex items-center gap-2 text-[#00FF41]">
                     <span className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse" />
                     OPERATIONAL
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCharacterModal = () => {
    if (!selectedChar) return null;
    const assocColor = getAssocColor(selectedChar.affiliation);
    // Ensure visibility on light paper background. If color is white/light, use black/dark-gray for text elements.
    const isLightColor = ['#FFFFFF', '#E0E0E0', '#f0f0f0'].includes(assocColor);
    const textColor = isLightColor ? '#000000' : assocColor;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in overflow-y-auto" onClick={() => setSelectedChar(null)}>
        <div 
          className="relative w-full max-w-2xl bg-[#f0f0f0] text-black shadow-2xl transform rotate-1 transition-transform duration-300 hover:rotate-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Paper Texture Effect */}
          <div className="absolute inset-0 bg-[#f0f0f0] opacity-50 pointer-events-none" style={{ filter: 'contrast(120%) noise(0.1)' }}></div>
          
          {/* Top Secret Stamp */}
          <div className="absolute top-8 right-8 border-4 border-[#FF0000] p-2 text-[#FF0000] font-black text-xl rotate-[-15deg] opacity-80 pointer-events-none z-20 select-none">
            TOP SECRET
          </div>

          <button 
            onClick={() => setSelectedChar(null)}
            className="absolute top-2 right-2 p-2 hover:bg-black/10 transition-colors z-30"
          >
            <X size={24} className="text-black" />
          </button>

          <div className="relative z-10 p-8 md:p-12">
            {/* Header */}
            <div className="border-b-4 border-black pb-4 mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight flex items-center gap-2">
                  <FileText size={32} />
                  PERSONNEL FILE
                </h2>
                <p className="font-mono-tech text-sm text-gray-600 mt-1">CITY ARCHIVE // RECORD # {Math.random().toString().substr(2, 8)}</p>
              </div>
              <div className="hidden md:block">
                 <div className="w-24 h-32 border-2 border-dashed border-gray-400 flex items-center justify-center bg-gray-100 text-gray-400">
                   PHOTO
                 </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 font-mono">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold uppercase mb-1 text-gray-500">Subject Name</label>
                <div className="text-xl font-bold border-b border-gray-300 pb-1">{selectedChar.name}</div>
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold uppercase mb-1 text-gray-500">Affiliation</label>
                <div 
                  className="text-xl font-bold border-b border-gray-300 pb-1 inline-block px-2"
                  style={{ backgroundColor: isLightColor ? '#e5e5e5' : `${assocColor}33`, color: '#000' }}
                >
                  {selectedChar.affiliation}
                </div>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold uppercase mb-1 text-gray-500">Current Location</label>
                <div className="text-lg border-b border-gray-300 pb-1 flex items-center gap-2">
                  <MapPin size={16} />
                  {selectedChar.location}
                </div>
              </div>

              <div className="col-span-2 bg-gray-200 p-4 rounded-sm border border-gray-300">
                <label className="block text-xs font-bold uppercase mb-2 text-gray-600 flex items-center gap-1">
                  <User size={14} />
                  Appearance Data
                </label>
                <p className="font-mono-tech text-sm leading-relaxed whitespace-pre-wrap">{selectedChar.appearance}</p>
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-bold uppercase mb-1 text-gray-500">Personality Matrix</label>
                <p className="text-sm border-l-4 border-black pl-4 py-1 italic">
                  "{selectedChar.personality}"
                </p>
              </div>

              {selectedChar.notes && (
                <div className="col-span-2 mt-4 relative">
                  <div className="absolute -left-3 top-0 bottom-0 w-1 bg-red-500/50"></div>
                  <label className="block text-xs font-bold uppercase mb-1 text-red-600 flex items-center gap-1">
                    <AlertTriangle size={14} />
                    Administrator Notes
                  </label>
                  <p className="font-handwriting text-md text-gray-800 bg-yellow-50 p-3 border border-yellow-200 transform rotate-[-1deg] shadow-sm">
                    {selectedChar.notes}
                  </p>
                </div>
              )}

              {/* Resolve Section */}
              <div className="col-span-2 mt-6 border-4 border-double border-gray-400 p-4 bg-white transform -rotate-1 shadow-sm">
                <div className="text-center border-b-2 border-gray-800 pb-2 mb-2">
                  <span className="font-black text-lg uppercase tracking-widest">Resolve</span>
                  <span className="text-xs ml-2 text-gray-500">(각오)</span>
                </div>
                <p className="text-center font-handwriting text-2xl text-gray-800 font-bold font-serif">
                  "{selectedChar.resolve}"
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-4 border-t border-gray-300 flex justify-between items-center text-[10px] text-gray-500 font-mono-tech uppercase">
              <span>Classified Level 4</span>
              <span>Authorized By: [REDACTED]</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- View Renderers ---

  const renderIntro = () => (
    <div className="max-w-4xl animate-fade-in relative group">
       <div className="mb-6 p-4 border border-[#FCEE0A] bg-yellow-900/10 inline-block">
        <h2 className="text-[#FCEE0A] font-bold uppercase tracking-widest flex items-center gap-2">
          <Terminal size={20} />
          Incoming Encrypted Message
        </h2>
      </div>
      <div className="font-mono-tech text-lg md:text-xl leading-relaxed text-white min-h-[300px] whitespace-pre-wrap shadow-[0_0_20px_rgba(252,238,10,0.1)] p-6 bg-black/80 border-l-4 border-[#FFD700] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-[#FFD700] opacity-50 animate-pulse"></div>
        {typedText}
        <span className="inline-block w-3 h-5 bg-[#FCEE0A] ml-1 animate-pulse"/>
      </div>
      {/* Decorative Glitch Element behind */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#FFFFFF] to-[#FCEE0A] opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-xl -z-10"></div>
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
            <h3 className="text-4xl font-black text-white group-hover:text-[#FCEE0A] transition-colors italic tracking-tighter" style={{ textShadow: '2px 2px 0px rgba(255,255,255,0.1)' }}>
              {district.id}
            </h3>
            <span className="text-[10px] font-mono text-gray-400 border border-gray-700 px-2 py-1 rounded bg-black">SECTOR // {district.id}</span>
          </div>
          
          <h4 className="text-xl font-bold mb-3 text-[#FFD700] group-hover:text-white transition-colors">{district.name}</h4>
          <p className="text-gray-400 text-sm leading-7 mb-4 font-mono-tech flex-grow">{district.description}</p>
          
          {district.associations && (
            <div className="mt-auto pt-4 border-t border-dashed border-gray-700">
              <span className="text-xs text-white font-bold uppercase tracking-wider flex items-center gap-2 mb-2">
                <Building2 size={12} className="text-[#FCEE0A]"/>
                Jurisdiction:
              </span>
              <div className="flex flex-wrap gap-2">
                {district.associations.map(assoc => {
                  const color = getAssocColor(assoc);
                  return (
                    <span 
                      key={assoc} 
                      className="text-xs px-2 py-1 border"
                      style={{ 
                        color: color, 
                        borderColor: color, 
                        backgroundColor: `${color}1A` // 10% opacity
                      }}
                    >
                      {assoc}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderAssociations = () => (
    <div className="space-y-6 pb-12">
      <div className="text-xs font-mono text-gray-500 mb-4">* Click on an association card to view confidential details.</div>
      {ASSOCIATIONS.map((assoc, idx) => {
        const color = getAssocColor(assoc.name);
        return (
          <div 
            key={idx} 
            onClick={() => setSelectedAssoc(assoc)}
            className="bg-neutral-900/80 border-l-4 p-6 relative overflow-hidden group hover:bg-neutral-900 transition-all cursor-pointer transform hover:translate-x-2"
            style={{ borderColor: color }}
          >
             {/* Background number */}
             <div className="absolute -right-4 -top-6 text-[8rem] font-black text-white/5 pointer-events-none select-none transition-transform duration-500 group-hover:translate-x-2">
              {(idx + 1).toString().padStart(2, '0')}
             </div>
  
             <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-start">
               <div 
                 className="flex-shrink-0 w-24 h-24 flex flex-col items-center justify-center text-black font-black skew-x-[-10deg] shadow-[5px_5px_0px_rgba(255,255,255,0.2)] group-hover:scale-105 transition-transform"
                 style={{ backgroundColor: color }}
               >
                 <span className="text-xs tracking-widest uppercase mb-1 skew-x-[10deg]">Sector</span>
                 <span className="text-4xl skew-x-[10deg]">{assoc.location.replace('구역', '')}</span>
               </div>
               
               <div className="flex-grow">
                 <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                   <GlitchText text={assoc.name} as="h3" className="text-2xl font-bold text-white uppercase tracking-wider" />
                   <span 
                     className="font-mono-tech text-sm px-2 py-1"
                     style={{ color: color, backgroundColor: `${color}1A` }}
                   >
                     [{assoc.role}]
                   </span>
                 </div>
                 <p className="text-gray-300 max-w-3xl leading-relaxed text-sm md:text-base border-t border-gray-800 pt-2 mt-2 line-clamp-2 group-hover:line-clamp-none transition-all">{assoc.description}</p>
                 <span className="text-xs text-gray-500 mt-2 block opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <Search size={10} /> Click to open dossier
                 </span>
               </div>
  
               <div className="flex-shrink-0 flex flex-row md:flex-col items-start md:items-end gap-2 text-xs font-mono text-gray-500 mt-4 md:mt-0">
                 <span 
                   className="border px-2 py-1 bg-black"
                   style={{ borderColor: 'rgba(255,255,255,0.1)', color: color }}
                 >
                   HQ: {assoc.location}
                 </span>
                 <span className="border border-gray-700 px-2 py-1 bg-black text-white">STATUS: ACTIVE</span>
               </div>
             </div>
          </div>
        );
      })}
    </div>
  );

  const renderPersonnel = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
      {CHARACTERS.map((char, idx) => {
        const assocColor = getAssocColor(char.affiliation);
        const hasAssoc = char.affiliation.includes('협회');
        const accentColor = hasAssoc ? assocColor : getAssocColor(char.affiliation); // Use specific color if not association
        
        return (
          <div 
            key={idx} 
            onClick={() => setSelectedChar(char)}
            className="bg-black/80 border border-gray-700 p-4 flex flex-col gap-4 relative overflow-hidden group hover:border-current transition-colors cursor-pointer hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] transform hover:-translate-y-1 duration-200" 
            style={{ color: accentColor }}
          >
            <div 
              className="absolute top-0 right-0 px-2 py-1 text-[10px] font-mono text-gray-400 group-hover:bg-current group-hover:text-black transition-colors"
              style={{ backgroundColor: 'rgb(31, 41, 55)' }} // Default gray-800
            >
              ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </div>
            
            <div className="flex items-start gap-4 border-b border-gray-800 pb-4 text-gray-300">
              <div 
                className="w-16 h-16 bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-600 group-hover:text-black group-hover:bg-current group-hover:border-current transition-colors"
              >
                <User size={32} />
              </div>
              <div>
                <GlitchText text={char.name} as="h3" className="text-xl font-bold text-white uppercase" />
                <div 
                  className="text-sm font-mono-tech mt-1"
                  style={{ color: accentColor }}
                >
                  {char.affiliation}
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin size={10} />
                  {char.location}
                </div>
              </div>
            </div>
  
            <div className="space-y-3 text-sm text-gray-300">
              <div>
                <span className="text-xs font-bold uppercase block mb-1" style={{ color: accentColor }}>Personality Matrix</span>
                <p className="text-gray-300 line-clamp-1">{char.personality}</p>
              </div>
              <div className="pt-2 border-t border-gray-800 text-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                [ ACCESS FULL RECORD ]
              </div>
            </div>
          </div>
        );
      })}
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
                 <div key={i} className="bg-[#1a1a1a] p-4 border-l-2 border-gray-700 hover:border-[#FFD700] hover:bg-[#222] transition-all duration-200 group">
                   <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-lg">
                     <span className="group-hover:text-[#FCEE0A] transition-colors">{term.term}</span>
                     {catKey === 'entity' && <Skull size={14} className="text-[#FCEE0A]" />}
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

        {/* Render Modals */}
        {renderAssociationModal()}
        {renderCharacterModal()}
      </div>
    </Layout>
  );
};

export default App;