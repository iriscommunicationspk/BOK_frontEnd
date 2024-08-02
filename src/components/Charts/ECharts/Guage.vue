<script setup>
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts/core'
import { GaugeChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { useDataStore } from '@/stores/data'

echarts.use([GaugeChart, CanvasRenderer])

const dataStore = useDataStore()
const data = ref(dataStore.overAll_top2 / 100)
const chartInstance = ref(null)

const createChart = () => {
  const chartDom = document.getElementById('chart')
  chartInstance.value = echarts.init(chartDom)

  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '75%'],
        radius: '90%',
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, '#FF6E76'],
              [0.5, '#FDDD60'],
              [0.75, '#58D9F9'],
              [1, '#7CFFB2']
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          length: 15,
          lineStyle: {
            color: 'auto',
            width: 6
          }
        },
        axisLabel: {
          color: '#464646',
          fontSize: 20,
          distance: -60,
          rotate: 'tangential',
          formatter: function (value) {
            if (value === 0.875) {
              return ''
            } else if (value === 0.625) {
              return ''
            } else if (value === 0.375) {
              return ''
            } else if (value === 0.125) {
              return ''
            }
            return ''
          }
        },
        title: {
          offsetCenter: [0, '-5%'],
          fontSize: 50
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, '-10%'],
          valueAnimation: true,
          formatter: function (value) {
            return Math.round(value * 100) + '%'
          },
          color: 'inherit'
        },
        data: [
          {
            value: data.value
            // name: 'Grade Rating'
          }
        ]
      }
    ]
  }

  chartInstance.value.setOption(option)
}

onMounted(createChart)

watch(
  () => dataStore.overAll_top2,
  (newValue) => {
    data.value = newValue / 100
    chartInstance.value.setOption({
      series: [
        {
          data: [
            {
              value: data.value
              // name: 'Grade Radting'
            }
          ]
        }
      ]
    })
  }
)

// Function to download data as CSV
const downloadCSV = () => {
  handleClick();
  handleAnimate();
  const csvContent = `data:text/csv;charset=utf-8,${encodeURIComponent(
    `Value\n${data.value * 100}%`
  )}`
  const link = document.createElement('a')
  link.setAttribute('href', csvContent)
  link.setAttribute('download', 'chart_data.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const handleClick = () => {
  const downloadIcon = document.querySelector(`.download-icon`)
  const downloadLoader = document.querySelector(`.download-loader`)
  const downloadText = document.querySelector(`.button-copy`)

  downloadIcon.classList.add(`hidden`)
  downloadLoader.classList.remove(`hidden`)
  downloadText.innerHTML = 'DOWNLOADING'
}

const handleAnimate = () => {
  const downloadLoader = document.querySelector(`.download-loader`)
  const downloadCheckMark = document.querySelector(`.check-svg`)
  const downloadText = document.querySelector(`.button-copy`)

  downloadLoader.classList.add(`hidden`)
  downloadCheckMark.classList.remove(`hidden`)
  downloadText.innerHTML = 'DOWNLOADED'
}
</script>

<template>
  <div id="chart" class="  " style="width: 100%; height: 400px"></div>
  <!-- <button class="border absolute top-[43rem] right-[20rem] px-5 py-1 rounded-md cursor-pointer"  >Download Data</button> -->

  <button
    @click="downloadCSV"
    class="download-button transform active:scale-95 bg-[#486189] hover:bg-[#2f4260] text-white rounded-lg font-semibold tracking-tight absolute top-[110rem] lg:top-[43rem] lg:right-[20rem] px-5 py-2"
  >
    <div class="flex justify-center items-center relative">
      <div class="svg-container">
        <!-- Download Icon -->
        <svg
          class="download-icon"
          width="12"
          height="16"
          viewBox="0 0 18 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="download-arrow"
            d="M13 9L9 13M9 13L5 9M9 13V1"
            stroke="#F2F2F2"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1 17V18C1 18.7956 1.31607 19.5587 1.87868 20.1213C2.44129 20.6839 3.20435 21 4 21H14C14.7956 21 15.5587 20.6839 16.1213 20.1213C16.6839 19.5587 17 18.7956 17 18V17"
            stroke="#F2F2F2"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div class="download-loader text-white hidden"></div>
        <!-- Checked Icon -->
        <svg
          class="check-svg hidden"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM15.1071 7.9071C15.4976 7.51658 15.4976 6.88341 15.1071 6.49289C14.7165 6.10237 14.0834 6.10237 13.6929 6.49289L8.68568 11.5001L7.10707 9.92146C6.71655 9.53094 6.08338 9.53094 5.69286 9.92146C5.30233 10.312 5.30233 10.9452 5.69286 11.3357L7.97857 13.6214C8.3691 14.0119 9.00226 14.0119 9.39279 13.6214L15.1071 7.9071Z"
            fill="white"
          />
        </svg>
      </div>
      <div class="button-copy text-[10px] pl-2 leading-none uppercase">DOWNLOAD DATA</div>
    </div>
  </button>
</template>

<!-- <style scoped>
#chart {
  /* width: 50px; */
}
</style> -->
