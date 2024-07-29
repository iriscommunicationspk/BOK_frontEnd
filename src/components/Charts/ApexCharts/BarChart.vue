<script setup lang="ts">
import { useDataStore } from '@/stores/data'
import { ref, watch } from 'vue'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'

const chart = ref(null)

const data = ref({
  series: [
    {
      name: 'Actual',
      data: [
        {
          x: 'Depositing Money',
          y: useDataStore().deposit
        },
        {
          x: 'Transfering funds',
          y: useDataStore().transferring_fund
        },
        {
          x: 'Loan Service',
          y: useDataStore().loan_service
        },
        {
          x: 'Withdrawal',
          y: useDataStore().withdrawal
        },
        {
          x: 'Closing account',
          y: useDataStore().closing_acc
        }
      ]
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
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: false
            }
          },
          legend: {
            position: 'bottom'
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
  () => [
    useDataStore().withdrawal,
    useDataStore().deposit,
    useDataStore().loan_service,
    useDataStore().closing_acc,
    useDataStore().transferring_fund
  ],
  ([withdrawal, deposit, loan_service, closing_acc, transferring_fund]) => {
    data.value.series[0].data[0].y = deposit
    data.value.series[0].data[1].y = transferring_fund
    data.value.series[0].data[2].y = loan_service
    data.value.series[0].data[3].y = withdrawal
    data.value.series[0].data[4].y = closing_acc
  }
)
</script>

<template>
  <div
    class="col-span-12 rounded-lg border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-[1px_2px_55px_-18px_#00008070] dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8"
  >
    <div class="mb-3 justify-center gap-4 sm:flex">
      <div>
        <h4 class="text-[22px] text-center font-bold text-black dark:text-white mt-4">
          Purpose of Visiting Branch - Top 5
        </h4>
      </div>
    </div>
    <div class="mb-2">
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
      <span class="ml-4 font-bold text-[14px] text-black/40 float-right"> n={{ useDataStore().achieved }} </span>
    </div>
  </div>
</template>
