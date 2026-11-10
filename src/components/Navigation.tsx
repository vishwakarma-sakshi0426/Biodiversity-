import React, { useState, useEffect } from 'react';
import { Globe2, Sparkles, BarChart3, Menu, X } from 'lucide-react';

export type AppPage = 'home' | 'detect' | 'dashboard';

interface NavigationProps {
  currentPage: AppPage;
  onPageChange: (page: AppPage) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: AppPage; icon?: any }[] = [
    { label: 'Earth & Mission', page: 'home' },
    { label: 'Wildlife Trade Detection', page: 'detect', icon: Sparkles },
    { label: 'Analytics Dashboard', page: 'dashboard', icon: BarChart3 },
  ];

  const handleLinkClick = (page: AppPage) => {
    onPageChange(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F7F2E7]/92 backdrop-blur-md py-3.5 shadow-sm border-b border-[#1FB6C9]/15'
          : 'bg-[#F7F2E7]/80 backdrop-blur-sm py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo (Coralis Typography) */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
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
        <nav className="hidden md:flex items-center gap-2 bg-white/70 p-1.5 rounded-full border border-[#1FB6C9]/20 shadow-sm">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleLinkClick(link.page)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0B3A4A] text-white shadow-md'
                    : 'text-[#3A5A64] hover:text-[#0B3A4A] hover:bg-white/80'
                }`}
              >
                {link.icon && <link.icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#9BF0FB]' : 'text-[#1FB6C9]'}`} />}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button (Direct access to AI Detection Tool) */}
        <div className="hidden sm:flex items-center gap-3">
          {currentPage !== 'detect' ? (
            <button
              onClick={() => handleLinkClick('detect')}
              className="px-5 py-2.5 rounded-full bg-[#FF7E6B] hover:bg-[#E86350] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#FF7E6B]/30 transition-all hover:scale-105 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Detection Tool
            </button>
          ) : (
            <button
              onClick={() => handleLinkClick('dashboard')}
              className="px-5 py-2.5 rounded-full bg-[#1FB6C9] hover:bg-[#1693A3] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#1FB6C9]/30 transition-all hover:scale-105 flex items-center gap-1.5 cursor-pointer"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              View Analytics
            </button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
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
        <div className="md:hidden bg-[#F7F2E7] border-b border-[#1FB6C9]/20 px-6 py-5 space-y-3 shadow-xl">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => handleLinkClick(link.page)}
              className={`block w-full text-left py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider ${
                currentPage === link.page
                  ? 'bg-[#0B3A4A] text-white'
                  : 'text-[#0B3A4A] hover:bg-white/60'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
