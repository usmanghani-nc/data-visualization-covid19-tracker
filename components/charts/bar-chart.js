import { useEffect } from 'react';
import Highcharts from 'highcharts';
window.Highcharts = Highcharts;
import HighchartsReact from 'highcharts-react-official';

import HighchartsExporting from 'highcharts/modules/exporting';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

export default function BarChart({ data, title }) {
  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: title ? title : '',
    },
    xAxis: {
      categories: data.map((el) => el.provinceState),
    },
    yAxis: {
      title: {
        text: '',
      },
    },
    series: [
      {
        name: 'Confirmed',
        data: data.map((el) => el.confirmed),
      },
      {
        name: 'Recovered',
        data: data.map((el) => el.recovered),
      },
      {
        name: 'Active',
        data: data.map((el) => el.active),
      },

      {
        name: 'Deaths',
        data: data.map((el) => el.deaths),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
