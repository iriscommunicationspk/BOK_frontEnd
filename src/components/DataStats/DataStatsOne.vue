<script setup lang="ts">
// import { ref } from 'vue'
import { useDataStore } from '@/stores/data'
import VueApexCharts from 'vue3-apexcharts'
import { computed, ref, watch } from 'vue'
import LoaderVue from '../Loader/LoaderVue.vue'

const chart = ref(null)

const islamic_percentage = computed(() => {
  return Math.round((useDataStore().islamic_count / useDataStore().achieved) * 100)
})
const conventional_percentage = computed(() => {
  return Math.round((useDataStore().conventional_count / useDataStore().achieved) * 100)
})

const data = ref({
  series: [islamic_percentage.value, conventional_percentage.value],
  chartOptions: {
    chart: {
      width: 380,
      type: 'polarArea'
    },
    labels: ['Conventional', 'Islamic'],
    colors: ['#F0623B', '#244C7E'], // Custom colors for the pie slices

    fill: {
      opacity: 1
    },
    stroke: {
      width: 1,
      colors: undefined
    },
    yaxis: {
      show: false
    },
    legend: {
      position: 'bottom'
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0
        },
        spokes: {
          strokeWidth: 0
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
        // colors: ['#Ffffffff', '#Ffffffff'], // Set the color of the data labels
        fontSize: '16px'
      }
    },
    responsive: [
      {
        breakpoint: 1000,
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

const achieved_percentage: any = ref(0)
achieved_percentage.value = useDataStore().achieved

achieved_percentage.value = Math.fround(
  (useDataStore().achieved / useDataStore().total_sample) * 100
).toFixed(2)

// Watch for changes in the store data
watch(
  () => [useDataStore().islamic_count, useDataStore().conventional_count, useDataStore().achieved],
  (islamic_count, conventional_count, achieved) => {
    achieved_percentage.value = useDataStore().achieved

    achieved_percentage.value = Math.fround(
      (useDataStore().achieved / useDataStore().total_sample) * 100
    ).toFixed(2)
    data.value.series = [
      Math.round((useDataStore().islamic_count / useDataStore().achieved) * 100),
      Math.round((useDataStore().conventional_count / useDataStore().achieved) * 100)
    ]

    // console.log(newAccountHolder, newNoneAccountHolder)
  }
)
</script>

<template>
  <!-- Card Item Start 1st  -->
  <div class="rounded-lg backdrop-blur-lg bg-white bg-opacity-90 py-6 px-7.5 xl:col-span-3">
    <!-- <div
      class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4"
    ></div> -->

    <div class="my-5 md:h-full lg:min-h-[200px]">
      <div>
        <h4
          class="text-[18px] mb-5 lg:mb-0 text-center font-extrabold text-black dark:text-white tracking-tight"
        >
          Total Sample Size
        </h4>
        <!-- <span class="text-sm font-medium">item.title </span> -->
      </div>

      <span
        v-if="!useDataStore().loader"
        class="flex mt-5 items-center gap-1 text-[30px] font-[800] justify-center h-[65%]"
      >
        {{ useDataStore().total_sample }}
      </span>
      <span v-else class="mt-6 w-12 h-3 rounded-lg bg-slate-500">
        <div v-if="useDataStore().loader" class="mt-20 flex justify-center">
          <LoaderVue />
        </div>
        <div v-else>No Data</div></span
      >
    </div>
  </div>
  <!-- Card Item End -->

  <!-- Achived sample size -- 2 -->

  <div
    class="rounded-lg backdrop-blur-lg bg-white bg-opacity-90 py-6 px-7.5 dark:border-strokedark dark:bg-boxdark xl:col-span-3"
  >
    <div class="mt-4 h-full relative">
      <div>
        <h4
          class="text-[19px] text-center font-extrabold text-black dark:text-white mb-5 tracking-tight"
        >
          Achieved Sample Size
        </h4>
      </div>
      <div v-if="!useDataStore().loader">
        <div
          v-if="useDataStore().achieved > 0 || achieved_percentage > 0"
          class="flex flex-col justify-center gap-[10px] h-[60%] mt-[55px]"
        >
          <span class="flex items-center justify-around text-lg mb-3 font-medium">
            <div class="space-y-8">
              <p class="text-[20px] font-[600]">n</p>
              <p class="text-[20px] font-[600]">%</p>
            </div>

            <div class="space-y-8">
              <p class="text-[20px] font-[600]">=</p>
              <p class="text-[20px] font-[600]">=</p>
            </div>

            <div class="space-y-8">
              <div class="text-[30px] font-[800]">{{ useDataStore().achieved }}</div>
              <div class="text-[30px] font-[800]">{{ achieved_percentage }}%</div>
            </div>
          </span>
        </div>
        <div v-else class="absolute left-[35%] top-[50%] text-xl font-extrabold">No Data</div>
      </div>
      <div v-else class="flex justify-start gap-15">
        <div class="mt-16 ml-28">
          <LoaderVue />
        </div>
      </div>
    </div>
  </div>

  <!-- Card Item Start -->
  <div
    class="rounded-lg backdrop-blur-lg bg-white bg-opacity-90 py-6 px-7.5 dark:border-strokedark dark:bg-boxdark xl:col-span-3"
  >
    <div class="mt-4 h-full relative">
      <div>
        <h4
          class="text-[19px] text-center font-extrabold text-black dark:text-white mb-5 tracking-tight"
        >
          Branch Type Count
        </h4>
      </div>
      <div v-if="!useDataStore().loader">
        <div
          v-if="useDataStore().achieved > 0 || achieved_percentage > 0"
          class="flex flex-col justify-center gap-[10px] h-[60%] mt-[55px]"
        >
          <span class="flex items-center justify-around text-lg mb-3 font-medium">
            <div class="space-y-8">
              <p class="text-[20px] font-[600]">Islamic</p>
              <p class="text-[20px] font-[600]">Conventional</p>
            </div>

            <div class="space-y-8">
              <p class="text-[20px] font-[600]">=</p>
              <p class="text-[20px] font-[600]">=</p>
            </div>

            <div class="space-y-8">
              <div class="text-[30px] font-[800]">{{ useDataStore().islamic_count }}</div>
              <div class="text-[30px] font-[800]">{{ useDataStore().conventional_count }}</div>
            </div>
          </span>
        </div>
        <div v-else class="absolute left-[35%] top-[50%] text-xl font-extrabold">No Data</div>
      </div>
      <div v-else class="flex justify-start gap-15">
        <div class="mt-16 ml-28">
          <LoaderVue />
        </div>
      </div>
    </div>
  </div>
  <!-- Customer Type -->

  <div class="rounded-lg backdrop-blur-lg bg-white bg-opacity-90 py-6 px-7.5 xl:col-span-3">
    <!-- <div
      class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4"
    ></div> -->

    <div class="relative flex flex-col gap-4 justify-center items-center mt-4">
      <div>
        <h4
          class="text-[19px] text-center font-extrabold text-black dark:text-white tracking-tight"
        >
          Branch Type Overall
        </h4>
        <!-- <span class="text-sm font-medium">item.title </span> -->
      </div>
      <div v-if="!useDataStore().loader">
        <div
          v-if="useDataStore().islamic_count > 0 || useDataStore().conventional_count > 0"
          class="flex flex-col justify-center"
        >
          <div>
            <div id="TreeMap" class="mx-auto flex justify-center items-center my-auto mt-5">
              <VueApexCharts
                type="polarArea"
                width="240"
                :options="data.chartOptions"
                :series="data.series"
              />
            </div>
          </div>
        </div>
        <div v-else class="absolute left-[38%] top-[7.35rem] text-xl font-extrabold">No Data</div>
      </div>
      <div v-else class="flex justify-center gap-15">
        <div class="mt-[70px]">
          <LoaderVue />
        </div>
      </div>
    </div>
  </div>

  <!-- Card Item End -->
</template>

<!-- <style scoped>
.apexcharts-text {
  fill: white !important;
}
</style> -->
