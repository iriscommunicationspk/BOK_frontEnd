<script setup lang="ts">
import { useDataStore } from '@/stores/data'
import { ref, watch } from 'vue'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'

const chart = ref(null)

const data = ref({
  series: [useDataStore().new_customer, useDataStore().old_customer],
  chartOptions: {
    chart: {
      width: 380,
      type: 'donut'
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        dataLabels: {
          offset: -5,
          minAngleToShowLabel: 10
        },
        donut: {
          size: '80%',
          labels: {
            show: true,
            // name: {
            //   show: true,
            //   fontSize: '1px',
            //   fontFamily: 'Helvetica, Arial, sans-serif',
            //   fontWeight: 100,
            //   color: undefined,
            //   offsetY: -10,
            //   formatter: function (val) {
            //     return val
            //   }
            // },
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
              show: true,
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
      enabled: false,
      style: {
        colors: ['#000', '#fff'] // Text colors for data labels (adjust as needed)
      },
      background: {
        enabled: true,
        foreColor: '#000', // Color of text inside the background
        borderRadius: 0,
        dropShadow: {
          enabled: false
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal', // 'horizontal', 'vertical', 'diagonal1', 'diagonal2'
        shadeIntensity: 0.5,
        gradientToColors: ['#1A73E1', '#FABB3D'], // Corresponding gradient colors
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    colors: ['#FABB3D', 'red'], // Base colors for each series
    labels: ['New Customers', 'Existing Customers'],
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
    class="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4"
  >
    <div class="mb-3 justify-between gap-4 sm:flex">
      <div>
        <h4 class="text-[22px] text-center font-bold text-black dark:text-white mb-10 mt-4">
          Incidence of New Vs. Old Customers
        </h4>
      </div>
    </div>
    <div class="mb-2">
      <div id="TreeMap" class="mx-auto flex justify-center">
        <VueApexCharts
          type="donut"
          width="380"
          :options="data.chartOptions"
          :series="data.series"
          ref="chart"
        />
      </div>
      <span class="ml-4 font-bold text-base float-right"> n={{ useDataStore().achieved }} </span>
    </div>
  </div>
</template>
