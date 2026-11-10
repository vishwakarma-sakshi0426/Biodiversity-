import React from 'react';
import { IncidentType } from '../../types';
import { X, ExternalLink, ShieldAlert, Calendar, MapPin, Scale, Building2, CheckCircle2 } from 'lucide-react';

interface IncidentModalProps {
  incident: IncidentType | null;
  onClose: () => void;
}

export const IncidentModal: React.FC<IncidentModalProps> = ({ incident, onClose }) => {
  if (!incident) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#0B3A4A]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#F7F2E7] rounded-[36px] shadow-2xl border border-white/60 text-[#3A5A64]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 bg-[#F7F2E7]/95 backdrop-blur-md px-6 py-4 md:px-8 md:py-5 border-b border-[#FF7E6B]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-[#FF7E6B] ring-4 ring-[#FF7E6B]/20 animate-pulse" />
            <div>
              <span className="text-[11px] uppercase tracking-widest font-semibold text-[#FF7E6B]">
                Documented Wildlife Trade Incident
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#0B3A4A] leading-tight">
                {incident.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#E4F4F5] hover:bg-[#FF7E6B] hover:text-white text-[#0B3A4A] flex items-center justify-center transition-all duration-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {/* Key Incident Metadata Pills */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF7E6B]/15 text-[#E86350] text-xs font-semibold border border-[#FF7E6B]/30">
              <ShieldAlert className="w-3.5 h-3.5" />
              {incident.category}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E4F4F5] text-[#0B3A4A] text-xs font-medium border border-[#1FB6C9]/20">
              <MapPin className="w-3.5 h-3.5 text-[#1FB6C9]" />
              {incident.locationName}, {incident.country}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E4F4F5] text-[#0B3A4A] text-xs font-medium border border-[#1FB6C9]/20">
              <Calendar className="w-3.5 h-3.5 text-[#1FB6C9]" />
              {incident.date}
            </span>
            {incident.isVerified && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#2F7D58]/15 text-[#2F7D58] text-xs font-semibold border border-[#2F7D58]/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Intelligence Record
              </span>
            )}
          </div>

          {/* Highlight Card: Seizure Volume & Species Involved */}
          <div className="bg-white p-6 rounded-[28px] border border-[#FF7E6B]/25 shadow-sm space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF7E6B] flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" /> Seizure Metric & Intercepted Volume
              </span>
              <div className="font-serif text-2xl font-semibold text-[#0B3A4A] mt-1">
                {incident.seizureQuantity}
              </div>
            </div>

            <div className="pt-3 border-t border-[#1FB6C9]/10">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#3A5A64]">
                Targeted Species
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {incident.speciesInvolved.map((sp, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-[#E4F4F5] text-[#0B3A4A] text-xs font-medium border border-[#1FB6C9]/25"
                  >
                    {sp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Incident Description */}
          <div className="bg-white/90 p-6 rounded-[24px] border border-[#1FB6C9]/15 shadow-sm">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#0B3A4A]">
              Operational Intelligence Summary
            </span>
            <p className="mt-2 text-sm leading-relaxed text-[#3A5A64]">
              {incident.description}
            </p>
          </div>

          {/* Source Organization & Verified News Link (Prompt Requirement) */}
          <div className="bg-[#0B3A4A] text-white p-6 rounded-[28px] shadow-lg border border-[#9BF0FB]/20 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#9BF0FB] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> Authoritative Source Agency
                </span>
                <div className="font-serif text-lg font-medium text-white mt-1">
                  {incident.sourceOrganization}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[11px] text-[#E4F4F5]/70 uppercase tracking-wider">
                Documented Case Reference & Media Dispatch
              </div>
              <div className="font-medium text-sm text-[#9BF0FB] mt-0.5">
                "{incident.newsArticleTitle}"
              </div>
              <div className="mt-3">
                <a
                  href={incident.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF7E6B] hover:bg-[#E86350] text-white text-xs font-semibold shadow-md transition-all hover:scale-105"
                >
                  View Verified Source Report <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
