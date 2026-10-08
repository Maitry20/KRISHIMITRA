/**
 * KRISHI-MITRA - AI-Powered Virtual Irrigation & Water Management Engine
 * Software-based decision logic based on Farmer Inputs + Weather Data
 */

export const CROPS_LIST = [
  { id: 'Wheat', name: 'Wheat', icon: '🌾', baseLitrePerAcre: 1800, etiFactor: 0.9 },
  { id: 'Rice', name: 'Rice', icon: '🌾', baseLitrePerAcre: 3500, etiFactor: 1.5 },
  { id: 'Cotton', name: 'Cotton', icon: '🌱', baseLitrePerAcre: 2200, etiFactor: 1.1 },
  { id: 'Tomato', name: 'Tomato', icon: '🍅', baseLitrePerAcre: 2400, etiFactor: 1.2 },
  { id: 'Maize', name: 'Maize', icon: '🌽', baseLitrePerAcre: 2000, etiFactor: 1.0 },
  { id: 'Groundnut', name: 'Groundnut', icon: '🥜', baseLitrePerAcre: 1600, etiFactor: 0.8 },
  { id: 'Other', name: 'Other Crop', icon: '🍃', baseLitrePerAcre: 2000, etiFactor: 1.0 },
];

export const SOIL_TYPES_LIST = [
  { id: 'Sandy', name: 'Sandy Soil', drainage: 'High', retention: 0.7, factor: 1.3 },
  { id: 'Loamy', name: 'Loamy Soil', drainage: 'Balanced', retention: 1.0, factor: 1.0 },
  { id: 'Clay', name: 'Clay Soil', drainage: 'Low', retention: 1.3, factor: 0.8 },
  { id: 'Black Soil', name: 'Black Soil', drainage: 'High Retention', retention: 1.2, factor: 0.85 },
  { id: 'Red Soil', name: 'Red Soil', drainage: 'Moderate', retention: 0.9, factor: 1.1 },
];

export const GROWTH_STAGES_LIST = [
  { id: 'Germination', name: 'Germination', factor: 0.6, waterNeed: 'Light' },
  { id: 'Vegetative', name: 'Vegetative', factor: 1.0, waterNeed: 'Moderate' },
  { id: 'Flowering', name: 'Flowering', factor: 1.4, waterNeed: 'Peak' },
  { id: 'Fruiting', name: 'Fruiting', factor: 1.3, waterNeed: 'High' },
  { id: 'Maturity', name: 'Maturity', factor: 0.5, waterNeed: 'Low' },
];

export const PRESET_LOCATIONS = [
  { name: 'Vadodara, Gujarat', temp: 33, humidity: 46, rainProb: 12, rainfall: 0.8, wind: 14, condition: 'Clear Sky' },
  { name: 'Anand, Gujarat', temp: 34, humidity: 40, rainProb: 5, rainfall: 0.0, wind: 12, condition: 'Sunny' },
  { name: 'Rajkot, Gujarat', temp: 36, humidity: 38, rainProb: 10, rainfall: 0.2, wind: 18, condition: 'Hot & Dry' },
  { name: 'Nashik, Maharashtra', temp: 28, humidity: 78, rainProb: 75, rainfall: 14.5, wind: 16, condition: 'Rain Expected' },
  { name: 'Ludhiana, Punjab', temp: 31, humidity: 55, rainProb: 20, rainfall: 1.2, wind: 10, condition: 'Partly Cloudy' },
];

export function evaluateVirtualIrrigationAI(farmSetup, weatherData, diseaseResult = null) {
  const crop = CROPS_LIST.find(c => c.id === farmSetup.crop) || CROPS_LIST[3];
  const soil = SOIL_TYPES_LIST.find(s => s.id === farmSetup.soilType) || SOIL_TYPES_LIST[1];
  const stage = GROWTH_STAGES_LIST.find(g => g.id === farmSetup.growthStage) || GROWTH_STAGES_LIST[2];
  const acres = Math.max(1, Math.min(100, Number(farmSetup.farmSize) || 2));

  const temp = Number(weatherData.temperature) || 30;
  const humidity = Number(weatherData.humidity) || 50;
  const rainProb = Number(weatherData.rainProbability) || 10;
  const rainfall = Number(weatherData.rainfallForecast) || 0;

  // 1. Calculate Individual Score Factors (0 to 20 points each)
  const tempScore = Math.min(20, Math.max(2, Math.round((temp - 15) * 0.9)));
  const rainScore = Math.min(20, Math.max(1, Math.round(rainProb * 0.2)));
  const humidityScore = Math.min(20, Math.max(2, Math.round((100 - humidity) * 0.25)));
  const stageScore = Math.min(20, Math.round(stage.factor * 14));
  const soilScore = Math.min(20, Math.round(soil.factor * 14));

  const totalRequirementScore = Math.min(100, Math.max(10, tempScore + rainScore + humidityScore + stageScore + soilScore));

  // 2. Determine Recommendation State
  let recommendationState = 'RECOMMENDED'; // 'RECOMMENDED' | 'DELAYED' | 'NOT_REQUIRED'
  let stateTitle = 'IRRIGATION RECOMMENDED';
  let stateColor = '#10b981'; // Green
  let recommendedTime = 'Tomorrow 6:00 AM – 8:00 AM';
  let reasonText = '';
  let todayAdvice = '';

  if (rainProb >= 65 || rainfall >= 5.0) {
    recommendationState = 'DELAYED';
    stateTitle = 'IRRIGATION DELAYED';
    stateColor = '#f59e0b'; // Amber / Yellow
    recommendedTime = 'Postponed (Re-evaluate in 12 hours)';
    reasonText = `Rainfall forecast (${rainfall > 0 ? rainfall + ' mm, ' : ''}${rainProb}% probability) is expected within the next 12 hours. Irrigation can be postponed to avoid unnecessary water usage.`;
    todayAdvice = `Delay irrigation today. Natural rainfall is expected tonight, which will provide sufficient hydration for your ${crop.name} crop while conserving water.`;
  } else if (totalRequirementScore >= 55) {
    recommendationState = 'RECOMMENDED';
    stateTitle = 'IRRIGATION RECOMMENDED';
    stateColor = '#10b981'; // Green
    recommendedTime = 'Early Morning (6:00 AM – 8:00 AM)';
    reasonText = `High temperature (${temp}°C) and low rainfall probability (${rainProb}%) indicate increased water demand during the ${stage.name} stage for ${crop.name}.`;
    todayAdvice = `Apply virtual drip irrigation during early morning hours (6:00 AM - 8:00 AM) to maximize root absorption and prevent midday evaporation loss.`;
  } else {
    recommendationState = 'NOT_REQUIRED';
    stateTitle = 'IRRIGATION NOT REQUIRED';
    stateColor = '#0284c7'; // Blue
    recommendedTime = 'No action required today';
    reasonText = `Current weather conditions (${temp}°C, ${humidity}% humidity) and ${soil.name} moisture retention provide sufficient water for the ${stage.name} stage.`;
    todayAdvice = `Keep irrigation paused today. Soil moisture retention and current weather conditions are well balanced for optimal growth.`;
  }

  // Disease Override Advisory
  if (diseaseResult && diseaseResult.severity && diseaseResult.severity !== 'None') {
    todayAdvice += ` Note: ${diseaseResult.title} detected. Avoid excessive foliage wetting to minimize fungal pathogen spread.`;
  }

  // 3. Water Requirement Estimation
  let weatherMultiplier = 1.0;
  if (temp > 32) weatherMultiplier += 0.15;
  if (humidity < 45) weatherMultiplier += 0.1;
  if (rainProb >= 40) weatherMultiplier -= 0.25;

  const estimatedLitrePerAcre = Math.round(crop.baseLitrePerAcre * stage.factor * soil.factor * weatherMultiplier);
  const totalWaterRequirement = estimatedLitrePerAcre * acres;

  // 4. Traditional vs AI-Optimized Water Savings Simulator
  const traditionalLitrePerAcre = Math.round(crop.baseLitrePerAcre * 2.2);
  const traditionalTotalWater = traditionalLitrePerAcre * acres;
  const aiActualUsageTotal = recommendationState === 'DELAYED' ? Math.round(totalWaterRequirement * 0.15) : totalWaterRequirement;
  const estimatedWaterSaved = Math.max(0, traditionalTotalWater - aiActualUsageTotal);
  const waterSavedPercent = Math.round((estimatedWaterSaved / traditionalTotalWater) * 100);

  return {
    recommendationState,
    stateTitle,
    stateColor,
    recommendedTime,
    reasonText,
    todayAdvice,
    totalRequirementScore,
    factorBreakdown: {
      temperature: tempScore,
      rainfall: rainScore,
      humidity: humidityScore,
      cropStage: stageScore,
      soilType: soilScore,
    },
    waterRequirement: {
      litrePerAcre: estimatedLitrePerAcre,
      totalLitres: totalWaterRequirement,
      acres,
    },
    waterSavingSimulator: {
      traditionalTotalLitres: traditionalTotalWater,
      aiOptimizedTotalLitres: aiActualUsageTotal,
      waterSavedLitres: estimatedWaterSaved,
      savingPercentage: waterSavedPercent,
    }
  };
}

// Inline SVG Samples for realistic instant demonstration
const SVG_TOMATO_EARLY_BLIGHT = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23e8f5e9"/><path d="M150 30 Q220 80 200 200 Q150 270 100 200 Q80 80 150 30 Z" fill="%234caf50" stroke="%232e7d32" stroke-width="4"/><path d="M150 30 L150 250 M150 90 L200 130 M150 140 L100 170 M150 180 L180 210" stroke="%232e7d32" stroke-width="3" stroke-linecap="round"/><circle cx="130" cy="110" r="18" fill="%23795548" stroke="%23fbc02d" stroke-width="4"/><circle cx="130" cy="110" r="12" fill="%233e2723"/><circle cx="130" cy="110" r="6" fill="%235d4037"/><circle cx="170" cy="160" r="22" fill="%23795548" stroke="%23fbc02d" stroke-width="5"/><circle cx="170" cy="160" r="15" fill="%233e2723"/><circle cx="120" cy="200" r="14" fill="%238d6e63" stroke="%23fbc02d" stroke-width="3"/><text x="150" y="285" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="%23333">Sample: Early Blight Leaf</text></svg>`;

const SVG_TOMATO_HEALTHY = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f0fdf4"/><path d="M150 25 Q230 75 210 205 Q150 275 90 205 Q70 75 150 25 Z" fill="%232e7d32" stroke="%231b5e20" stroke-width="4"/><path d="M150 25 L150 255 M150 85 L205 125 M150 135 L95 165 M150 185 L185 215 M150 205 L115 230" stroke="%234caf50" stroke-width="3" stroke-linecap="round"/><circle cx="150" cy="120" r="65" fill="none" stroke="%2381c784" stroke-width="1.5" stroke-dasharray="3 3"/><text x="150" y="285" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="%232e7d32">Sample: Healthy Leaf</text></svg>`;

const SVG_COTTON_RUST = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23fff8e1"/><path d="M150 30 Q240 60 230 170 Q200 250 150 270 Q100 250 70 170 Q60 60 150 30 Z" fill="%2366bb6a" stroke="%23388e3c" stroke-width="4"/><circle cx="120" cy="90" r="8" fill="%23e65100"/><circle cx="180" cy="110" r="10" fill="%23ef6c00"/><circle cx="140" cy="150" r="12" fill="%23f57c00"/><circle cx="100" cy="170" r="9" fill="%23e65100"/><circle cx="175" cy="185" r="11" fill="%23ef6c00"/><circle cx="130" cy="210" r="7" fill="%23e65100"/><text x="150" y="285" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="%23e65100">Sample: Cotton Leaf Rust</text></svg>`;

const SVG_TOMATO_LATE_BLIGHT = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23efebe9"/><path d="M150 30 Q220 80 200 200 Q150 270 100 200 Q80 80 150 30 Z" fill="%23558b2f" stroke="%2333691e" stroke-width="4"/><path d="M110 80 Q160 90 180 140 Q150 180 100 130 Z" fill="%233e2723" opacity="0.85"/><path d="M140 160 Q190 170 190 220 Q140 240 120 190 Z" fill="%233e2723" opacity="0.85"/><text x="150" y="285" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="%233e2723">Sample: Late Blight Leaf</text></svg>`;

const SVG_WHEAT_HEALTHY = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f0fdf4"/><path d="M130 20 Q170 100 160 270 Q140 270 120 100 Z" fill="%2343a047" stroke="%231b5e20" stroke-width="3"/><line x1="145" y1="20" x2="145" y2="270" stroke="%23a5d6a7" stroke-width="2"/><text x="150" y="285" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="%232e7d32">Sample: Healthy Wheat Blade</text></svg>`;

export const SAMPLE_LEAF_DATASET = [
  {
    id: 'early_blight',
    title: 'Tomato - Early Blight',
    crop: 'Tomato',
    condition: 'Possible Early Blight (Alternaria solani)',
    status: 'Needs Attention',
    severity: 'Moderate',
    confidence: 92,
    imageSrc: SVG_TOMATO_EARLY_BLIGHT,
    symptoms: 'Concentric ring spots with yellow halos visible on lower leaf canopy.',
    recommendation: 'Isolate affected plants immediately. Prune diseased foliage to improve airflow and inspect surrounding crops.',
    organicTreatment: 'Apply neem oil spray or copper-based bio-fungicide according to agricultural guidelines.',
  },
  {
    id: 'healthy_tomato',
    title: 'Tomato - Healthy Leaf',
    crop: 'Tomato',
    condition: 'Healthy / No Disease Detected',
    status: 'Healthy',
    severity: 'None',
    confidence: 97,
    imageSrc: SVG_TOMATO_HEALTHY,
    symptoms: 'Uniform chlorophyll distribution, vibrant leaf venation, intact margin structural integrity.',
    recommendation: 'Plant is healthy! Maintain regular AI drip irrigation schedule and organic compost nutrition.',
    organicTreatment: 'No chemical or biological treatment needed.',
  },
  {
    id: 'cotton_rust',
    title: 'Cotton - Leaf Rust',
    crop: 'Cotton',
    condition: 'Possible Cotton Rust (Puccinia cacabata)',
    status: 'Needs Attention',
    severity: 'High',
    confidence: 89,
    imageSrc: SVG_COTTON_RUST,
    symptoms: 'Small yellowish-orange pustules scattered on the upper surface of foliage.',
    recommendation: 'Avoid overhead watering to keep leaf canopy dry. Ensure adequate plant row spacing.',
    organicTreatment: 'Spray sulfur dust or bio-control agents early in the morning.',
  },
  {
    id: 'late_blight',
    title: 'Tomato - Late Blight',
    crop: 'Tomato',
    condition: 'Possible Late Blight (Phytophthora infestans)',
    status: 'Critical Alert',
    severity: 'Severe',
    confidence: 95,
    imageSrc: SVG_TOMATO_LATE_BLIGHT,
    symptoms: 'Dark water-soaked lesions spreading rapidly from margins under humid conditions.',
    recommendation: 'Critical: Spreads rapidly in high humidity. Remove infected plants from field immediately.',
    organicTreatment: 'Apply systemic bio-fungicide treatment to adjacent healthy plants.',
  },
  {
    id: 'healthy_wheat',
    title: 'Wheat - Healthy Blade',
    crop: 'Wheat',
    condition: 'Healthy / No Pathogens Detected',
    status: 'Healthy',
    severity: 'None',
    confidence: 96,
    imageSrc: SVG_WHEAT_HEALTHY,
    symptoms: 'Clean green linear blade with smooth margins and normal turgor pressure.',
    recommendation: 'Optimal growth state. Maintain balanced nitrogen application and soil moisture management.',
    organicTreatment: 'No treatment required.',
  },
];
