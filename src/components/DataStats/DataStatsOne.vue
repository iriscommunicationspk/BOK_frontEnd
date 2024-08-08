<script setup lang="ts">
// import { ref } from 'vue'
import { useDataStore } from '@/stores/data'
import VueApexCharts from 'vue3-apexcharts'
import { ref, watch } from 'vue'
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min.js'
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

    <div class="my-5 md:h-full lg:min-h-[200px]">
      <div>
        <h4 class="text-[18px] mb-5 lg:mb-0 text-center font-extrabold text-black dark:text-white">
          Total Sample Size
        </h4>
        <!-- <span class="text-sm font-medium">item.title </span> -->
      </div>

      <span
        v-if="useDataStore().loader"
        class="flex mt-5 items-center gap-1 text-[30px] font-[800] justify-center h-[65%]"
      >
        {{ useDataStore().total_sample }}
      </span>
      <span v-else class="mt-6 w-12 h-3 rounded-lg bg-slate-500">
        <div v-if="!useDataStore().loader" class="mt-20">
          <pulse-loader :color="useDataStore().color" :size="useDataStore().size"></pulse-loader>
        </div>
        <div v-else>No Data</div></span
      >
    </div>
  </div>
  <!-- Card Item End -->

  <!-- Achived sample size -- 2 -->
  <!-- Card Item Start -->
  <div
    class="rounded-lg border shadow-[1px_2px_55px_-18px_#00008070] border-[#1c24344d] bg-white py-6 px-7.5 dark:border-strokedark dark:bg-boxdark xl:col-span-3"
  >
    <div class="mt-4 h-full relative">
      <div>
        <h4 class="text-[19px] text-center font-extrabold text-black dark:text-white mb-5">
          Achieved Sample Size
        </h4>
      </div>
      <div v-if="useDataStore().loader">
        <div
          v-if="useDataStore().achieved > 0 && achieved_percentage > 0"
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
          <pulse-loader :color="useDataStore().color" :size="useDataStore().size"></pulse-loader>
        </div>
      </div>
    </div>
  </div>
  <!-- Card Item End -->

  <!-- gender -- 2 -->
  <!-- Card Item Start -->

  <div
    class="rounded-lg border shadow-[1px_2px_55px_-18px_#00008070] border-[#1c24344d] bg-white py-6 px-7.5 dark:border-strokedark dark:bg-boxdark xl:col-span-2"
  >
    <div class="mt-4 h-full relative">
      <div>
        <h4 class="text-[19px] text-center font-extrabold text-black dark:text-white mb-8">
          Gender
        </h4>
      </div>

      <div v-if="useDataStore().loader">
        <div
          v-if="useDataStore().malePercentage > 0 || useDataStore().femalePercentage > 0"
          class="flex flex-col gap-1 justify-center"
        >
          <span class="flex items-center justify-around gap-[30px] text-lg font-medium">
            <img src="@/assets/images/male.png" alt="" class="h-[50px]" />
            <span class="text-[30px] font-[800]"> {{ useDataStore().malePercentage }}% </span>
          </span>

          <div class="h-[1px] bg-[#e5e5e5] w-[80%] mx-auto my-2"></div>

          <span
            v-if="useDataStore().loader"
            class="flex items-center justify-around gap-[30px] text-lg font-medium"
          >
            <img src="@/assets/images/female.png" alt="" class="h-[50px]" />
            <span class="text-[30px] font-[800]"> {{ useDataStore().femalePercentage }}% </span>
          </span>
        </div>
        <div v-else class="absolute left-[28%] top-[50%] text-xl font-extrabold">No Data</div>
      </div>

      <div v-else class="flex justify-start gap-15">
        <div class="mt-14 ml-12">
          <pulse-loader :color="useDataStore().color" :size="useDataStore().size"></pulse-loader>
        </div>
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

    <div class="relative flex flex-col gap-4 justify-center items-center mt-4">
      <div>
        <h4 class="text-[19px] text-center font-extrabold text-black dark:text-white">
          BAFL Customer Type
        </h4>
        <!-- <span class="text-sm font-medium">item.title </span> -->
      </div>
      <div v-if="useDataStore().loader">
        <div
          v-if="useDataStore().account_holder > 0 || useDataStore().none_account_holder > 0"
          class="flex flex-col justify-center"
        >
          <div>
            <div id="TreeMap" class="mx-auto flex justify-center">
              <VueApexCharts
                type="pie"
                width="410"
                :options="chartOptions"
                :series="series"
                ref="chart"
              />
            </div>
          </div>
        </div>
        <div v-else class="absolute left-[38%] top-[7.35rem] text-xl font-extrabold">No Data</div>
      </div>
      <div v-else class="flex justify-center gap-15">
        <div class="mt-[70px]">
          <pulse-loader :color="useDataStore().color" :size="useDataStore().size"></pulse-loader>
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
