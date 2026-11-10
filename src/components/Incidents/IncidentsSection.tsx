import React, { useState } from 'react';
import { IncidentType } from '../../types';
import { ShieldAlert, MapPin, Calendar, Scale, ArrowUpRight, CheckCircle2, Building2 } from 'lucide-react';

interface IncidentsSectionProps {
  incidents: IncidentType[];
  onSelectIncident: (incident: IncidentType) => void;
}

export const IncidentsSection: React.FC<IncidentsSectionProps> = ({ incidents, onSelectIncident }) => {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  const categories = [
    'all',
    'Wildlife Trafficking Seizures',
    'Illegal Wildlife Trafficking',
    'Animal Smuggling',
    'Protected Species Trade'
  ];

  const filteredIncidents = selectedCategoryFilter === 'all'
    ? incidents
    : incidents.filter(i => i.category === selectedCategoryFilter);

  return (
    <section id="incidents" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF7E6B]/15 text-[#E86350] text-xs uppercase font-bold tracking-widest border border-[#FF7E6B]/30 mb-3">
            CITES & Interpol Verified Enforcements
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#0B3A4A] font-medium leading-tight">
            Documented <span className="italic text-[#FF7E6B]">Wildlife Crime</span> Seizures
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#3A5A64] max-w-2xl">
            Historical enforcement actions and intelligence records documented by international law enforcement agencies, customs departments, and TRAFFIC.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 bg-white/80 p-1.5 rounded-full border border-[#FF7E6B]/25 text-xs">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
                selectedCategoryFilter === cat
                  ? 'bg-[#FF7E6B] text-white shadow-sm'
                  : 'text-[#6E8890] hover:text-[#0B3A4A]'
              }`}
            >
              {cat === 'all' ? 'All Incidents' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Incidents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {filteredIncidents.map((incident) => (
          <div
            key={incident.id}
            onClick={() => onSelectIncident(incident)}
            className="group cursor-pointer bg-white rounded-[32px] p-6 sm:p-7 shadow-md hover:shadow-2xl border border-[#FF7E6B]/20 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Top Tag Row */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF7E6B]/15 text-[#E86350] text-[11px] font-bold uppercase tracking-wider">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {incident.category}
                </span>

                <div className="flex items-center gap-2 text-[11px] text-[#6E8890]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#1FB6C9]" />
                    {incident.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="flex items-center gap-1 font-medium text-[#2F7D58]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl font-medium text-[#0B3A4A] group-hover:text-[#FF7E6B] transition-colors leading-snug">
                {incident.title}
              </h3>

              {/* Location & Organization */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#3A5A64]">
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#FF7E6B]" />
                  {incident.locationName}, {incident.country}
                </span>
              </div>

              {/* Seizure Metric Box */}
              <div className="p-3.5 rounded-2xl bg-[#F7F2E7] border border-[#1FB6C9]/15 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#6E8890] block">
                    Intercepted Volume
                  </span>
                  <span className="font-serif text-lg font-semibold text-[#0B3A4A]">
                    {incident.seizureQuantity}
                  </span>
                </div>
                <Scale className="w-5 h-5 text-[#FF7E6B]" />
              </div>

              {/* Short snippet */}
              <p className="text-xs text-[#6E8890] line-clamp-2 leading-relaxed">
                {incident.description}
              </p>
            </div>

            {/* Footer with Source Agency & Action */}
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#6E8890] truncate max-w-[240px] flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#1FB6C9]" />
                {incident.sourceOrganization}
              </span>

              <span className="font-semibold text-[#FF7E6B] group-hover:text-[#E86350] inline-flex items-center gap-1">
                View Case Dossier <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
