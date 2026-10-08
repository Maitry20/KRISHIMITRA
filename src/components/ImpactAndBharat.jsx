import React from 'react';
import { Droplets, Eye, ShieldAlert, BrainCircuit, Heart, Globe } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

export default function ImpactAndBharat({ currentLang = 'en' }) {
  const t = (key) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key;

  return (
    <section id="impact" style={{ padding: '80px 0', backgroundColor: '#f8fafc' }}>
      <div className="container">
        
        {/* Section Header 1 */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
          <span className="badge-gcet" style={{ marginBottom: '12px' }}>
            <Heart size={14} color="#ef4444" /> {t('objBadge')}
          </span>
          <h2 className="section-title">{t('objTitle')}</h2>
          <p className="section-subtitle">
            {t('objSubtitle')}
          </p>
        </div>

        {/* 4 Impact Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          marginBottom: '70px'
        }}>
          
          <div className="card-elevated" style={{ padding: '28px', borderTop: '4px solid var(--water-500)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Droplets size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-900)', marginBottom: '8px' }}>
              {t('impact1Title')}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--neutral-600)', margin: 0 }}>
              {t('impact1Desc')}
            </p>
          </div>

          <div className="card-elevated" style={{ padding: '28px', borderTop: '4px solid var(--primary-600)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--primary-100)', color: 'var(--primary-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Eye size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-900)', marginBottom: '8px' }}>
              {t('impact2Title')}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--neutral-600)', margin: 0 }}>
              {t('impact2Desc')}
            </p>
          </div>

          <div className="card-elevated" style={{ padding: '28px', borderTop: '4px solid #f59e0b' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <ShieldAlert size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-900)', marginBottom: '8px' }}>
              {t('impact3Title')}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--neutral-600)', margin: 0 }}>
              {t('impact3Desc')}
            </p>
          </div>

          <div className="card-elevated" style={{ padding: '28px', borderTop: '4px solid #8b5cf6' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#f3e8ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <BrainCircuit size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-900)', marginBottom: '8px' }}>
              {t('impact4Title')}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--neutral-600)', margin: 0 }}>
              {t('impact4Desc')}
            </p>
          </div>

        </div>

        {/* Section 2: Technology for a Sustainable Bharat */}
        <div className="card-elevated" style={{
          padding: '40px',
          background: 'linear-gradient(135deg, var(--primary-900) 0%, var(--primary-800) 100%)',
          color: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 12px 35px rgba(15, 41, 30, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Globe size={24} color="#e9c46a" />
            <span style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.05em', color: '#e9c46a', textTransform: 'uppercase' }}>
              {t('bharatBadge')}
            </span>
          </div>

          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '16px', color: '#ffffff' }}>
            {t('bharatTitle')}
          </h2>

          <p style={{ fontSize: '1.1rem', color: '#d8f3dc', lineHeight: 1.7, maxWidth: '880px', margin: 0 }}>
            {t('bharatDesc')}
          </p>
        </div>

      </div>
    </section>
  );
}
