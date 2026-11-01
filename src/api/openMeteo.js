import axios from 'axios';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let cache = {};

export async function getEnvironmentalData(lat, lon) {
  const key = `${lat},${lon}`;
  const now = Date.now();
  if (cache[key] && now - cache[key].timestamp < CACHE_DURATION) {
    return cache[key].data;
  }
  try {
    const [weatherRes, marineRes, airRes] = await Promise.all([
      axios.get('https://api.open-meteo.com/v1/forecast', {
        params: { latitude: lat, longitude: lon, current_weather: true }
      }),
      axios.get('https://marine-api.open-meteo.com/v1/marine', {
        params: { latitude: lat, longitude: lon, sea_surface_temperature: true, wave_height: true }
      }),
      axios.get('https://air-quality-api.open-meteo.com/v1/air-quality', {
        params: { latitude: lat, longitude: lon, current_weather: true }
      })
    ]);
    const data = {
      weather: weatherRes.data.current_weather,
      marine: marineRes.data,
      air: airRes.data,
      fetchedAt: new Date().toISOString()
    };
    cache[key] = { data, timestamp: now };
    return data;
  } catch (err) {
    console.error('Open-Meteo fetch error', err);
    throw err;
  }
}
