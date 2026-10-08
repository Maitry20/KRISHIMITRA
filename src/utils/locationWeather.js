/**
 * Location Detection & Live Weather Integration Utility for KRISHI-MITRA
 * Uses browser HTML5 Geolocation API + OpenStreetMap Nominatim Reverse Geocoding + Open-Meteo API
 */

export async function detectDeviceLocationAndWeather() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // 1. Reverse Geocode for City/District/State Name
          let locationName = `GPS (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E)`;
          try {
            const geoRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            if (geoRes.ok) {
              const geoData = await geoRes.json();
              const addr = geoData.address || {};
              const city = addr.city || addr.town || addr.village || addr.suburb || addr.district || addr.county;
              const state = addr.state;
              if (city && state) {
                locationName = `${city}, ${state}`;
              } else if (city) {
                locationName = city;
              } else if (state) {
                locationName = state;
              }
            }
          } catch (e) {
            console.warn("Reverse geocode failed, using lat/lon format:", e);
          }

          // 2. Fetch Live Real-Time Weather Data from Open-Meteo API
          let weatherData = {
            temperature: 32,
            humidity: 48,
            rainProbability: 10,
            rainfallForecast: 0.0,
            windSpeed: 12,
            condition: "Partly Cloudy",
          };

          try {
            const weatherRes = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,precipitation_probability,rain`
            );
            if (weatherRes.ok) {
              const data = await weatherRes.json();
              const current = data.current_weather || {};
              const hourly = data.hourly || {};

              const temp = Math.round(current.temperature ?? 30);
              const wind = Math.round(current.windspeed ?? 12);
              const humidity = hourly.relativehumidity_2m ? Math.round(hourly.relativehumidity_2m[0] ?? 50) : 50;
              const rainProb = hourly.precipitation_probability ? Math.round(hourly.precipitation_probability[0] ?? 10) : 10;
              const rainfall = hourly.rain ? parseFloat((hourly.rain[0] ?? 0).toFixed(1)) : 0.0;

              let condition = "Clear Sky";
              if (rainProb >= 60 || rainfall > 2.0) condition = "Rain Expected";
              else if (temp > 35) condition = "Hot & Dry";
              else if (humidity > 70) condition = "Humid / Overcast";

              weatherData = {
                temperature: temp,
                humidity: humidity,
                rainProbability: rainProb,
                rainfallForecast: rainfall,
                windSpeed: wind,
                condition: condition,
              };
            }
          } catch (e) {
            console.warn("Open-Meteo weather fetch failed, using fallback weather data:", e);
          }

          resolve({
            locationName,
            weatherData,
            coords: { lat, lon }
          });
        } catch (err) {
          reject(err);
        }
      },
      (error) => {
        let msg = "Unable to retrieve device location.";
        if (error.code === error.PERMISSION_DENIED) {
          msg = "Location permission denied. Please allow location access in your browser or select a preset/custom location.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = "Location information is unavailable.";
        } else if (error.code === error.TIMEOUT) {
          msg = "The request to get user location timed out.";
        }
        reject(new Error(msg));
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
}
