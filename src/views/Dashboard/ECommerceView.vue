<script setup lang="ts">
import { ref } from 'vue'
import DataStatsOne from '@/components/DataStats/DataStatsOne.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useDataStore } from '@/stores/data'
import RadialChart from '@/components/Charts/ApexCharts/RadialChart.vue'
import BarChart from '@/components/Charts/ApexCharts/BarChart.vue'

const dataStore = useDataStore()
dataStore.fetchData() // Fetch and initialize data

// Filter by gender
function filterByGender(event: Event) {
  const target = event.target as HTMLSelectElement
  const gender = target.value
  dataStore.setGender(gender === 'Choose a gender' ? '' : gender)
}

// Filter by customer type
function filterByCustomerType(event: Event) {
  const target = event.target as HTMLSelectElement
  const customer = target.value
  dataStore.setCustomerType(customer === 'Choose a customer type' ? '' : customer)
}

function filterByCity(event: Event) {
  const target = event.target as HTMLSelectElement
  const city = target.value
  dataStore.setcity(city === 'Choose a city' ? '' : city)
}

// Clear filters
function filterRemoved() {
  dataStore.clearFilters()
  const genderSelect = document.getElementById('gender-filter') as HTMLSelectElement
  if (genderSelect) genderSelect.value = 'Choose a gender'
  const customerSelect = document.getElementById('customer-filter') as HTMLSelectElement
  if (customerSelect) customerSelect.value = 'Choose a customer type'
}
</script>

<template>
  <DefaultLayout>
    <div class="flex justify-center gap-5">
      <div class="w-min">
        <label
          for="gender-filter"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-2"
        >
          Filter by Gender
        </label>
        <select
          id="gender-filter"
          class="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer mb-5 ml-2"
          @change="filterByGender"
        >
          <option selected>Choose a gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div>
        <label
          for="customer-filter"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-2"
        >
          Filter by Customer Type
        </label>
        <select
          id="customer-filter"
          class="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer mb-5 ml-2"
          @change="filterByCustomerType"
        >
          <option selected>Choose a customer type</option>
          <option value="Yes">Account Holder</option>
          <option value="No">None Account Holder</option>
        </select>
      </div>

      <div>
        <label
          for="city-filter"
          class="block mb-4 text-sm font-medium text-gray-900 dark:text-white ml-2"
        >
          Filter by City
        </label>
        <select
          id="city-filter"
          class="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer mb-5 ml-2"
          @change="filterByCity"
        >
          <option selected>Choose a city</option>
          <option value="Lahore">Lahore</option>
          <option value="Karachi">Karachi</option>
          <option value="Islamabad">Islamabad</option>
        </select>
      </div>
    </div>

    <div v-if="dataStore.filters.gender || dataStore.filters.customerType" @click="filterRemoved">
      <button class="border dark:bg-red-500 dark:text-white p-2 rounded block absolute top-[117px] right-[45px]">Clear Filters ^</button>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <DataStatsOne />
    </div>

    <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <RadialChart />
      <BarChart />
    </div>
  </DefaultLayout>
</template>
