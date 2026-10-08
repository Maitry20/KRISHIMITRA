import React, { useState, useEffect } from 'react';
import { Play, X, ArrowRight, ArrowLeft, CheckCircle2, Droplets, CloudRain, Camera, Sparkles, Sprout, Sun, ShieldAlert, Heart, Activity } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRANSLATIONS } from '../utils/translations';

export default function ScienceFairDemoModal({ isOpen, onClose, setFarmSetup, setWeatherData, currentLang = 'en' }) {
  const t = (key) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key;
  const [currentStep, setCurrentStep] = useState(1);
  const [scanningLeaf, setScanningLeaf] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  // Auto setup weather data when switching steps
  useEffect(() => {
    if (!isOpen) return;

    if (currentStep === 1) {
      if (setWeatherData) {
        setWeatherData({
          temperature: 34,
          humidity: 45,
          rainProbability: 10,
          rainfallForecast: 0.0,
          windSpeed: 14,
          condition: 'Clear Sky',
        });
      }
    } else if (currentStep === 2) {
      if (setWeatherData) {
        setWeatherData({
          temperature: 28,
          humidity: 84,
          rainProbability: 88,
          rainfallForecast: 16.0,
          windSpeed: 18,
          condition: 'Heavy Rain Expected',
        });
      }
    } else if (currentStep === 4) {
      setScanningLeaf(true);
      setScanProgress(25);
      const t1 = setTimeout(() => setScanProgress(70), 350);
      const t2 = setTimeout(() => setScanProgress(100), 800);
      const t3 = setTimeout(() => {
        setScanningLeaf(false);
      }, 1100);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [currentStep, isOpen]);

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      onClose();
    }
  };

  const stepsList = [
    { id: 1, label: '🌱 1. AI Advisor' },
    { id: 2, label: '🌦️ 2. Weather AI' },
    { id: 3, label: '💧 3. Water Saver' },
    { id: 4, label: '🦠 4. Disease AI' },
    { id: 5, label: '🌾 5. Smart Advisor' },
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      padding: '20px'
    }}>
      
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        maxWidth: '800px',
        width: '100%',
        padding: '32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        position: 'relative',
        border: '2px solid var(--primary-300)',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            border: 'none',
            background: '#f1f5f9',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            cursor: 'pointer',
            color: 'var(--neutral-600)'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header Badge */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge-gcet">
              <Play size={12} fill="#ffffff" /> Guided Feature Tour
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--neutral-500)' }}>
              Card {currentStep} of 5
            </span>
          </div>

          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary-900)', margin: 0 }}>
            {currentStep === 1 && '🌱 1. AI Irrigation Advisor'}
            {currentStep === 2 && '🌦️ 2. Weather-Based Water Management'}
            {currentStep === 3 && '💧 3. Water-Saving Simulator'}
            {currentStep === 4 && '🦠 4. AI Crop Disease Detection'}
            {currentStep === 5 && '🌾 5. Smart Farm Advisor'}
          </h3>

          {/* Interactive Feature Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
            {stepsList.map(step => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: '10px',
                  border: currentStep === step.id ? '2px solid var(--primary-600)' : '1px solid var(--neutral-200)',
                  backgroundColor: currentStep === step.id ? 'var(--primary-100)' : '#f8fafc',
                  color: currentStep === step.id ? 'var(--primary-900)' : 'var(--neutral-600)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Content Box per Feature */}
        <div style={{
          minHeight: '270px',
          backgroundColor: '#f8fafc',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid var(--neutral-200)',
          marginBottom: '24px'
        }}>

          {/* CARD 1: 🌱 1. AI Irrigation Advisor */}
          {currentStep === 1 && (
            <div>
              <p style={{ fontSize: '0.88rem', color: 'var(--neutral-600)', marginTop: 0, marginBottom: '16px' }}>
                Combines farmer setup parameters (Crop, Soil, Stage, Size, Location) with live weather integration to dynamically calculate whether to irrigate now, later, or not at all.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '16px', marginBottom: '16px' }}>
                <div style={demoCardStyle}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary-700)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    FARMER INPUT PARAMETERS
                  </div>
                  <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div>📍 Location: <strong>Vadodara, Gujarat</strong></div>
                    <div>🌾 Crop: <strong>Tomato</strong></div>
                    <div>🌱 Soil Type: <strong>Loamy Soil</strong></div>
                    <div>🌿 Growth Stage: <strong>Flowering Stage</strong></div>
                    <div>📏 Farm Size: <strong>2 Acres</strong></div>
                  </div>
                </div>

                <div style={{ ...demoCardStyle, backgroundColor: '#ecfdf5', border: '2px solid #10b981' }}>
                  <div style={{ fontSize: '0.8rem', color: '#047857', fontWeight: 800 }}>AI DECISION ENGINE OUTPUT</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#10b981', margin: '4px 0' }}>
                    🟢 IRRIGATION RECOMMENDED
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--neutral-700)' }}>
                    Recommended Time: <strong>Tomorrow 6:00 AM – 8:00 AM</strong>
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--water-600)', fontWeight: 800, marginTop: '6px' }}>
                    Water Estimation: 2,400 L/acre (4,800 L Total)
                  </div>
                </div>
              </div>

              <div style={demoFootnote}>
                💡 Calculates precise Evapotranspiration Index & water requirement without needing physical soil moisture sensors.
              </div>
            </div>
          )}

          {/* CARD 2: 🌦️ 2. Weather-Based Water Management */}
          {currentStep === 2 && (
            <div>
              <p style={{ fontSize: '0.88rem', color: 'var(--neutral-600)', marginTop: 0, marginBottom: '16px' }}>
                Integrates upcoming weather conditions to avoid unnecessary watering and conserve groundwater resources.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                
                {/* Scenario A: Rain Forecasted */}
                <div style={{ ...demoCardStyle, backgroundColor: '#fffbeb', border: '2px solid #f59e0b' }}>
                  <div style={{ fontSize: '0.8rem', color: '#b45309', fontWeight: 800 }}>SCENARIO A: RAIN FORECASTED</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--neutral-800)', margin: '6px 0' }}>
                    🌧️ Forecast: <strong>88% Rain Probability (16 mm)</strong>
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#d97706', marginBottom: '4px' }}>
                    🟡 DELAY IRRIGATION
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--neutral-600)', margin: 0 }}>
                    Watering is postponed to utilize rainfall and prevent soil waterlogging.
                  </p>
                </div>

                {/* Scenario B: Hot & Dry */}
                <div style={{ ...demoCardStyle, backgroundColor: '#ecfdf5', border: '2px solid #10b981' }}>
                  <div style={{ fontSize: '0.8rem', color: '#047857', fontWeight: 800 }}>SCENARIO B: HOT & DRY DAY</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--neutral-800)', margin: '6px 0' }}>
                    ☀️ Weather: <strong>37°C • Low Humidity (32%)</strong>
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#10b981', marginBottom: '4px' }}>
                    🟢 IRRIGATION RECOMMENDED
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--neutral-600)', margin: 0 }}>
                    Watering recommended early morning to offset high evapotranspiration demand.
                  </p>
                </div>

              </div>

              <div style={demoFootnote}>
                🌧️ Weather integration prevents wasting pump power and water right before rainstorms.
              </div>
            </div>
          )}

          {/* CARD 3: 💧 3. Water-Saving Simulator */}
          {currentStep === 3 && (
            <div>
              <p style={{ fontSize: '0.88rem', color: 'var(--neutral-600)', marginTop: 0, marginBottom: '16px' }}>
                Compares estimated water usage between conventional fixed-timer irrigation and AI-optimized precision allocation.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px', textAlign: 'center' }}>
                <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--neutral-200)' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--neutral-500)', fontWeight: 700 }}>Conventional / Traditional</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ef4444', marginTop: '4px' }}>10,000 L</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', marginTop: '2px' }}>Fixed Daily Schedule</div>
                </div>

                <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--neutral-200)' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--neutral-500)', fontWeight: 700 }}>AI Optimized Usage</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--primary-800)', marginTop: '4px' }}>7,500 L</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--primary-600)', marginTop: '2px' }}>Weather-Aware Allocation</div>
                </div>

                <div style={{ padding: '16px', backgroundColor: 'var(--primary-100)', borderRadius: '12px', border: '1.5px solid var(--primary-400)' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--primary-800)', fontWeight: 700 }}>Estimated Saving</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0284c7', marginTop: '4px' }}>2,500 L</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--primary-800)', fontWeight: 800, marginTop: '2px' }}>25% Water Saved</div>
                </div>
              </div>

              <div style={{ ...demoFootnote, backgroundColor: '#fffbe3', borderColor: '#fde68a', color: '#b45309' }}>
                *Note: This is a mathematical simulation/estimate based on evapotranspiration modeling, not a physical hardware measurement.
              </div>
            </div>
          )}

          {/* CARD 4: 🦠 4. AI Crop Disease Detection */}
          {currentStep === 4 && (
            <div>
              <p style={{ fontSize: '0.88rem', color: 'var(--neutral-600)', marginTop: 0, marginBottom: '16px' }}>
                Farmer uploads or snaps a crop leaf photo. Computer vision extracts color histograms & lesion patterns for early diagnostic guidance.
              </p>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                
                <div style={{
                  position: 'relative',
                  width: '130px',
                  height: '130px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '2px solid var(--neutral-300)',
                  flexShrink: 0
                }}>
                  <img
                    src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'><rect width='300' height='300' fill='%23e8f5e9'/><path d='M150 30 Q220 80 200 200 Q150 270 100 200 Q80 80 150 30 Z' fill='%234caf50'/><circle cx='130' cy='110' r='18' fill='%23795548'/><circle cx='170' cy='160' r='22' fill='%23795548'/></svg>"
                    alt="Sample leaf"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {scanningLeaf && (
                    <div className="animate-laser" style={{ position: 'absolute', left: 0, right: 0, height: '3px', backgroundColor: '#10b981' }} />
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  {scanningLeaf ? (
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-800)', marginBottom: '8px' }}>
                        Extracting Chlorophyll & Lesion Pixel Statistics... ({scanProgress}%)
                      </div>
                      <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${scanProgress}%`, height: '100%', backgroundColor: 'var(--primary-600)', transition: 'width 0.2s ease' }} />
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.825rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>🦠 <strong>Possible Disease:</strong> <span style={{ color: '#be123c', fontWeight: 800 }}>Tomato Early Blight</span></span>
                        <span style={{ color: 'var(--primary-700)', fontWeight: 800 }}>Confidence: 94%</span>
                      </div>
                      <div>🔍 <strong>Possible Causes:</strong> High relative humidity & fungal spore growth</div>
                      <div>✂️ <strong>Recommended Action:</strong> Prune infected bottom foliage</div>
                      <div>🛡️ <strong>Prevention Guidance:</strong> Spray organic copper fungicide & avoid overhead leaf wetting</div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* CARD 5: 🌾 5. Smart Farm Advisor */}
          {currentStep === 5 && (
            <div>
              <p style={{ fontSize: '0.88rem', color: 'var(--neutral-600)', marginTop: 0, marginBottom: '14px' }}>
                Combines crop status, weather forecast, soil moisture estimate, and disease risk into one clear daily advisory.
              </p>

              {/* Single Unified Recommendation Banner */}
              <div style={{
                padding: '20px',
                borderRadius: '16px',
                backgroundColor: '#ffffff',
                border: '2px solid var(--primary-400)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary-700)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  TODAY'S UNIFIED FARM ADVISORY — "What should I do today?"
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem', marginBottom: '12px' }}>
                  <div style={factPill}>🌧️ <strong>Weather:</strong> Rain expected tonight (14 mm)</div>
                  <div style={factPill}>💧 <strong>Action:</strong> Delay irrigation</div>
                  <div style={factPill}>🌱 <strong>Crop Stage:</strong> Tomato in flowering stage</div>
                  <div style={factPill}>🦠 <strong>Disease Risk:</strong> Low (Chlorophyll 78%)</div>
                </div>

                <div style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--primary-50)',
                  border: '1px solid var(--primary-200)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: 'var(--primary-900)'
                }}>
                  💡 <strong>Recommendation:</strong> Recheck weather conditions tomorrow morning before scheduling virtual drip cycle.
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: '1px solid var(--neutral-300)',
              backgroundColor: '#ffffff',
              color: 'var(--neutral-700)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
              opacity: currentStep === 1 ? 0.4 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ArrowLeft size={16} />
            <span>{t('btnPrev')}</span>
          </button>

          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--neutral-500)' }}>
            Card {currentStep} / 5
          </div>

          <button
            onClick={handleNextStep}
            style={{
              padding: '12px 28px',
              borderRadius: '10px',
              backgroundColor: 'var(--primary-700)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(45, 106, 79, 0.35)'
            }}
          >
            <span>{currentStep === 5 ? 'Finish Tour 🎉' : 'Next Card'}</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>

    </div>
  );
}

const demoCardStyle = {
  padding: '14px',
  borderRadius: '12px',
  backgroundColor: '#ffffff',
  border: '1px solid var(--neutral-200)',
  boxShadow: 'var(--shadow-sm)'
};

const demoFootnote = {
  fontSize: '0.78rem',
  color: 'var(--neutral-600)',
  backgroundColor: '#ffffff',
  padding: '8px 12px',
  borderRadius: '8px',
  border: '1px solid var(--neutral-200)',
  lineHeight: 1.4
};

const factPill = {
  padding: '8px 12px',
  borderRadius: '8px',
  backgroundColor: '#f8fafc',
  border: '1px solid var(--neutral-200)',
  color: 'var(--neutral-800)'
};
