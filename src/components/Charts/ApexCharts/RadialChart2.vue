<script setup lang="ts">
import { ref, watch } from 'vue'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'
import { useDataStore } from '@/stores/data'

const chart = ref(null)

const data1 = ref({
  series: [useDataStore().turn_around_time_top2],
  chartOptions: {
    chart: {
      height: 350,
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '60%'
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
    }
    // labels: ['Cricket']
  }
})

watch(
  () => [useDataStore().turn_around_time_top2],
  ([turn_around_time_top2]) => {
    data1.value.series = [turn_around_time_top2]
  }
)
</script>

<template>
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
  <div class="flex mb-2">
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
