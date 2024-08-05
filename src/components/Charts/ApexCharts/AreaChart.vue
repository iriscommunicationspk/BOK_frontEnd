<script setup lang="ts">
import { ref } from 'vue'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'

const chart = ref(null)

function generateDayWiseTimeSeries(baseval: any, count: any, yrange: any) {
  var i = 0
  var series = []
  while (i < count) {
    var x = baseval
    var y = Math.round(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    series.push([x, y])
    baseval += 86400000 // Adding one day in milliseconds
    i++
  }
  return series
}

const data = {
  series: [
    {
      name: 'South',
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 60
      })
    },
    {
      name: 'North',
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 20
      })
    },
    {
      name: 'Central',
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 15
      })
    }
  ],
  chartOptions: {
    chart: {
      type: 'area',
      height: 350,
      stacked: true,
      events: {
        selection: function (chart: any, e: any) {
          // console.log(new Date(e.xaxis.min))
        }
      }
    },
    colors: ['#008FFB', '#00E396', '#CED4DC'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'monotoneCubic'
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.8
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
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
        <h4 class="text-xl font-bold text-black dark:text-white">Area Chart Analytics</h4>
      </div>
    </div>
    <div class="mb-2">
      <div id="TreeMap" class="mx-auto flex justify-center">
        <VueApexCharts
          type="area"
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
