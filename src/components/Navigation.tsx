import React, { useState, useEffect, useRef } from 'react';
import { Globe2, Sparkles, BarChart3, Layers, Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { SupportedLanguage, TranslationDictionary } from '../utils/translations';

export type AppPage = 'home' | 'detect' | 'dashboard' | 'architecture';

interface NavigationProps {
  currentPage: AppPage;
  onPageChange: (page: AppPage) => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  language?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  dict?: TranslationDictionary;
}

const LANGUAGES_LIST: { code: SupportedLanguage; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'id', label: 'Bahasa', flag: '🇮🇩' },
];

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onPageChange,
  darkMode = false,
  onToggleDarkMode,
  language = 'en',
  onLanguageChange,
  dict
}) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks: { label: string; page: AppPage; icon?: any }[] = [
    { label: dict?.navEarth || 'Earth & Mission', page: 'home' },
    { label: dict?.navDetect || 'Wildlife Trade Detection', page: 'detect', icon: Sparkles },
    { label: dict?.navDashboard || 'Analytics Dashboard', page: 'dashboard', icon: BarChart3 },
    { label: dict?.navArchitecture || 'Architecture & Research', page: 'architecture', icon: Layers },
  ];

  const handleLinkClick = (page: AppPage) => {
    onPageChange(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentLangObj = LANGUAGES_LIST.find(l => l.code === language) || LANGUAGES_LIST[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? 'bg-[#061822]/92 backdrop-blur-md py-3 shadow-md border-b border-[#1FB6C9]/20'
            : 'bg-[#F7F2E7]/92 backdrop-blur-md py-3 shadow-sm border-b border-[#1FB6C9]/15'
          : darkMode
            ? 'bg-[#061822]/75 backdrop-blur-sm py-3.5 border-b border-transparent'
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
            <span className={`font-serif text-2xl font-semibold tracking-tight leading-none block ${
              darkMode ? 'text-white' : 'text-[#0B3A4A]'
            }`}>
              WILD<span className="text-[#1FB6C9]">INTEL</span>
            </span>
            <span className={`text-[9px] uppercase tracking-widest font-bold block mt-0.5 ${
              darkMode ? 'text-[#9BF0FB]' : 'text-[#6E8890]'
            }`}>
              {dict?.brandSubtitle || 'Global Wildlife Intelligence'}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className={`hidden lg:flex items-center gap-1.5 p-1.5 rounded-full border shadow-sm transition-colors duration-300 ${
          darkMode
            ? 'bg-[#0B2533]/90 border-[#1FB6C9]/30'
            : 'bg-white/70 border-[#1FB6C9]/20'
        }`}>
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleLinkClick(link.page)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? darkMode
                      ? 'bg-[#1FB6C9] text-white shadow-md shadow-[#1FB6C9]/30'
                      : 'bg-[#0B3A4A] text-white shadow-md'
                    : darkMode
                      ? 'text-[#B0D1DA] hover:text-white hover:bg-white/10'
                      : 'text-[#3A5A64] hover:text-[#0B3A4A] hover:bg-white/80'
                }`}
              >
                {link.icon && (
                  <link.icon className={`w-3.5 h-3.5 ${
                    isActive ? (darkMode ? 'text-white' : 'text-[#9BF0FB]') : 'text-[#1FB6C9]'
                  }`} />
                )}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Utility Controls: Language Selector, Dark Mode Toggle, AI Tool CTA */}
        <div className="hidden sm:flex items-center gap-2.5">
          
          {/* Language Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer shadow-xs ${
                darkMode
                  ? 'bg-[#0B2533] border-[#1FB6C9]/30 text-[#E4F4F5] hover:bg-[#123648]'
                  : 'bg-white/80 border-[#1FB6C9]/25 text-[#0B3A4A] hover:bg-white'
              }`}
              title="Select Language"
            >
              <Languages className="w-3.5 h-3.5 text-[#1FB6C9]" />
              <span>{currentLangObj.flag} {currentLangObj.code.toUpperCase()}</span>
            </button>

            {langDropdownOpen && (
              <div className={`absolute right-0 mt-2 w-36 rounded-2xl shadow-xl border py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                darkMode
                  ? 'bg-[#0B2533] border-[#1FB6C9]/30 text-white'
                  : 'bg-white border-[#1FB6C9]/20 text-[#0B3A4A]'
              }`}>
                {LANGUAGES_LIST.map((langItem) => (
                  <button
                    key={langItem.code}
                    onClick={() => {
                      onLanguageChange?.(langItem.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs flex items-center justify-between transition-colors ${
                      language === langItem.code
                        ? 'font-bold bg-[#1FB6C9]/15 text-[#1FB6C9]'
                        : darkMode ? 'hover:bg-white/10' : 'hover:bg-[#E4F4F5]'
                    }`}
                  >
                    <span>{langItem.flag} {langItem.label}</span>
                    {language === langItem.code && <span className="w-1.5 h-1.5 rounded-full bg-[#1FB6C9]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark Mode / Light Mode Toggle Button */}
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-full border transition-all cursor-pointer shadow-xs ${
                darkMode
                  ? 'bg-[#0B2533] border-[#1FB6C9]/30 text-[#9BF0FB] hover:text-white hover:bg-[#123648]'
                  : 'bg-white/80 border-[#1FB6C9]/25 text-[#0B3A4A] hover:text-[#1FB6C9] hover:bg-white'
              }`}
              title={darkMode ? dict?.lightMode || 'Switch to Light Mode' : dict?.darkMode || 'Switch to Dark Mode'}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[#0B3A4A]" />}
            </button>
          )}

          {/* AI Tool CTA Button */}
          {currentPage !== 'detect' ? (
            <button
              onClick={() => handleLinkClick('detect')}
              className="px-5 py-2.5 rounded-full bg-[#FF7E6B] hover:bg-[#E86350] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#FF7E6B]/30 transition-all hover:scale-105 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {dict?.ctaDetect || 'AI Detection Tool'}
            </button>
          ) : (
            <button
              onClick={() => handleLinkClick('dashboard')}
              className="px-5 py-2.5 rounded-full bg-[#1FB6C9] hover:bg-[#1693A3] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#1FB6C9]/30 transition-all hover:scale-105 flex items-center gap-1.5 cursor-pointer"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              {dict?.ctaAnalytics || 'View Analytics'}
            </button>
          )}
        </div>

        {/* Mobile Controls (Dark mode + hamburger) */}
        <div className="lg:hidden flex items-center gap-2">
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-full bg-white/80 border border-[#1FB6C9]/20 text-[#0B3A4A]"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#0B3A4A]" />}
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`w-10 h-10 rounded-full border flex items-center justify-center ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30 text-white' : 'bg-white/80 border-[#1FB6C9]/20 text-[#0B3A4A]'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-6 py-5 space-y-3 shadow-xl ${
          darkMode ? 'bg-[#061822] border-[#1FB6C9]/20 text-white' : 'bg-[#F7F2E7] border-[#1FB6C9]/20 text-[#0B3A4A]'
        }`}>
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => handleLinkClick(link.page)}
              className={`block w-full text-left py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2.5 ${
                currentPage === link.page
                  ? 'bg-[#1FB6C9] text-white'
                  : darkMode ? 'hover:bg-white/10' : 'hover:bg-white/60'
              }`}
            >
              {link.icon && <link.icon className="w-4 h-4" />}
              <span>{link.label}</span>
            </button>
          ))}

          {/* Mobile Language Switcher */}
          <div className="pt-2 flex items-center gap-2 border-t border-gray-300 dark:border-gray-700">
            <span className="text-xs font-bold uppercase opacity-75">Language:</span>
            {LANGUAGES_LIST.map((langItem) => (
              <button
                key={langItem.code}
                onClick={() => onLanguageChange?.(langItem.code)}
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  language === langItem.code
                    ? 'bg-[#1FB6C9] text-white'
                    : 'bg-white/40 dark:bg-white/10'
                }`}
              >
                {langItem.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
