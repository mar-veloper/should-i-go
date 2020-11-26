import GoogleMap from 'google-map-react';
import googleMapStyle from './google.style.json';
import Map from './index';

const MapContainer = ({ coords, label, googleApiKey }) => {
  const mapOption = { styles: googleMapStyle };
  const center = { lat: 59.95, lng: 30.33 };

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <GoogleMap
        bootstrapURLKeys={{
          key: googleApiKey,
          region: 'sv',
          libraries: ['places'],
        }}
        defaultCenter={center}
        defaultZoom={15}
        options={mapOption}
        center={coords}
      >
        <Map.Marker lat={coords?.lat} lng={coords?.lng} text={label} />
      </GoogleMap>
    </div>
  );
};

export default MapContainer;
