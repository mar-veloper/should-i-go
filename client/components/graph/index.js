import { Line, defaults } from "react-chartjs-2";
import { merge } from 'lodash';
import { useContext } from 'react';
import ThemeContext from "../../theme/Context";


export default function LineGraph({ data }) {
  const { invertedThemeClass, themeClass, spinnerThemeColor, graphThemeColor } = useContext(ThemeContext);

  const labels = [...Array(24).keys()].map((i) => i.toString() + ':00');

  const graphData = {
    labels: labels,
    datasets: [
      {
        fill: false,
        lineTension: 0.5,
        pointBackgroundColor: graphThemeColor,
        borderColor: graphThemeColor,
        pointRadius: "0",
        borderWidth: "3",
        data,
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
            maxTicksLimit: 10,
          },
        },
      ],
    },
  };

  merge(defaults, {
    global: {
      defaultFontColor: spinnerThemeColor,
    },
  });

    return (
        <div className={`data-wrapper`}>
        <Line data={graphData} options={options} />
      </div>
    );
}