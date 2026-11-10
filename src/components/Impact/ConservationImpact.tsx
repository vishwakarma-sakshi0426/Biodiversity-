import React from 'react';
import { ShieldCheck, HeartHandshake, Award, FileText, Globe, CheckCircle } from 'lucide-react';

export const ConservationImpact: React.FC = () => {
  const partners = [
    {
      name: 'CITES',
      role: 'Convention on International Trade in Endangered Species',
      desc: 'Appendices I, II, and III trade compliance and scientific export validation.'
    },
    {
      name: 'TRAFFIC',
      role: 'Wildlife Trade Monitoring Network',
      desc: 'Global monitoring of legal and illegal trade in wild animals and plants.'
    },
    {
      name: 'INTERPOL',
      role: 'Environmental Security Programme',
      desc: 'Transnational policing support and coordinated red notice operations.'
    },
    {
      name: 'IUCN Red List',
      role: 'Species Survival Commission',
      desc: 'Authoritative global taxonomy assessment and extinction threat indexes.'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Asymmetric Header */}
      <div className="bg-[#0B3A4A] text-white rounded-[44px] p-8 sm:p-12 lg:p-16 shadow-2xl border border-[#9BF0FB]/20 relative overflow-hidden mb-16">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1FB6C9]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1FB6C9]/20 text-[#9BF0FB] text-xs uppercase font-bold tracking-widest border border-[#1FB6C9]/40">
              Ethical AI & Enforcement Charter
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.1]">
              Technology in service of <span className="italic text-[#9BF0FB]">living biodiversity.</span>
            </h2>
            <p className="text-base text-[#E4F4F5]/85 leading-relaxed">
              We uphold strict ethical standards. Our AI models function as investigative signals to assist authorized anti-poaching teams and customs authorities. We never automate judicial accusations; every digital alert adheres to the CITES verification workflow.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-1">
              <span className="font-serif text-3xl font-bold text-[#FF7E6B]">100%</span>
              <div className="text-xs text-[#E4F4F5]/80 font-medium">Non-Accusatory Verification Framework</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-1">
              <span className="font-serif text-3xl font-bold text-[#1FB6C9]">36k+</span>
              <div className="text-xs text-[#E4F4F5]/80 font-medium">CITES Listed Species Indexed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-1">
              <span className="font-serif text-3xl font-bold text-[#9BF0FB]">24/7</span>
              <div className="text-xs text-[#E4F4F5]/80 font-medium">Automated Content Monitoring</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-1">
              <span className="font-serif text-3xl font-bold text-white">0%</span>
              <div className="text-xs text-[#E4F4F5]/80 font-medium">Fabricated Intelligence Tolerance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Framework Partners */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] uppercase font-bold tracking-widest text-[#1FB6C9] block mb-1">
            Global Compliance Alignment
          </span>
          <h3 className="font-serif text-3xl font-medium text-[#0B3A4A]">
            Grounded in International Wildlife Law
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[28px] p-6 shadow-sm border border-[#1FB6C9]/15 hover:shadow-md transition-shadow space-y-2"
            >
              <span className="font-serif text-2xl font-bold text-[#0B3A4A] block">
                {p.name}
              </span>
              <div className="text-xs font-semibold text-[#1FB6C9] leading-snug">
                {p.role}
              </div>
              <p className="text-xs text-[#6E8890] leading-relaxed pt-1">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

