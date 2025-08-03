import type { Options } from 'highcharts';
import type { Series } from '../types';

export function getPieChartOptions(series: Series[]): Options {
  return {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'inherit',
      },
    },
    title: {
      text: '',
    },
    tooltip: {
      pointFormat: '<b>${point.y}</b> ({point.percentage:.1f}%)',
    },
    accessibility: {
      point: {
        valueSuffix: '€',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: false,
        borderWidth: 0,
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        type: 'pie',
        innerSize: '60%',
        data: series.map((s) => ({
          name: s.name,
          y: s.amount,
          color: s.color,
        })),
      },
    ],
  };
}
