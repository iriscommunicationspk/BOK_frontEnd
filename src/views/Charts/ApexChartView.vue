<script setup lang="ts">
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
// import ChartOne from '@/components/Charts/ChartOne.vue'
// import ChartThree from '@/components/Charts/ChartThree.vue'
// import ChartTwo from '@/components/Charts/ChartTwo.vue'
// import ChartFour from '@/components/Charts/ChartFour.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TreeMap from '@/components/Charts/ApexCharts/TreeMap.vue'
import SlopeChart from '@/components/Charts/ApexCharts/SlopeChart.vue'
import HeapChart from '@/components/Charts/ApexCharts/HeapChart.vue'
import ScatterChart from '@/components/Charts/ApexCharts/ScatterChart.vue'
import SimplePieChart from '@/components/Charts/ApexCharts/SimplePieChart.vue'
import GradientPirChart from '@/components/Charts/ApexCharts/GradientPirChart.vue'
import ImagePieChart from '@/components/Charts/ApexCharts/ImagePieChart.vue'
import BarChart from '@/components/Charts/ApexCharts/BarChart.vue'
import AreaChart from '@/components/Charts/ApexCharts/AreaChart.vue'
import TimelineChart from '@/components/Charts/ApexCharts/TimelineChart.vue'
import GaugeChart from '@/components/Charts/ECharts/Guage.vue'

import { ref } from 'vue'

const pageTitle = ref('Apex Chart')
</script>

<template>
  <DefaultLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->

    <!-- Gauge Chart -->
    <GaugeChart />
    <!-- end -->      
    <div class="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">

      <!-- tree map 1-->
      <TreeMap />
      <!-- end -->

      <!-- Heap map -->
      <HeapChart />
      <!-- end -->
      <!-- Bar Chart -->
      <BarChart />
      <!-- end -->

      <!-- scatter chart -->
      <ScatterChart />
      <!-- end -->

      <!-- Slope Map -->
      <SlopeChart />
      <!-- end -->

      <!-- Simple Pie Chart -->
      <SimplePieChart />
      <!-- end -->

      <!-- Gradient Pie Chart -->
      <GradientPirChart />
      <!-- end -->

      <!-- Image Pie Chart -->
      <ImagePieChart />
      <!-- end -->

      <!-- Area Chart -->
      <AreaChart />
      <!-- end -->

      <!-- Timeline Chart -->
      <TimelineChart />
      <!-- end -->
    </div>

    <div class="flex justify-center mt-9">
      <a
        href="https://apexcharts.com/vue-chart-demos/"
        class="rounded-md bg-primary py-2 px-8 font-medium text-white hover:bg-opacity-90"
        >Click here for more Apex charts</a
      >
    </div>
  </DefaultLayout>
</template>
