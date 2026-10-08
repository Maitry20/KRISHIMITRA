import React from 'react';
import { Cpu, Droplets, BarChart2, ShieldCheck, ArrowDown } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

export default function PhysicalFarmModel({ currentLang = 'en' }) {
  const t = (key) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key;

  return (
    <section style={{ padding: '70px 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
          <span className="badge-gcet" style={{ marginBottom: '12px' }}>
            <Cpu size={14} /> {t('archBadge')}
          </span>
          <h2 className="section-title">{t('archTitle')}</h2>
          <p className="section-subtitle">
            {t('archSubtitle')}
          </p>
        </div>

        {/* End-to-End System Integration Flowchart */}
        <div className="card-elevated" style={{ padding: '36px', background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)' }}>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
            maxWidth: '850px',
            margin: '0 auto'
          }}>
            
            {/* Step 1: Farmer Inputs */}
            <div style={stepRowStyle}>
              <div style={{ ...stepBadgeStyle, backgroundColor: 'var(--primary-700)', color: '#ffffff' }}>STEP 1</div>
              <div>
                <strong style={{ fontSize: '1.05rem', color: 'var(--primary-900)' }}>{t('archStep1Title')}</strong>
                <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: 'var(--neutral-600)' }}>
                  {t('archStep1Desc')}
                </p>
              </div>
            </div>

            <ArrowDown size={22} color="var(--primary-600)" />

            {/* Step 2: Weather Data */}
            <div style={stepRowStyle}>
              <div style={{ ...stepBadgeStyle, backgroundColor: '#0284c7', color: '#ffffff' }}>STEP 2</div>
              <div>
                <strong style={{ fontSize: '1.05rem', color: '#0369a1' }}>{t('archStep2Title')}</strong>
                <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: 'var(--neutral-600)' }}>
                  {t('archStep2Desc')}
                </p>
              </div>
            </div>

            <ArrowDown size={22} color="var(--primary-600)" />

            {/* Step 3: AI Engine */}
            <div style={{ ...stepRowStyle, border: '2px solid var(--primary-600)', backgroundColor: 'var(--primary-50)' }}>
              <div style={{ ...stepBadgeStyle, backgroundColor: 'var(--primary-800)', color: '#ffffff' }}>STEP 3</div>
              <div>
                <strong style={{ fontSize: '1.1rem', color: 'var(--primary-900)' }}>{t('archStep3Title')}</strong>
                <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: 'var(--primary-800)' }}>
                  {t('archStep3Desc')}
                </p>
              </div>
            </div>

            <ArrowDown size={22} color="var(--primary-600)" />

            {/* Step 4: Output Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', width: '100%' }}>
              <div style={outputMetricCard}>
                <BarChart2 size={20} color="var(--primary-700)" />
                <div>
                  <strong style={{ fontSize: '0.9rem' }}>{t('archStep4_1')}</strong>
                  <div style={{ fontSize: '0.78rem', color: 'var(--neutral-500)' }}>{t('archStep4_1Desc')}</div>
                </div>
              </div>

              <div style={outputMetricCard}>
                <Droplets size={20} color="#0284c7" />
                <div>
                  <strong style={{ fontSize: '0.9rem' }}>{t('archStep4_2')}</strong>
                  <div style={{ fontSize: '0.78rem', color: 'var(--neutral-500)' }}>{t('archStep4_2Desc')}</div>
                </div>
              </div>

              <div style={outputMetricCard}>
                <ShieldCheck size={20} color="#10b981" />
                <div>
                  <strong style={{ fontSize: '0.9rem' }}>{t('archStep4_3')}</strong>
                  <div style={{ fontSize: '0.78rem', color: 'var(--neutral-500)' }}>{t('archStep4_3Desc')}</div>
                </div>
              </div>
            </div>

            <ArrowDown size={22} color="var(--primary-600)" />

            {/* Step 5: Visualization & Water Saving */}
            <div style={stepRowStyle}>
              <div style={{ ...stepBadgeStyle, backgroundColor: 'var(--primary-900)', color: '#ffffff' }}>STEP 5</div>
              <div>
                <strong style={{ fontSize: '1.05rem', color: 'var(--primary-900)' }}>{t('archStep5Title')}</strong>
                <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: 'var(--neutral-600)' }}>
                  {t('archStep5Desc')}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

const stepRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  width: '100%',
  padding: '16px 20px',
  borderRadius: '14px',
  backgroundColor: '#ffffff',
  border: '1px solid var(--neutral-200)',
  boxShadow: 'var(--shadow-sm)'
};

const stepBadgeStyle = {
  padding: '6px 14px',
  borderRadius: '8px',
  fontSize: '0.78rem',
  fontWeight: 800,
  letterSpacing: '0.05em',
  flexShrink: 0
};

const outputMetricCard = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '14px',
  borderRadius: '12px',
  backgroundColor: '#ffffff',
  border: '1px solid var(--neutral-200)',
  boxShadow: 'var(--shadow-sm)'
};
