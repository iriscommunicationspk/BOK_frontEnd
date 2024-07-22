<script setup lang="ts">
import { ref } from 'vue'
import DataStatsOne from '@/components/DataStats/DataStatsOne.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useDataStore } from '@/stores/data'
import RadialChart from '@/components/Charts/ApexCharts/RadialChart.vue'
import BarChart from '@/components/Charts/ApexCharts/BarChart.vue'
import GaugeChart from '@/components/Charts/ECharts/Guage.vue'
import RadialChart1 from '@/components/Charts/ApexCharts/RadialChart1.vue'
import RadialChart2 from '@/components/Charts/ApexCharts/RadialChart2.vue'
import RadialChart3 from '@/components/Charts/ApexCharts/RadialChart3.vue'

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
  dataStore.setCity(city === 'Choose a city' ? '' : city)
}

// Clear filters
function filterRemoved() {
  dataStore.clearFilters()
  const genderSelect = document.getElementById('gender-filter') as HTMLSelectElement
  if (genderSelect) genderSelect.value = 'Choose a gender'
  const customerSelect = document.getElementById('customer-filter') as HTMLSelectElement
  if (customerSelect) customerSelect.value = 'Choose a customer type'
}

const setFilter = (filter: any, event: any) => {
  const value = event.target.value
  if (filter === 'deposit') {
    dataStore.setDeposit(value)
  } else if (filter === 'closing_acc') {
    dataStore.setClosingAcc(value)
  } else if (filter === 'transferring_fund') {
    dataStore.setTransferringFund(value)
  } else if (filter === 'loan_service') {
    dataStore.setLoanService(value)
  } else if (filter === 'branch') {
    dataStore.setBranch(value)
    console.log('in else')
  }
}
</script>

<template>
  <DefaultLayout>
    <div class="flex justify-center gap-5 flex-wrap">
      <div class="w-min">
        <label
          for="gender-filter"
          class="block text-sm font-medium text-gray-900 dark:text-white ml-2"
        >
          Filter by Gender
        </label>
        <select
          id="gender-filter"
          class="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer mb-5 ml-2"
          @change="filterByGender"
        >
          <option selected>Choose an option</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div>
        <label
          for="customer-filter"
          class="block text-sm font-medium text-gray-900 dark:text-white ml-2"
        >
          Filter by Customer Type
        </label>
        <select
          id="customer-filter"
          class="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer mb-5 ml-2"
          @change="filterByCustomerType"
        >
          <option selected>Choose an option</option>
          <option value="Yes">Account Holder</option>
          <option value="No">None Account Holder</option>
        </select>
      </div>

      <div>
        <label
          for="city-filter"
          class="block text-sm font-medium text-gray-900 dark:text-white ml-2"
        >
          Filter by City
        </label>
        <select
          id="city-filter"
          class="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer mb-5 ml-2"
          @change="filterByCity"
        >
          <option selected>Choose an option</option>
          <option value="Lahore">Lahore</option>
          <option value="Karachi">Karachi</option>
          <option value="Islamabad">Islamabad</option>
        </select>
      </div>

      <!-- purpose of visiting -->
      <div>
        <label
          for="deposit-filter"
          class="block text-sm font-medium text-gray-900 dark:text-white ml-2"
        >
          Filter by Deposit
        </label>
        <select
          id="deposit-filter"
          class="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer mb-5 ml-2"
          @change="setFilter('deposit', $event)"
        >
          <option selected>Choose an option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div>
        <label
          for="closing-acc-filter"
          class="blocktext-sm font-medium text-gray-900 dark:text-white ml-2"
        >
          Filter by Closing Account
        </label>
        <select
          id="closing-acc-filter"
          class="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer mb-5 ml-2"
          @change="setFilter('closing_acc', $event)"
        >
          <option selected>Choose an option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div>
        <label
          for="transferring-fund-filter"
          class="block text-sm font-medium text-gray-900 dark:text-white ml-2"
        >
          Filter by Transferring Fund
        </label>
        <select
          id="transferring-fund-filter"
          class="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer mb-5 ml-2"
          @change="setFilter('transferring_fund', $event)"
        >
          <option selected>Choose an option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div>
        <label
          for="loan-service-filter"
          class="block text-sm font-medium text-gray-900 dark:text-white ml-2"
        >
          Filter by Loan Service
        </label>
        <select
          id="loan-service-filter"
          class="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer mb-5 ml-2"
          @change="setFilter('loan_service', $event)"
        >
          <option selected>Choose an option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div>
        <label
          for="branch-filter"
          class="block text-sm font-medium text-gray-900 dark:text-white ml-2"
        >
          Filter by branch
        </label>
        <select
          id="branch-filter"
          class="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer mb-5 ml-2"
          @change="setFilter('branch', $event)"
        >
          <option selected>Choose an option</option>
          <option value="ABCC">ABC</option>
        </select>
      </div>
    </div>

    <div
      v-if="
        dataStore.filters.gender ||
        dataStore.filters.customerType ||
        dataStore.filters.branch ||
        dataStore.filters.deposit ||
        dataStore.filters.closing_acc ||
        dataStore.filters.transferring_fund ||
        dataStore.filters.loan_service ||
        dataStore.filters.city
      "
      @click="filterRemoved"
      class="flex justify-end mb-7 transition-all duration-300"
    >
      <button
        class="dark:bg-red text-red dark:text-white p-2 rounded block transition-all duration-300 hover:bg-red dark:hover:bg-white dark:hover:text-red hover:text-white shadow-[0px_0px_6px_1px_red] dark:shadow-[0px_0px_6px_1px]"
      >
        Clear Filters
      </button>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-12 2xl:gap-7.5">
      <DataStatsOne />
    </div>

    <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <RadialChart />
      <BarChart />
    </div>

    <div
      class="dark:bg-boxdark flex flex-col items-center justify-center p-6 xl:w-[70%] pb-10 mt-8 bg-[#FFFFFF] shadow-[1px_2px_55px_-18px_#00008070] dark:border dark:border-strokedark"
    >
      <div class="-mb-12">
        <h1 class="text-xl font-bold text-black dark:text-white text-center">Satisfaction Score with Overall Experience</h1>
        <h2 class="text-xl font-bold text-black dark:text-white text-center">(Top 2 Boxes Score)</h2>
      </div>
      <GaugeChart />
      <div class="flex gap-8">
        <div class=""><RadialChart1/></div>
        <div class=""><RadialChart2/></div>
        <div class=""><RadialChart3/></div>
      </div>
    </div>
  </DefaultLayout>
</template>
