<script setup lang="ts">
import { useDataStore } from '@/stores/data'
import { ref, watch } from 'vue'
// @ts-ignore
import VueApexCharts, { type VueApexChartsComponent } from 'vue3-apexcharts'

const dataStore = useDataStore()

const chart = ref<VueApexChartsComponent | null>(null)

const less_then_10 = ref(dataStore.less_then_10)
const bt_10_15 = ref(dataStore.bt_10_15)
const bt_15_20 = ref(dataStore.bt_15_20)
const bt_20_25 = ref(dataStore.bt_20_25)
const bt_25_30 = ref(dataStore.bt_25_30)
const bt_30_45 = ref(dataStore.bt_30_45)
const bt_45_60 = ref(dataStore.bt_45_60)
const more_then_60 = ref(dataStore.more_then_60)

const chartSeries = ref([
  {
    name: 'Data',
    data: [
      less_then_10.value,
      bt_10_15.value,
      bt_15_20.value,
      bt_20_25.value,
      bt_25_30.value,
      bt_30_45.value,
      bt_45_60.value,
      more_then_60.value
    ]
  }
])

const chartOptions = ref({
  chart: {
    type: 'bar',
    height: 300,
    width: 800
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
      dataLabels: {
        position: 'top' // Display data labels at the end of the bars
      }
    }
  },
  dataLabels: {
    enabled: true,
    offsetX: 25,
    style: {
      fontSize: '12px',
      colors: ['#000']
    },
    formatter: function (val: number) {
      return val.toString() + '%';
    }
  },
  xaxis: {
    categories: [
      'Less than 10 minutes',
      '10 – 15 minutes',
      '16 – 20 minutes',
      '21 – 25 minutes',
      '26 – 30 minutes',
      '31 – 45 minutes',
      '46 – 60 minutes',
      'More than 60 minutes'
    ],
    show:false,
    labels: {
        formatter: function () {
          return ''
        }
      }
  },
  yaxis: {
    title: {
      text: ''
    }

  },
  responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            width: '900px'
          }
        }
      },
      {
        breakpoint: 1441,
        options: {
          chart: {
            width: '400px'
          }
        }
      },
      {
        breakpoint: 1170,
        options: {
          chart: {
            width: '700px'
          }
        }
      },
      {
        breakpoint: 2160,
        options: {
          chart: {
            width: '520px'
          }
        }
      },
      {
        breakpoint: 769,
        options: {
          chart: {
            width: '650px'
          }
        }
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            width: '100%'
          }
        }
      }
    ]
})

watch(
  () => [
    dataStore.less_then_10,
    dataStore.bt_10_15,
    dataStore.bt_15_20,
    dataStore.bt_20_25,
    dataStore.bt_25_30,
    dataStore.bt_30_45,
    dataStore.bt_45_60,
    dataStore.more_then_60
  ],
  (newValues) => {
    chartSeries.value[0].data = newValues
    if (chart.value) {
      chart.value.updateSeries(chartSeries.value, true)
    }
  }
)
</script>

<template>
  <div
    class="col-span-12 rounded-lg border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-[1px_2px_55px_-18px_#00008070] dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5"
  >
    <div class="mb-3 justify-center gap-4 sm:flex">
      <div>
        <h4 class="text-[22px] text-center font-bold text-black dark:text-white mt-4">
          Turnaround Time of Today's Purpose of Visit
        </h4>
      </div>
    </div>
    <div class="mb-2">
      <div id="TreeMap" class="mx-auto flex justify-center mt-5">
        <VueApexCharts
          type="bar"
          height="400"
        
          :options="chartOptions"
          :series="chartSeries"
          ref="chart"
        />
      </div>
      <span class="ml-4 font-bold text-[14px] text-black/40 float-right">
        n={{ useDataStore().achieved }}
      </span>
    </div>
  </div>
</template>

<style>
/* Add any styles for the component here */
#TreeMap {
  width: 100%;
}
</style>
