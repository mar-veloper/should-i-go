import { useRouter } from "next/router";
import { Line, defaults } from "react-chartjs-2";
import useSWR from "swr";
import Button from "../../components/common/Button";
import Map from "../../components/Map/";
import { useState, useContext } from "react";

import milestone from "../../services/milestone";
import ThemeContext from "../../theme/Context";

const { GOOGLE_API_KEY } = process.env;

export default function PlaceContainer({ googleApiKey }) {
  const router = useRouter();
  const { placeId } = router.query;
  const { invertedThemeClass, themeClass } = useContext(ThemeContext);

  const { data: detailsData } = useSWR(`/api/places/details/${placeId}`);
  const { data: densityData } = useSWR(`/api/places/populartimes/${placeId}`);

  const coords = {
    lat: detailsData?.result.geometry.location.lat,
    lng: detailsData?.result.geometry.location.lng,
  };

  //Circle Data

  // !densityData
  //           ? "Loading ..."
  //           : densityData?.now
  //           ? `${densityData?.now}%`
  //           : "No data provided."

  const [isLive, setIsLive] = useState(true);
  const circleValue = isLive ? densityData?.now : "55";

  // const testVal = '55%';
  // const live = densityData?.now + '%';

  const onLiveValue = () => setIsLive(true);
  const onAverageValue = () => setIsLive(false);

  const circleLevel = {
    transform: `translateY(${100 - Number(circleValue)}%)`,
  };

  // Daily Overview Graph

  defaults.global.defaultFontFamily = "Hk Grotesk";
  defaults.global.defaultFontColor = "#212234";

  const labels = [...Array(24).keys()].map((i) => i.toString());

  const graphData = {
    labels: labels,
    datasets: [
      {
        fill: false,
        lineTension: 0.5,
        pointBackgroundColor: "#B2EDB3",
        borderColor: "#4EB68E",
        pointRadius: "0",
        borderWidth: "3",
        data: densityData?.today,
      },
    ],
  };

  const options = {
    legend: { display: false },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            color: "#FFFFFF",
          },
          ticks: {
            beginAtZero: true,
            autoSkip: true,
            maxTicksLimit: 11,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            autoSkip: true,
            maxTicksLimit: 5,
          },
        },
      ],
    },
  };

  return (
    <div>
      <section className="map-placeholder">
        <Map.Container
          coords={coords}
          label={detailsData?.result.name}
          googleApiKey={googleApiKey}
        />
        {/* <div className="gradient"></div> */}
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
          <Line data={graphData} options={options} />
        </div>
      </section>

      <section className="day-statistics">
        <ul className="day-statistics-copy">
          <li className="day-statistics-element">
            <span>Best Time to Go:</span>
            <p>
              Go at {densityData?.bestHour?.hour}:00, the visitation density
              will be {densityData?.bestHour.population}%
            </p>
          </li>
          <li className="day-statistics-element">
            <span>Busiest Time:</span>
            <p>It will be busy at {densityData?.busiestHour?.hour}:00.</p>
          </li>
        </ul>
      </section>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      googleApiKey: GOOGLE_API_KEY,
    },
  };
}
