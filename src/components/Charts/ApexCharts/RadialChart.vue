<script setup lang="ts">
import { ref, watch } from 'vue'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'
import { useDataStore } from '@/stores/data'

const chart = ref(null)

const data1 = ref({
  series: [useDataStore().new_customer, useDataStore().old_customer],
  chartOptions: {
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
        track: {
          strokeWidth: '60%', // Width of the track line
        },
        dataLabels: {
          name: {
            fontSize: '22px'
          },
          value: {
            fontSize: '16px'
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function (w) {
              // Custom formatter function
              return '100%';
            }
          }
        },
        hollow: {
          size: '65%', // Size of the hollow space
        },
        stroke: {
          lineCap: 'round' // Options are 'round', 'butt', 'square'
        }
      }
    },
    labels: ['New Customers', 'Existing Customers']
  }
});




watch(
  () => [useDataStore().new_customer, useDataStore().old_customer],
  ([new_customer, old_customer]) => {
    data1.value.series = [new_customer,old_customer]
  }
)
</script>

<template>
  <div
    class="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-[1px_2px_55px_-18px_#00008070] dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4"
  >
    <div class="mb-3 justify-between gap-4 sm:flex">
      <div>
        <h4 class="text-xl font-bold text-black dark:text-white mb-10">
          Incidence of New Vs. Old Customers
        </h4>
      </div>
    </div>
    <div class="flex mb-2">
      <div id="TreeMap" class="mx-auto flex justify-center">
        <VueApexCharts
          type="radialBar"
          height="300"
          width="350"
          :options="data1.chartOptions"
          :series="data1.series"
          ref="chart"
        />
      </div> 
    </div>
  </div>
</template>
