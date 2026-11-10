import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Mission } from './components/Mission';
import { GlobeSection } from './components/Globe/GlobeSection';
import { HotspotsSection } from './components/Hotspots/HotspotsSection';
import { IncidentsSection } from './components/Incidents/IncidentsSection';
import { DetectionSection } from './components/Detection/DetectionSection';
import { AnalyticsDashboard } from './components/Dashboard/AnalyticsDashboard';
import { ConservationImpact } from './components/Impact/ConservationImpact';
import { Footer } from './components/Footer';
import { HotspotModal } from './components/Hotspots/HotspotModal';
import { IncidentModal } from './components/Incidents/IncidentModal';
import { SelectedMarkerData } from './components/Globe/EarthGlobe';

import { BIODIVERSITY_HOTSPOTS } from './data/hotspotsData';
import { HISTORICAL_INCIDENTS } from './data/incidentsData';
import { INITIAL_ANALYSIS_RECORDS } from './data/initialAnalysisRecords';
import { HotspotType, IncidentType, AnalysisResult } from './types';

export function App() {
  const [hotspots] = useState<HotspotType[]>(BIODIVERSITY_HOTSPOTS);
  const [incidents] = useState<IncidentType[]>(HISTORICAL_INCIDENTS);
  const [analysisRecords, setAnalysisRecords] = useState<AnalysisResult[]>(INITIAL_ANALYSIS_RECORDS);

  const [activeHotspot, setActiveHotspot] = useState<HotspotType | null>(null);
  const [activeIncident, setActiveIncident] = useState<IncidentType | null>(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  // Smooth Section Navigation
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Marker selection from 3D Globe
  const handleSelectMarker = (data: SelectedMarkerData) => {
    if (data.type === 'hotspot') {
      setActiveHotspot(data.item);
      setSelectedMarkerId(data.item.id);
    } else if (data.type === 'incident') {
      setActiveIncident(data.item);
      setSelectedMarkerId(data.item.id);
    }
  };

  // Card selection from Hotspot Grid
  const handleSelectHotspot = (hotspot: HotspotType) => {
    setActiveHotspot(hotspot);
    setSelectedMarkerId(hotspot.id);
  };

  // Card selection from Incident Grid
  const handleSelectIncident = (incident: IncidentType) => {
    setActiveIncident(incident);
    setSelectedMarkerId(incident.id);
  };

  // Dynamic Dashboard Update: When user logs an analysis from Detection tool
  const handleLogAnalysisToDashboard = (record: AnalysisResult) => {
    setAnalysisRecords(prev => [record, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#F7F2E7] text-[#3A5A64] font-sans relative selection:bg-[#1FB6C9]/25 selection:text-[#0B3A4A]">
      {/* Top Navigation */}
      <Navigation onNavigate={handleNavigate} />

      {/* Main Content Sections */}
      <main>
        {/* Section 1: Hero (Cinematic Earth replacing Coralis lagoon) */}
        <Hero
          hotspots={hotspots}
          incidents={incidents}
          onSelectMarker={handleSelectMarker}
          onExploreClick={() => handleNavigate('earth-explore')}
          onMissionClick={() => handleNavigate('mission')}
        />

        {/* Section 2: Discover Our Mission (Coralis Asymmetric Editorial) */}
        <Mission
          onDetectClick={() => handleNavigate('detect')}
          onExploreClick={() => handleNavigate('earth-explore')}
        />

        {/* Section 3: Interactive 3D Earth Exploration Hub */}
        <GlobeSection
          hotspots={hotspots}
          incidents={incidents}
          onSelectMarker={handleSelectMarker}
          selectedMarkerId={selectedMarkerId}
        />

        {/* Section 4: Global Biodiversity Hotspots Showcase */}
        <HotspotsSection
          hotspots={hotspots}
          onSelectHotspot={handleSelectHotspot}
        />

        {/* Section 5: Documented Wildlife Crime Incidents */}
        <IncidentsSection
          incidents={incidents}
          onSelectIncident={handleSelectIncident}
        />

        {/* Section 6: AI Wildlife Trade Detection Center */}
        <DetectionSection
          onLogAnalysisToDashboard={handleLogAnalysisToDashboard}
        />

        {/* Section 7: Enforcement Intelligence & Analytics Dashboard */}
        <AnalyticsDashboard
          records={analysisRecords}
        />

        {/* Section 8: Conservation Impact & Ethical Framework */}
        <ConservationImpact />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals & Drawers */}
      <HotspotModal
        hotspot={activeHotspot}
        onClose={() => setActiveHotspot(null)}
      />

      <IncidentModal
        incident={activeIncident}
        onClose={() => setActiveIncident(null)}
      />
    </div>
  );
}

export default App;
