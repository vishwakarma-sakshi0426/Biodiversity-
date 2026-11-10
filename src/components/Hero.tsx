import React, { useState } from 'react';
import { EarthGlobe } from './Globe/EarthGlobe';
import { HotspotType, IncidentType } from '../types';
import { Sparkles, ChevronRight, Wind } from 'lucide-react';

export interface NatureWallpaper {
  name: string;
  category: 'blue' | 'green' | 'dark' | 'amber';
  url: string;
  biome: string;
}

export const NATURE_WALLPAPERS: NatureWallpaper[] = [
  {
    name: 'Coralis Turquoise Lagoon',
    category: 'blue',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    biome: 'Pristine Marine Reef & Shallow Lagoon'
  },
  {
    name: 'Amazonian Emerald Canopy',
    category: 'green',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=80',
    biome: 'Deep Equatorial Rainforest'
  },
  {
    name: 'Midnight Ocean Trench',
    category: 'dark',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80',
    biome: 'Nocturnal Pelagic Waters'
  },
  {
    name: 'Misty Cloud Forest',
    category: 'green',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80',
    biome: 'High Altitude Montane Mist'
  },
  {
    name: 'Serengeti Twilight Savanna',
    category: 'amber',
    url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80',
    biome: 'Golden Hour Migration Plains'
  }
];

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
  const [activeWallpaperIdx, setActiveWallpaperIdx] = useState<number>(0);

  const activeWallpaper = NATURE_WALLPAPERS[activeWallpaperIdx] || NATURE_WALLPAPERS[0];

  return (
    <section className="relative min-h-[92vh] w-full flex items-center overflow-hidden pt-20 pb-10">
      {/* Dynamic Nature Wallpapers Layer (Subtle, delicate tint - User Request: "wallpaper itne jada visible nahi chaiye, jaise white tha thoda kam visibility") */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {NATURE_WALLPAPERS.map((wp, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              activeWallpaperIdx === idx ? 'opacity-28' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${wp.url})` }}
          />
        ))}

        {/* Soft Coralis Sand Ambient Wash */}
        <div className="absolute inset-0 bg-[#F7F2E7]/75 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[82vh]">
        {/* Left Column: Clean Editorial Headline & Content (User Request: "tagline wala section alag se box mein nahi chaiye just last changes se phele wale jaisa chaiye") */}
        <div className="lg:col-span-5 space-y-6 lg:pr-4 text-left">
          {/* Eyebrow Pill Badge */}
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
              className="px-7 py-3.5 rounded-full bg-[#FF7E6B] hover:bg-[#E86350] text-white text-xs font-bold uppercase tracking-widest shadow-xl shadow-[#FF7E6B]/35 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>DETECT WILDLIFE TRADE</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToMission}
              className="text-xs font-semibold uppercase tracking-widest text-[#0B3A4A] hover:text-[#1FB6C9] transition-colors underline underline-offset-8 decoration-[#1FB6C9]/60 hover:decoration-[#1FB6C9] cursor-pointer"
            >
              Discover Our Mission
            </button>
          </div>

          {/* Stats Bar */}
          <div className="pt-6 grid grid-cols-3 gap-3 border-t border-[#1FB6C9]/20 max-w-md">
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#0B3A4A]">
                10+
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#6E8890] mt-0.5">
                Hotspots Mapped
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#FF7E6B]">
                8.8k+
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#6E8890] mt-0.5">
                Tonnes Seized
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#1FB6C9]">
                94%
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#6E8890] mt-0.5">
                AI Precision
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Prominent 3D Earth (Shifted slightly to the right, balanced size as requested) */}
        <div className="lg:col-span-7 relative h-[500px] sm:h-[580px] lg:h-[640px] w-full flex items-center justify-center lg:translate-x-4">
          <div className="w-full h-full relative bg-transparent">
            <EarthGlobe
              hotspots={hotspots}
              incidents={incidents}
              onNavigateToDetect={onNavigateToDetect}
              onRotationChange={(wpIdx) => setActiveWallpaperIdx(wpIdx)}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Atmospheric Biome Indicator & Wallpaper Selector (Floating at Bottom) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#1FB6C9]/20 shadow-md text-xs text-[#0B3A4A]">
        <div className="flex items-center gap-1.5">
          <Wind className="w-3.5 h-3.5 text-[#1FB6C9]" />
          <span className="text-[11px] font-semibold">
            Atmosphere: <strong className="text-[#0B3A4A]">{activeWallpaper.name}</strong>
          </span>
        </div>

        {/* 5 Dots for 5 Nature Wallpapers */}
        <div className="flex items-center gap-1.5 pl-2 border-l border-gray-200">
          {NATURE_WALLPAPERS.map((wp, idx) => (
            <button
              key={idx}
              onClick={() => setActiveWallpaperIdx(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                activeWallpaperIdx === idx
                  ? 'bg-[#1FB6C9] ring-2 ring-[#1FB6C9]/40 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              title={`Switch to ${wp.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
