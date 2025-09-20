import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function OrderMap({ address }) {
  // For simplicity, mock coordinates (in real app convert address → lat/lng)
  const coords = { lat: 28.6139, lng: 77.2090 }; // Delhi example

  return (
    <MapContainer center={[coords.lat, coords.lng]} zoom={13} style={{ height: '300px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coords.lat, coords.lng]}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default OrderMap;
