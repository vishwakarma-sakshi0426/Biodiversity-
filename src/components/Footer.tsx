import React from 'react';
import { Globe2, ShieldAlert, Heart, ExternalLink, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B3A4A] text-white pt-20 pb-12 border-t border-[#1FB6C9]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand & Charter (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#1FB6C9] flex items-center justify-center text-white shadow-lg">
                <Globe2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none block">
                  WILD<span className="text-[#1FB6C9]">INTEL</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#9BF0FB] block mt-0.5">
                  Planetary Wildlife Intelligence
                </span>
              </div>
            </div>

            <p className="text-xs text-[#E4F4F5]/75 leading-relaxed pr-4">
              An open planetary platform combining satellite Earth observation, verified historical crime datasets, and ethical multimodal AI to detect and combat digital illegal wildlife trade.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-[11px] border border-white/10">
                <ShieldAlert className="w-3.5 h-3.5 text-[#FF7E6B]" />
                Emergency Hotline: TRAFFIC & WCCB Portal
              </span>
            </div>
          </div>

          {/* Col 2: Platform Sections (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs uppercase font-bold tracking-widest text-[#9BF0FB] block">
              Platform Modules
            </span>
            <ul className="space-y-2 text-xs text-[#E4F4F5]/80">
              <li>
                <button
                  onClick={() => onNavigate('earth-explore')}
                  className="hover:text-[#1FB6C9] transition-colors"
                >
                  Interactive 3D Earth Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('hotspots')}
                  className="hover:text-[#1FB6C9] transition-colors"
                >
                  Global Biodiversity Hotspots
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('incidents')}
                  className="hover:text-[#1FB6C9] transition-colors"
                >
                  Historical Crime Seizures
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('detect')}
                  className="hover:text-[#1FB6C9] transition-colors"
                >
                  AI Wildlife Trade Detection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-[#1FB6C9] transition-colors"
                >
                  Enforcement Analytics & KPIs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Standards (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs uppercase font-bold tracking-widest text-[#9BF0FB] block">
              Regulatory Frameworks
            </span>
            <ul className="space-y-2 text-xs text-[#E4F4F5]/80">
              <li>
                <a
                  href="https://cites.org/eng/app/appendices.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1FB6C9] transition-colors inline-flex items-center gap-1"
                >
                  CITES Appendices I, II, III <ExternalLink className="w-3 h-3 text-white/50" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.traffic.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1FB6C9] transition-colors inline-flex items-center gap-1"
                >
                  TRAFFIC Wildlife Trade Network <ExternalLink className="w-3 h-3 text-white/50" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.interpol.int/Crimes/Environmental-crime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1FB6C9] transition-colors inline-flex items-center gap-1"
                >
                  Interpol Environmental Security <ExternalLink className="w-3 h-3 text-white/50" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.iucnredlist.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1FB6C9] transition-colors inline-flex items-center gap-1"
                >
                  IUCN Red List of Threatened Species <ExternalLink className="w-3 h-3 text-white/50" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Action (2 cols) */}
          <div className="lg:col-span-2 flex flex-col justify-between items-start md:items-end">
            <button
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-[#1FB6C9] hover:bg-[#1693A3] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
            <div className="text-[11px] text-[#9BF0FB]/70 mt-6 md:mt-0 text-left md:text-right">
              Built for Global Wildlife Intelligence Hackathon 2026
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E4F4F5]/60">
          <div>
            © {new Date().getFullYear()} WILDINTEL Platform. All rights reserved. Grounded in CITES Appendices and TRAFFIC intelligence.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Ethical AI Disclosure</span>
            <span>•</span>
            <span>Data Protection</span>
            <span>•</span>
            <span>Wildlife Conservation Charter</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
