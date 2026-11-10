import React, { useState, useEffect } from 'react';
import { Globe2, ShieldAlert, Sparkles, BarChart2, Menu, X, Compass } from 'lucide-react';

interface NavigationProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate, activeSection = 'hero' }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Explore Earth', id: 'earth-explore' },
    { label: 'Biodiversity Hotspots', id: 'hotspots' },
    { label: 'Reported Cases', id: 'incidents' },
    { label: 'Detect Wildlife Trade', id: 'detect' },
    { label: 'Analytics', id: 'dashboard' },
    { label: 'Our Mission', id: 'mission' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F7F2E7]/90 backdrop-blur-md py-3.5 shadow-sm border-b border-[#1FB6C9]/15'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo (Coralis Typography) */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-9 h-9 rounded-full bg-[#1FB6C9] flex items-center justify-center text-white shadow-md shadow-[#1FB6C9]/30 group-hover:scale-105 transition-transform">
            <Globe2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-serif text-2xl font-semibold tracking-tight text-[#0B3A4A] leading-none block">
              WILD<span className="text-[#1FB6C9]">INTEL</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest font-bold text-[#6E8890] block mt-0.5">
              Global Wildlife Intelligence
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-xs font-semibold uppercase tracking-wider text-[#0B3A4A] hover:text-[#1FB6C9] transition-colors relative py-1"
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1FB6C9] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Right CTA Button (Coralis Rounded Coral CTA) */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('detect')}
            className="px-5 py-2.5 rounded-full bg-[#FF7E6B] hover:bg-[#E86350] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#FF7E6B]/30 transition-all hover:scale-105 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Detection Tool
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-full bg-white/80 border border-[#1FB6C9]/20 flex items-center justify-center text-[#0B3A4A]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F7F2E7] border-b border-[#1FB6C9]/20 px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="block w-full text-left py-2 text-sm font-semibold uppercase tracking-wider text-[#0B3A4A] hover:text-[#1FB6C9]"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => handleLinkClick('detect')}
              className="w-full py-3 rounded-full bg-[#FF7E6B] text-white text-xs font-bold uppercase tracking-wider shadow-md text-center"
            >
              AI Detection Tool
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
