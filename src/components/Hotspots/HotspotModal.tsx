import React, { useState } from 'react';
import { HotspotType } from '../../types';
import { X, ExternalLink, Radio, Video, ShieldAlert, Globe, Compass, CheckCircle2 } from 'lucide-react';

interface HotspotModalProps {
  hotspot: HotspotType | null;
  onClose: () => void;
}

export const HotspotModal: React.FC<HotspotModalProps> = ({ hotspot, onClose }) => {
  const [activeVideoMode, setActiveVideoMode] = useState<'live' | 'recorded'>('live');

  if (!hotspot) return null;

  const currentVideoId = activeVideoMode === 'live' 
    ? hotspot.youtubeFeed.videoId 
    : (hotspot.youtubeFeed.fallbackRecordedId || hotspot.youtubeFeed.videoId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#0B3A4A]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#F7F2E7] rounded-[36px] shadow-2xl border border-white/60 text-[#3A5A64]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar with Coralis Pebble Style */}
        <div className="sticky top-0 z-20 bg-[#F7F2E7]/95 backdrop-blur-md px-6 py-4 md:px-8 md:py-5 border-b border-[#1FB6C9]/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-[#1FB6C9] ring-4 ring-[#1FB6C9]/20 animate-pulse" />
            <div>
              <span className="text-[11px] uppercase tracking-widest font-semibold text-[#1FB6C9]">
                Global Biodiversity Hotspot
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#0B3A4A] leading-tight">
                {hotspot.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#E4F4F5] hover:bg-[#1FB6C9] hover:text-white text-[#0B3A4A] flex items-center justify-center transition-all duration-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {/* Geographical & Status Meta Pills */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E4F4F5] text-[#0B3A4A] text-xs font-medium border border-[#1FB6C9]/20">
              <Globe className="w-3.5 h-3.5 text-[#1FB6C9]" />
              {hotspot.country}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E4F4F5] text-[#0B3A4A] text-xs font-medium border border-[#1FB6C9]/20">
              <Compass className="w-3.5 h-3.5 text-[#1FB6C9]" />
              {hotspot.lat.toFixed(2)}°N, {hotspot.lng.toFixed(2)}°E
            </span>
            <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold ${
              hotspot.threatLevel === 'Critical' 
                ? 'bg-[#FF7E6B]/15 text-[#E86350] border border-[#FF7E6B]/30'
                : 'bg-[#2F7D58]/15 text-[#2F7D58] border border-[#2F7D58]/30'
            }`}>
              <ShieldAlert className="w-3.5 h-3.5" />
              Threat Level: {hotspot.threatLevel}
            </span>
          </div>

          {/* SECTION: EXPLORE WILDLIFE LIVE (Prompt Requirement 5.2) */}
          <div className="bg-[#0B3A4A] text-white rounded-[28px] p-5 md:p-7 shadow-xl border border-[#9BF0FB]/20 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-widest font-bold text-[#9BF0FB]">
                    Explore Wildlife Live
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#FF7E6B] text-white text-[10px] font-bold tracking-wider animate-pulse">
                    STREAM
                  </span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-light text-[#E4F4F5] mt-0.5">
                  {hotspot.youtubeFeed.title}
                </h3>
              </div>

              {/* Toggle Live vs Recorded Video */}
              <div className="flex items-center gap-2 bg-[#06202B] p-1.5 rounded-full border border-white/10 self-start sm:self-auto">
                <button
                  onClick={() => setActiveVideoMode('live')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    activeVideoMode === 'live'
                      ? 'bg-[#1FB6C9] text-white shadow-sm'
                      : 'text-[#E4F4F5]/70 hover:text-white'
                  }`}
                >
                  <Radio className="w-3 h-3 text-white" />
                  LIVE FEED
                </button>
                <button
                  onClick={() => setActiveVideoMode('recorded')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    activeVideoMode === 'recorded'
                      ? 'bg-[#1FB6C9] text-white shadow-sm'
                      : 'text-[#E4F4F5]/70 hover:text-white'
                  }`}
                >
                  <Video className="w-3 h-3 text-white" />
                  RECORDED 4K
                </button>
              </div>
            </div>

            {/* Responsive 16:9 YouTube Embed */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-inner">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${currentVideoId}?autoplay=0&rel=0`}
                title={hotspot.youtubeFeed.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#9BF0FB]/80">
              <div className="flex items-center gap-2">
                <span>Broadcast Source: <strong className="text-white">{hotspot.youtubeFeed.channelName}</strong></span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  activeVideoMode === 'live' ? 'bg-[#FF7E6B]/30 text-[#FF7E6B]' : 'bg-[#1FB6C9]/30 text-[#1FB6C9]'
                }`}>
                  Status: {activeVideoMode === 'live' ? 'LIVE TRANSMISSION' : 'VERIFIED ARCHIVE'}
                </span>
              </div>

              <a
                href={`https://www.youtube.com/watch?v=${currentVideoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#9BF0FB] hover:text-white transition-colors underline underline-offset-4"
              >
                Open in YouTube <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Geographical Overview & Biodiversity Significance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/90 p-6 rounded-[24px] border border-[#1FB6C9]/15 shadow-sm">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#1FB6C9]">
                Geographical Scope
              </span>
              <p className="mt-2 text-sm leading-relaxed text-[#3A5A64]">
                {hotspot.description}
              </p>
            </div>

            <div className="bg-white/90 p-6 rounded-[24px] border border-[#1FB6C9]/15 shadow-sm">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#2F7D58]">
                Biodiversity Significance
              </span>
              <p className="mt-2 text-sm leading-relaxed text-[#3A5A64]">
                {hotspot.biodiversitySignificance}
              </p>
            </div>
          </div>

          {/* Key Endangered Species Section */}
          <div>
            <div className="mb-4">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-[#1FB6C9]">
                Critical Species Under Threat
              </span>
              <h3 className="font-serif text-2xl font-medium text-[#0B3A4A]">
                Key Wildlife Targeted by Illegal Trade
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {hotspot.species.map((sp, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-[24px] overflow-hidden border border-[#1FB6C9]/15 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={sp.image}
                      alt={sp.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#0B3A4A]/80 backdrop-blur-md text-[#9BF0FB] text-[10px] font-bold tracking-wider uppercase border border-white/10">
                      {sp.citesAppendix}
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-serif text-lg font-medium text-[#0B3A4A]">
                      {sp.name}
                    </h4>
                    <p className="text-xs italic text-[#6E8890]">
                      {sp.scientificName}
                    </p>
                    <div className="mt-2 text-[11px] font-medium text-[#FF7E6B]">
                      {sp.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conservation Action in Effect */}
          <div className="bg-[#E4F4F5] p-6 rounded-[24px] border border-[#1FB6C9]/25 flex items-start gap-3.5">
            <CheckCircle2 className="w-5 h-5 text-[#2F7D58] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif text-lg font-semibold text-[#0B3A4A]">
                On-The-Ground Conservation Action
              </h4>
              <p className="mt-1 text-sm text-[#3A5A64]">
                {hotspot.conservationAction}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
