<script setup lang="ts">
import { ref, watchEffect, computed, watch, onMounted } from 'vue'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'
import { useDataStore } from '@/stores/data'
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min.js'
import LoaderVue from '@/components/Loader/LoaderVue.vue'

const dataStore = useDataStore()

const getColor = (value: number): string => {
  if (value >= 0 && value <= 25) return '#FF4560'
  if (value > 25 && value <= 50) return '#FDDD60'
  if (value > 50 && value <= 75) return '#FF9175'
  return '#7CFFB22' // Red for low values
}

const data = ref({
  series: [75],
  chartOptions: {
    chart: {
      height: 350,
      type: 'radialBar',
      toolbar: {
        show: true
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.5
          }
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.7
          }
        },

        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '17px'
          },
          value: {
            formatter: function (val: any) {
              return parseInt(val) + '%'
            },
            color: '#111',
            fontSize: '36px',
            show: true
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#ABE5A1'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['Percent']
  }
})

watchEffect(() => {
  data.value.series = [dataStore.overAllScore]
  data.value.chartOptions.fill.gradient.gradientToColors = [getColor(dataStore.overAllScore)]
})
</script>

<template>
  <div
    class="relative flex flex-col lg:flex-row justify-evenly items-center col-span-12 min-h-[400px] backdrop-blur-lg bg-white bg-opacity-90 px-5 pt-7.5 pb-5 rounded-lg sm:px-7.5 xl:col-span-12"
  >
    <div>
      <div>
        <h4
          class="text-[23px] text-center font-extrabold text-black tracking-tight dark:text-white my-5"
        >
          Overall Score
        </h4>
      </div>
      <div class="relative">
        <div class="" v-if="useDataStore().overAllScore > 0 && !useDataStore().loader">
          <div id="TreeMap" class="flex justify-center">
            <VueApexCharts
              type="radialBar"
              height="350"
              :options="data.chartOptions"
              :series="data.series"
            />
          </div>
        </div>
        <div v-else>
          <div
            v-if="useDataStore().loader"
            class="flex justify-center absolute top-[6rem] left-1/2"
          >
            <LoaderVue />
          </div>
          <div v-else>No Data</div>
        </div>
      </div>
    </div>
    <div v-if="useDataStore().overAllScore > 0">
      <div class="text-center animate-bounce delay-1000">
        <span class="text-[#F29F67] text-xl font-bold">O</span>verall
        <span class="text-[#F29F67] text-xl font-bold">B</span>ranch
        <span class="text-[#F29F67] text-xl font-bold">P</span>erformance
      </div>
      <div
        class="text-4xl font-extrabold text-red drop-shadow-2xl text-center"
        v-if="useDataStore().overAllScore < 70"
      >
        POOR
      </div>
      <div
        class="text-5xl font-extrabold text-orange-500 drop-shadow-2xl text-center"
        v-else-if="useDataStore().overAllScore >= 70 && useDataStore().overAllScore <= 79"
      >
        AVERAGE
      </div>

      <div
        class="text-4xl font-extrabold text-blue-500 drop-shadow-2xl text-center"
        v-else-if="useDataStore().overAllScore >= 80 && useDataStore().overAllScore <= 84"
      >
        GOOD
      </div>
      <div
        class="text-4xl font-extrabold text-cyan-500 drop-shadow-2xl text-center"
        v-else-if="useDataStore().overAllScore >= 85 && useDataStore().overAllScore <= 90"
      >
        VERY GOOD
      </div>
      <div
        class="text-4xl font-extrabold text-green-500 drop-shadow-2xl text-center"
        v-else-if="useDataStore().overAllScore > 90"
      >
        EXCELLENT
      </div>
    </div>
  </div>
</template>
