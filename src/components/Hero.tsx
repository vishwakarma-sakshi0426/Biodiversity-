import React from 'react';
import { EarthGlobe, SelectedMarkerData } from './Globe/EarthGlobe';
import { HotspotType, IncidentType } from '../types';
import { ArrowDown, Sparkles, Shield, Compass, ChevronRight } from 'lucide-react';

interface HeroProps {
  hotspots: HotspotType[];
  incidents: IncidentType[];
  onSelectMarker: (data: SelectedMarkerData) => void;
  onExploreClick: () => void;
  onMissionClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  hotspots,
  incidents,
  onSelectMarker,
  onExploreClick,
  onMissionClick
}) => {
  return (
    <section className="relative min-h-[100vh] w-full flex items-center overflow-hidden pt-20 pb-12 lg:py-0">
      {/* Background Atmosphere Subtle Radial Gradient */}
      <div className="absolute inset-0 bg-radial from-[#E4F4F5]/60 via-[#F7F2E7]/40 to-[#F7F2E7] pointer-events-none" />

      {/* Decorative Organic Pebble Shapes (Coralis Design System) */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#1FB6C9]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#FF7E6B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[85vh]">
        {/* Left Column: Editorial Headline & Content (5.5 cols) */}
        <div className="lg:col-span-6 space-y-6 lg:pr-6 text-left">
          {/* Eyebrow Pill Badge (Coralis Requirement 4.1) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E4F4F5] border border-[#1FB6C9]/25 text-[#0B3A4A] text-xs font-bold uppercase tracking-widest shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#1FB6C9] animate-pulse" />
            GLOBAL WILDLIFE INTELLIGENCE
          </div>

          {/* Cormorant Garamond Main Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-normal text-[#0B3A4A] leading-[1.08] tracking-tight">
            Protect the wild.
            <br />
            <span className="italic font-light text-[#0B3A4A] relative">
              Preserve our{' '}
              <span className="text-[#1FB6C9] underline decoration-[#FF7E6B]/40 decoration-wavy decoration-2">
                living Earth.
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#3A5A64] font-normal leading-relaxed max-w-xl">
            Explore Earth's biodiversity hotspots, uncover reported wildlife crime incidents, and identify the digital traces of illegal wildlife trade.
          </p>

          {/* Action CTAs (Coral Rounded Button + Underlined Link) */}
          <div className="pt-2 flex flex-wrap items-center gap-5">
            <button
              onClick={onExploreClick}
              className="px-8 py-4 rounded-full bg-[#FF7E6B] hover:bg-[#E86350] text-white text-xs font-bold uppercase tracking-widest shadow-xl shadow-[#FF7E6B]/35 transition-all hover:scale-105 flex items-center gap-2"
            >
              <span>EXPLORE THE EARTH</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onMissionClick}
              className="text-xs font-semibold uppercase tracking-widest text-[#0B3A4A] hover:text-[#1FB6C9] transition-colors underline underline-offset-8 decoration-[#1FB6C9]/60 hover:decoration-[#1FB6C9]"
            >
              Discover Our Mission
            </button>
          </div>

          {/* Floating Key Metrics (Coralis Asymmetric Editorial Pill) */}
          <div className="pt-6 grid grid-cols-3 gap-3 border-t border-[#1FB6C9]/15 max-w-lg">
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#0B3A4A]">
                10+
              </div>
              <div className="text-[11px] uppercase font-bold tracking-wider text-[#6E8890] mt-0.5">
                Hotspots Mapped
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#FF7E6B]">
                8.8k+
              </div>
              <div className="text-[11px] uppercase font-bold tracking-wider text-[#6E8890] mt-0.5">
                Tonnes Seized
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#1FB6C9]">
                94%
              </div>
              <div className="text-[11px] uppercase font-bold tracking-wider text-[#6E8890] mt-0.5">
                AI Precision
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Prominent Cinematic Earth (6 cols) */}
        <div className="lg:col-span-6 relative h-[450px] sm:h-[550px] lg:h-[650px] w-full flex items-center justify-center">
          {/* Earth Visual Canvas */}
          <div className="w-full h-full relative">
            <EarthGlobe
              hotspots={hotspots}
              incidents={incidents}
              onSelectMarker={onSelectMarker}
              isHeroMode={true}
              className="w-full h-full"
            />
          </div>

          {/* Ambient Hint Badge */}
          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/60 shadow-md text-[11px] text-[#0B3A4A] flex items-center gap-2 pointer-events-none">
            <Compass className="w-3.5 h-3.5 text-[#1FB6C9]" />
            <span>Interactive 3D Globe • Drag to rotate</span>
          </div>
        </div>
      </div>

      {/* Vertical Scroll Indicator (Coralis Requirement 4.1) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#6E8890] hover:text-[#0B3A4A] cursor-pointer transition-colors z-20"
        onClick={onExploreClick}
      >
        <span className="text-[9px] uppercase tracking-widest font-bold">Scroll Down</span>
        <div className="w-6 h-9 rounded-full border-2 border-[#1FB6C9]/40 flex items-start justify-center p-1">
          <div className="w-1.5 h-2.5 rounded-full bg-[#FF7E6B] animate-bounce" />
        </div>
      </div>
    </section>
  );
};
