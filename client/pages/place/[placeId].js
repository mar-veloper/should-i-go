import { useRouter } from "next/router";
import { Line, defaults } from 'react-chartjs-2';
import useSWR from "swr";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Map from "../../components/Map/";
import { useState, useEffect } from 'react';

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

  //Circle Data

  // !densityData
  //           ? "Loading ..."
  //           : densityData?.now
  //           ? `${densityData?.now}%`
  //           : "No data provided."

  const [ circleVal, setCircleVal ] = useState(0);
  console.log(circleVal);

  const testVal = '55%';

  const averageVal = (e) => {
    e.preventDefault();
    setCircleVal(testVal);
  }

  const liveVal = (e) => {
    e.preventDefault();
    setCircleVal(densityData?.now + '%');
  }

  useEffect(() => {
    setCircleVal(densityData?.now + '%');
  }, [])

  const animateCircle = () => {
    
  }

  // Daily Overview Graph

  defaults.global.defaultFontFamily = 'Hk Grotesk';
  defaults.global.defaultFontColor = '#212234';

  const labels = [...Array(24).keys()].map(i => i.toString());

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
        data: densityData?.today
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
        <div className="gradient"></div>
      </section>
      

      <section className="hero-content">
        <h3 className="question">
          {milestone(densityData?.now, detailsData?.result.name)}
        </h3>
      </section>

      <section className="data-live">
        <h4 className="data-title">How crowded is it now?</h4>
        <div className="data-live-visual">
        <p className="data-live-value">{circleVal}
        </p>
          
          <div className="circle">
            <div className="level"></div>
          </div>
        </div>
        <Button label="Live" className="selected" onClick={(e) => liveVal(e)}/>
        <Button label="Average" onClick={(e) => averageVal(e)}/>
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
            <span>Best Time to Go:</span>
            <p>Go at 7pm.</p>
          </li>
          <li className="day-statistics-element">
            <span>Busiest hour:</span>
            <p>It will be busy at 2pm.</p>
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
