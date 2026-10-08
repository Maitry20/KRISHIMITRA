import React from 'react';
import { Cpu, Code, Layers, Sprout, Compass } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

export default function TechStackAndFooter({ currentLang = 'en' }) {
  const t = (key) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key;

  return (
    <footer style={{ backgroundColor: 'var(--neutral-900)', color: '#ffffff', paddingTop: '70px', paddingBottom: '40px' }}>
      <div className="container">
        
        {/* Technology Stack Grid */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ color: 'var(--primary-400)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {t('techHeaderTag')}
            </span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
              {t('techHeaderTitle')}
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            
            {/* Input Data Parameters Column */}
            <div style={techCardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Compass size={22} color="var(--primary-400)" />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>Farm & Weather Inputs</h4>
              </div>
              <ul style={techListStyle}>
                <li>Farmer Selection: Crop & Soil Type</li>
                <li>Crop Growth Stage Multipliers</li>
                <li>Farm Size Scale (1–100 Acres)</li>
                <li>External Weather Data & Forecast API</li>
                <li>Evapotranspiration Deficit Engine</li>
              </ul>
            </div>

            {/* AI / Software Column */}
            <div style={techCardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Layers size={22} color="#38bdf8" />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>AI & Decision Software</h4>
              </div>
              <ul style={techListStyle}>
                <li>Python & Machine Learning Logic</li>
                <li>Convolutional Neural Network (CNN) Leaf Model</li>
                <li>Evapotranspiration Decision Engine</li>
                <li>Multi-Variable Data Fusion Rules</li>
                <li>REST Inference API Interface</li>
              </ul>
            </div>

            {/* Interface Column */}
            <div style={techCardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Code size={22} color="#e9c46a" />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>User Interface</h4>
              </div>
              <ul style={techListStyle}>
                <li>HTML5 Semantic Structure</li>
                <li>Modular CSS3 & Glassmorphism Design Tokens</li>
                <li>JavaScript ES6+ & React Interactive Engine</li>
                <li>SVG Animated Digital Farm Visualizer</li>
                <li>Vite High-Performance Web App Stack</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #334155', margin: '40px 0 30px' }} />

        {/* Bottom Footer Info */}
        <div style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          fontSize: '0.88rem',
          color: '#94a3b8'
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'var(--primary-700)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sprout size={18} />
            </div>
            <div>
              <span style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.1rem' }}>KRISHI-MITRA</span>
              <p style={{ margin: 0, fontSize: '0.78rem' }}>{t('footerSubtitle')}</p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: 0 }}>
              {t('footerQuote')}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: '#cbd5e1' }}>
            <span>{t('footerTags')}</span>
          </div>

        </div>

      </div>
    </footer>
  );
}

const techCardStyle = {
  backgroundColor: '#1e293b',
  padding: '24px',
  borderRadius: '16px',
  border: '1px solid #334155'
};

const techListStyle = {
  margin: 0,
  paddingLeft: '20px',
  fontSize: '0.88rem',
  color: '#cbd5e1',
  lineHeight: 1.8
};
