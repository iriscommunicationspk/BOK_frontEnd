<script setup lang="ts">
import { useDataStore } from '@/stores/data'
import { ref, computed, watch } from 'vue'
// @ts-ignore
import VueApexCharts, { type VueApexChartsComponent } from 'vue3-apexcharts'
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min.js'

import dayjs from 'dayjs' // Import dayjs for date manipulation

const dataStore = useDataStore()

const chart = ref<VueApexChartsComponent | null>(null)

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
      offsetY: number
      style: {
        fontSize: string
      }
      background: {
        enabled: boolean
      }
      formatter: any
    }
    markers: {
      size: number
      colors: string[]
      strokeColors: string
      strokeWidth: number
      hover: {
        size: number
      }
      discrete: {
        seriesIndex: number
        dataPointIndex: number
        size: number
        fillColor: string
        strokeColor: string
        strokeWidth: number
      }[]
    }
    stroke: {
      curve: string
    }
    title: {
      text?: string
      align?: string
    }
    xaxis: {
      categories: string[]
    }
    yaxis: {
      show: boolean
      labels: {
        formatter: any
      }
    }
    fill: {
      type: string
      gradient: any
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
      data: []
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
    colors: ['#32a852'],
    dataLabels: {
      enabled: true,
      offsetY: -10,
      style: {
        fontSize: '15px'
      },
      background: {
        enabled: false
      },
      formatter: function (val: any) {
        if (val === null) return ''
        return val + '%'
      }
    },
    markers: {
      size: 6,
      colors: ['#32a852'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 8
      },
      discrete: []
    },
    stroke: {
      curve: 'smooth'
    },
    title: {},
    xaxis: {
      categories: []
    },
    yaxis: {
      show: true,
      labels: {
        formatter: function () {
          return ''
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#FDD835'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 0]
      }
    },
    responsive: [
    {
        breakpoint: 1640,
        options: {
          chart: {
            width: '700px'
          }
        }
      },
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
            width: '600px'
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
      {
        breakpoint: 2160,
        options: {
          chart: {
            width: '760px'
          }
        }
      },
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
    ]
  }
})

const preprocessDates = (data: any) => {
  if (data.length > 0) {
    const firstDate = dayjs(data[0].date)
    const lastDate = dayjs(data[data.length - 1].date)
    return [
      { date: firstDate.subtract(1, 'day').format('YYYY-M-D'), percentage: null },
      ...data,
      { date: lastDate.add(1, 'day').format('YYYY-M-D'), percentage: null }
    ]
  }
  return data
}

watch(
  data_array,
  (newData) => {
    const processedData = preprocessDates(newData)
    data.value.series[0].data = processedData.map((item: any) => item.percentage)
    data.value.chartOptions.xaxis.categories = processedData.map((item: any) => item.date)

    // Create discrete markers for each data point
    data.value.chartOptions.markers.discrete = processedData.map((item: any, index: number) => ({
      seriesIndex: 0,
      dataPointIndex: index,
      size: 6,
      fillColor: '#32a852',
      strokeColor: '#fff',
      strokeWidth: 2
    }))

    if (chart.value) {
      chart.value.updateSeries(data.value.series, true)
      chart.value.updateOptions(data.value.chartOptions, true)
    }
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <div
    class="relative min-h-[500px] col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-7"
  >
    <div class="mb-3 justify-center gap-4 sm:flex">
      <div>
        <h4 class="text-[22px] text-center font-extrabold text-black dark:text-white mb-2 mt-4">
          Overall Satisfaction Trend
        </h4>
        <h1 class="text-[20px] text-center font-extrabold text-black dark:text-white">
          (Top 2 Boxes Score)
        </h1>
      </div>
    </div>
    <div class="mb-2" v-if="data_array.length > 0">
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
    <div
      v-else
      class="absolute left-[38%] top-[50%] text-center font-extrabold text-black dark:text-white mb-8"
    >
      <div v-if="!useDataStore().loader" class="ml-20 mt-5">
        <pulse-loader :color="useDataStore().color" :size="useDataStore().size"></pulse-loader>
      </div>
      <div v-else class="mt-5 ml-16 text-xl">No Data</div>
    </div>
  </div>
</template>

<style>
/* Ensure the container div is responsive */
#TreeMap {
  width: 100%;
}
</style>
