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
          x: 'Withdrawal',
          y: useDataStore().withdrawal
        },
        {
          x: 'Payment Dues',
          y: useDataStore().payment_dues
        },
        {
          x: 'Cheque Deposit',
          y: useDataStore().cheque_deposit
        },
        {
          x: 'Transfering Funds',
          y: useDataStore().transferring_fund
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
  () => [
    useDataStore().deposit,
    useDataStore().withdrawal,
    useDataStore().payment_dues,
    useDataStore().cheque_deposit,
    useDataStore().transferring_fund
  ],
  ([deposit,withdrawal, payment_dues,cheque_deposit, transferring_fund]) => {
    data.value.series[0].data[0].y = deposit
    data.value.series[0].data[1].y = withdrawal
    data.value.series[0].data[2].y = payment_dues
    data.value.series[0].data[3].y = cheque_deposit
    data.value.series[0].data[4].y = transferring_fund
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
          Purpose of Branch Visit - Top 5
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
      <span class="ml-4 font-bold text-[14px] text-black/40 float-right">
        n={{ useDataStore().achieved }}
      </span>
    </div>
  </div>
</template>
