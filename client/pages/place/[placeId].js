import { useRouter } from "next/router";
import { Line } from 'react-chartjs-2';
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
    
  const labels = [...Array(25).keys()].map(i => i.toString());


  const graphData = {
    labels: labels,
    datasets: [
      {
        fill: false,
        lineTension: 0.5,
        pointBackgroundColor: '#B2EDB3',
        borderColor: "#4EB68E",
        pointBorderColor: '#fff',
        pointBorderWidth: '3',
        pointRadius: '0',
        backgroundColor: "rgb(255, 99, 132)",
        borderWidth: '3',
        data: densityData?.monday
      }
    ]
  }

  const options = {
    legend: { display: false },
    responsive: true, 
    maintainAspectRatio: false,
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
