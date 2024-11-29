<script setup lang="ts">
import { ref, watchEffect, computed, watch } from 'vue'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'
import { useDataStore } from '@/stores/data'
import LoaderVue from '@/components/Loader/LoaderVue.vue'

const chart = ref(null)
const dataStore = useDataStore()

const getColor = (value: number): string => {
  if (value >= 0 && value <= 69) return '#fb5454'
  if (value > 69 && value <= 79) return '#F97317'
  if (value >= 80 && value <= 84) return '#3b82f6'
  if (value >= 85 && value <= 90) return '#06b6d4'
  return '#22c55e' // Red for low values
}

const data1 = ref({
  series: [Math.floor(dataStore.branch_exterior_overAllScore)],
  chartOptions: computed(() => ({
    chart: {
      height: 300,
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
      colors: [getColor(dataStore.branch_exterior_overAllScore)]
    },
    labels: [' ']
  }))
})

watchEffect(() => {
  data1.value.series = [Math.floor(dataStore.branch_exterior_overAllScore)]
  data1.value.chartOptions.fill.colors = [getColor(dataStore.branch_exterior_overAllScore)]
})
</script>

<template>
  <div
    class="relative col-span-12 min-h-[400px] backdrop-blur-lg bg-white bg-opacity-90 px-5 pt-7.5 pb-5 rounded-lg sm:px-7.5 xl:col-span-4"
  >
    <div>
      <h4
        class="text-[19px] text-center font-extrabold text-black tracking-tight dark:text-white my-5"
      >
        Branch Exterior Overall Score
      </h4>
    </div>
    <div class="relative">
      <div class="" v-if="useDataStore().overAllScore > 0">
        <div id="TreeMap" class="flex justify-center">
          <VueApexCharts
            type="radialBar"
            height="300"
            width="300"
            :options="data1.chartOptions"
            :series="data1.series"
            ref="chart"
          />
        </div>
        <span class="mr-8 font-bold float-right text-[14px] text-black/40">
          n={{ useDataStore().achieved }}
        </span>
      </div>

      <div v-else class="">
        <div v-if="useDataStore().loader" class="flex justify-center absolute top-[6rem] left-1/2">
          <LoaderVue />
        </div>
        <div v-else class="mt-5 ml-20 text-xl">No Data</div>
      </div>
    </div>
  </div>
</template>
