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
              // name: 'Grade Rating'
            }
          ]
        }
      ]
    })
  }
)
</script>

<template>
  <div id="chart" class="  " style="width: 100%; height: 400px"></div>
</template>

<!-- <style scoped>
#chart {
  /* width: 50px; */
}
</style> -->
