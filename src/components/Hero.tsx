import React, { useState } from 'react';
import { EarthGlobe } from './Globe/EarthGlobe';
import { HotspotType, IncidentType } from '../types';
import { Sparkles, ChevronRight, Wind, ChevronDown } from 'lucide-react';
import { TranslationDictionary } from '../utils/translations';

export interface NatureWallpaper {
  name: string;
  category: 'blue' | 'green' | 'dark' | 'amber';
  url: string;
  biome: string;
}

// User-provided wallpapers from user upload
export const NATURE_WALLPAPERS: NatureWallpaper[] = [
  {
    name: 'Glacial Alpine Lagoon',
    category: 'blue',
    url: '/wallpapers/wallpaper-1-alpine-lake.jpg',
    biome: 'Pristine Montane Glacial Lake & Pine Forest'
  },
  {
    name: 'Temperate Rainforest Fjord',
    category: 'dark',
    url: '/wallpapers/wallpaper-2-misty-fjord.jpg',
    biome: 'Misty Coastal Fjord & Coniferous Canopy'
  },
  {
    name: 'Serpentine Alpine Ridge',
    category: 'green',
    url: '/wallpapers/wallpaper-3-winding-forest.jpg',
    biome: 'High-Altitude Winding Forest Pass'
  },
  {
    name: 'Coralis Coastal Lagoon',
    category: 'blue',
    url: '/wallpapers/wallpaper-4-turquoise-coast.jpg',
    biome: 'Pristine Turquoise Shore & Shallow Reef'
  },
  {
    name: 'Emerald Gorge Sanctuary',
    category: 'green',
    url: '/wallpapers/wallpaper-5-emerald-bridge.jpg',
    biome: 'Ancient Forest River Canyon & Arched Pass'
  },
  {
    name: 'Pelagic Marine Haven',
    category: 'blue',
    url: '/wallpapers/wallpaper-6-ocean-turtles.jpg',
    biome: 'Sunlit Deep Ocean & Wild Sea Turtle Sanctuary'
  },
  {
    name: 'Sunbeam Primeval Forest',
    category: 'amber',
    url: '/wallpapers/wallpaper-7-sunbeam-forest.jpg',
    biome: 'Morning Sunbeams & Deciduous Canopy Trail'
  }
];

interface HeroProps {
  hotspots: HotspotType[];
  incidents: IncidentType[];
  onNavigateToDetect: () => void;
  onNavigateToMission: () => void;
  dict?: TranslationDictionary;
  darkMode?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  hotspots,
  incidents,
  onNavigateToDetect,
  onNavigateToMission,
  dict,
  darkMode = false
}) => {
  const [activeWallpaperIdx, setActiveWallpaperIdx] = useState<number>(0);

  const activeWallpaper = NATURE_WALLPAPERS[activeWallpaperIdx] || NATURE_WALLPAPERS[0];

  const handleScrollDown = () => {
    const el = document.getElementById('mission');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    }
  };

  const handleNextWallpaper = () => {
    setActiveWallpaperIdx(prev => (prev + 1) % NATURE_WALLPAPERS.length);
  };

  return (
    <section className={`relative h-screen max-h-screen w-full flex flex-col justify-between overflow-hidden pt-16 pb-3 transition-colors duration-300 select-none ${
      darkMode ? 'text-[#E4F4F5]' : 'text-[#3A5A64]'
    }`}>
      {/* Dynamic Nature Wallpapers Layer: Using the user's uploaded images */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {NATURE_WALLPAPERS.map((wp, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              activeWallpaperIdx === idx ? 'opacity-90' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${wp.url})` }}
          />
        ))}

        {/* Directional Vignette Gradient Wash */}
        <div className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${
          darkMode
            ? 'bg-gradient-to-r from-[#061822]/95 via-[#061822]/65 to-[#061822]/25'
            : 'bg-gradient-to-r from-[#F7F2E7]/92 via-[#F7F2E7]/55 to-[#F7F2E7]/20'
        }`} />
      </div>

      {/* Main Grid: Fits 100% within initial screen without scrolling (User Request: "till yaha tak same screen mein chiaye") */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center flex-1 my-auto min-h-0">
        {/* Left Column: Clean Editorial Headline & Content */}
        <div className="lg:col-span-5 space-y-3.5 lg:pr-2 text-left z-20">
          {/* Eyebrow Pill Badge */}
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-widest shadow-sm ${
            darkMode
              ? 'bg-[#0B2533]/90 border-[#1FB6C9]/40 text-[#9BF0FB]'
              : 'bg-[#E4F4F5] border-[#1FB6C9]/25 text-[#0B3A4A]'
          }`}>
            <span className="w-2 h-2 rounded-full bg-[#1FB6C9] animate-pulse" />
            {dict?.heroEyebrow || 'GLOBAL WILDLIFE INTELLIGENCE'}
          </div>

          {/* Cormorant Garamond Main Headline: Bold & Clean (Size increased by 2px per user request) */}
          <h1 className={`font-serif text-[32px] sm:text-[38px] lg:text-[48px] xl:text-[54px] font-bold leading-[1.08] tracking-tight ${
            darkMode ? 'text-white' : 'text-[#0B3A4A]'
          }`}>
            {dict?.heroTitleLine1 || 'Protect the wild.'}
            <br />
            <span className={`italic font-bold relative ${darkMode ? 'text-[#E4F4F5]' : 'text-[#0B3A4A]'}`}>
              {dict?.heroTitleLine2Pre || 'Preserve our '}
              <span className="text-[#1FB6C9] not-italic">
                {dict?.heroTitleLine2Highlight || 'living Earth.'}
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className={`text-xs sm:text-sm font-medium leading-relaxed max-w-md ${
            darkMode ? 'text-[#CBD5E1]' : 'text-[#3A5A64]'
          }`}>
            {dict?.heroDescription || "Explore Earth's biodiversity hotspots, uncover reported wildlife crime incidents, and identify the digital traces of illegal wildlife trade."}
          </p>

          {/* Action CTAs */}
          <div className="pt-1 flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToDetect}
              className="px-6 py-2.5 rounded-full bg-[#FF7E6B] hover:bg-[#E86350] text-white text-xs font-bold uppercase tracking-widest shadow-xl shadow-[#FF7E6B]/35 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{dict?.heroCtaDetect || 'DETECT WILDLIFE TRADE'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToMission}
              className={`text-xs font-semibold uppercase tracking-widest transition-colors underline underline-offset-8 decoration-[#1FB6C9]/60 hover:decoration-[#1FB6C9] cursor-pointer ${
                darkMode ? 'text-[#9BF0FB] hover:text-white' : 'text-[#0B3A4A] hover:text-[#1FB6C9]'
              }`}
            >
              {dict?.heroCtaMission || 'Discover Our Mission'}
            </button>
          </div>

          {/* Stats Bar */}
          <div className={`pt-3.5 grid grid-cols-3 gap-3 border-t max-w-sm ${
            darkMode ? 'border-[#1FB6C9]/25' : 'border-[#1FB6C9]/20'
          }`}>
            <div>
              <div className={`font-serif text-2xl lg:text-3xl font-bold ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                {dict?.statHotspots || '10+'}
              </div>
              <div className={`text-[9px] uppercase font-bold tracking-wider mt-0.5 ${
                darkMode ? 'text-[#8AAFB8]' : 'text-[#6E8890]'
              }`}>
                {dict?.statHotspotsLabel || 'Hotspots Mapped'}
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl lg:text-3xl font-bold text-[#FF7E6B]">
                {dict?.statSeized || '8.8k+'}
              </div>
              <div className={`text-[9px] uppercase font-bold tracking-wider mt-0.5 ${
                darkMode ? 'text-[#8AAFB8]' : 'text-[#6E8890]'
              }`}>
                {dict?.statSeizedLabel || 'Tonnes Seized'}
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl lg:text-3xl font-bold text-[#1FB6C9]">
                {dict?.statPrecision || '94%'}
              </div>
              <div className={`text-[9px] uppercase font-bold tracking-wider mt-0.5 ${
                darkMode ? 'text-[#8AAFB8]' : 'text-[#6E8890]'
              }`}>
                {dict?.statPrecisionLabel || 'AI Precision'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Prominent 3D Earth (Sized to fill available height matching the user's red circle) */}
        <div className="lg:col-span-7 relative h-[60vh] sm:h-[68vh] lg:h-[78vh] xl:h-[82vh] max-h-[820px] w-full flex items-center justify-center lg:translate-x-3 overflow-visible">
          <div className="w-full h-full relative bg-transparent overflow-visible">
            <EarthGlobe
              hotspots={hotspots}
              incidents={incidents}
              onNavigateToDetect={onNavigateToDetect}
              onRotationChange={(wpIdx) => setActiveWallpaperIdx(wpIdx)}
              onNextWallpaper={handleNextWallpaper}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Bottom Unified Control Dock: 100% visible on initial screen without scrolling */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 z-20 flex items-center justify-between pb-1 select-none shrink-0">
        {/* Left: Scroll Down Action Button */}
        <button
          onClick={handleScrollDown}
          className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full border backdrop-blur-md shadow-sm transition-all hover:scale-105 cursor-pointer text-xs font-semibold ${
            darkMode
              ? 'bg-[#0B2533]/90 border-[#1FB6C9]/30 text-white hover:border-[#1FB6C9]'
              : 'bg-white/90 border-[#1FB6C9]/25 text-[#0B3A4A] hover:border-[#1FB6C9]'
          }`}
          title="Scroll to Mission & Impact"
        >
          <span className="w-2 h-2 rounded-full bg-[#1FB6C9] group-hover:scale-125 transition-transform" />
          <span className="uppercase tracking-widest text-[10px] font-bold">SCROLL DOWN</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#1FB6C9] animate-bounce" />
        </button>

        {/* Center: Atmospheric Biome Indicator & Wallpaper Selector */}
        <div className={`hidden sm:flex items-center gap-2.5 backdrop-blur-md px-3.5 py-1.5 rounded-full border shadow-md text-xs transition-colors duration-300 ${
          darkMode
            ? 'bg-[#0B2533]/85 border-[#1FB6C9]/30 text-[#E4F4F5]'
            : 'bg-white/85 border-[#1FB6C9]/20 text-[#0B3A4A]'
        }`}>
          <div className="flex items-center gap-1.5">
            <Wind className="w-3.5 h-3.5 text-[#1FB6C9]" />
            <span className="text-[11px] font-semibold">
              Atmosphere: <strong className={darkMode ? 'text-[#9BF0FB]' : 'text-[#0B3A4A]'}>{activeWallpaper.name}</strong>
            </span>
          </div>

          {/* 7 Dots for 7 Nature Wallpapers */}
          <div className={`flex items-center gap-1.5 pl-2 border-l ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            {NATURE_WALLPAPERS.map((wp, idx) => (
              <button
                key={idx}
                onClick={() => setActiveWallpaperIdx(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  activeWallpaperIdx === idx
                    ? 'bg-[#1FB6C9] ring-2 ring-[#1FB6C9]/40 scale-125'
                    : darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                title={`Switch to ${wp.name}`}
              />
            ))}
          </div>
        </div>

        {/* Spacer to keep center Atmosphere dock balanced (Interactive 3D Earth text removed per user request) */}
        <div className="hidden sm:block w-28 pointer-events-none" />
      </div>
    </section>
  );
};
