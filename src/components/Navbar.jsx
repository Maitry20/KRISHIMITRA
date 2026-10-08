import React from 'react';
import { Sprout, Play, Globe } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

export default function Navbar({ onStartDemo, currentLang = 'en', setCurrentLang }) {
  const t = (key) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key;

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.94)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--neutral-200)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        
        {/* Brand Logo & Subtitle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--primary-800), var(--primary-600))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 4px 10px rgba(45, 106, 79, 0.3)'
          }}>
            <Sprout size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.35rem', color: 'var(--primary-900)', letterSpacing: '-0.02em' }}>
                KRISHI-MITRA
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--neutral-600)', margin: 0, fontWeight: 500 }}>
              AI-Based Farming Assistant
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }} className="nav-links-desktop">
          <a href="#hero" style={linkStyle}>{t('navHome')}</a>
          <a href="#monitor" style={linkStyle}>{t('navFarmSetup')}</a>
          <a href="#ai-irrigation" style={linkStyle}>{t('navAiIrrigation')}</a>
          <a href="#plant-health" style={linkStyle}>{t('navPlantHealth')}</a>
          <a href="#how-it-works" style={linkStyle}>{t('navHowItWorks')}</a>
          <a href="#impact" style={linkStyle}>{t('navImpact')}</a>
        </div>

        {/* Action Controls & Top Right Language Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Top Right Language Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Globe size={16} color="var(--primary-700)" />
            <select
              value={currentLang}
              onChange={(e) => setCurrentLang && setCurrentLang(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '16px',
                border: '1.5px solid var(--primary-300)',
                backgroundColor: '#ffffff',
                color: 'var(--primary-900)',
                fontWeight: 700,
                fontSize: '0.825rem',
                cursor: 'pointer',
                outline: 'none',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <option value="en">🌐 English (EN)</option>
              <option value="hi">🇮🇳 हिन्दी (HI)</option>
              <option value="gu">🇮🇳 ગુજરાતી (GU)</option>
            </select>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '20px',
            backgroundColor: 'var(--primary-50)',
            border: '1px solid var(--primary-200)',
            fontSize: '0.78rem',
            color: 'var(--primary-800)',
            fontWeight: 600
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 8px #10b981'
            }}></span>
            <span>{t('navBadgeVirtual')}</span>
          </div>

          <button
            onClick={onStartDemo}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '10px',
              backgroundColor: 'var(--primary-700)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(45, 106, 79, 0.35)',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-800)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-700)'}
          >
            <Play size={15} fill="#ffffff" />
            <span>{t('startDemo')}</span>
          </button>
        </div>

      </div>
    </nav>
  );
}

const linkStyle = {
  textDecoration: 'none',
  color: 'var(--neutral-700)',
  fontWeight: 600,
  fontSize: '0.9rem',
  transition: 'color 0.2s ease'
};
