<script setup lang="ts">
import { useDataStore } from '@/stores/data'
import { ref, watch } from 'vue'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'
// import moment from 'moment'

const chart = ref(null)

const data = ref({
  series: [
    {
      name: 'OverAll',
      data: [
        useDataStore().overAll_top2,
        useDataStore().overAll_top2,
        useDataStore().overAll_top2,
        useDataStore().overAll_top2
      ]
    }
  ],
  chartOptions: {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      // text: 'Product Trends by Month',
      // align: 'left'
    },
    yaxis: {
      min: 0, // Set the minimum value for the x-axis
      max: 100 // Set the maximum value for the x-axis
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    }
    // xaxis: {
    //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    // }
  }
})

watch(
  () => [useDataStore().overAll_top2],
  ([overAll_top2]) => {
    data.value.series[0].data[0] = overAll_top2
    data.value.series[0].data[1] = overAll_top2
    data.value.series[0].data[2] = overAll_top2
    data.value.series[0].data[3] = overAll_top2
  }
)
</script>

<template>
  <div
    class="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12"
  >
    <div class="mb-3 justify-center gap-4 sm:flex">
      <div>
        <h4 class="text-[24px] text-center font-bold text-black dark:text-white mb-2 mt-4">
          Overall Satisfaction Trend
        </h4>
        <h1 class="text-[22px] text-center font-bold text-black dark:text-white">
          (Top 2 Boxes Score)
        </h1>
      </div>
    </div>
    <div class="mb-2">
      <div id="TreeMap" class="mx-auto flex justify-center">
        <VueApexCharts
          type="line"
          height="350"
          width="1300"
          :options="data.chartOptions"
          :series="data.series"
          ref="chart"
        />
      </div>
    </div>
  </div>
</template>
