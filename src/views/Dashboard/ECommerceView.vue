<script setup lang="ts">
import { ref } from 'vue'
import DataStatsOne from '@/components/DataStats/DataStatsOne.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useDataStore } from '@/stores/data'
import RadialChart from '@/components/Charts/ApexCharts/RadialChart.vue'
import BarChart from '@/components/Charts/ApexCharts/BarChart.vue'
import RadialChart1 from '@/components/Charts/ApexCharts/RadialChart1.vue'
import RadialChart2 from '@/components/Charts/ApexCharts/RadialChart2.vue'
import RadialChart3 from '@/components/Charts/ApexCharts/RadialChart3.vue'
import TimelineChart from '@/components/Charts/ApexCharts/TimelineChart.vue'
import Guage from '@/components/Charts/ECharts/Guage.vue'

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
  const selects = document.querySelectorAll('select')
  selects.forEach((select) => {
    select.value = 'Choose an option'
  })
}

const setFilter = (filter: any, event: any) => {
  const value = event.target.value
  console.log(value)

  if (value === 'Deposit') {
    dataStore.setClosingAcc('')
    dataStore.setLoanService('')
    dataStore.setTransferringFund('')
    dataStore.setWithdrawal('')
    dataStore.setDeposit('Yes')
  } else if (value === 'Closing Account') {
    dataStore.setDeposit('')
    dataStore.setLoanService('')
    dataStore.setTransferringFund('')
    dataStore.setWithdrawal('')
    dataStore.setClosingAcc('Yes')
  } else if (value === 'Transferring Fund') {
    dataStore.setDeposit('')
    dataStore.setLoanService('')
    dataStore.setClosingAcc('')
    dataStore.setWithdrawal('')
    dataStore.setTransferringFund('Yes')
  } else if (value === 'Loan Service') {
    dataStore.setDeposit('')
    dataStore.setClosingAcc('')
    dataStore.setTransferringFund('')
    dataStore.setWithdrawal('')
    dataStore.setLoanService('Yes')
  } else if (value === 'Withdraw') {
    dataStore.setDeposit('')
    dataStore.setClosingAcc('')
    dataStore.setTransferringFund('')
    dataStore.setLoanService('')
    dataStore.setWithdrawal('Yes')
  } else if (filter === 'branch') {
    dataStore.setBranch(value)
    console.log('in else')
  }
}
</script>

<template>
  <DefaultLayout>
    <div class="flex justify-center gap-5 flex-wrap">
      <!-- City -->

      <div>
        <label
          for="city-filter"
          class="block text-base font-semibold text-gray-900 dark:text-white ml-2"
        >
          City
        </label>
        <select
          id="city-filter"
          class="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer mb-5 ml-2"
          @change="filterByCity"
        >
          <option selected>Choose an option</option>
          <option class="text-black font-semibold p-5 text-base" value="Lahore">Lahore</option>
          <option class="text-black font-semibold p-5 text-base" value="Karachi">Karachi</option>
          <option class="text-black font-semibold p-5 text-base" value="Islamabad">
            Islamabad
          </option>
        </select>
      </div>

      <!-- Branch -->

      <div>
        <label
          for="branch-filter"
          class="block text-base font-semibold text-gray-900 dark:text-white ml-2"
        >
          Branch
        </label>
        <select
          id="branch-filter"
          class="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer mb-5 ml-2"
          @change="setFilter('branch', $event)"
        >
          <option selected>Choose an option</option>
          <option class="text-black font-semibold p-5 text-base" value="ABCC">ABC</option>
        </select>
      </div>
      <!-- Gender -->

      <div class="w-min">
        <label
          for="gender-filter"
          class="block text-base font-semibold text-gray-900 dark:text-white ml-2"
        >
          Gender
        </label>
        <select
          id="gender-filter"
          class="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer mb-5 ml-2"
          @change="filterByGender"
        >
          <option selected>Choose an option</option>
          <option class="text-black font-semibold p-5 text-base" value="Male">Male</option>
          <option class="text-black font-semibold p-5 text-base" value="Female">Female</option>
        </select>
      </div>

      <div>
        <label
          for="customer-filter"
          class="block text-base font-semibold text-gray-900 dark:text-white ml-2"
        >
          Customer Type
        </label>
        <select
          id="customer-filter"
          class="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer mb-5 ml-2"
          @change="filterByCustomerType"
        >
          <option selected>Choose an option</option>
          <option class="text-black font-semibold p-5 text-base" value="Yes">Account Holder</option>
          <option class="text-black font-semibold p-5 text-base" value="No">
            None Account Holder
          </option>
        </select>
      </div>

      <!-- purpose of visiting -->

      <div>
        <label
          for="visiting-filter"
          class="block text-base font-semibold text-gray-900 dark:text-white ml-2"
        >
          Purpose of visiting
        </label>
        <select
          id="visiting-filter"
          class="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer mb-5 ml-2"
          @change="setFilter('deposit', $event)"
        >
          <option selected>Choose an option</option>
          <option value="Deposit" class="text-black font-semibold p-5 text-base">Deposit</option>
          <option value="Closing Account" class="text-black font-semibold p-5 text-base">
            Closing Account
          </option>
          <option value="Transferring Fund" class="text-black font-semibold p-5 text-base">
            Transferring Fund
          </option>
          <option value="Loan Service" class="text-black font-semibold p-5 text-base">
            Loan Service
          </option>
          <option value="Withdraw" class="text-black font-semibold p-5 text-base">Withdraw</option>
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
        dataStore.filters.city ||
        dataStore.filters.withdrawal
      "
      @click="filterRemoved"
      class="flex justify-end mb-7 transition-all duration-300"
    >
      <button
        class="dark:bg-[#008ffb] text-[#008ffb] dark:text-white p-2 rounded block transition-all duration-300 hover:bg-[#008ffb] dark:hover:bg-white dark:hover:text-[#008ffb] hover:text-white shadow-[0px_0px_19px_-6px_#008ffb] dark:shadow-[0px_0px_6px_1px]"
      >
        Clear Filters
      </button>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-12 2xl:gap-7.5">
      <DataStatsOne />
    </div>

    <div
      class="dark:bg-boxdark flex flex-col items-center justify-center p-6 pb-10 mt-8 bg-[#FFFFFF] shadow-[1px_2px_55px_-18px_#00008070] dark:border dark:border-strokedark rounded-lg"
    >
      <div class="-mb-12">
        <h1 class="text-[24px] text-center font-bold text-black dark:text-white mb-2 mt-4">
          Satisfaction Score with Overall Experience
        </h1>
        <h2 class="text-[22px] text-center font-bold text-black dark:text-white">
          (Top 2 Boxes Score)
        </h2>
      </div>
      <Guage />
      <div class="flex w-full gap-[20px] justify-center">
        <div class="border-r-4 border-[#c3c3c3] w-[25%]">
          <RadialChart1 />
          <span class="ml-4 font-bold text-base"> n={{ useDataStore().achieved }} </span>
        </div>
        <div class="w-[25%]">
          <RadialChart2 />
          <span class="font-bold text-base"> n={{ useDataStore().achieved }} </span>
        </div>
        <div class="border-l-4 border-[#c3c3c3] w-[25%]">
          <RadialChart3 />
          <span class="ml-4 font-bold text-base"> n={{ useDataStore().achieved }} </span>
        </div>
      </div>
    </div>

    <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <RadialChart />
      <BarChart />
    </div>

    <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <TimelineChart />
    </div>
  </DefaultLayout>
</template>
