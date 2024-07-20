<script setup lang="ts">
import { ref } from 'vue'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'
// import moment from 'moment'

const chart = ref(null)

const data = {
  series: [
    {
      data: [
        {
          x: 'Code',
          y: [new Date('2019-03-02').getTime(), new Date('2019-03-04').getTime()]
        },
        {
          x: 'Test',
          y: [new Date('2019-03-04').getTime(), new Date('2019-03-08').getTime()]
        },
        {
          x: 'Validation',
          y: [new Date('2019-03-08').getTime(), new Date('2019-03-12').getTime()]
        },
        {
          x: 'Deployment',
          y: [new Date('2019-03-12').getTime(), new Date('2019-03-18').getTime()]
        }
      ]
    }
  ],
  chartOptions: {
    chart: {
      height: 350,
      type: 'rangeBar'
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    xaxis: {
      type: 'datetime'
    }
  }
}
</script>

<template>
  <div
    class="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6"
  >
    <div class="mb-3 justify-between gap-4 sm:flex">
      <div>
        <h4 class="text-xl font-bold text-black dark:text-white">TimeLine Chart Analytics</h4>
      </div>
    </div>
    <div class="mb-2">
      <div id="TreeMap" class="mx-auto flex justify-center">
        <VueApexCharts
          type="rangeBar"
          height="350"
          width="700"
          :options="data.chartOptions"
          :series="data.series"
          ref="chart"
        />
      </div>
    </div>
  </div>
</template>
