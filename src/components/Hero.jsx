import React, { useState } from 'react';
import { ArrowRight, Leaf, Sun, CloudRain, Droplets, Zap, Activity } from 'lucide-react';
import { evaluateVirtualIrrigationAI } from '../utils/aiModel';
import { TRANSLATIONS } from '../utils/translations';

export default function Hero({ onStartDemo, farmSetup = {}, weatherData = {}, currentLang = 'en' }) {
  const t = (key) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key;

  const [heroWeather, setHeroWeather] = useState(weatherData.rainProbability > 50 ? 'rainy' : 'sunny');
  const [virtualWaterActive, setVirtualWaterActive] = useState(true);

  // Evaluate AI Decision
  const currentSetup = {
    location: farmSetup.location || 'Vadodara, Gujarat',
    crop: farmSetup.crop || 'Tomato',
    soilType: farmSetup.soilType || 'Loamy',
    growthStage: farmSetup.growthStage || 'Flowering',
    farmSize: farmSetup.farmSize || 2,
  };

  const currentWeather = {
    ...weatherData,
    rainProbability: heroWeather === 'rainy' ? 75 : (weatherData.rainProbability || 12),
    rainfallForecast: heroWeather === 'rainy' ? 14.5 : (weatherData.rainfallForecast || 0.8),
  };

  const aiResult = evaluateVirtualIrrigationAI(currentSetup, currentWeather);

  return (
    <section id="hero" style={{
      padding: '50px 0 70px',
      background: 'radial-gradient(circle at 50% 0%, rgba(216, 243, 220, 0.6) 0%, rgba(244, 248, 245, 1) 70%)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Top AI Feature Banner */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span className="badge-gcet">
            <Zap size={14} color="#e9c46a" />
            {t('heroBadge')}
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          alignItems: 'center'
        }} className="hero-grid">
          
          {/* Hero Left Content */}
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: 'var(--primary-900)',
              lineHeight: 1.15,
              marginBottom: '12px',
              letterSpacing: '-0.03em'
            }}>
              {t('heroTitle')}
            </h1>
            
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--primary-700)',
              marginBottom: '12px',
              lineHeight: 1.35
            }}>
              {t('heroSubtitle')}
            </h2>

            <p style={{
              fontSize: '0.98rem',
              color: 'var(--neutral-700)',
              marginBottom: '24px',
              maxWidth: '520px',
              lineHeight: 1.55
            }}>
              {t('heroDescription')}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '28px' }}>
              <a
                href="#ai-irrigation"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--primary-700)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(45, 106, 79, 0.35)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{t('btnExploreAi')}</span>
                <ArrowRight size={18} />
              </a>

              <a
                href="#plant-health"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  color: 'var(--primary-800)',
                  border: '2px solid var(--primary-400)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s ease'
                }}
              >
                <Leaf size={18} color="var(--primary-600)" />
                <span>{t('btnAnalyzeLeaf')}</span>
              </a>
            </div>

            {/* Key Pillars Highlights */}
            <div style={{
              display: 'flex',
              gap: '20px',
              paddingTop: '16px',
              borderTop: '1px solid var(--neutral-200)',
              fontSize: '0.85rem',
              color: 'var(--neutral-600)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--water-600)', fontWeight: 700 }}>{t('pillarWater')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--primary-700)', fontWeight: 700 }}>{t('pillarAi')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#d97706', fontWeight: 700 }}>{t('pillarDisease')}</span>
              </div>
            </div>

          </div>

          {/* Hero Right Visual - Interactive Digital Virtual Farm Illustration */}
          <div style={{ position: 'relative' }}>
            
            {/* Interactive Farm Visual Header Controls */}
            <div style={{
              position: 'absolute',
              top: '-15px',
              right: '20px',
              zIndex: 10,
              display: 'flex',
              gap: '8px',
              backgroundColor: '#ffffff',
              padding: '6px 12px',
              borderRadius: '20px',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--neutral-200)'
            }}>
              <button
                onClick={() => setHeroWeather(heroWeather === 'sunny' ? 'rainy' : 'sunny')}
                style={{
                  border: 'none',
                  background: heroWeather === 'rainy' ? '#e0f2fe' : '#fef3c7',
                  color: heroWeather === 'rainy' ? '#0284c7' : '#d97706',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {heroWeather === 'sunny' ? <Sun size={14} /> : <CloudRain size={14} />}
                {heroWeather === 'sunny' ? t('forecastClear') : t('forecastRain')}
              </button>

              <button
                onClick={() => setVirtualWaterActive(!virtualWaterActive)}
                style={{
                  border: 'none',
                  background: virtualWaterActive ? 'var(--primary-100)' : '#f3f4f6',
                  color: virtualWaterActive ? 'var(--primary-800)' : '#6b7280',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Droplets size={14} />
                {virtualWaterActive ? t('virtualDripFlowing') : t('virtualDripIdle')}
              </button>
            </div>

            {/* SVG Virtual Farm Simulation Model */}
            <div className="card-elevated" style={{
              padding: '20px',
              background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)',
              border: '2px solid var(--primary-200)',
              borderRadius: '20px',
              boxShadow: '0 12px 30px rgba(45, 106, 79, 0.15)',
              position: 'relative'
            }}>
              
              <svg viewBox="0 0 500 360" style={{ width: '100%', height: 'auto', borderRadius: '16px' }}>
                <defs>
                  <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={heroWeather === 'sunny' ? '#e0f2fe' : '#94a3b8'} />
                    <stop offset="100%" stopColor={heroWeather === 'sunny' ? '#bae6fd' : '#cbd5e1'} />
                  </linearGradient>

                  <linearGradient id="soilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8c5319" />
                    <stop offset="100%" stopColor="#5c3d2e" />
                  </linearGradient>

                  <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>

                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Sky Background */}
                <rect x="0" y="0" width="500" height="200" fill="url(#skyGrad)" rx="12" />

                {/* Sun or Rain Cloud */}
                {heroWeather === 'sunny' ? (
                  <g transform="translate(410, 45)" className="animate-float">
                    <circle cx="0" cy="0" r="24" fill="#fbbf24" filter="url(#glow)" />
                    <g stroke="#fbbf24" strokeWidth="3" strokeLinecap="round">
                      <line x1="0" y1="-32" x2="0" y2="-27" />
                      <line x1="0" y1="27" x2="0" y2="32" />
                      <line x1="-32" y1="0" x2="-27" y2="0" />
                      <line x1="27" y1="0" x2="32" y2="0" />
                      <line x1="-22" y1="-22" x2="-18" y2="-18" />
                      <line x1="18" y1="18" x2="22" y2="22" />
                    </g>
                  </g>
                ) : (
                  <g transform="translate(380, 35)">
                    <path d="M10 20 Q10 5 30 5 Q40 0 55 10 Q70 0 85 10 Q100 5 110 20 Q120 30 110 40 Q110 45 10 45 Q0 30 10 20 Z" fill="#64748b" />
                    <line x1="25" y1="52" x2="20" y2="65" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 3" className="animate-water-flow" />
                    <line x1="50" y1="52" x2="45" y2="65" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 3" className="animate-water-flow" />
                    <line x1="75" y1="52" x2="70" y2="65" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 3" className="animate-water-flow" />
                    <line x1="95" y1="52" x2="90" y2="65" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 3" className="animate-water-flow" />
                  </g>
                )}

                {/* Soil Profile Layer */}
                <rect x="0" y="200" width="500" height="160" fill="url(#soilGrad)" rx="0 0 12 12" />
                <path d="M0 200 Q125 195 250 200 Q375 205 500 200 L500 215 L0 215 Z" fill="#6f4211" />

                {/* Micro Water Tank */}
                <g transform="translate(30, 140)">
                  <rect x="0" y="0" width="60" height="85" fill="#e2e8f0" stroke="#475569" strokeWidth="3" rx="8" />
                  <rect x="4" y="25" width="52" height="55" fill="url(#waterGrad)" rx="4" />
                  <text x="30" y="55" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">H₂O Tank</text>
                  <text x="30" y="15" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="bold">RESERVOIR</text>
                </g>

                {/* Irrigation Pipes from Tank to Fields */}
                <path d="M 60 210 L 180 210 L 180 230 L 460 230" 
                      fill="none" 
                      stroke="#94a3b8" 
                      strokeWidth="6" 
                      strokeLinecap="round" />
                
                {/* Water Flow Animation along Pipe */}
                {virtualWaterActive && (
                  <path d="M 60 210 L 180 210 L 180 230 L 460 230" 
                        fill="none" 
                        stroke="#0ea5e9" 
                        strokeWidth="4" 
                        strokeLinecap="round"
                        className="animate-water-flow" />
                )}

                {/* Drip Irrigation Emitters into Soil */}
                <g stroke={virtualWaterActive ? "#38bdf8" : "#94a3b8"} strokeWidth="2" strokeDasharray={virtualWaterActive ? "2 2" : "0"}>
                  <line x1="220" y1="230" x2="220" y2="255" />
                  <line x1="300" y1="230" x2="300" y2="255" />
                  <line x1="380" y1="230" x2="380" y2="255" />
                </g>

                {/* Crops Row 1 - Swaying Plants */}
                <g transform="translate(220, 195)" className="animate-sway">
                  <path d="M0 0 Q-10 -25 -5 -50 Q0 -65 5 -50 Q10 -25 0 0 Z" fill="#2d6a4f" />
                  <circle cx="-12" cy="-40" r="7" fill="#ef4444" />
                  <circle cx="10" cy="-30" r="6" fill="#ef4444" />
                  <circle cx="-2" cy="-58" r="8" fill="#52b788" />
                </g>

                {/* Crops Row 2 - Swaying Crops */}
                <g transform="translate(300, 195)" className="animate-sway-rev">
                  <path d="M0 0 Q10 -30 0 -55 Q-10 -30 0 0 Z" fill="#40916c" />
                  <circle cx="8" cy="-45" r="7" fill="#ef4444" />
                  <circle cx="-10" cy="-35" r="6" fill="#ef4444" />
                </g>

                {/* Crops Row 3 - Swaying Crops */}
                <g transform="translate(380, 195)" className="animate-sway">
                  <path d="M0 0 Q-15 -30 -5 -60 Q10 -30 0 0 Z" fill="#2d6a4f" />
                  <circle cx="-8" cy="-48" r="7" fill="#52b788" />
                  <circle cx="12" cy="-38" r="7" fill="#ef4444" />
                </g>

                {/* Virtual Farm Telemetry Labels */}
                <g transform="translate(245, 230)">
                  <rect x="0" y="0" width="75" height="22" fill="rgba(15, 23, 42, 0.75)" rx="4" />
                  <text x="37" y="15" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">{currentSetup.soilType}</text>
                </g>

                <g transform="translate(340, 175)">
                  <rect x="0" y="0" width="75" height="22" fill="rgba(15, 23, 42, 0.75)" rx="4" />
                  <text x="37" y="15" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">{currentSetup.growthStage}</text>
                </g>

                {/* AI Controller Node Badge */}
                <g transform="translate(180, 25)">
                  <rect x="0" y="0" width="140" height="32" fill="#1b4332" rx="16" stroke="#52b788" strokeWidth="2" filter="url(#glow)" />
                  <circle cx="16" cy="16" r="5" fill="#10b981" className="animate-sensor" />
                  <text x="75" y="20" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">AI VIRTUAL MODEL</text>
                </g>

              </svg>

              {/* Digital Telemetry Overlay Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '12px',
                padding: '10px 14px',
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderRadius: '12px',
                border: '1px solid var(--neutral-200)',
                fontSize: '0.82rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Activity size={16} color="var(--primary-600)" />
                  <span style={{ fontWeight: 600, color: 'var(--neutral-800)' }}>{t('liveFeedback')}</span>
                </div>

                <div style={{ display: 'flex', gap: '12px', fontWeight: 700 }}>
                  <span style={{ color: '#d97706' }}>Temp: {currentWeather.temperature}°C</span>
                  <span style={{ color: 'var(--water-600)' }}>Rain: {currentWeather.rainProbability}%</span>
                  <span style={{ color: aiResult.stateColor }}>
                    {aiResult.stateTitle}
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
