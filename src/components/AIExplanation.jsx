import React from 'react';
import { Upload, Eye, BrainCircuit, CheckSquare } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

export default function AIExplanation({ currentLang = 'en' }) {
  const t = (key) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key;

  return (
    <section id="how-it-works" style={{ padding: '70px 0', backgroundColor: '#f8fafc' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
          <span className="badge-gcet" style={{ marginBottom: '12px' }}>
            <BrainCircuit size={14} /> {t('howBadge')}
          </span>
          <h2 className="section-title">{t('howTitle')}</h2>
          <p className="section-subtitle">
            {t('howSubtitle')}
          </p>
        </div>

        {/* 4 Step Cards Flowchart */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px'
        }}>

          {/* Step 1: Upload */}
          <div className="card-elevated" style={{ padding: '24px', textAlign: 'center', position: 'relative' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: 'var(--primary-100)',
              color: 'var(--primary-800)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Upload size={28} />
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary-600)', textTransform: 'uppercase' }}>
              {t('step1Tag')}
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--neutral-900)', margin: '6px 0 10px' }}>
              {t('step1Title')}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--neutral-600)', margin: 0 }}>
              {t('step1Desc')}
            </p>
          </div>

          {/* Step 2: Analyze */}
          <div className="card-elevated" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: '#e0f2fe',
              color: '#0284c7',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Eye size={28} />
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
              {t('step2Tag')}
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--neutral-900)', margin: '6px 0 10px' }}>
              {t('step2Title')}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--neutral-600)', margin: 0 }}>
              {t('step2Desc')}
            </p>
          </div>

          {/* Step 3: Predict */}
          <div className="card-elevated" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: '#fef3c7',
              color: '#d97706',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <BrainCircuit size={28} />
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase' }}>
              {t('step3Tag')}
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--neutral-900)', margin: '6px 0 10px' }}>
              {t('step3Title')}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--neutral-600)', margin: 0 }}>
              {t('step3Desc')}
            </p>
          </div>

          {/* Step 4: Recommend */}
          <div className="card-elevated" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: 'var(--primary-100)',
              color: 'var(--primary-800)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <CheckSquare size={28} />
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary-700)', textTransform: 'uppercase' }}>
              {t('step4Tag')}
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--neutral-900)', margin: '6px 0 10px' }}>
              {t('step4Title')}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--neutral-600)', margin: 0 }}>
              {t('step4Desc')}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
