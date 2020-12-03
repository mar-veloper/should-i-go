import GoogleMap from "google-map-react";
import { useContext } from "react";
import ThemeContext from "../../theme/Context";
import Map from "./index";

const MapContainer = ({ coords, label, googleApiKey }) => {
  const { mapTheme } = useContext(ThemeContext);

  const mapOption = {
    zoomControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    styles: mapTheme,
  };
  const center = { lat: 59.95, lng: 30.33 };

  return (
    <GoogleMap
      bootstrapURLKeys={{
        key: googleApiKey,
        region: "sv",
        libraries: ["places"],
      }}
      defaultCenter={center}
      defaultZoom={15}
      options={mapOption}
      center={coords}
    >
      <Map.Marker lat={coords?.lat} lng={coords?.lng} text={label} />
    </GoogleMap>
  );
};

export default MapContainer;
