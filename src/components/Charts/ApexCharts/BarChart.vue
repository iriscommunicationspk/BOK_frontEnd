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
          x: 'withdrawal',
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
    colors: ['#1584e7'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + '%'; // Add percentage sign to the value
      },
      style: {
        colors: ['#FFFFFF'] // Change text color if needed
      }
    },
    xaxis: {
      min: 0, // Set the minimum value for the x-axis
      max: 100 // Set the maximum value for the x-axis
    },
    legend: {
      show: false,
      showForSingleSeries: true,
      customLegendItems: ['Actual', 'Expected'],
      markers: {
        fillColors: ['#00E396', '#775DD0']
      }
    }
  }
});



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
    class="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-[1px_2px_55px_-18px_#00008070] dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8"
  >
    <div class="mb-3 justify-between gap-4 sm:flex">
      <div>
        <h4 class="text-xl font-bold text-black dark:text-white">Purpose of Visiting Branch</h4>
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
    </div>
  </div>
</template>
