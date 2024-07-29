<script setup lang="ts">
import { useDataStore } from '@/stores/data'
import { ref, computed, watch } from 'vue'
// @ts-ignore
import VueApexCharts, { type VueApexChartsComponent } from 'vue3-apexcharts'

const dataStore = useDataStore()

const chart = ref<VueApexChartsComponent | null>(null) // Explicitly type chart.value as VueApexCharts | null

// Use computed to create a reactive reference to the data_array in the store
const data_array = computed(() => dataStore.data_array)

interface ChartData {
  series: {
    name: string
    data: number[]
  }[]
  chartOptions: {
    chart: {
      height: number
      type: string
      zoom: {
        enabled: boolean
      }
    }
    colors: string[]
    dataLabels: {
      enabled: boolean
      formatter: (val: any, opts: any) => string
    }
    stroke: {
      curve: string
    }
    title: {
      text?: string
      align?: string
    }
    grid: {
      row: {
        colors: string[]
        opacity: number
      }
    }
    xaxis: {
      categories: string[]
    }
    responsive: {
      breakpoint: number
      options: Record<string, any>
    }[]
  }
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
    colors: ['#32a852'], // Change the line color

    dataLabels: {
      enabled: true,
      formatter: function (val :any, opts:any) {
      const total = opts.w.globals.seriesTotals.reduce((a:any, b:any) => a + b, 0)
      const percent = (opts.w.globals.series[opts.seriesIndex] / total) * 100
      return  val + '%'
    },
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      // text: 'Overall Satisfaction Trend',
      // align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on rows
        opacity: 0.5
      }
    },
    xaxis: {
      categories: [] // This will be updated with dates
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
            width: '800px'
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
            width: '1200px'
          }
        }
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            width: '1200px'
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
  }
})

// Watch for changes in data_array and update the chart data accordingly
watch(
  data_array,
  (newData) => {
    data.value.series[0].data = newData.map((item) => item.percentage)
    data.value.chartOptions.xaxis.categories = newData.map((item) => item.date)

    // Force update the chart
    if (chart.value) {
      chart.value.updateSeries(data.value.series)
      chart.value.updateOptions(data.value.chartOptions)
    }
  },
  { deep: true, immediate: true }
)
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
      <div id="TreeMap" class="mx-auto flex justify-center w-full">
        <VueApexCharts
          type="line"
          height="350"
          :options="data.chartOptions"
          :series="data.series"
          ref="chart"
        />
      </div>
    </div>
  </div>
</template>

<style>
/* Ensure the container div is responsive */
#TreeMap {
  width: 100%;
}
</style>
