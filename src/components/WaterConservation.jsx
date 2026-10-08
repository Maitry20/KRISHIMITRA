import React from 'react';
import { Droplets, Info } from 'lucide-react';
import { evaluateVirtualIrrigationAI } from '../utils/aiModel';
import { TRANSLATIONS } from '../utils/translations';

export default function WaterConservation({ farmSetup = {}, weatherData = {}, currentLang = 'en' }) {
  const t = (key) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key;
  const aiResult = evaluateVirtualIrrigationAI(farmSetup, weatherData);
  const { waterSavingSimulator } = aiResult;

  return (
    <section style={{ padding: '70px 0', backgroundColor: '#f0fdf4' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
          <span className="badge-gcet" style={{ marginBottom: '12px' }}>
            <Droplets size={14} color="#38bdf8" /> {t('waterConsBadge')}
          </span>
          <h2 className="section-title">{t('waterConsTitle')}</h2>
          <p className="section-subtitle">
            {t('waterConsSubtitle')}
          </p>
        </div>

        {/* Comparison Graphic Card */}
        <div className="card-elevated" style={{
          padding: '36px',
          maxWidth: '860px',
          margin: '0 auto',
          background: '#ffffff',
          border: '2px solid var(--primary-200)'
        }}>

          {/* Top Label */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '12px',
            backgroundColor: 'var(--primary-100)',
            color: 'var(--primary-800)',
            fontSize: '0.78rem',
            fontWeight: 800,
            marginBottom: '24px'
          }}>
            <Info size={14} />
            <span>{t('lblModelTag')}</span>
          </div>

          {/* Bar 1: Traditional */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.95rem', fontWeight: 700 }}>
              <span>{t('lblTraditional')}</span>
              <span style={{ color: 'var(--neutral-600)' }}>{waterSavingSimulator.traditionalTotalLitres.toLocaleString()} Litres</span>
            </div>
            <div style={{ width: '100%', height: '24px', backgroundColor: '#e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', backgroundColor: '#ef4444' }} />
            </div>
          </div>

          {/* Bar 2: KRISHI-MITRA Virtual AI */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.95rem', fontWeight: 700 }}>
              <span style={{ color: 'var(--primary-800)' }}>{t('lblKrishiMitra')}</span>
              <span style={{ color: 'var(--primary-700)', fontWeight: 800 }}>{waterSavingSimulator.aiOptimizedTotalLitres.toLocaleString()} Litres</span>
            </div>
            <div style={{ width: '100%', height: '24px', backgroundColor: '#e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{
                width: `${Math.max(10, Math.min(100, (waterSavingSimulator.aiOptimizedTotalLitres / waterSavingSimulator.traditionalTotalLitres) * 100))}%`,
                height: '100%',
                backgroundColor: 'var(--primary-600)',
                borderRadius: '12px'
              }} />
            </div>
          </div>

          {/* Stats Summary Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '16px',
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: 'var(--primary-50)',
            border: '1px solid var(--primary-200)',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--neutral-500)', fontWeight: 600 }}>{t('lblTradReq')}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ef4444' }}>{waterSavingSimulator.traditionalTotalLitres.toLocaleString()} L</div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--neutral-500)', fontWeight: 600 }}>{t('lblAiUsage')}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-800)' }}>{waterSavingSimulator.aiOptimizedTotalLitres.toLocaleString()} L</div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--neutral-500)', fontWeight: 600 }}>{t('lblSavedEst')}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0284c7' }}>
                {waterSavingSimulator.waterSavedLitres.toLocaleString()} L (<span data-counter-target={waterSavingSimulator.savingPercentage} data-counter-suffix="%">0%</span>)
              </div>
            </div>
          </div>

          {/* Footnote Disclaimer */}
          <p style={{
            fontSize: '0.825rem',
            color: 'var(--neutral-500)',
            margin: '20px 0 0',
            textAlign: 'center',
            lineHeight: 1.5
          }}>
            {t('waterDisclaimer')}
          </p>

        </div>

      </div>
    </section>
  );
}
