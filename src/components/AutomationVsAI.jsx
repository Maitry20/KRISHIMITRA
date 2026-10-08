import React from 'react';
import { Layers } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

export default function AutomationVsAI({ currentLang = 'en' }) {
  const t = (key) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key;

  return (
    <section style={{ padding: '70px 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
          <span className="badge-gcet" style={{ marginBottom: '12px' }}>
            <Layers size={14} /> {t('compBadge')}
          </span>
          <h2 className="section-title">{t('compTitle')}</h2>
          <p className="section-subtitle">
            {t('compSubtitle')}
          </p>
        </div>

        {/* Side-by-Side Comparison Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '32px',
          alignItems: 'stretch'
        }} className="comparison-grid">

          {/* LEFT: Traditional Fixed Timer */}
          <div className="card-elevated" style={{
            padding: '32px',
            backgroundColor: '#f8fafc',
            border: '2px solid var(--neutral-300)',
            position: 'relative'
          }}>
            <div style={{
              padding: '6px 12px',
              borderRadius: '20px',
              backgroundColor: '#e2e8f0',
              color: 'var(--neutral-700)',
              fontSize: '0.78rem',
              fontWeight: 800,
              display: 'inline-block',
              marginBottom: '16px'
            }}>
              {t('tagTraditional')}
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--neutral-800)', marginBottom: '20px' }}>
              {t('titleTraditional')}
            </h3>

            {/* Flow representation */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '24px',
              fontSize: '0.92rem'
            }}>
              <div style={flowBoxStyle}>
                {t('stepTrad1')}
              </div>
              <div style={{ textAlign: 'center', color: 'var(--neutral-400)', fontWeight: 800 }}>↓</div>
              <div style={flowBoxStyle}>
                {t('stepTrad2')}
              </div>
              <div style={{ textAlign: 'center', color: 'var(--neutral-400)', fontWeight: 800 }}>↓</div>
              <div style={{ ...flowBoxStyle, backgroundColor: '#fee2e2', color: '#991b1b', fontWeight: 700 }}>
                {t('stepTrad3')}
              </div>
            </div>

            <div style={{ fontSize: '0.88rem', color: 'var(--neutral-600)', borderTop: '1px solid var(--neutral-200)', paddingTop: '16px' }}>
              <strong>{t('drawbacksTitle')}</strong> {t('drawbacksText')}
            </div>
          </div>

          {/* RIGHT: KRISHI-MITRA Virtual AI System */}
          <div className="card-elevated" style={{
            padding: '32px',
            backgroundColor: 'var(--primary-50)',
            border: '2px solid var(--primary-400)',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <div style={{
              padding: '6px 12px',
              borderRadius: '20px',
              backgroundColor: 'var(--primary-700)',
              color: '#ffffff',
              fontSize: '0.78rem',
              fontWeight: 800,
              display: 'inline-block',
              marginBottom: '16px'
            }}>
              {t('tagAi')}
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '20px' }}>
              {t('titleAi')}
            </h3>

            {/* Multi-variable flow */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginBottom: '24px',
              fontSize: '0.92rem'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                fontSize: '0.825rem',
                fontWeight: 700
              }}>
                <div style={aiInputChipStyle}>{t('chipCrop')}</div>
                <div style={aiInputChipStyle}>{t('chipSoil')}</div>
                <div style={aiInputChipStyle}>{t('chipTemp')}</div>
                <div style={aiInputChipStyle}>{t('chipRain')}</div>
              </div>

              <div style={{ textAlign: 'center', color: 'var(--primary-600)', fontWeight: 800, margin: '4px 0' }}>↓</div>

              <div style={{
                padding: '12px',
                borderRadius: '10px',
                backgroundColor: 'var(--primary-700)',
                color: '#ffffff',
                fontWeight: 800,
                textAlign: 'center',
                boxShadow: '0 4px 10px rgba(45, 106, 79, 0.3)'
              }}>
                {t('chipEngine')}
              </div>

              <div style={{ textAlign: 'center', color: 'var(--primary-600)', fontWeight: 800, margin: '4px 0' }}>↓</div>

              <div style={{
                padding: '12px',
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                border: '2px solid var(--primary-500)',
                color: 'var(--primary-900)',
                fontWeight: 800,
                textAlign: 'center'
              }}>
                {t('chipAllocation')}
              </div>
            </div>

            <div style={{ fontSize: '0.88rem', color: 'var(--primary-900)', borderTop: '1px solid var(--primary-200)', paddingTop: '16px' }}>
              <strong>{t('advantagesTitle')}</strong> {t('advantagesText')}
            </div>
          </div>

        </div>

        {/* Highlighted Quote Header */}
        <div style={{
          marginTop: '40px',
          padding: '24px 32px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, var(--primary-900), var(--primary-800))',
          color: '#ffffff',
          textAlign: 'center',
          boxShadow: '0 10px 25px rgba(15, 41, 30, 0.25)'
        }}>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.25rem',
            fontWeight: 700,
            lineHeight: 1.4,
            margin: 0,
            letterSpacing: '-0.01em'
          }}>
            {t('quoteText')}
          </p>
        </div>

      </div>
    </section>
  );
}

const flowBoxStyle = {
  padding: '12px',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  border: '1px solid var(--neutral-300)',
  textAlign: 'center',
  fontWeight: 600,
  color: 'var(--neutral-800)'
};

const aiInputChipStyle = {
  padding: '8px 10px',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  border: '1px solid var(--primary-300)',
  color: 'var(--primary-900)',
  textAlign: 'center'
};
