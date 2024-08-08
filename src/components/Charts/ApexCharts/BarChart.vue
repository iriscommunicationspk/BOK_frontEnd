<script setup lang="ts">
import { useDataStore } from '@/stores/data'
import { ref, watch } from 'vue'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min.js'

const chart = ref(null)

const data = ref({
  series: [
    {
      name: 'Actuadl',
      data: useDataStore().top5Array
    }
  ],
  chartOptions: {
    chart: {
      height: 350,
      type: 'bar',
      toolbar: {
        show: true, // Enable the toolbar
        tools: {
          download: true // Allow downloading the chart
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    colors: ['#36099e'],
    dataLabels: {
      enabled: true,
      formatter: function (val: any) {
        return val + '%' // Add percentage sign to the value
      },
      style: {
        colors: ['#FFFFFF'], // Change text color if needed

        fontSize: '14px', // Change font size if needed

        fontWeight: 'bold' // Change font weight if needed
      }
    },
    xaxis: {
      labels: {
        show: false // Hide x-axis labels
      },
      axisBorder: {
        show: false // Hide x-axis border
      },
      axisTicks: {
        show: false // Hide x-axis ticks
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
        breakpoint: 1466,
        options: {
          chart: {
            width: '700px'
          }
        }
      },
      {
        breakpoint: 1315,
        options: {
          chart: {
            width: '600px'
          }
        }
      },
      {
        breakpoint: 1280,
        options: {
          chart: {
            width: '800px'
          }
        }
      },
      {
        breakpoint: 1089,
        options: {
          chart: {
            width: '700px'
          }
        }
      },
      // {
      //   breakpoint: 2160,
      //   options: {
      //     chart: {
      //       width: '1200px'
      //     }
      //   }
      // },
      {
        breakpoint: 960,
        options: {
          chart: {
            width: '700px'
          }
        }
      },
      {
        breakpoint: 750,
        options: {
          chart: {
            width: '600px'
          }
        }
      },
      {
        breakpoint: 655,
        options: {
          chart: {
            width: '500px'
          }
        }
      },
      {
        breakpoint: 555,
        options: {
          chart: {
            width: '400px'
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
    ],

    stroke: {
      width: 1,
      colors: ['#fff']
    },

    legend: {
      show: false,
      showForSingleSeries: true,
      customLegendItems: ['Actual', 'Expected'],
      markers: {
        fillColors: ['#red', '#775DD0']
      }
    }
  }
})

watch(
  () => [useDataStore().top5Array],
  ([top5Array]) => {
    data.value.series[0].data = top5Array
  }
)
</script>

<template>
  <div
    class="relative col-span-12 rounded-lg border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-[1px_2px_55px_-18px_#00008070] dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8"
  >
    <div class="mb-3 justify-center gap-4 sm:flex">
      <div>
        <h4 class="text-[19px] text-center font-extrabold text-black dark:text-white mt-4">
          Purpose of Branch Visit - Top 5
        </h4>
      </div>
    </div>
    <div class="mb-2" v-if="useDataStore().top5Array.length > 0">
      <div id="TreeMap" class="mx-auto flex justify-center">
        <VueApexCharts
          type="bar"
          height="300"
          width="800"
          :options="data.chartOptions"
          :series="data.series"
          ref="chart"
        />
      </div>
      <span class="ml-4 font-bold text-[14px] text-black/40 float-right">
        n={{ useDataStore().achieved }}
      </span>
    </div>
    <div
      v-else
      class="absolute left-[34%] top-[50%] text-center font-extrabold text-black dark:text-white mb-8"
    >
      <div v-if="!useDataStore().loader" class="ml-20 mt-5">
        <pulse-loader :color="useDataStore().color" :size="useDataStore().size"></pulse-loader>
      </div>
      <div v-else class="mt-5 ml-20 text-xl">No Data</div>
    </div>
  </div>
</template>
