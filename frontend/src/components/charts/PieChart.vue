<script setup lang="ts">
  import { computed, ref, watchEffect } from 'vue';
  import { Chart } from 'highcharts-vue';
  import type { Point, Chart as HighchartsChart, Options } from 'highcharts';
  import type { Series } from './types';
  import { getPieChartOptions } from './utils/getPieChartOptions';

  const props = defineProps<{
    title?: string;
    series: Series[];
    selectedName: string;
  }>();

  const chartRef = ref<HighchartsChart>();

  const chartOptions = computed<Options>(() => getPieChartOptions(props.series));

  const selectSliceByName = (name: string) => {
    const chart = chartRef.value?.chart;
    if (!chart) return;

    const points = chart.series[0]?.data;

    if (!name) {
      points?.forEach((point: Point) => {
        if (point.selected) {
          point.select(false, false);
        }
      });
      return;
    }

    const point = points.find((p: Point) => p.name === name);
    if (point) {
      point.select(true, false);
    }
  };

  watchEffect(() => {
    selectSliceByName(props.selectedName);
  });
</script>

<template>
  <div class="h-inherit">
    <Chart ref="chartRef" :options="chartOptions" />
  </div>
</template>
