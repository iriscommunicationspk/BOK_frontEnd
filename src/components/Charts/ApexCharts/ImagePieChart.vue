<script setup lang="ts">
import { ref } from 'vue'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'

const chart = ref(null)

const data = {
  series: [44, 33, 54, 45],
  chartOptions: {
    chart: {
      width: 380,
      type: 'pie'
    },
    colors: ['#93C3EE', '#E5C6A0', '#669DB5', '#94A74A'],
    fill: {
      type: 'image',
      opacity: 0.85,
      image: {
        src: [
          'https://t4.ftcdn.net/jpg/06/64/64/89/360_F_664648985_woYmnQppBSPoI4VdhlXs21omXrw7dPZ1.jpg',
          'https://www.befunky.com/images/prismic/82e0e255-17f9-41e0-85f1-210163b0ea34_hero-blur-image-3.jpg?auto=avif,webp&format=jpg&width=896',
          'https://t4.ftcdn.net/jpg/06/64/64/89/360_F_664648985_woYmnQppBSPoI4VdhlXs21omXrw7dPZ1.jpg',
          'https://www.befunky.com/images/prismic/82e0e255-17f9-41e0-85f1-210163b0ea34_hero-blur-image-3.jpg?auto=avif,webp&format=jpg&width=896'
        ],
        width: 25,
        imagedHeight: 25
      }
    },
    stroke: {
      width: 4
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#111']
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        borderWidth: 0
      }
    },
    responsive: [
      {
        breakpoint: 480,
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
}
</script>

<template>
  <div
    class="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4"
  >
    <div class="mb-3 justify-between gap-4 sm:flex">
      <div>
        <h4 class="text-xl font-bold text-black dark:text-white">Image Pie-Chart Analytics</h4>
      </div>
    </div>
    <div class="mb-2">
      <div id="TreeMap" class="mx-auto flex justify-center">
        <VueApexCharts
          type="pie"
          width="380"
          :options="data.chartOptions"
          :series="data.series"
          ref="chart"
        />
      </div>
    </div>
  </div>
</template>
