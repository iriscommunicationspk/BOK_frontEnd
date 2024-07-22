<script setup>
import { ref, onMounted } from 'vue'
import { Gauge } from '@antv/g2plot'
import { Download } from 'lucide-vue-next'
import { chart } from '@/stores/chart'
const gaugeInstance = ref(null)

onMounted(() => {
  const gauge = new Gauge('container', {
    percent: 0.75,
    range: {
      color: 'l(0) 0:#3b4bc4 1:#e24966'
    },
    startAngle: Math.PI,
    endAngle: 2 * Math.PI,
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0'
        }
      },
      pin: {
        style: {
          stroke: '#D0D0D0'
        }
      }
    },
    statistic: {
      title: {
        style: {
          fontSize: '40px',
          color: '#e24966',
          fontWeight: 'bold'
        },
        formatter: () => '70'
      },
      content: {
        style: {
          fontSize: '14px',
          lineHeight: '80px',
          color: '#4B535E'
        },
        formatter: () => 'Home Value'
      }
    }
  })

  gauge.render()
  gaugeInstance.value = gauge
})
</script>

<template>
  <div class="border-b border-gray-300 flex justify-between items-center py-3 px-2.5 mb-4">
    <h3 class="flex items-center gap-4 text-3xl font-semibold">
      Score <span class="text-sm font-normal">(Home Price Forecast)</span>
    </h3>
    <button
      class="transition duration-200 border shadow-sm inline-flex items-center justify-center font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed border-[#625e87] dark:border-[#625e87] bg-[#605b7f] border-none text-white text-sm px-2 gap-2 py-2"
    >
      <Download class="text-white w-4 h-4" />
      <span>Report</span>
    </button>
  </div>
  <div :key="chart().iid" id="container"></div>
  <div class="pt-[100px] px-[30px]">
    <div class="mb-8">
      <div class="flex items-start">
        <h3 class="text-xl font-semibold mb-4">Long Term Appreciation</h3>
      </div>
      <div class="h-[7px] w-full bg-gray-300 rounded-full relative">
        <div class="h-[7px] bg-black rounded-full w-[35.2941%]"></div>
        <div
          class="flex text-lg flex-row justify-center items-center absolute w-[38px] h-[38px] bg-black rounded-full border-[3px] border-white text-white font-medium"
          style="top: -16px; left: calc(35.2941% - 17.5px)"
        >
          35
        </div>
      </div>
    </div>
    <div class="mb-8">
      <div class="flex items-start">
        <h3 class="text-xl font-semibold mb-4">Wealth/Income</h3>
      </div>
      <div class="h-[7px] w-full bg-gray-300 rounded-full relative">
        <div class="h-[7px] bg-black rounded-full w-[58.473%]"></div>
        <div
          class="flex text-lg flex-row justify-center items-center absolute w-[38px] h-[38px] bg-black rounded-full border-[3px] border-white text-white font-medium"
          style="top: -16px; left: calc(58.473% - 17.5px)"
        >
          58
        </div>
      </div>
    </div>
    <div class="mb-8">
      <div class="flex items-start">
        <h3 class="text-xl font-semibold mb-4">Demographic Growth</h3>
      </div>
      <div class="h-[7px] w-full bg-gray-300 rounded-full relative">
        <div class="h-[7px] bg-black rounded-full w-[42%]"></div>
        <div
          class="flex text-lg flex-row justify-center items-center absolute w-[38px] h-[38px] bg-black rounded-full border-[3px] border-white text-white font-medium"
          style="top: -16px; left: calc(42% - 17.5px)"
        >
          42
        </div>
      </div>
    </div>
    <div class="mb-8">
      <div class="flex items-start">
        <h3 class="text-xl font-semibold mb-4">Affordability</h3>
      </div>
      <div class="h-[7px] w-full bg-gray-300 rounded-full relative">
        <div class="h-[7px] bg-black rounded-full w-[88%]"></div>
        <div
          class="flex text-lg flex-row justify-center items-center absolute w-[38px] h-[38px] bg-black rounded-full border-[3px] border-white text-white font-medium"
          style="top: -16px; left: calc(88% - 17.5px)"
        >
          88
        </div>
      </div>
    </div>
  </div>
</template>
