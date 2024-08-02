<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'
import { useDataStore } from '@/stores/data'

const chart = ref(null)
const dataStore = useDataStore()

const getColor = (value: number): string => {
  if (value >= 0 && value <= 25) return '#FF4560'
  if (value > 25 && value <= 50) return '#FDDD60'
  if (value > 50 && value <= 75) return '#58D9F9'
  return '#7CFFB2' // Red for low values
}

const data1 = ref({
  series: [dataStore.purpose_of_visit_top2],
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
  data1.value.series = [dataStore.purpose_of_visit_top2]
  data1.value.chartOptions.fill.colors = [getColor(dataStore.overAll_top2)]
})
</script>

<template>
  <div class="justify-center gap-4 sm:flex">
    <div class="">
      <h2 class="text-[20px] font-bold text-black dark:text-white text-center">
        Satisfaction Score
      </h2>
      <h4 class="text-[18px] font-semibold text-black dark:text-white text-center">
        Fulfillment of purpose of visit
      </h4>
    </div>
  </div>
  <div class="flex mb-2 mt-[20px]">
    <div id="TreeMap" class="mx-auto flex justify-center">
      <VueApexCharts
        type="radialBar"
        height="250"
        width="250"
        :options="data1.chartOptions"
        :series="data1.series"
        ref="chart"
      />
    </div>
  </div>
</template>
