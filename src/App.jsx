import React, { useState } from 'react';
import { useCardParallax } from './hooks/useCardParallax';
import { useCinematicStoryScroll } from './hooks/useCinematicStoryScroll';
import { useSectionClipWipe } from './hooks/useSectionClipWipe';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LiveFarmMonitor from './components/LiveFarmMonitor';
import AIIrrigationAssistant from './components/AIIrrigationAssistant';
import InteractiveSimulation from './components/InteractiveSimulation';
import WaterConservation from './components/WaterConservation';
import AutomationVsAI from './components/AutomationVsAI';
import AIPlantHealthCheck from './components/AIPlantHealthCheck';
import AIExplanation from './components/AIExplanation';
import PhysicalFarmModel from './components/PhysicalFarmModel';
import ImpactAndBharat from './components/ImpactAndBharat';
import TechStackAndFooter from './components/TechStackAndFooter';
import ScienceFairDemoModal from './components/ScienceFairDemoModal';

export default function App() {
  useCardParallax('.card-elevated, .glass-card');
  useCinematicStoryScroll();
  useSectionClipWipe();
  const [currentLang, setCurrentLang] = useState('en');

  const [farmSetup, setFarmSetup] = useState({
    location: 'Vadodara, Gujarat',
    crop: 'Tomato',
    soilType: 'Loamy',
    growthStage: 'Flowering',
    farmSize: 2, // 1 to 100 acres
  });

  const [weatherData, setWeatherData] = useState({
    temperature: 33,
    humidity: 46,
    rainProbability: 12,
    rainfallForecast: 0.8,
    windSpeed: 14,
    condition: 'Clear Sky',
  });

  const [diseaseResult, setDiseaseResult] = useState(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Sticky Header Navigation with Top Right Language Switcher */}
      <Navbar
        onStartDemo={() => setIsDemoOpen(true)}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
      />

      {/* Main Content Sections grouped by Theme */}
      <main>
        
        {/* ========================================================
            CATEGORY 1: HERO & FARM SETUP
           ======================================================== */}
        {/* Section 1: Hero */}
        <Hero
          onStartDemo={() => setIsDemoOpen(true)}
          farmSetup={farmSetup}
          weatherData={weatherData}
          currentLang={currentLang}
        />

        {/* Section 2: Farm Setup & External Weather Forecast */}
        <LiveFarmMonitor
          farmSetup={farmSetup}
          setFarmSetup={setFarmSetup}
          weatherData={weatherData}
          setWeatherData={setWeatherData}
          currentLang={currentLang}
        />

        {/* ========================================================
            CATEGORY 2: AI IRRIGATION & WATER MANAGEMENT (ALL IRRIGATION TOGETHER)
           ======================================================== */}
        {/* Section 3: AI Irrigation Engine & Today's Advisory */}
        <AIIrrigationAssistant
          farmSetup={farmSetup}
          weatherData={weatherData}
          diseaseResult={diseaseResult}
          currentLang={currentLang}
        />

        {/* Section 4: Virtual Irrigation Field Simulation */}
        <InteractiveSimulation
          farmSetup={farmSetup}
          setFarmSetup={setFarmSetup}
          weatherData={weatherData}
          setWeatherData={setWeatherData}
          currentLang={currentLang}
        />

        {/* Section 5: Water Conservation & Water-Saving Simulator */}
        <WaterConservation
          farmSetup={farmSetup}
          weatherData={weatherData}
          currentLang={currentLang}
        />

        {/* Section 6: Traditional Irrigation vs Virtual AI System Comparison */}
        <AutomationVsAI currentLang={currentLang} />

        {/* ========================================================
            CATEGORY 3: CROP DISEASE & HEALTH DIAGNOSTICS
           ======================================================== */}
        {/* Section 7: AI Plant Health Check & Image Upload */}
        <AIPlantHealthCheck
          diseaseResult={diseaseResult}
          setDiseaseResult={setDiseaseResult}
          farmSetup={farmSetup}
          currentLang={currentLang}
        />

        {/* ========================================================
            CATEGORY 4: SYSTEM ARCHITECTURE, HOW IT WORKS & IMPACT
           ======================================================== */}
        {/* Section 8: How Virtual AI Irrigation Works */}
        <AIExplanation currentLang={currentLang} />

        {/* Section 9: System Architecture Flowchart */}
        <PhysicalFarmModel
          farmSetup={farmSetup}
          weatherData={weatherData}
          currentLang={currentLang}
        />

        {/* Section 10: Impact & Sustainable Agriculture */}
        <ImpactAndBharat currentLang={currentLang} />
      </main>

      {/* Section 11: Tech Stack & Footer */}
      <TechStackAndFooter currentLang={currentLang} />

      {/* Guided Virtual AI Irrigation Demo Modal */}
      <ScienceFairDemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        setFarmSetup={setFarmSetup}
        setWeatherData={setWeatherData}
        currentLang={currentLang}
      />

    </div>
  );
}
