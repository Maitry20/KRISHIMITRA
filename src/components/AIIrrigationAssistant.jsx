import React, { useState } from 'react';
import { evaluateVirtualIrrigationAI } from '../utils/aiModel';
import { TRANSLATIONS } from '../utils/translations';
import { Cpu, CheckCircle2, AlertTriangle, Droplets, Zap, HelpCircle, ChevronDown, ChevronUp, BarChart2, ShieldCheck, Play, Sparkles } from 'lucide-react';

export default function AIIrrigationAssistant({ farmSetup = {}, weatherData = {}, diseaseResult = null, currentLang = 'en' }) {
  const [hasGeneratedReport, setHasGeneratedReport] = useState(false);
  const [showWhyDetails, setShowWhyDetails] = useState(false);

  const t = (key) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key;

  const aiResult = evaluateVirtualIrrigationAI(farmSetup, weatherData, diseaseResult);

  const {
    recommendationState,
    stateTitle,
    stateColor,
    recommendedTime,
    reasonText,
    todayAdvice,
    totalRequirementScore,
    factorBreakdown,
    waterRequirement,
    waterSavingSimulator
  } = aiResult;

  return (
    <section id="ai-irrigation" style={{ padding: '70px 0', backgroundColor: '#f0fdf4' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
          <span className="badge-gcet" style={{ marginBottom: '12px' }}>
            <Cpu size={14} /> {t('engineBadge')}
          </span>
          <h2 className="section-title">{t('engineTitle')}</h2>
          <p className="section-subtitle">
            {t('engineSubtitle')}
          </p>
        </div>

        {/* INITIAL STANDBY STATE OR REPORT DISPLAY */}
        {!hasGeneratedReport ? (
          /* Initial Standby Prompt Card - No Report Shown Initially */
          <div className="card-elevated" style={{
            padding: '44px 32px',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            border: '2px dashed var(--primary-300)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-100)',
              color: 'var(--primary-800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '2rem'
            }}>
              🧠
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '8px' }}>
              {t('promptTitle')}
            </h3>

            <p style={{ fontSize: '0.95rem', color: 'var(--neutral-600)', maxWidth: '520px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              {t('promptDesc')}
            </p>

            <button
              onClick={() => setHasGeneratedReport(true)}
              style={{
                padding: '14px 32px',
                borderRadius: '12px',
                backgroundColor: 'var(--primary-700)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 800,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 6px 20px rgba(45, 106, 79, 0.35)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-800)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-700)'}
            >
              <Sparkles size={18} color="#e9c46a" />
              <span>{t('btnGenerateReport')}</span>
            </button>
          </div>
        ) : (
          /* GENERATED REPORT CONTENT */
          <div>
            
            {/* Re-generate button top bar */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
              <button
                onClick={() => setHasGeneratedReport(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  backgroundColor: '#ffffff',
                  color: 'var(--primary-800)',
                  border: '1px solid var(--primary-300)',
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Sparkles size={14} color="var(--primary-600)" />
                <span>Re-Run AI Report</span>
              </button>
            </div>

            {/* TODAY'S FARM ADVISORY */}
            <div className="card-elevated" style={{
              padding: '28px',
              marginBottom: '32px',
              backgroundColor: '#ffffff',
              borderLeft: `6px solid ${stateColor}`,
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--primary-700)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px' }}>
                    {t('advisoryHeader')}
                  </div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '8px' }}>
                    {t('advisoryQuestion')}
                  </h3>
                  <p style={{ fontSize: '1.05rem', color: 'var(--neutral-800)', fontWeight: 600, lineHeight: 1.5, maxWidth: '800px', margin: 0 }}>
                    {todayAdvice}
                  </p>
                </div>

                <button
                  onClick={() => setShowWhyDetails(!showWhyDetails)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--primary-50)',
                    color: 'var(--primary-800)',
                    border: '1px solid var(--primary-300)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer'
                  }}
                >
                  <HelpCircle size={16} color="var(--primary-700)" />
                  <span>{showWhyDetails ? t('btnHideWhy') : t('btnWhyDetails')}</span>
                  {showWhyDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {/* Expandable "Why?" Rationale Section */}
              {showWhyDetails && (
                <div style={{
                  marginTop: '20px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--neutral-200)',
                  backgroundColor: '#f8fafc',
                  padding: '20px',
                  borderRadius: '12px'
                }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--neutral-900)', marginBottom: '10px' }}>
                    🧠 AI Multi-Factor Rationale:
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--neutral-700)', lineHeight: 1.6, margin: 0 }}>
                    {reasonText}
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '16px' }}>
                    <div style={whyFactChip}><strong>Crop:</strong> {farmSetup.crop || 'Tomato'}</div>
                    <div style={whyFactChip}><strong>Soil:</strong> {farmSetup.soilType || 'Loamy'}</div>
                    <div style={whyFactChip}><strong>Stage:</strong> {farmSetup.growthStage || 'Flowering'}</div>
                    <div style={whyFactChip}><strong>Temp:</strong> {weatherData.temperature}°C</div>
                    <div style={whyFactChip}><strong>Rain Prob:</strong> {weatherData.rainProbability}%</div>
                    <div style={whyFactChip}><strong>Forecast:</strong> {weatherData.rainfallForecast} mm</div>
                  </div>
                </div>
              )}
            </div>

            {/* Core Grid: Recommendation + Score + Water Savings */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '28px',
              alignItems: 'stretch'
            }} className="ai-engine-grid">

              {/* Column 1: AI Recommendation Card */}
              <div className="card-elevated" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-900)', margin: 0 }}>
                      {t('cardRecommendation')}
                    </h3>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      backgroundColor: 'var(--primary-100)',
                      color: 'var(--primary-800)',
                      fontSize: '0.78rem',
                      fontWeight: 700
                    }}>
                      {t('badgeAiActive')}
                    </span>
                  </div>

                  <div style={{
                    padding: '24px',
                    borderRadius: '16px',
                    backgroundColor: recommendationState === 'RECOMMENDED' ? '#ecfdf5' : (recommendationState === 'DELAYED' ? '#fffbeb' : '#f0f9ff'),
                    border: `2px solid ${stateColor}`,
                    marginBottom: '20px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <Droplets size={32} color={stateColor} />
                      <span style={{ fontSize: '1.45rem', fontWeight: 800, color: stateColor }}>
                        {stateTitle}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--neutral-700)', margin: 0, lineHeight: 1.5 }}>
                      {reasonText}
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid var(--neutral-200)' }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--neutral-500)', fontWeight: 600 }}>{t('lblTimeWindow')}</div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--neutral-900)', marginTop: '4px' }}>
                        {recommendedTime}
                      </div>
                    </div>

                    <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid var(--neutral-200)' }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--neutral-500)', fontWeight: 600 }}>{t('lblWaterNeedLevel')}</div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: stateColor, marginTop: '4px' }}>
                        {recommendationState === 'RECOMMENDED' ? 'High Demand' : (recommendationState === 'DELAYED' ? 'Rain Expected' : 'Optimal Soil Balance')}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '20px', fontSize: '0.78rem', color: 'var(--neutral-500)', textAlign: 'center' }}>
                  ℹ️ Recommendation calculated dynamically via crop evapotranspiration rules.
                </div>
              </div>

              {/* Column 2: Irrigation Score */}
              <div className="card-elevated" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-900)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <BarChart2 size={20} color="var(--primary-700)" />
                      <span>{t('cardScore')}</span>
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', fontWeight: 600 }}>{t('scoreSubtitle')}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary-800)', lineHeight: 1 }}>
                      {totalRequirementScore} <span style={{ fontSize: '1.2rem', color: 'var(--neutral-500)', fontWeight: 600 }}>/ 100</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--neutral-600)', lineHeight: 1.4 }}>
                      Higher score indicates elevated water stress and urgent need for virtual irrigation.
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <FactorBar label={t('lblTempImpact')} score={factorBreakdown.temperature} max={20} color="#f59e0b" />
                    <FactorBar label={t('lblRainImpact')} score={factorBreakdown.rainfall} max={20} color="#8b5cf6" />
                    <FactorBar label={t('lblHumidityImpact')} score={factorBreakdown.humidity} max={20} color="#3b82f6" />
                    <FactorBar label={t('lblStageImpact')} score={factorBreakdown.cropStage} max={20} color="var(--primary-600)" />
                    <FactorBar label={t('lblSoilImpact')} score={factorBreakdown.soilType} max={20} color="#8c5319" />
                  </div>
                </div>

                <div style={{ marginTop: '16px', fontSize: '0.78rem', color: 'var(--neutral-500)', fontStyle: 'italic' }}>
                  Note: Factors are generated from available inputs and weather forecasts.
                </div>
              </div>

            </div>

            {/* Water Requirement & Water-Saving Simulator Card */}
            <div className="card-elevated" style={{ marginTop: '32px', padding: '28px', background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }} className="water-est-grid">
                
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--water-600)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {t('cardWaterEst')}
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-900)', marginTop: '4px', marginBottom: '12px' }}>
                    {t('titleWaterEst')}
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                    <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--neutral-200)', boxShadow: 'var(--shadow-sm)' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--neutral-500)', fontWeight: 600 }}>{t('lblPerAcre')}</div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--water-600)', marginTop: '2px' }}>
                        {waterRequirement.litrePerAcre.toLocaleString()} L <span style={{ fontSize: '0.85rem', color: 'var(--neutral-500)' }}>/ acre</span>
                      </div>
                    </div>

                    <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--neutral-200)', boxShadow: 'var(--shadow-sm)' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--neutral-500)', fontWeight: 600 }}>{t('lblTotalFarmReq')}</div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-800)', marginTop: '2px' }}>
                        {waterRequirement.totalLitres.toLocaleString()} L
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', marginTop: '2px' }}>
                        for {farmSetup.farmSize || 2}-acre farm
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ paddingLeft: '20px', borderLeft: '1px solid var(--neutral-200)' }} className="water-saving-left-border">
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary-700)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {t('cardWaterSaving')}
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-900)', marginTop: '4px', marginBottom: '16px' }}>
                    {t('titleWaterSaving')}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--neutral-600)' }}>
                      <span>{t('lblTraditionalIrrigation')}</span>
                      <strong style={{ color: '#ef4444' }}>{waterSavingSimulator.traditionalTotalLitres.toLocaleString()} L</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--neutral-600)' }}>
                      <span>{t('lblAiOptimizedIrrigation')}</span>
                      <strong style={{ color: 'var(--primary-700)' }}>{waterSavingSimulator.aiOptimizedTotalLitres.toLocaleString()} L</strong>
                    </div>

                    <div style={{
                      display: 'flex',
                      justify: 'space-between',
                      alignItems: 'center',
                      padding: '14px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--primary-100)',
                      border: '1.5px solid var(--primary-300)',
                      marginTop: '4px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Droplets size={20} color="var(--primary-800)" />
                        <span style={{ fontWeight: 800, color: 'var(--primary-900)', fontSize: '0.95rem' }}>{t('lblWaterSaved')}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--primary-800)' }}>
                          {waterSavingSimulator.waterSavedLitres.toLocaleString()} L
                        </div>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-700)' }}>
                          {waterSavingSimulator.savingPercentage}% Savings
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}

function FactorBar({ label, score, max, color }) {
  const percentage = Math.round((score / max) * 100);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: 'var(--neutral-700)', marginBottom: '4px' }}>
        <span>{label}</span>
        <span>{score} / {max}</span>
      </div>
      <div style={{ width: '100%', height: '8px', borderRadius: '4px', backgroundColor: '#e2e8f0', overflow: 'hidden' }}>
        <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: color, borderRadius: '4px', transition: 'width 0.4s ease' }} />
      </div>
    </div>
  );
}

const whyFactChip = {
  padding: '6px 12px',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  border: '1px solid var(--neutral-200)',
  fontSize: '0.8rem',
  color: 'var(--neutral-700)'
};
