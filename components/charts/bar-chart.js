import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

export default function BarChart({ data, title }) {
  if (!data || data.length < 1) {
    return <></>;
  }

  const [state, setState] = useState({
    options: {
      chart: {
        type: 'bar',
        stacked: true,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      data: [],
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'right',
        offsetX: 0,
        offsetY: 50,
      },
    },

    series: [
      {
        name: 'Deaths',
        data: [],
      },
      {
        name: 'Active',
        data: [],
      },
      {
        name: 'Confirmed',
        data: [],
      },
    ],
  });

  useEffect(() => {
    const factorData = data.length > 10 ? data.slice(0, 10) : data;

    setState({
      ...state,
      options: {
        ...state.options,
        xaxis: {
          categories: factorData.map((el) => el.provinceState),
        },
      },

      series: [
        {
          name: 'Active',
          data: factorData.map((el) => el.active),
        },
        {
          name: 'Confirmed',
          data: factorData.map((el) => el.confirmed),
        },
        {
          name: 'Deaths',
          data: factorData.map((el) => el.deaths),
        },
      ],
    });
  }, [data]);

  return (
    <div>
      <Chart options={state.options} series={state.series} type="bar" height="500" />
    </div>
  );
}
