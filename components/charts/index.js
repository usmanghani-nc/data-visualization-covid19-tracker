import { useRef, useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

export default function Chart({ data }) {
  const chartRef = useRef(null);

  const sliceData = data.slice(0, 20).map((el) => {
    return {
      country: el.provinceState ? el.provinceState : el.countryRegion,
      cases: el.confirmed,
      deaths: el.deaths,
      recovered: el.recovered,
    };
  });

  useLayoutEffect(() => {
    const chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.padding(40, 40, 40, 40);

    chart.data = sliceData;

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'country';
    categoryAxis.fontSize = 15;
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.grid.template.location = 0;
    // categoryAxis.tooltip.disabled = true;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    chart.colors.list = [
      am4core.color('#72b1ff'),
      am4core.color('#57b6fa'),
      am4core.color('#db3030'),
    ];

    // Create series
    function createSeries(field, type) {
      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = field;
      series.dataFields.categoryX = 'country';
      series.tooltipText = `Confirm ${type} [{categoryX}: bold]{valueY}[/]`;
      series.columns.template.strokeOpacity = 0;
      series.columns.template.column.cornerRadiusTopRight = 10;
      series.columns.template.column.cornerRadiusTopLeft = 10;
      series.tooltip.pointerOrientation = 'vertical';
      series.columns.template.column.fillOpacity = 0.8;

      // categoryAxis.sortBySeries = series;
      // series.columns.template.adapter.add('fill', (fill, target) => {
      //   return chart.colors.getIndex(target.dataItem.index);
      // });

      const hoverState = series.columns.template.column.states.create('hover');
      hoverState.properties.cornerRadiusTopLeft = 0;
      hoverState.properties.cornerRadiusTopRight = 0;
      hoverState.properties.fillOpacity = 1;

      return series;
    }

    createSeries('cases', 'Cases');
    createSeries('recovered', 'Recovered');
    createSeries('deaths', 'Deaths');

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    chartRef.current = chart;

    return () => {
      chart.dispose();
    };
  }, [data]);

  return (
    <div style={{ width: '100%' }}>
      <div id="chartdiv" style={{ width: '100%', height: '1000px' }}></div>
    </div>
  );
}
