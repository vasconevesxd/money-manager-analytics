<script setup lang="ts">
  import { computed } from 'vue';
  import { Chart } from 'highcharts-vue';

  interface Series {
    name: string;
    amount: number;
    color: string;
  }

  // Define props
  const props = defineProps({
    categories: {
      type: Array as () => string[],
      required: true,
    },
    series: {
      type: Array as () => Series[],
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
  });

  // Prepare chart options
  const chartOptions = computed(() => {
    return {
      chart: {
        type: 'column',
        backgroundColor: 'transparent',
        style: {
          fontFamily: 'inherit',
        },
      },
      title: {
        text: props.title,
      },
      xAxis: {
        categories: props.categories,
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount ($)',
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>${point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      credits: {
        enabled: false,
      },
      series: props.series.map((serie) => ({
        name: serie.name,
        data: [serie.amount],
        color: serie.color,
      })),
    };
  });
</script>

<template>
  <div class="h-[300px]">
    <Chart type="pie" :options="chartOptions" />
  </div>
</template>
