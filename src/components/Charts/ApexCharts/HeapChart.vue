<script setup lang="ts">
import { ref } from 'vue'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'

const chart = ref(null)

const data = {
  series: [
    {
      name: 'Metric1',
      data: [
        { x: 'W1', y: 10 },
        { x: 'W2', y: 20 },
        { x: 'W3', y: 15 },
        { x: 'W4', y: 30 },
        { x: 'W5', y: 25 },
        { x: 'W6', y: 35 },
        { x: 'W7', y: 40 },
        { x: 'W8', y: 45 },
        { x: 'W9', y: 50 },
        { x: 'W10', y: 55 },
        { x: 'W11', y: 60 },
        { x: 'W12', y: 65 },
        { x: 'W13', y: 70 },
        { x: 'W14', y: 75 },
        { x: 'W15', y: 80 }
      ]
    },
    {
      name: 'Metric2',
      data: [
        { x: 'W1', y: 15 },
        { x: 'W2', y: 25 },
        { x: 'W3', y: 20 },
        { x: 'W4', y: 35 },
        { x: 'W5', y: 30 },
        { x: 'W6', y: 40 },
        { x: 'W7', y: 45 },
        { x: 'W8', y: 50 },
        { x: 'W9', y: 55 },
        { x: 'W10', y: 60 },
        { x: 'W11', y: 65 },
        { x: 'W12', y: 70 },
        { x: 'W13', y: 75 },
        { x: 'W14', y: 80 },
        { x: 'W15', y: 85 }
      ]
    },
    {
      name: 'Metric3',
      data: [
        { x: 'W1', y: 20 },
        { x: 'W2', y: 30 },
        { x: 'W3', y: 25 },
        { x: 'W4', y: 40 },
        { x: 'W5', y: 35 },
        { x: 'W6', y: 45 },
        { x: 'W7', y: 50 },
        { x: 'W8', y: 55 },
        { x: 'W9', y: 60 },
        { x: 'W10', y: 65 },
        { x: 'W11', y: 70 },
        { x: 'W12', y: 75 },
        { x: 'W13', y: 80 },
        { x: 'W14', y: 85 },
        { x: 'W15', y: 90 }
      ]
    }
  ],
  chartOptions: {
    chart: {
      height: 350,
      type: 'heatmap'
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      heatmap: {
        colorScale: {
          inverse: true
        }
      }
    },
    colors: [
      '#F3B415',
      '#F27036',
      '#663F59',
      '#6A6E94',
      '#4E88B4',
      '#00A7C6',
      '#18D8D8',
      '#A9D794',
      '#46AF78',
      '#A93F55',
      '#8C5E58',
      '#2176FF',
      '#33A1FD',
      '#7A918D',
      '#BAFF29'
    ],
    xaxis: {
      type: 'category',
      categories: [
        'W1',
        'W2',
        'W3',
        'W4',
        'W5',
        'W6',
        'W7',
        'W8',
        'W9',
        'W10',
        'W11',
        'W12',
        'W13',
        'W14',
        'W15'
      ]
    },
    title: {
      // text: 'Color Scales flipped Vertically'
    }
  }
}
</script>

<template>
  <div
    class="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5"
  >
    <div class="mb-3 justify-between gap-4 sm:flex">
      <div>
        <h4 class="text-xl font-bold text-black dark:text-white">Heap Map Analytics</h4>
      </div>
    </div>
    <div class="mb-2">
      <div id="TreeMap" class="mx-auto flex justify-center">
        <VueApexCharts
          type="heatmap"
          height="350"
          width="570"
          :options="data.chartOptions"
          :series="data.series"
          ref="chart"
        />
      </div>
    </div>
  </div>
</template>
