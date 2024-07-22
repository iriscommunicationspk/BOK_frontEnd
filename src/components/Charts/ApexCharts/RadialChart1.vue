<script setup lang="ts">
import { ref, watch } from 'vue'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'
import { useDataStore } from '@/stores/data'

const chart = ref(null)

const data1 = ref({
  series: [useDataStore().purpose_of_visit_top2],
  chartOptions: {
    chart: {
      height: 350,
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%'
        },
        dataLabels: {
          showOn: 'always',
          name: {
            show: false,
          },
          value: {
            show: true,
            fontSize: '25px',
            fontWeight: 'bold',
            color: '#000',
            offsetY: 10
          }
        }
      }
    },
    labels: ['']
  }
});



watch(
  () => [useDataStore().purpose_of_visit_top2],
  ([purpose_of_visit_top2]) => {
    data1.value.series = [purpose_of_visit_top2]
  }
)
</script>

<template>

    <div class=" justify-between gap-4 sm:flex">
      <div>
        <h4 class="text-base font-semibold text-black dark:text-white  text-center">
            Satisfaction Score - Fulfillment of purpose of visit
        </h4>
      </div>
    </div>
    <div class="flex mb-2">
      <div id="TreeMap" class="mx-auto flex justify-center">
        <VueApexCharts
          type="radialBar"
          height="200"
          width="150"
          :options="data1.chartOptions"
          :series="data1.series"
          ref="chart"
        />
      </div> 
    </div>
  
</template>
