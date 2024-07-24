<script setup lang="ts">
import { useDataStore } from '@/stores/data'
import { ref, computed, watch } from 'vue'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'

const dataStore = useDataStore()

const chart = ref(null)

// Use computed to create a reactive reference to the data_array in the store
const data_array = computed(() => dataStore.data_array)

console.log('data', data_array.value)

interface ChartData {
  series: {
    name: string;
    data: number[];
  }[];
  chartOptions: {
    chart: {
      height: number;
      type: string;
      zoom: {
        enabled: boolean;
      };
    };
    dataLabels: {
      enabled: boolean;
    };
    stroke: {
      curve: string;
    };
    title: {
      text?: string;
      align?: string;
    };
  
    grid: {
      row: {
        colors: string[];
        opacity: number;
      };
    };
    xaxis: {
      categories: string[];
    };
  };
}

const data = ref<ChartData>({
  series: [
    {
      name: 'Overall',
      data: [] // This will be updated with percentages
    }
  ],
  chartOptions: {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      // text: 'Overall Satisfaction Trend',
      // align: 'lfeft'
    },
    
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on rows
        opacity: 0.5
      }
    },
    xaxis: {
      categories: [] // This will be updated with dates
    }
  }
})

// Watch for changes in data_array and update the chart data accordingly
watch(data_array, (newData) => {
  data.value.series[0].data = newData.map(item => item.percentage)
  data.value.chartOptions.xaxis.categories = newData.map(item => item.date)
}, { immediate: true })

</script>

<template>
  <div
    class="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12"
  >
    <div class="mb-3 justify-center gap-4 sm:flex">
      <div>
        <h4 class="text-[24px] text-center font-bold text-black dark:text-white mb-2 mt-4">
          Overall Satisfaction Trend
        </h4>
        <h1 class="text-[22px] text-center font-bold text-black dark:text-white">
          (Top 2 Boxes Score)
        </h1>
      </div>
    </div>
    <div class="mb-2">
      <div id="TreeMap" class="mx-auto flex justify-center">
        <VueApexCharts
          type="line"
          height="350"
          width="1300"
          :options="data.chartOptions"
          :series="data.series"
          ref="chart"
        />
      </div>
    </div>
 
  </div>
</template>
