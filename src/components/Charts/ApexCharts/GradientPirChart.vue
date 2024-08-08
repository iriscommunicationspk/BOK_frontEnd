<script setup lang="ts">
import { useDataStore } from '@/stores/data'
import { ref, watch } from 'vue'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min.js'
const chart = ref(null)

const data = ref({
  series: [useDataStore().new_customer, useDataStore().old_customer],
  chartOptions: {
    chart: {
      width: 380,
      type: 'donut',
      toolbar: {
        show: true, // Enable the toolbar
        tools: {
          download: true // Allow downloading the chart
        }
      }
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        dataLabels: {
          offset: 1
        },
        donut: {
          size: '67%',
          labels: {
            show: true,
            value: {
              show: true,
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              color: undefined,
              offsetY: 16,
              formatter: function (val: any) {
                return val + '%'
              }
            },
            total: {
              show: false,
              showAlways: false,
              label: 'Total',
              fontSize: '14px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: '#373d3f',
              formatter: function (w: any) {
                return w.globals.seriesTotals.reduce((a: any, b: any) => {
                  const sum = a + b
                  return sum
                }, 0)
              }
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: any, opts: any) {
        const total = opts.w.globals.seriesTotals.reduce((a: any, b: any) => a + b, 0)
        const percent = (opts.w.globals.series[opts.seriesIndex] / total) * 100
        return Math.round(percent) + '%'
      },
      style: {
        colors: ['#fff', '#fff'], // Text colors for data labels (adjust as needed)
        fontSize: '15px'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal', // 'horizontal', 'vertical', 'diagonal1', 'diagonal2'
        shadeIntensity: 0.5,
        gradientToColors: ['#FABB3D'], // Corresponding gradient colors
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    colors: ['#FABB3D', 'red'], // Base colors for each series
    labels: ['New to bank customer', 'Existing customers'],
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      markers: {
        width: 12,
        height: 12,
        radius: 12
      }
    },
    title: {
      // text: 'Gradient Donut with custom Start-angle'
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  }
})

watch(
  () => [useDataStore().new_customer, useDataStore().old_customer],
  ([new_customer, old_customer]) => {
    data.value.series = [new_customer, old_customer]
  }
)
</script>

<template>
  <div
    class="relative col-span-12 border min-h-[400px] border-stroke shadow-[1px_2px_55px_-18px_#00008070] bg-white px-5 pt-7.5 pb-5 rounded-lg dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4"
  >
    <div class="mb-3 justify-center items-center gap-4 sm:flex">
      <div>
        <h4 class="text-[19px] text-center font-extrabold text-black dark:text-white mb-10 mt-4">
          Relationship with BAFL
        </h4>
      </div>
    </div>

    <div class="mb-2" v-if="useDataStore().new_customer > 0 && useDataStore().old_customer > 0">
      <div id="TreeMap" class="mx-auto flex justify-center item-center">
        <VueApexCharts
          type="donut"
          width="380"
          :options="data.chartOptions"
          :series="data.series"
          ref="chart"
        />
      </div>
      <span class="ml-4 font-bold text-[14px] text-black/40 float-right">
        n={{ useDataStore().account_holder_count }}
      </span>
    </div>

    <div
      v-else
      class="absolute left-[34%] top-[50%] text-[42px] text-center font-extrabold text-black dark:text-white mb-8"
    >
      <div v-if="!useDataStore().loader" class="ml-10 mt-5">
        <pulse-loader :color="useDataStore().color" :size="useDataStore().size"></pulse-loader>
      </div>
      <div v-else class="mt-5 ml-10 text-xl">No Data</div>
    </div>
  </div>
</template>
