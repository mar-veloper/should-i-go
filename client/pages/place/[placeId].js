// Dependencies
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
//Components
import Button from "../../components/common/Button";
import Map from "../../components/Map/";
import milestone from "../../services/milestone";
import Loading from "../../components/common/Loading";
import LineGraph from '../../components/graph'
//Context
import ThemeContext from "../../theme/Context";

const { GOOGLE_API_KEY } = process.env;

export default function PlaceContainer({ googleApiKey }) {
  const router = useRouter();
  const { placeId } = router.query;
  const { invertedThemeClass, themeClass, spinnerThemeColor } = useContext(ThemeContext);

  const { data: detailsData } = useSWR(`/api/places/details/${placeId}`);
  const { data: densityData } = useSWR(`/api/places/populartimes/${placeId}`);
  
  const coords = {
    lat: detailsData?.result.geometry.location.lat,
    lng: detailsData?.result.geometry.location.lng,
  };
  
  const [isLive, setIsLive] = useState(true);
  
  const clientHour = new Date().getHours();
  const circleValue = isLive ? densityData?.now : densityData?.today[clientHour];

  const onLiveValue = () => setIsLive(true);
  const onAverageValue = () => setIsLive(false);

  const circleLevel = {
    transform: `translateY(${100 - Number(circleValue)}%)`,
  };
  
  return (
    <>
      <Loading data={densityData} color={spinnerThemeColor} theme={themeClass} />
      <div>
        <section className="map-placeholder">
          <Map.Container
            coords={coords}
            label={detailsData?.result.name}
            googleApiKey={googleApiKey}
          />
          <div className={`gradient ${themeClass}`}></div>
        </section>

        <section className="hero-content">
          <h3 className="question">
            {milestone(densityData?.now, detailsData?.result.name)}
          </h3>
        </section>

        <section className="data-live">
          <h4 className="data-title">How crowded is it now?</h4>
          <div className={`data-live-visual`}>
            <p className={`data-live-value`}>{circleValue}%</p>

            <div className={`circle`}>
              <div
                className={`level  ${invertedThemeClass}`}
                style={circleLevel}
              ></div>
            </div>
          </div>
          <Button label="Live" className="selected" onClick={onLiveValue} />
          <Button label="Average" onClick={onAverageValue} />
        </section>

        <section className="data-day">
          <h4 className="data-title">Day overview</h4>
          <div className={`data-wrapper`}>
            <LineGraph data={densityData?.today} />
          </div>
        </section>

        <section className="day-statistics">
          <ul className="day-statistics-copy">
            <li className="day-statistics-element">
              <span>Best Time to Go:</span>
              <p>
                Go at {densityData?.bestHour?.hour}:00, the visitation density
                will be {densityData?.bestHour?.population}%
              </p>
            </li>
            <li className="day-statistics-element">
              <span>Busiest Time:</span>
              <p>It will be busy at {densityData?.busiestHour?.hour}:00.</p>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      googleApiKey: GOOGLE_API_KEY,
    },
  };
}
