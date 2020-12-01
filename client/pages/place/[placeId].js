import { useRouter } from "next/router";
import { Line, defaults } from 'react-chartjs-2';
import useSWR from "swr";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Map from "../../components/Map/";

import milestone from "../../services/milestone";

const { GOOGLE_API_KEY } = process.env;

export default function PlaceContainer({ googleApiKey }) {
  const router = useRouter();
  const { placeId } = router.query;

  const { data: detailsData } = useSWR(`/api/places/details/${placeId}`);
  const { data: densityData } = useSWR(`/api/places/populartimes/${placeId}`);

  const coords = {
    lat: detailsData?.result.geometry.location.lat,
    lng: detailsData?.result.geometry.location.lng,
  };

  // Daily Overview Graph

  defaults.global.defaultFontFamily = 'Hk Grotesk';
  defaults.global.defaultFontColor = '#212234';

  const labels = [...Array(25).keys()].map(i => i.toString());

  const graphData = {
    labels: labels,
    datasets: [
      { 
        fill: false,
        lineTension: 0.5,
        pointBackgroundColor: '#B2EDB3',
        borderColor: "#4EB68E",
        pointRadius: '0',
        borderWidth: '3',
        data: densityData?.monday
      }
    ]
  }

  const options = {
    legend: { display: false },
    responsive: true, 
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false ,
            color: "#FFFFFF"
          },
          ticks: {
              beginAtZero: true,
              autoSkip: true,
              maxTicksLimit: 11
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            autoSkip: true,
            maxTicksLimit: 5
          }
        },
      ],
    },
  }

  return (
    <div>
      <nav className="search-nav">
        <p className="search-nav-copy">Should I go to</p>
        <Input />
      </nav>

      <section className="map-placeholder">
        <Map.Container
          coords={coords}
          label={detailsData?.result.name}
          googleApiKey={googleApiKey}
        />
      </section>
      <section className="hero-content">
        <h3 className="question">
          {milestone(densityData?.now, detailsData?.result.name)}
        </h3>
      </section>

      <section className="data-live">
        <h4 className="data-title">How crowded is it now?</h4>
        <div className="data-live-visual">
          {
            <p className="data-live-value">
              {!densityData
                ? "Loading ..."
                : densityData?.now
                ? `${densityData?.now}%`
                : "No data provided."}
            </p>
          }
          <div className="circle"></div>
        </div>
        <Button label="Live" className="selected" />
        <Button label="Average" />
      </section>

      <section className="data-day">
        <h4 className="data-title">Day overview</h4>
        <div className="data-wrapper">
          <Line
            data={graphData}
            options={options}
          />
        </div>
      </section>

      <section className="day-statistics">
        <ul className="day-statistics-copy">
          <li className="day-statistics-element">
            <span>Best Time:</span>
            <p>Go between 7-9pm.</p>
          </li>
          <li className="day-statistics-element">
            <span>Busy hours:</span>
            <p>It will be busy between 2-5pm.</p>
          </li>
          <li className="day-statistics-element">
            <span>Next peak:</span>
            <p>Starts in: 2hours 20min</p>
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
