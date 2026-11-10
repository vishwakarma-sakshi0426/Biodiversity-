import React from 'react';
import { ShieldCheck, Eye, Network, Scale, ChevronRight } from 'lucide-react';

interface MissionProps {
  onDetectClick: () => void;
  onExploreClick: () => void;
}

export const Mission: React.FC<MissionProps> = ({ onDetectClick, onExploreClick }) => {
  return (
    <section id="mission" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Asymmetric Section 1: Editorial Introduction */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        {/* Left Column: Editorial Headline & Quotes (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#E4F4F5] text-[#0B3A4A] text-xs uppercase font-bold tracking-widest border border-[#1FB6C9]/25">
            The Digital Frontier of Conservation
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0B3A4A] font-normal leading-[1.12]">
            Bridging satellite earth intelligence with <span className="italic text-[#1FB6C9]">digital crime interception.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#3A5A64] leading-relaxed">
            Illegal wildlife trade has moved from physical wet markets into encrypted social channels, online marketplaces, and discreet courier networks. Our platform synthesizes real-time biological hotspots with computer vision to uncover hidden digital trafficking trails.
          </p>

          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={onDetectClick}
              className="px-6 py-3.5 rounded-full bg-[#FF7E6B] hover:bg-[#E86350] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#FF7E6B]/30 transition-all hover:scale-105"
            >
              Analyze Suspicious Post
            </button>
            <button
              onClick={onExploreClick}
              className="text-xs font-semibold uppercase tracking-wider text-[#0B3A4A] hover:text-[#1FB6C9] underline underline-offset-4"
            >
              Explore Hotspots
            </button>
          </div>
        </div>

        {/* Right Column: Organic Pebble-Shaped Imagery (Coralis Reference Language) */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <div className="relative w-full max-w-md h-[460px] overflow-hidden pebble-shape-1 shadow-2xl border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1000&q=80"
              alt="Orangutan in Rainforest Canopy"
              className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
            />
            {/* Luminous overlay badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#0B3A4A]/85 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-white">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#9BF0FB]">
                Living Sanctuary
              </span>
              <p className="font-serif text-lg font-light text-[#E4F4F5] mt-1 leading-snug">
                "Over 7,000 species are threatened by the digital black market annually."
              </p>
              <span className="text-[11px] text-[#9BF0FB]/80 block mt-1">— UNODC World Wildlife Crime Report</span>
            </div>
          </div>

          {/* Secondary Floating Pebble Accent */}
          <div className="hidden sm:block absolute -bottom-6 -left-6 w-36 h-36 rounded-full overflow-hidden border-4 border-[#F7F2E7] shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=400&q=80"
              alt="Pangolin"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* 3 Pillars of Wildlife Intelligence (Coralis Asymmetric Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Pillar 1 */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-[#1FB6C9]/15 hover:shadow-xl transition-all duration-300 group">
          <div className="w-14 h-14 rounded-full bg-[#E4F4F5] text-[#1FB6C9] flex items-center justify-center mb-6 group-hover:bg-[#1FB6C9] group-hover:text-white transition-colors">
            <Eye className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#1FB6C9]">
            Pillar 01
          </span>
          <h3 className="font-serif text-2xl font-medium text-[#0B3A4A] mt-1 mb-3">
            Computer Vision & OCR
          </h3>
          <p className="text-sm text-[#6E8890] leading-relaxed">
            Multi-modal identification of high-risk anatomical wildlife parts including scales, tusks, horn carvings, and live specimens concealed in ordinary cargo.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-[#FF7E6B]/20 hover:shadow-xl transition-all duration-300 group">
          <div className="w-14 h-14 rounded-full bg-[#FF7E6B]/15 text-[#FF7E6B] flex items-center justify-center mb-6 group-hover:bg-[#FF7E6B] group-hover:text-white transition-colors">
            <Network className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF7E6B]">
            Pillar 02
          </span>
          <h3 className="font-serif text-2xl font-medium text-[#0B3A4A] mt-1 mb-3">
            Trafficking Lexicon Mapping
          </h3>
          <p className="text-sm text-[#6E8890] leading-relaxed">
            Dynamic detection of code words, disguised payment prompts, private messaging diversions, and maritime smuggling routes used to evade social algorithms.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-[#2F7D58]/20 hover:shadow-xl transition-all duration-300 group">
          <div className="w-14 h-14 rounded-full bg-[#2F7D58]/15 text-[#2F7D58] flex items-center justify-center mb-6 group-hover:bg-[#2F7D58] group-hover:text-white transition-colors">
            <Scale className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#2F7D58]">
            Pillar 03
          </span>
          <h3 className="font-serif text-2xl font-medium text-[#0B3A4A] mt-1 mb-3">
            CITES & Law Enforcement
          </h3>
          <p className="text-sm text-[#6E8890] leading-relaxed">
            Bridging digital evidence with international enforcement frameworks including CITES Appendices I & II, Interpol Wildlife Crime Working Group, and national customs.
          </p>
        </div>
      </div>
    </section>
  );
};
