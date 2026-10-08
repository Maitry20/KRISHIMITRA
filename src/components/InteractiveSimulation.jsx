import React, { useState } from 'react';
import { evaluateVirtualIrrigationAI } from '../utils/aiModel';
import { TRANSLATIONS } from '../utils/translations';
import { Sliders, Sun, CloudRain, Droplets, CheckCircle2, AlertTriangle, Sparkles, Play } from 'lucide-react';

export default function InteractiveSimulation({ farmSetup, setFarmSetup, weatherData, setWeatherData, currentLang = 'en' }) {
  const [hasSimulated, setHasSimulated] = useState(false);

  const t = (key) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key;

  const aiResult = evaluateVirtualIrrigationAI(farmSetup, weatherData);

  const applyPreset = (presetType) => {
    setHasSimulated(true);
    if (presetType === 'hot_dry') {
      setWeatherData({
        temperature: 37,
        humidity: 32,
        rainProbability: 5,
        rainfallForecast: 0.0,
        windSpeed: 16,
        condition: 'Hot & Arid',
      });
    } else if (presetType === 'rain_expected') {
      setWeatherData({
        temperature: 28,
        humidity: 82,
        rainProbability: 85,
        rainfallForecast: 14.5,
        windSpeed: 18,
        condition: 'Heavy Rain Expected',
      });
    } else if (presetType === 'mild_balanced') {
      setWeatherData({
        temperature: 26,
        humidity: 55,
        rainProbability: 15,
        rainfallForecast: 0.5,
        windSpeed: 10,
        condition: 'Mild & Balanced',
      });
    }
  };

  const isWaterFlowing = hasSimulated && aiResult.recommendationState === 'RECOMMENDED';
  const isRainExpected = hasSimulated && aiResult.recommendationState === 'DELAYED';

  return (
    <section style={{ padding: '70px 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
          <span className="badge-gcet" style={{ marginBottom: '12px' }}>
            <Sliders size={14} /> {t('vizBadge')}
          </span>
          <h2 className="section-title">{t('vizTitle')}</h2>
          <p className="section-subtitle">
            {t('vizSubtitle')}
          </p>

          {/* Weather Test Presets */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '16px' }}>
            <button onClick={() => applyPreset('hot_dry')} style={presetButtonStyle}>
              {t('btnHotDry')}
            </button>
            <button onClick={() => applyPreset('rain_expected')} style={presetButtonStyle}>
              {t('btnRainExpected')}
            </button>
            <button onClick={() => applyPreset('mild_balanced')} style={presetButtonStyle}>
              {t('btnMild')}
            </button>
          </div>
        </div>

        {/* Simulation Display Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '32px',
          alignItems: 'stretch'
        }} className="sim-viz-grid">
          
          {/* Left: SVG Virtual Irrigation Visualizer */}
          <div className="card-elevated" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-900)', margin: 0 }}>
                Virtual Farm Field Canvas
              </h3>
              <span style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: '20px',
                backgroundColor: !hasSimulated ? '#f1f5f9' : (isWaterFlowing ? '#dcfce7' : (isRainExpected ? '#fef3c7' : '#e0f2fe')),
                color: !hasSimulated ? 'var(--neutral-600)' : aiResult.stateColor
              }}>
                {!hasSimulated ? '⏸️ SIMULATION STANDBY' : (isWaterFlowing ? '💧 IRRIGATION ACTIVE' : (isRainExpected ? '🌧️ IRRIGATION DELAYED' : '✓ IRRIGATION NOT REQUIRED'))}
              </span>
            </div>

            {/* SVG Visual Simulation */}
            <svg viewBox="0 0 600 320" style={{ width: '100%', height: 'auto', borderRadius: '14px', background: '#f8fafc', border: '1px solid var(--neutral-200)' }}>
              <defs>
                <linearGradient id="simSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isRainExpected ? '#94a3b8' : '#e0f2fe'} />
                  <stop offset="100%" stopColor={isRainExpected ? '#cbd5e1' : '#bae6fd'} />
                </linearGradient>

                <linearGradient id="simSoil" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8c5319" />
                  <stop offset="100%" stopColor="#5c3d2e" />
                </linearGradient>
              </defs>

              {/* Sky */}
              <rect x="0" y="0" width="600" height="180" fill="url(#simSky)" rx="8" />

              {/* Sky Elements: Sun or Rain Cloud */}
              {!isRainExpected ? (
                <g transform="translate(510, 45)" className="animate-float">
                  <circle cx="0" cy="0" r="22" fill="#fbbf24" />
                </g>
              ) : (
                <g transform="translate(460, 30)">
                  <path d="M10 20 Q10 5 30 5 Q40 0 55 10 Q70 0 85 10 Q100 5 110 20 Q120 30 110 40 Q110 45 10 45 Q0 30 10 20 Z" fill="#475569" />
                  <line x1="30" y1="50" x2="25" y2="65" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="3 3" className="animate-water-flow" />
                  <line x1="60" y1="50" x2="55" y2="65" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="3 3" className="animate-water-flow" />
                  <line x1="90" y1="50" x2="85" y2="65" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="3 3" className="animate-water-flow" />
                </g>
              )}

              {/* Soil Layer */}
              <rect x="0" y="180" width="600" height="140" fill="url(#simSoil)" rx="0 0 8 8" />

              {/* Crop Rows */}
              <g transform="translate(120, 175)" className="animate-sway">
                <path d="M0 0 Q-10 -25 -5 -50 Q0 -65 5 -50 Q10 -25 0 0 Z" fill="#2d6a4f" />
                <circle cx="-12" cy="-40" r="6" fill="#ef4444" />
                <circle cx="10" cy="-30" r="5" fill="#ef4444" />
              </g>

              <g transform="translate(260, 175)" className="animate-sway-rev">
                <path d="M0 0 Q10 -30 0 -55 Q-10 -30 0 0 Z" fill="#40916c" />
                <circle cx="8" cy="-45" r="6" fill="#ef4444" />
              </g>

              <g transform="translate(400, 175)" className="animate-sway">
                <path d="M0 0 Q-15 -30 -5 -60 Q10 -30 0 0 Z" fill="#2d6a4f" />
                <circle cx="12" cy="-38" r="6" fill="#ef4444" />
              </g>

              {/* Virtual Drip Line */}
              <path d="M 40 210 L 560 210" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />

              {/* Water flow inside drip line */}
              {isWaterFlowing && (
                <path d="M 40 210 L 560 210" stroke="#0ea5e9" strokeWidth="4" strokeLinecap="round" className="animate-water-flow" />
              )}

              {/* Drip Droplets into Soil */}
              <g stroke={isWaterFlowing ? "#38bdf8" : "#94a3b8"} strokeWidth="2" strokeDasharray={isWaterFlowing ? "3 3" : "0"}>
                <line x1="120" y1="210" x2="120" y2="240" />
                <line x1="260" y1="210" x2="260" y2="240" />
                <line x1="400" y1="210" x2="400" y2="240" />
              </g>

              <text x="300" y="275" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                {farmSetup.crop || 'Tomato'} • {farmSetup.soilType || 'Loamy'} Soil • {farmSetup.growthStage || 'Flowering'} Stage
              </text>
            </svg>

            <div style={{ marginTop: '16px', padding: '12px 16px', backgroundColor: '#f8fafc', borderRadius: '10px', fontSize: '0.88rem', color: 'var(--neutral-700)', border: '1px solid var(--neutral-200)' }}>
              <strong>Simulation Status:</strong> {!hasSimulated ? 'Select a weather preset above to start visual drip simulation.' : (isWaterFlowing ? 'Water being distributed across crop rows via virtual drip system.' : (isRainExpected ? 'Rain expected soon. Virtual drip system remains paused.' : 'Current conditions indicate sufficient soil water availability.'))}
            </div>
          </div>

          {/* Right: Weather Controls & Standby / Evaluated Result Card */}
          <div className="card-elevated" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '16px' }}>
                Weather-Aware AI Logic
              </h3>

              {/* Sliders */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>
                    <span>Temperature:</span>
                    <span style={{ color: '#d97706' }}>{weatherData.temperature}°C</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="45"
                    value={weatherData.temperature}
                    onChange={(e) => {
                      setHasSimulated(true);
                      setWeatherData(prev => ({ ...prev, temperature: Number(e.target.value) }));
                    }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>
                    <span>Rain Probability:</span>
                    <span style={{ color: '#8b5cf6' }}>{weatherData.rainProbability}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={weatherData.rainProbability}
                    onChange={(e) => {
                      setHasSimulated(true);
                      setWeatherData(prev => ({ ...prev, rainProbability: Number(e.target.value) }));
                    }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>
                    <span>Humidity:</span>
                    <span style={{ color: '#0ea5e9' }}>{weatherData.humidity}%</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="95"
                    value={weatherData.humidity}
                    onChange={(e) => {
                      setHasSimulated(true);
                      setWeatherData(prev => ({ ...prev, humidity: Number(e.target.value) }));
                    }}
                  />
                </div>
              </div>

              {/* Output Card */}
              {!hasSimulated ? (
                <div style={{
                  padding: '20px',
                  borderRadius: '12px',
                  backgroundColor: '#f8fafc',
                  border: '2px dashed var(--neutral-300)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--neutral-700)', marginBottom: '4px' }}>
                    Simulation Ready
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--neutral-500)', margin: '0 0 12px' }}>
                    Click a weather preset above or adjust sliders to simulate AI response.
                  </p>
                  <button
                    onClick={() => setHasSimulated(true)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--primary-700)',
                      color: '#ffffff',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '0.825rem',
                      cursor: 'pointer'
                    }}
                  >
                    Simulate AI Response
                  </button>
                </div>
              ) : (
                <div style={{
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--primary-50)',
                  border: '1.5px solid var(--primary-300)'
                }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--primary-800)', fontWeight: 800, textTransform: 'uppercase' }}>
                    Live AI Engine Output
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: aiResult.stateColor, marginTop: '4px', marginBottom: '6px' }}>
                    {aiResult.stateTitle}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--neutral-700)', margin: 0, lineHeight: 1.4 }}>
                    "{aiResult.reasonText}"
                  </p>
                </div>
              )}
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', marginTop: '16px', fontStyle: 'italic', textAlign: 'center' }}>
              Note: Demonstration simulator showing decision-making logic under dynamic weather.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

const presetButtonStyle = {
  border: '1px solid var(--primary-300)',
  backgroundColor: 'var(--primary-50)',
  color: 'var(--primary-800)',
  padding: '6px 14px',
  borderRadius: '20px',
  fontSize: '0.825rem',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'all 0.2s ease'
};
