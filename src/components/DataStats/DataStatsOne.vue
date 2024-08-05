<script setup lang="ts">
// import { ref } from 'vue'
import { useDataStore } from '@/stores/data'
import VueApexCharts from 'vue3-apexcharts'
import { ref, onMounted, watch } from 'vue'
// import SimplePieChart from '../Charts/ApexCharts/SimplePieChart.vue'
const chart = ref(null)

// Update the chart options

const series = ref([
  Math.round(useDataStore().account_holder),
  Math.round(useDataStore().none_account_holder)
])
const chartOptions = ref({
  chart: {
    width: 200,
    type: 'pie',
    toolbar: {
      show: true, // Enable the toolbar
      tools: {
        download: true // Allow downloading the chart
      }
    }
  },
  labels: ['Account Holders of BAFL', 'Non-Account Holders of BAFL'], // Labels for the pie chart
  plotOptions: {
    pie: {
      showLabels: true, // Explicitly hide labels
      dataLabels: {
        offset: -20
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
      colors: ['#Ffffffff', '#Ffffffff'], // Set the color of the data labels
      fontSize: '16px'
    }
  },
  responsive: [
    {
      breakpoint: 1000,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ]
})

const achieved_percentage = ref(0)

// Watch for changes in the store data
watch(
  () => [
    useDataStore().account_holder,
    useDataStore().none_account_holder,
    useDataStore().achieved,
    useDataStore().total_sample
  ],
  ([newAccountHolder, newNoneAccountHolder, achieved, total]) => {
    achieved_percentage.value = Math.round((achieved / total) * 100)
    series.value = [Math.round(newAccountHolder), Math.round(newNoneAccountHolder)]
    // console.log(newAccountHolder, newNoneAccountHolder)
  }
)
</script>

<template>
  <!-- Card Item Start 1st  -->
  <div
    class="rounded-lg border shadow-[1px_2px_55px_-18px_#00008070] border-[#1c24344d] bg-white py-6 px-7.5 dark:border-strokedark dark:bg-boxdark xl:col-span-2"
  >
    <!-- <div
      class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4"
    ></div> -->

    <div class="my-5 md:h-full">
      <div>
        <h4 class="text-[22px] mb-5 lg:mb-0 text-center font-bold text-black dark:text-white">
          Total Sample Size
        </h4>
        <!-- <span class="text-sm font-medium">item.title </span> -->
      </div>

      <span
        v-if="useDataStore().loader"
        class="flex items-center gap-1 text-[40px] font-[800] justify-center h-[65%]"
      >
        {{ useDataStore().total_sample }}
        <!-- <svg
          class="fill-meta-3"
          width="10"
          height="11"
          viewBox="0 0 10 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
            fill=""
          />
        </svg>

        <svg
          class="fill-meta-5"
          width="10"
          height="11"
          viewBox="0 0 10 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
            fill=""
          />
        </svg> -->
      </span>
      <span v-else class="mt-6 w-12 h-3 rounded-lg animate-pulse bg-slate-500"> </span>
    </div>
  </div>
  <!-- Card Item End -->

  <!-- Achived sample size -- 2 -->
  <!-- Card Item Start -->
  <div
    class="rounded-lg border shadow-[1px_2px_55px_-18px_#00008070] border-[#1c24344d] bg-white py-6 px-7.5 dark:border-strokedark dark:bg-boxdark xl:col-span-3"
  >
    <!-- <div
      class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4"
    ></div> -->

    <div class="mt-4 h-full">
      <div>
        <h4 class="text-[22px] text-center font-bold text-black dark:text-white mb-5">
          Achieved Sample Size
        </h4>
        <!-- <span class="text-sm font-medium">item.title </span> -->
      </div>

      <div
        v-if="useDataStore().loader"
        class="flex flex-col justify-center gap-[10px] h-[60%] mt-[35px]"
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
            <div class="text-[40px] font-[800]">{{ useDataStore().achieved }}</div>
            <div class="text-[40px] font-[800]">{{ achieved_percentage }}%</div>
          </div>
        </span>
      </div>
      <div v-else class="flex justify-start gap-15">
        <span class="mt-6 w-18 h-8 rounded-lg animate-pulse bg-slate-500"> </span>
        <span class="mt-6 w-18 h-8 rounded-lg animate-pulse bg-slate-500"> </span>
      </div>
    </div>
  </div>
  <!-- Card Item End -->

  <!-- gender -- 2 -->
  <!-- Card Item Start -->
  <div
    class="rounded-lg border shadow-[1px_2px_55px_-18px_#00008070] border-[#1c24344d] bg-white py-6 px-7.5 dark:border-strokedark dark:bg-boxdark xl:col-span-2"
  >
    <!-- <div
      class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4"
    ></div> -->

    <div class="mt-4 h-full">
      <div>
        <h4 class="text-[22px] text-center font-bold text-black dark:text-white mb-8">Gender</h4>
        <!-- <span class="text-sm font-medium">item.title </span> -->
      </div>

      <div v-if="useDataStore().loader" class="flex flex-col gap-1 justify-center">
        <span class="flex items-center justify-center gap-[30px] text-lg font-medium">
          <img src="@/assets/images/male.png" alt="" class="h-[60px]" />
          <span class="text-[30px] font-[800]"> {{ useDataStore().malePercentage }}% </span>
        </span>

        <div class="h-[1px] bg-[#e5e5e5] w-[80%] mx-auto my-2"></div>

        <span
          v-if="useDataStore().loader"
          class="flex items-center justify-center gap-[30px] text-lg font-medium"
        >
          <img src="@/assets/images/female.png" alt="" class="h-[60px]" />
          <span class="text-[30px] font-[800]"> {{ useDataStore().femalePercentage }}% </span>
        </span>
      </div>
      <div v-else class="flex justify-start gap-15">
        <span class="mt-6 w-18 h-8 rounded-lg animate-pulse bg-slate-500"> </span>
        <span class="mt-6 w-18 h-8 rounded-lg animate-pulse bg-slate-500"> </span>
      </div>
    </div>
  </div>
  <!-- Card Item End -->

  <!-- Customer Type -->
  <!-- Card Item Start -->
  <div
    class="rounded-lg border shadow-[1px_2px_55px_-18px_#00008070] border-[#1c24344d] bg-white py-6 px-7.5 dark:border-strokedark dark:bg-boxdark xl:col-span-5"
  >
    <!-- <div
      class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4"
    ></div> -->

    <div class="flex flex-col gap-4 justify-center items-center mt-4">
      <div>
        <h4 class="text-[22px] text-center font-bold text-black dark:text-white">
          BAFL Customer Type
        </h4>
        <!-- <span class="text-sm font-medium">item.title </span> -->
      </div>

      <div v-if="useDataStore().loader" class="flex flex-col justify-center">
        <div>
          <div id="TreeMap" class="mx-auto flex justify-center">
            <VueApexCharts
              type="pie"
              width="450"
              :options="chartOptions"
              :series="series"
              ref="chart"
            />
          </div>
        </div>
      </div>
      <div v-else class="flex justify-center gap-15">
        <span class="mt-6 w-18 h-8 rounded-lg animate-pulse bg-slate-500"> </span>
        <span class="mt-6 w-18 h-8 rounded-lg animate-pulse bg-slate-500"> </span>
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
