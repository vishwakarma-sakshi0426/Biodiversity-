import React, { useState } from 'react';
import { EarthGlobe, SelectedMarkerData } from './EarthGlobe';
import { HotspotType, IncidentType } from '../../types';
import { Layers, Eye, EyeOff, Globe2, ShieldAlert, Sparkles, Compass, MapPin } from 'lucide-react';

interface GlobeSectionProps {
  hotspots: HotspotType[];
  incidents: IncidentType[];
  onSelectMarker: (data: SelectedMarkerData) => void;
  selectedMarkerId?: string | null;
}

export const GlobeSection: React.FC<GlobeSectionProps> = ({
  hotspots,
  incidents,
  onSelectMarker,
  selectedMarkerId
}) => {
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [showIncidents, setShowIncidents] = useState<boolean>(true);

  return (
    <section id="earth-explore" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#E4F4F5] text-[#0B3A4A] text-xs uppercase font-bold tracking-widest border border-[#1FB6C9]/25 mb-3">
            Planetary Wildlife Intelligence
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#0B3A4A] font-medium leading-tight">
            Interactive <span className="italic text-[#1FB6C9]">Earth Exploration</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#3A5A64] max-w-xl">
            Navigate the global biosphere. Click markers to inspect live wildlife camera feeds, critical habitat parameters, and verified transnational seizure records.
          </p>
        </div>

        {/* 5.4 Interactive Map Legend & Layer Visibility Controls */}
        <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-3xl border border-[#1FB6C9]/25 shadow-md flex flex-wrap items-center gap-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#0B3A4A] flex items-center gap-1.5 pl-2 pr-1">
            <Layers className="w-4 h-4 text-[#1FB6C9]" />
            <span>Map Layers</span>
          </div>

          {/* Hotspots Toggle */}
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              showHotspots
                ? 'bg-[#E4F4F5] text-[#0B3A4A] border border-[#1FB6C9]/40 shadow-sm'
                : 'bg-gray-100 text-[#6E8890] border border-gray-200'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#1FB6C9] ring-2 ring-[#1FB6C9]/40" />
            <span>Hotspots ({hotspots.length})</span>
            {showHotspots ? <Eye className="w-3.5 h-3.5 text-[#1FB6C9]" /> : <EyeOff className="w-3.5 h-3.5 text-[#6E8890]" />}
          </button>

          {/* Incidents Toggle */}
          <button
            onClick={() => setShowIncidents(!showIncidents)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              showIncidents
                ? 'bg-[#FF7E6B]/15 text-[#E86350] border border-[#FF7E6B]/40 shadow-sm'
                : 'bg-gray-100 text-[#6E8890] border border-gray-200'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF7E6B] ring-2 ring-[#FF7E6B]/40" />
            <span>Seizures & Incidents ({incidents.length})</span>
            {showIncidents ? <Eye className="w-3.5 h-3.5 text-[#FF7E6B]" /> : <EyeOff className="w-3.5 h-3.5 text-[#6E8890]" />}
          </button>
        </div>
      </div>

      {/* 3D Earth Exploration Stage (Coralis Pebble Frame) */}
      <div className="relative w-full h-[620px] sm:h-[720px] rounded-[48px] overflow-hidden bg-gradient-to-b from-[#06202B] via-[#0B3A4A] to-[#082835] shadow-2xl border-4 border-white">
        <EarthGlobe
          hotspots={hotspots}
          incidents={incidents}
          showHotspots={showHotspots}
          showIncidents={showIncidents}
          onSelectMarker={onSelectMarker}
          selectedMarkerId={selectedMarkerId}
          isHeroMode={false}
          className="w-full h-full"
        />

        {/* Floating Instruction / Navigation Pill */}
        <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-2 bg-[#0B3A4A]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white text-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#9BF0FB]" />
          <span>Click any marker on Earth to open full intelligence panel</span>
        </div>
      </div>
    </section>
  );
};
