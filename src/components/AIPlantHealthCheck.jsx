import React, { useState, useEffect, useRef } from 'react';
import { SAMPLE_LEAF_DATASET } from '../utils/aiModel';
import { analyzeUploadedLeafImage } from '../utils/leafAnalyzer';
import { TRANSLATIONS } from '../utils/translations';
import { Upload, Camera, Leaf, CheckCircle, AlertTriangle, ShieldAlert, Sparkles, RefreshCw, Link2 } from 'lucide-react';

export default function AIPlantHealthCheck({ diseaseResult, setDiseaseResult, currentLang = 'en' }) {
  const t = (key) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key;
  const [selectedLeaf, setSelectedLeaf] = useState(null);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [customImage, setCustomImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [displayedConfidence, setDisplayedConfidence] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [pixelStats, setPixelStats] = useState({ healthyPct: 0, darkSpotPct: 0, rustPct: 0, powderyPct: 0 });

  // Camera Live Capture state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);

  // Trigger analysis whenever leaf or image selection changes
  const startAnalysis = async (leafData, imageSrc = null) => {
    setHasAnalyzed(true);
    setSelectedLeaf(leafData);
    const targetSrc = imageSrc || leafData?.imageSrc;
    if (imageSrc) setCustomImage(imageSrc);
    else setCustomImage(null);

    setIsAnalyzing(true);
    setAnalysisProgress(15);
    setDisplayedConfidence(0);

    // Perform real computer vision pixel analysis
    const realAnalysis = await analyzeUploadedLeafImage(targetSrc);

    const mergedResult = {
      ...(leafData || {}),
      status: realAnalysis.status,
      condition: realAnalysis.condition,
      severity: realAnalysis.severity,
      confidence: realAnalysis.confidence,
      symptoms: realAnalysis.symptoms,
      recommendation: realAnalysis.recommendation,
      organicTreatment: realAnalysis.organicTreatment,
      imageSrc: targetSrc,
    };

    setSelectedLeaf(mergedResult);
    setPixelStats(realAnalysis.pixelStats);

    if (setDiseaseResult) {
      setDiseaseResult(mergedResult);
    }
  };

  // Scanning progress timer
  useEffect(() => {
    if (!isAnalyzing) return;

    const timer1 = setTimeout(() => setAnalysisProgress(50), 300);
    const timer2 = setTimeout(() => setAnalysisProgress(85), 700);
    const timer3 = setTimeout(() => {
      setAnalysisProgress(100);
      setIsAnalyzing(false);
    }, 1100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isAnalyzing]);

  // Confidence count-up animation
  useEffect(() => {
    if (isAnalyzing || !selectedLeaf) return;

    let target = selectedLeaf.confidence || 90;
    let start = 0;
    const interval = setInterval(() => {
      start += 3;
      if (start >= target) {
        setDisplayedConfidence(target);
        clearInterval(interval);
      } else {
        setDisplayedConfidence(start);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isAnalyzing, selectedLeaf]);

  // Custom File Upload Handler
  const handleFileUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const customLeaf = {
        id: 'custom_upload_' + Date.now(),
        title: file.name,
        crop: 'Uploaded Crop Leaf',
      };
      startAnalysis(customLeaf, e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Webcam Camera Stream Handler
  const startCameraStream = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert('Camera access unavailable. Please upload an image file instead.');
      setIsCameraActive(false);
    }
  };

  const stopCameraStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setIsCameraActive(false);
  };

  const capturePhotoFromCamera = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');

    stopCameraStream();

    const cameraLeaf = {
      id: 'camera_capture_' + Date.now(),
      title: 'Live Camera Photo',
      crop: 'Field Crop Leaf',
    };
    startAnalysis(cameraLeaf, dataUrl);
  };

  // Drag & Drop Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const currentImage = customImage || selectedLeaf?.imageSrc;

  return (
    <section id="plant-health" style={{ padding: '70px 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
          <span className="badge-gcet" style={{ marginBottom: '12px' }}>
            <Sparkles size={14} color="#e9c46a" /> {t('healthBadge')}
          </span>
          <h2 className="section-title">{t('healthTitle')}</h2>
          <p className="section-subtitle">
            {t('healthSubtitle')}
          </p>
        </div>

        {/* Quick Sample Leaf Library */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--neutral-600)', marginBottom: '12px' }}>
            {t('sampleTestLbl')}
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {SAMPLE_LEAF_DATASET.map(sample => (
              <button
                key={sample.id}
                onClick={() => startAnalysis(sample)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: selectedLeaf?.id === sample.id ? '2px solid var(--primary-600)' : '1px solid var(--neutral-300)',
                  backgroundColor: selectedLeaf?.id === sample.id ? 'var(--primary-100)' : '#f8fafc',
                  color: selectedLeaf?.id === sample.id ? 'var(--primary-900)' : 'var(--neutral-700)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Leaf size={14} color={sample.status === 'Healthy' ? '#10b981' : '#ef4444'} />
                <span>{sample.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Upload & Analysis Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '36px',
          alignItems: 'stretch'
        }} className="plant-health-grid">

          {/* Left Column: Leaf Image Upload & Camera Inspection */}
          <div className="card-elevated" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary-900)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                  <Camera size={20} color="var(--primary-600)" />
                  {t('lblLeafVisualInput')}
                </h3>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={isCameraActive ? stopCameraStream : startCameraStream}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: 'var(--primary-700)',
                      fontWeight: 700,
                      fontSize: '0.825rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      textDecoration: 'underline'
                    }}
                  >
                    <Camera size={14} />
                    <span>{isCameraActive ? t('btnCloseCamera') : t('btnTakePhoto')}</span>
                  </button>

                  <label style={{
                    cursor: 'pointer',
                    fontSize: '0.825rem',
                    color: 'var(--primary-700)',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Upload size={14} />
                    {t('btnUploadFile')}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileUpload(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>

              {/* Upload Dropzone / Camera Viewfinder */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '320px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: dragActive ? '3px dashed var(--primary-600)' : '2px solid var(--neutral-200)',
                  backgroundColor: '#f8fafc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.04)'
                }}
              >
                {isCameraActive ? (
                  <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      onClick={capturePhotoFromCamera}
                      style={{
                        position: 'absolute',
                        bottom: '16px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '10px 24px',
                        borderRadius: '20px',
                        backgroundColor: '#ef4444',
                        color: '#ffffff',
                        border: '2px solid #ffffff',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                      }}
                    >
                      📸 Snap & Analyze Leaf
                    </button>
                  </div>
                ) : currentImage ? (
                  <>
                    <img
                      src={currentImage}
                      alt="Leaf sample for analysis"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }}
                    />

                    {isAnalyzing && (
                      <div
                        className="animate-laser"
                        style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          height: '4px',
                          backgroundColor: '#10b981',
                          boxShadow: '0 0 15px #10b981, 0 0 30px #10b981',
                          zIndex: 10
                        }}
                      />
                    )}
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '24px', color: 'var(--neutral-500)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🌿</div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--neutral-800)' }}>
                      {t('dropText')}
                    </div>
                    <p style={{ fontSize: '0.85rem', margin: '4px 0 16px' }}>{t('dropSubtext')}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Status */}
            <div style={{ marginTop: '20px' }}>
              {isAnalyzing ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-800)', marginBottom: '6px' }}>
                    <span>Scanning pixels with Computer Vision Engine...</span>
                    <span>{analysisProgress}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${analysisProgress}%`,
                      height: '100%',
                      backgroundColor: 'var(--primary-600)',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
              ) : hasAnalyzed ? (
                <button
                  onClick={() => startAnalysis(selectedLeaf, customImage)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--neutral-300)',
                    backgroundColor: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    color: 'var(--neutral-700)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <RefreshCw size={16} />
                  <span>{t('btnReAnalyze')}</span>
                </button>
              ) : (
                <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--neutral-500)', fontStyle: 'italic' }}>
                  Select an image or take a photo above to start AI inspection.
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Standby Prompt OR AI Analysis Result Card */}
          {!hasAnalyzed || !selectedLeaf ? (
            <div className="card-elevated" style={{
              padding: '36px 28px',
              backgroundColor: '#f8fafc',
              border: '2px dashed var(--neutral-300)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justify: 'center',
              textAlign: 'center',
              minHeight: '400px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-100)',
                color: 'var(--primary-700)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                marginBottom: '16px'
              }}>
                🌿
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--neutral-800)', marginBottom: '8px' }}>
                {t('readyInspectionTitle')}
              </h3>

              <p style={{ fontSize: '0.9rem', color: 'var(--neutral-600)', maxWidth: '320px', lineHeight: 1.5, margin: '0 auto 20px' }}>
                {t('readyInspectionDesc')}
              </p>

              <div style={{
                fontSize: '0.8rem',
                color: 'var(--neutral-600)',
                backgroundColor: '#ffffff',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid var(--neutral-200)',
                fontWeight: 600
              }}>
                💡 Instant Computer Vision Analysis
              </div>
            </div>
          ) : (
            <div className="card-elevated" style={{
              padding: '32px',
              backgroundColor: selectedLeaf.status === 'Healthy' ? '#f0fdf4' : '#fff1f2',
              border: `2px solid ${selectedLeaf.status === 'Healthy' ? 'var(--primary-300)' : '#fca5a5'}`,
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between'
            }}>
              <div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.825rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--neutral-600)' }}>
                    {t('reportBadge')}
                  </span>
                  
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 14px',
                    borderRadius: '20px',
                    backgroundColor: selectedLeaf.status === 'Healthy' ? '#d1fae5' : '#fee2e2',
                    color: selectedLeaf.status === 'Healthy' ? '#065f46' : '#991b1b',
                    fontSize: '0.85rem',
                    fontWeight: 800
                  }}>
                    {selectedLeaf.status === 'Healthy' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                    <span>Status: {selectedLeaf.status}</span>
                  </span>
                </div>

                {/* Crop & Condition Title */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--neutral-500)', fontWeight: 600 }}>{t('lblTarget')}</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-900)' }}>
                    {selectedLeaf.crop || 'Crop Leaf'}
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--neutral-500)', fontWeight: 600, marginTop: '8px' }}>
                    {t('lblCondition')}
                  </div>
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: selectedLeaf.status === 'Healthy' ? '#047857' : '#be123c'
                  }}>
                    {selectedLeaf.condition}
                  </div>
                </div>

                {/* Extracted Pixel Metrics Breakdown */}
                <div style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--neutral-200)',
                  marginBottom: '16px'
                }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--neutral-600)', marginBottom: '8px', textTransform: 'uppercase' }}>
                    {t('lblHistogram')}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', textAlign: 'center', fontSize: '0.8rem' }}>
                    <div style={{ backgroundColor: '#f0fdf4', padding: '6px', borderRadius: '6px', border: '1px solid #b7e4c7' }}>
                      <div style={{ color: '#047857', fontWeight: 600 }}>{t('lblChlorophyll')}</div>
                      <strong style={{ fontSize: '1.1rem', color: '#065f46' }}>{pixelStats.healthyPct}%</strong>
                    </div>

                    <div style={{ backgroundColor: '#fff1f2', padding: '6px', borderRadius: '6px', border: '1px solid #fca5a5' }}>
                      <div style={{ color: '#991b1b', fontWeight: 600 }}>{t('lblLesion')}</div>
                      <strong style={{ fontSize: '1.1rem', color: '#be123c' }}>{pixelStats.darkSpotPct}%</strong>
                    </div>

                    <div style={{ backgroundColor: '#fffbeb', padding: '6px', borderRadius: '6px', border: '1px solid #fde68a' }}>
                      <div style={{ color: '#b45309', fontWeight: 600 }}>{t('lblRust')}</div>
                      <strong style={{ fontSize: '1.1rem', color: '#d97706' }}>{pixelStats.rustPct}%</strong>
                    </div>
                  </div>
                </div>

                {/* Confidence Meter Box */}
                <div style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--neutral-200)',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--neutral-700)' }}>{t('lblConfidence')}</span>
                    <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-800)' }}>
                      {displayedConfidence}%
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '7px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${displayedConfidence}%`,
                      height: '100%',
                      backgroundColor: selectedLeaf.status === 'Healthy' ? 'var(--primary-600)' : '#f59e0b',
                      transition: 'width 0.1s linear'
                    }} />
                  </div>
                </div>

                {/* Advisory Integration Notification */}
                <div style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--primary-50)',
                  border: '1px solid var(--primary-200)',
                  fontSize: '0.8rem',
                  color: 'var(--primary-900)',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Link2 size={16} color="var(--primary-700)" />
                  <span><strong>{t('lblSyncedAdvisor')}</strong> Irrigation rules updated.</span>
                </div>

                {/* Symptoms & Action Recommendation */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', lineHeight: 1.45 }}>
                  <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid var(--neutral-200)' }}>
                    <strong>{t('lblSymptoms')}</strong>
                    <p style={{ margin: '2px 0 0', color: 'var(--neutral-700)' }}>{selectedLeaf.symptoms}</p>
                  </div>

                  <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid var(--neutral-200)' }}>
                    <strong>{t('lblAction')}</strong>
                    <p style={{ margin: '2px 0 0', color: 'var(--neutral-700)' }}>"{selectedLeaf.recommendation}"</p>
                  </div>
                </div>

              </div>

              {/* Disclaimer */}
              <div style={{
                marginTop: '16px',
                padding: '10px 12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255,255,255,0.7)',
                border: '1px solid var(--neutral-300)',
                fontSize: '0.75rem',
                color: 'var(--neutral-600)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <ShieldAlert size={16} color="var(--neutral-500)" style={{ flexShrink: 0 }} />
                <span>
                  {t('healthNote')}
                </span>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
