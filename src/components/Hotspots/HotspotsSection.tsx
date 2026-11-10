import React, { useState } from 'react';
import { HotspotType } from '../../types';
import { Radio, Video, Globe2, ShieldAlert, ArrowUpRight, Compass } from 'lucide-react';

interface HotspotsSectionProps {
  hotspots: HotspotType[];
  onSelectHotspot: (hotspot: HotspotType) => void;
}

export const HotspotsSection: React.FC<HotspotsSectionProps> = ({ hotspots, onSelectHotspot }) => {
  const [selectedThreatFilter, setSelectedThreatFilter] = useState<string>('all');

  const filteredHotspots = selectedThreatFilter === 'all'
    ? hotspots
    : hotspots.filter(h => h.threatLevel.toLowerCase() === selectedThreatFilter.toLowerCase());

  return (
    <section id="hotspots" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#E4F4F5] text-[#0B3A4A] text-xs uppercase font-bold tracking-widest border border-[#1FB6C9]/25 mb-3">
            Recognized Global Sanctuaries
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#0B3A4A] font-medium leading-tight">
            Earth's Biodiversity <span className="italic text-[#1FB6C9]">Hotspots</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#3A5A64] max-w-2xl">
            Critical biospheres containing the highest concentrations of endemic wildlife on Earth, facing intense commercial poaching and habitat fragmentation.
          </p>
        </div>

        {/* Threat Level Filters */}
        <div className="flex items-center gap-2 bg-white/80 p-1.5 rounded-full border border-[#1FB6C9]/20 self-start md:self-auto text-xs">
          <button
            onClick={() => setSelectedThreatFilter('all')}
            className={`px-4 py-1.5 rounded-full font-medium transition-all ${
              selectedThreatFilter === 'all' ? 'bg-[#0B3A4A] text-white shadow-sm' : 'text-[#6E8890] hover:text-[#0B3A4A]'
            }`}
          >
            All Hotspots ({hotspots.length})
          </button>
          <button
            onClick={() => setSelectedThreatFilter('critical')}
            className={`px-4 py-1.5 rounded-full font-medium transition-all ${
              selectedThreatFilter === 'critical' ? 'bg-[#FF7E6B] text-white shadow-sm' : 'text-[#6E8890] hover:text-[#FF7E6B]'
            }`}
          >
            Critical Threat
          </button>
          <button
            onClick={() => setSelectedThreatFilter('high')}
            className={`px-4 py-1.5 rounded-full font-medium transition-all ${
              selectedThreatFilter === 'high' ? 'bg-[#1FB6C9] text-white shadow-sm' : 'text-[#6E8890] hover:text-[#1FB6C9]'
            }`}
          >
            High Threat
          </button>
        </div>
      </div>

      {/* Hotspots Grid (Coralis Pebble / Arch Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredHotspots.map((hotspot) => (
          <div
            key={hotspot.id}
            onClick={() => onSelectHotspot(hotspot)}
            className="group cursor-pointer bg-white rounded-[32px] overflow-hidden shadow-md hover:shadow-2xl border border-white/80 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            {/* Image Header with Species Tag & Live Feed Pill */}
            <div className="relative h-60 overflow-hidden">
              <img
                src={hotspot.species[0]?.image || 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0'}
                alt={hotspot.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Live Wildlife Cam Badge */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B3A4A]/85 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#FF7E6B] animate-pulse" />
                <Radio className="w-3 h-3 text-[#FF7E6B]" />
                Live Cam Available
              </div>

              {/* Threat Level */}
              <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-[#0B3A4A] shadow-sm">
                {hotspot.threatLevel}
              </div>

              {/* Hotspot Location on Image Bottom */}
              <div className="absolute bottom-3.5 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#9BF0FB]">
                  {hotspot.region}
                </span>
                <h3 className="font-serif text-2xl font-medium text-white leading-tight">
                  {hotspot.name}
                </h3>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#3A5A64] line-clamp-2 leading-relaxed">
                  {hotspot.description}
                </p>

                {/* Key Species Pills */}
                <div className="mt-3.5 pt-3 border-t border-gray-100">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#6E8890] block mb-1.5">
                    Targeted Wildlife
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {hotspot.species.map((sp, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full bg-[#E4F4F5] text-[#0B3A4A] text-[11px] font-medium border border-[#1FB6C9]/20"
                      >
                        {sp.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#1FB6C9] group-hover:text-[#FF7E6B] transition-colors">
                <span>Inspect Wildlife & Live Video</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
