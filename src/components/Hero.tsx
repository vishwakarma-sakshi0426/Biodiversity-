import React from 'react';
import { EarthGlobe } from './Globe/EarthGlobe';
import { HotspotType, IncidentType } from '../types';
import { Sparkles, Compass, ChevronRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
  hotspots: HotspotType[];
  incidents: IncidentType[];
  onNavigateToDetect: () => void;
  onNavigateToMission: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  hotspots,
  incidents,
  onNavigateToDetect,
  onNavigateToMission
}) => {
  return (
    <section className="relative min-h-[92vh] w-full flex items-center overflow-hidden pt-20 pb-10">
      {/* Subtle Radial Gradient */}
      <div className="absolute inset-0 bg-radial from-[#E4F4F5]/50 via-[#F7F2E7]/40 to-[#F7F2E7] pointer-events-none" />

      {/* Decorative Organic Pebble Shapes */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#1FB6C9]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#FF7E6B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[82vh]">
        {/* Left Column: Editorial Headline & Content (5.5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:pr-4 text-left">
          {/* Eyebrow Pill Badge (Coralis Requirement) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E4F4F5] border border-[#1FB6C9]/25 text-[#0B3A4A] text-xs font-bold uppercase tracking-widest shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#1FB6C9] animate-pulse" />
            GLOBAL WILDLIFE INTELLIGENCE
          </div>

          {/* Cormorant Garamond Main Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-[68px] font-normal text-[#0B3A4A] leading-[1.08] tracking-tight">
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
          <p className="text-base text-[#3A5A64] font-normal leading-relaxed max-w-lg">
            Explore Earth's biodiversity hotspots, uncover reported wildlife crime incidents, and identify the digital traces of illegal wildlife trade.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onNavigateToDetect}
              className="px-7 py-3.5 rounded-full bg-[#FF7E6B] hover:bg-[#E86350] text-white text-xs font-bold uppercase tracking-widest shadow-xl shadow-[#FF7E6B]/35 transition-all hover:scale-105 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>DETECT WILDLIFE TRADE</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToMission}
              className="text-xs font-semibold uppercase tracking-widest text-[#0B3A4A] hover:text-[#1FB6C9] transition-colors underline underline-offset-8 decoration-[#1FB6C9]/60 hover:decoration-[#1FB6C9]"
            >
              Discover Our Mission
            </button>
          </div>

          {/* Interactive Hint */}
          <div className="pt-4 border-t border-[#1FB6C9]/15 flex items-center gap-4 text-xs text-[#6E8890]">
            <span className="flex items-center gap-1.5 font-medium text-[#0B3A4A]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1FB6C9]" /> Hotspots (10)
            </span>
            <span className="flex items-center gap-1.5 font-medium text-[#E86350]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF7E6B]" /> Seizures (8)
            </span>
            <span className="text-[#6E8890] italic">
              Hover pins to inspect details
            </span>
          </div>
        </div>

        {/* Right Column: Prominent Cinematic Earth (7 cols) with Side Card on Hover */}
        <div className="lg:col-span-7 relative h-[520px] sm:h-[600px] lg:h-[660px] w-full flex items-center justify-center">
          <div className="w-full h-full relative rounded-[40px] overflow-hidden bg-gradient-to-b from-[#06202B]/90 via-[#0B3A4A]/80 to-[#082835]/90 border-4 border-white shadow-2xl">
            <EarthGlobe
              hotspots={hotspots}
              incidents={incidents}
              onNavigateToDetect={onNavigateToDetect}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
