import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import locationsData from '../../locations.json';
import { getEnvironmentalData } from '../api/openMeteo';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function LocationPage() {
  const { id } = useParams();
  const location = locationsData.locations.find((loc) => loc.id === id);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (location) {
      getEnvironmentalData(location.lat, location.lon)
        .then(setData)
        .catch((e) => console.error(e));
    }
  }, [location]);

  if (!location) return <div className="p-4">Location not found.</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <Link to="/" className="text-primary underline">← Back to Dashboard</Link>
      <h1 className="text-headline-xl">{location.name}</h1>
      {location.image && (
        <img src={location.image} alt={location.name} className="w-full h-64 object-cover rounded" />
      )}
      <p>{location.description}</p>
      <div className="h-64">
        <MapContainer center={[location.lat, location.lon]} zoom={13} className="h-full w-full">
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[location.lat, location.lon]} />
        </MapContainer>
      </div>
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-substrate p-4 rounded">
            <h2 className="text-headline-sm mb-2">Weather</h2>
            <p>Temperature: {data.weather.temperature}°C</p>
            <p>Wind: {data.weather.windspeed} km/h</p>
            <p>Time: {new Date(data.fetchedAt).toLocaleTimeString()}</p>
          </div>
          <div className="glass-substrate p-4 rounded">
            <h2 className="text-headline-sm mb-2">Marine</h2>
            <p>Sea Surface Temp: {data.marine?.sea_surface_temperature?.current ?? 'N/A'}°C</p>
            <p>Wave Height: {data.marine?.wave_height?.current ?? 'N/A'} m</p>
          </div>
          <div className="glass-substrate p-4 rounded">
            <h2 className="text-headline-sm mb-2">Air Quality</h2>
            <p>AQI: {data.air?.air_quality?.us_epa_index ?? 'N/A'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationPage;
