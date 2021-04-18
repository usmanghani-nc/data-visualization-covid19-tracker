import { useLayoutEffect, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default function Map({ data }) {
  const [state, setState] = useState();

  data.then((el) => setState(el));

  useLayoutEffect(() => {
    const chart = am4core.create('chartdiv', am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    chart.projection = new am4maps.projections.Miller();

    const polygonSeries = new am4maps.MapPolygonSeries();

    chart.series.push(polygonSeries);

    polygonSeries.useGeodata = true;

    polygonSeries.data = state;

    polygonSeries.data.map((el) => {
      const newDAta = [];

      if (el.deaths > 1000) {
        el.fill = am4core.color('red');

        newDAta.push(el);
      } else if (el.deaths > 500 && el.deaths < 1000) {
        el.fill = am4core.color('coral');

        newDAta.push(el);
      } else {
        el.fill = am4core.color('green');
        newDAta.push(el);
      }

      return newDAta;
    });

    const template = polygonSeries.mapPolygons.template;
    template.fill = am4core.color('#3083ff');
    template.tooltipText =
      '{name} Deaths - {deaths}, Confirmed - {confirmed}, Recovered - {recovered}, Last Update - {lastUpdate}';
    template.propertyFields.fill = 'fill';

    const hover = template.states.create('hover');
    hover.properties.fill = am4core.color('#b8d3ff');

    return () => chart.dispose();
  }, [state]);

  return <div id="chartdiv" style={{ height: '80vh' }}></div>;
}
