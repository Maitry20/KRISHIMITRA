import React, { useState } from 'react';
import { Sprout, MapPin, Sun, Thermometer, Droplets, CloudRain, Wind, Compass, Navigation, Loader2 } from 'lucide-react';
import { CROPS_LIST, SOIL_TYPES_LIST, GROWTH_STAGES_LIST, PRESET_LOCATIONS } from '../utils/aiModel';
import { TRANSLATIONS } from '../utils/translations';
import { detectDeviceLocationAndWeather } from '../utils/locationWeather';

export default function LiveFarmMonitor({ farmSetup, setFarmSetup, weatherData, setWeatherData, currentLang = 'en' }) {
  const t = (key) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key;

  const [isDetecting, setIsDetecting] = useState(false);
  const [detectStatusMessage, setDetectStatusMessage] = useState(null);
  
  // Check if current location or crop is custom
  const isPresetLocation = PRESET_LOCATIONS.some(p => p.name === farmSetup.location);
  const [isCustomLocationMode, setIsCustomLocationMode] = useState(!isPresetLocation);

  const isPresetCrop = CROPS_LIST.some(c => c.id === farmSetup.crop);
  const [isCustomCropMode, setIsCustomCropMode] = useState(!isPresetCrop);

  // Handle Location Preset Selection
  const handleLocationChange = (locName) => {
    if (locName === 'CUSTOM') {
      setIsCustomLocationMode(true);
      return;
    }

    setIsCustomLocationMode(false);
    const preset = PRESET_LOCATIONS.find(p => p.name === locName);
    if (preset) {
      setFarmSetup(prev => ({ ...prev, location: preset.name }));
      setWeatherData({
        temperature: preset.temp,
        humidity: preset.humidity,
        rainProbability: preset.rainProb,
        rainfallForecast: preset.rainfall,
        windSpeed: preset.wind,
        condition: preset.condition,
      });
    } else {
      setFarmSetup(prev => ({ ...prev, location: locName }));
    }
  };

  // Handle Device Geolocation Detection
  const handleDetectDeviceLocation = async () => {
    setIsDetecting(true);
    setDetectStatusMessage(t('detectingLocation'));
    try {
      const res = await detectDeviceLocationAndWeather();
      setFarmSetup(prev => ({ ...prev, location: res.locationName }));
      setWeatherData(res.weatherData);
      setIsCustomLocationMode(false);
      setDetectStatusMessage(`📍 Location detected: ${res.locationName}`);
      setTimeout(() => setDetectStatusMessage(null), 4000);
    } catch (err) {
      alert(err.message || 'Could not detect device location.');
      setDetectStatusMessage(null);
    } finally {
      setIsDetecting(false);
    }
  };

  // Handle Crop Selection
  const handleCropChange = (cropVal) => {
    if (cropVal === 'CUSTOM') {
      setIsCustomCropMode(true);
      setFarmSetup(prev => ({ ...prev, crop: prev.crop || 'Mustard' }));
    } else {
      setIsCustomCropMode(false);
      setFarmSetup(prev => ({ ...prev, crop: cropVal }));
    }
  };

  return (
    <section id="monitor" style={{ padding: '60px 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-700)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px' }}>
            <Compass size={18} />
            <span>{t('setupBadge')}</span>
          </div>
          <h2 className="section-title">{t('setupTitle')}</h2>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
            {t('setupSubtitle')}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '32px',
          alignItems: 'start'
        }} className="farm-setup-grid">
          
          {/* Left Column: Farm Setup Controls */}
          <div className="card-elevated" style={{ padding: '28px', borderTop: '4px solid var(--primary-600)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sprout size={20} color="var(--primary-700)" />
              <span>{t('cardFarmSetup')}</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              
              {/* Field 1: Location & Geolocation Detection */}
              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={labelStyle}>
                    <MapPin size={15} color="var(--primary-700)" />
                    <span>{t('labelLocation')}</span>
                  </label>

                  {/* Detect Location Button */}
                  <button
                    type="button"
                    onClick={handleDetectDeviceLocation}
                    disabled={isDetecting}
                    style={{
                      border: 'none',
                      background: 'var(--primary-100)',
                      color: 'var(--primary-900)',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: isDetecting ? 'wait' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease',
                      border: '1px solid var(--primary-300)'
                    }}
                  >
                    {isDetecting ? (
                      <Loader2 size={13} className="animate-spin" color="var(--primary-700)" />
                    ) : (
                      <Navigation size={13} color="var(--primary-700)" />
                    )}
                    <span>{isDetecting ? t('detectingLocation') : t('btnDetectLocation')}</span>
                  </button>
                </div>

                {/* Location Select or Custom Text Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <select
                    value={isCustomLocationMode ? 'CUSTOM' : farmSetup.location}
                    onChange={(e) => handleLocationChange(e.target.value)}
                    style={inputStyle}
                  >
                    {PRESET_LOCATIONS.map(loc => (
                      <option key={loc.name} value={loc.name}>
                        {loc.name === 'CUSTOM' ? t('customLocationOption') || loc.name : loc.name}
                      </option>
                    ))}
                  </select>

                  {isCustomLocationMode && (
                    <input
                      type="text"
                      value={farmSetup.location}
                      onChange={(e) => setFarmSetup(prev => ({ ...prev, location: e.target.value }))}
                      placeholder={t('customLocationPlaceholder')}
                      style={{ ...inputStyle, borderColor: 'var(--primary-500)', backgroundColor: '#f0fdf4' }}
                    />
                  )}
                </div>

                {detectStatusMessage && (
                  <div style={{ fontSize: '0.78rem', color: 'var(--primary-800)', marginTop: '4px', fontWeight: 600 }}>
                    {detectStatusMessage}
                  </div>
                )}
              </div>

              {/* Field 2: Crop Selection or Custom Input */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>
                  <Sprout size={15} color="var(--primary-700)" />
                  <span>{t('labelCrop')}</span>
                </label>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <select
                    value={isCustomCropMode ? 'CUSTOM' : farmSetup.crop}
                    onChange={(e) => handleCropChange(e.target.value)}
                    style={inputStyle}
                  >
                    {CROPS_LIST.map(crop => (
                      <option key={crop.id} value={crop.id}>
                        {crop.icon} {crop.name}
                      </option>
                    ))}
                  </select>

                  {isCustomCropMode && (
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-800)', marginBottom: '4px' }}>
                        {t('labelCustomCrop')}:
                      </div>
                      <input
                        type="text"
                        value={farmSetup.crop}
                        onChange={(e) => setFarmSetup(prev => ({ ...prev, crop: e.target.value }))}
                        placeholder={t('customCropPlaceholder')}
                        style={{ ...inputStyle, borderColor: 'var(--primary-500)', backgroundColor: '#f0fdf4' }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Field 3: Soil Type */}
              <div>
                <label style={labelStyle}>
                  <span>{t('labelSoil')}</span>
                </label>
                <select
                  value={farmSetup.soilType}
                  onChange={(e) => setFarmSetup(prev => ({ ...prev, soilType: e.target.value }))}
                  style={inputStyle}
                >
                  {SOIL_TYPES_LIST.map(soil => (
                    <option key={soil.id} value={soil.id}>{soil.name}</option>
                  ))}
                </select>
              </div>

              {/* Field 4: Crop Growth Stage */}
              <div>
                <label style={labelStyle}>
                  <span>{t('labelStage')}</span>
                </label>
                <select
                  value={farmSetup.growthStage}
                  onChange={(e) => setFarmSetup(prev => ({ ...prev, growthStage: e.target.value }))}
                  style={inputStyle}
                >
                  {GROWTH_STAGES_LIST.map(stage => (
                    <option key={stage.id} value={stage.id}>{stage.name}</option>
                  ))}
                </select>
              </div>

              {/* Field 5: Farm Size (Acres) */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>
                  <span>{t('labelSize')}: <strong style={{ color: 'var(--primary-800)' }}>{farmSetup.farmSize} Acres</strong></span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={farmSetup.farmSize}
                    onChange={(e) => setFarmSetup(prev => ({ ...prev, farmSize: Number(e.target.value) }))}
                    style={{ flex: 1 }}
                  />
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={farmSetup.farmSize}
                    onChange={(e) => setFarmSetup(prev => ({ ...prev, farmSize: Math.max(1, Math.min(100, Number(e.target.value))) }))}
                    style={{ ...inputStyle, width: '70px', padding: '6px 8px', textAlign: 'center' }}
                  />
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Weather Information / Forecast */}
          <div className="card-elevated" style={{ padding: '28px', borderTop: '4px solid var(--water-500)', backgroundColor: '#fafdfb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--neutral-900)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sun size={20} color="#f59e0b" />
                <span>{t('cardWeather')}</span>
              </h3>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '12px',
                backgroundColor: 'var(--water-100)',
                color: 'var(--water-600)',
                border: '1px solid var(--water-400)'
              }}>
                {t('badgeExternalWeather')}
              </span>
            </div>

            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-900)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} color="var(--primary-600)" />
              <span>Location: <strong>{farmSetup.location || 'Vadodara, Gujarat'}</strong></span>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--neutral-600)', marginBottom: '20px' }}>
              {t('weatherSubnote')}
            </p>

            {/* Weather Grid Display */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              
              <div style={weatherCardStyle}>
                <div style={weatherLabelStyle}><Thermometer size={14} color="#f59e0b" /> {t('lblTemp')}</div>
                <div style={weatherValueStyle}>{weatherData.temperature}°C</div>
              </div>

              <div style={weatherCardStyle}>
                <div style={weatherLabelStyle}><Droplets size={14} color="#0ea5e9" /> {t('lblHumidity')}</div>
                <div style={weatherValueStyle}>{weatherData.humidity}%</div>
              </div>

              <div style={weatherCardStyle}>
                <div style={weatherLabelStyle}><CloudRain size={14} color="#8b5cf6" /> {t('lblRainProb')}</div>
                <div style={weatherValueStyle}>{weatherData.rainProbability}%</div>
              </div>

              <div style={weatherCardStyle}>
                <div style={weatherLabelStyle}><CloudRain size={14} color="#0284c7" /> {t('lblRainfall')}</div>
                <div style={weatherValueStyle}>{weatherData.rainfallForecast} mm</div>
              </div>

              <div style={{ ...weatherCardStyle, gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={weatherLabelStyle}><Wind size={14} color="#64748b" /> {t('lblWind')}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--neutral-800)' }}>
                  {weatherData.windSpeed} km/h • {weatherData.condition}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '0.85rem',
  fontWeight: 700,
  color: 'var(--neutral-700)',
  marginBottom: '6px'
};

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '10px',
  border: '1px solid var(--neutral-300)',
  fontSize: '0.9rem',
  color: 'var(--neutral-800)',
  backgroundColor: '#ffffff',
  outline: 'none'
};

const weatherCardStyle = {
  backgroundColor: '#ffffff',
  padding: '14px',
  borderRadius: '12px',
  border: '1px solid var(--neutral-200)',
  boxShadow: 'var(--shadow-sm)'
};

const weatherLabelStyle = {
  fontSize: '0.78rem',
  fontWeight: 600,
  color: 'var(--neutral-600)',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  marginBottom: '4px'
};

const weatherValueStyle = {
  fontSize: '1.4rem',
  fontWeight: 800,
  color: 'var(--primary-900)'
};
