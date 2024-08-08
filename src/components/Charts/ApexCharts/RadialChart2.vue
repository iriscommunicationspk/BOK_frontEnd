<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'
import { useDataStore } from '@/stores/data'
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min.js'

const chart = ref(null)
const dataStore = useDataStore()

const getColor = (value: number): string => {
  if (value >= 0 && value <= 25) return '#FF4560'
  if (value > 25 && value <= 50) return '#FDDD60'
  if (value > 50 && value <= 75) return '#58D9F9'
  return '#7CFFB2' // Red for low values
}

const data1 = ref({
  series: [dataStore.turn_around_time_top2],
  chartOptions: computed(() => ({
    chart: {
      height: 350,
      type: 'radialBar',
      toolbar: {
        show: true, // Enable the toolbar
        tools: {
          download: true // Allow downloading the chart
        }
      }
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '55%'
        },
        dataLabels: {
          showOn: 'always',
          name: {
            show: false
          },
          value: {
            show: true,
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#000',
            offsetY: 10
          }
        }
      }
    },
    fill: {
      colors: [getColor(dataStore.overAll_top2)]
    },
    labels: ['']
  }))
})

watchEffect(() => {
  data1.value.series = [dataStore.turn_around_time_top2]
  data1.value.chartOptions.fill.colors = [getColor(dataStore.overAll_top2)]
})
</script>

<template>
  <div class="relative">
    <div class="justify-center gap-4 sm:flex">
      <div class="">
        <h2 class="text-[20px] font-bold text-black dark:text-white text-center">
          Satisfaction Score
        </h2>
        <h4 class="text-[18px] font-semibold text-black dark:text-white text-center">
          Turnaround time of purpose of visit
        </h4>
      </div>
    </div>

    <div class="mb-2 mt-[20px]" v-if="useDataStore().turn_around_time_top2 > 0">
      <div id="TreeMap" class="flex justify-center">
        <VueApexCharts
          type="radialBar"
          height="350"
          width="350"
          :options="data1.chartOptions"
          :series="data1.series"
          ref="chart"
        />
      </div>
      <span class="mr-8 font-bold float-right text-[14px] text-black/40">
        n={{ useDataStore().achieved }}
      </span>
    </div>

    <div
      v-else
      class="absolute left-[15%] top-[150%] text-center font-extrabold text-black dark:text-white mb-8"
    >
      <div v-if="!useDataStore().loader" class="ml-20 mt-5">
        <pulse-loader :color="useDataStore().color" :size="useDataStore().size"></pulse-loader>
      </div>
      <div v-else class="mt-5 ml-26 text-xl">No Data</div>
    </div>
  </div>
</template>
