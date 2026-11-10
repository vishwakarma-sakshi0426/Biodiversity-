import { useState } from 'react';
import { Navigation, AppPage } from './components/Navigation';
import { Hero } from './components/Hero';
import { Mission } from './components/Mission';
import { DetectionSection } from './components/Detection/DetectionSection';
import { AnalyticsDashboard } from './components/Dashboard/AnalyticsDashboard';
import { ConservationImpact } from './components/Impact/ConservationImpact';
import { Footer } from './components/Footer';

import { BIODIVERSITY_HOTSPOTS } from './data/hotspotsData';
import { HISTORICAL_INCIDENTS } from './data/incidentsData';
import { INITIAL_ANALYSIS_RECORDS } from './data/initialAnalysisRecords';
import type { HotspotType, IncidentType, AnalysisResult } from './types';

export function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [hotspots] = useState<HotspotType[]>(BIODIVERSITY_HOTSPOTS);
  const [incidents] = useState<IncidentType[]>(HISTORICAL_INCIDENTS);
  const [analysisRecords, setAnalysisRecords] = useState<AnalysisResult[]>(INITIAL_ANALYSIS_RECORDS);

  // Dynamic Dashboard Update: When user logs an analysis from Detection tool
  const handleLogAnalysisToDashboard = (record: AnalysisResult) => {
    setAnalysisRecords(prev => [record, ...prev]);
  };

  const handleNavigatePage = (page: AppPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7F2E7] text-[#3A5A64] font-sans relative selection:bg-[#1FB6C9]/25 selection:text-[#0B3A4A]">
      {/* Top Sticky Header */}
      <Navigation
        currentPage={currentPage}
        onPageChange={handleNavigatePage}
      />

      {/* Main Pages Switch */}
      <main className="pt-2">
        {/* PAGE 1: LANDING PAGE (Single 3D Earth Hero + Mission) */}
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-300">
            {/* The ONLY 3D Earth: Prominent Hero with Side Pop Card on Hover */}
            <Hero
              hotspots={hotspots}
              incidents={incidents}
              onNavigateToDetect={() => handleNavigatePage('detect')}
              onNavigateToMission={() => {
                const el = document.getElementById('mission');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Our Mission: Editorial Story & 3 Pillars */}
            <Mission
              onDetectClick={() => handleNavigatePage('detect')}
              onExploreEarthClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />

            {/* Conservation Impact & Ethical AI Pledge */}
            <ConservationImpact />
          </div>
        )}

        {/* PAGE 2: WILDLIFE TRADE DETECTION (Flagship AI Detection Feature) */}
        {currentPage === 'detect' && (
          <div className="animate-in fade-in duration-300 pt-8">
            <DetectionSection
              onLogAnalysisToDashboard={handleLogAnalysisToDashboard}
              onNavigateToDashboard={() => handleNavigatePage('dashboard')}
            />
          </div>
        )}

        {/* PAGE 3: ANALYTICS & INTELLIGENCE DASHBOARD */}
        {currentPage === 'dashboard' && (
          <div className="animate-in fade-in duration-300 pt-8">
            <AnalyticsDashboard
              records={analysisRecords}
              onNavigateToDetect={() => handleNavigatePage('detect')}
            />
          </div>
        )}
      </main>

      {/* Global Luxury Coralis Footer */}
      <Footer onNavigate={(id) => {
        if (id === 'detect') handleNavigatePage('detect');
        else if (id === 'dashboard') handleNavigatePage('dashboard');
        else handleNavigatePage('home');
      }} />
    </div>
  );
}

export default App;
