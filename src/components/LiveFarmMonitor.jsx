import React from 'react';
import { Sprout, MapPin, Layers, Sun, Thermometer, Droplets, CloudRain, Wind, Compass } from 'lucide-react';
import { CROPS_LIST, SOIL_TYPES_LIST, GROWTH_STAGES_LIST, PRESET_LOCATIONS } from '../utils/aiModel';
import { TRANSLATIONS } from '../utils/translations';

export default function LiveFarmMonitor({ farmSetup, setFarmSetup, weatherData, setWeatherData, currentLang = 'en' }) {
  const t = (key) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key;

  const handleLocationChange = (locName) => {
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
              
              {/* Field 1: Location */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>
                  <MapPin size={15} color="var(--primary-700)" />
                  <span>{t('labelLocation')}</span>
                </label>
                <select
                  value={farmSetup.location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  style={inputStyle}
                >
                  {PRESET_LOCATIONS.map(loc => (
                    <option key={loc.name} value={loc.name}>{loc.name}</option>
                  ))}
                </select>
              </div>

              {/* Field 2: Crop */}
              <div>
                <label style={labelStyle}>
                  <span>{t('labelCrop')}</span>
                </label>
                <select
                  value={farmSetup.crop}
                  onChange={(e) => setFarmSetup(prev => ({ ...prev, crop: e.target.value }))}
                  style={inputStyle}
                >
                  {CROPS_LIST.map(crop => (
                    <option key={crop.id} value={crop.id}>{crop.icon} {crop.name}</option>
                  ))}
                </select>
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
              <div>
                <label style={labelStyle}>
                  <span>{t('labelSize')}: <strong style={{ color: 'var(--primary-800)' }}>{farmSetup.farmSize}</strong></span>
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
