<script setup lang="ts">
import DataStatsOne from '@/components/DataStats/DataStatsOne.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useDataStore } from '@/stores/data'
import BarChart from '@/components/Charts/ApexCharts/BarChart.vue'
import RadialChart1 from '@/components/Charts/ApexCharts/RadialChart1.vue'
import RadialChart2 from '@/components/Charts/ApexCharts/RadialChart2.vue'
import RadialChart3 from '@/components/Charts/ApexCharts/RadialChart3.vue'
import TimelineChart from '@/components/Charts/ApexCharts/TimelineChart.vue'
import Guage from '@/components/Charts/ECharts/Guage.vue'
import GradientPirChart from '@/components/Charts/ApexCharts/GradientPirChart.vue'
import CustomDropdown from '@/components/DropDown/DropDown.vue'
import { ref } from 'vue'
import VBarChart from '@/components/Charts/ApexCharts/VBarChart.vue'


const dataStore = useDataStore()
dataStore.fetchData() // Fetch and initialize data

const city = ref('Choose a city')
const branch = ref('Choose a branch')
const gender = ref('Choose a gender')
const customerType = ref('Choose a customer type')
const purposeOfVisit = ref('Choose a purpose of visit')

const selectedCity = ref('')
const selectedBranch = ref('')

function filterByCity(city: string) {
  dataStore.setCity(city === 'Choose a city' ? '' : city)
  selectedCity.value = city
}

function filterByGender(gender: string) {
  dataStore.setGender(gender === 'Choose a gender' ? '' : gender)
}

function filterByCustomerType(customerType: string) {
  dataStore.setCustomerType(customerType === 'Choose a customer type' ? '' : customerType)
}

function setFilter(filter: string, value: string) {
  if (value === 'Depositing money') {
    dataStore.setClosingAcc('')
    dataStore.setLoanService('')
    dataStore.setTransferringFund('')
    dataStore.setWithdrawal('')
    dataStore.setPaymentDues('')
    dataStore.setChequeDeposit('')
    dataStore.setDeposit('Yes')
  } else if (value === 'Payments of bills/dues') {
    dataStore.setDeposit('')
    dataStore.setLoanService('')
    dataStore.setTransferringFund('')
    dataStore.setWithdrawal('')
    dataStore.setClosingAcc('')
    dataStore.setChequeDeposit('')
    dataStore.setPaymentDues('Yes')
  } else if (value === 'Transferring funds') {
    dataStore.setDeposit('')
    dataStore.setLoanService('')
    dataStore.setClosingAcc('')
    dataStore.setWithdrawal('')
    dataStore.setPaymentDues('')
    dataStore.setChequeDeposit('')
    dataStore.setTransferringFund('Yes')
  } else if (value === 'Cheque deposit') {
    dataStore.setDeposit('')
    dataStore.setClosingAcc('')
    dataStore.setTransferringFund('')
    dataStore.setWithdrawal('')
    dataStore.setPaymentDues('')
    dataStore.setLoanService('')
    dataStore.setChequeDeposit('Yes')
  } else if (value === 'Withdrawing money') {
    dataStore.setDeposit('')
    dataStore.setClosingAcc('')
    dataStore.setTransferringFund('')
    dataStore.setLoanService('')
    dataStore.setPaymentDues('')
    dataStore.setChequeDeposit('')
    dataStore.setWithdrawal('Yes')
  } else if (filter === 'branch') {
    dataStore.setBranch(value)
    selectedBranch.value = value
  }
}

// function filterRemoved() {
//   dataStore.clearFilters()
// }

// Clear filters
function filterRemoved() {
  selectedBranch.value = ''
  selectedCity.value = ''
  dataStore.clearFilters()
  city.value = 'Choose a city'
  branch.value = 'Choose a branch'
  gender.value = 'Choose a gender'
  customerType.value = 'Choose a customer type'
  purposeOfVisit.value = 'Choose a purpose of visit'
}
</script>

<template>
  <DefaultLayout>
    <div>
      <div class="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 justify-between gap-2 flex-wrap">
        <div v-if="selectedBranch === 'Z Block DHA Phase III, Lahore'">
          <label
            for="city-filter"
            class="block text-base font-bold text-gray-900 dark:text-white ml-2"
          >
            City
          </label>
          <CustomDropdown
            :options="['Lahore']"
            placeholder="Choose a city"
            v-model="city"
            @update:modelValue="filterByCity"
          />
        </div>
        <div v-else-if="selectedBranch === 'Shahrah-e-Faisal, Karachi'">
          <label
            for="city-filter"
            class="block text-base font-bold text-gray-900 dark:text-white ml-2"
          >
            City
          </label>
          <CustomDropdown
            :options="['Karachi']"
            placeholder="Choose a city"
            v-model="city"
            @update:modelValue="filterByCity"
          />
        </div>
        <div v-else-if="selectedBranch === 'I-10 Markaz, Islamabad'">
          <label
            for="city-filter"
            class="block text-base font-bold text-gray-900 dark:text-white ml-2"
          >
            City
          </label>
          <CustomDropdown
            :options="['Islamabad']"
            placeholder="Choose a city"
            v-model="city"
            @update:modelValue="filterByCity"
          />
        </div>
        <div v-else>
          <label
            for="city-filter"
            class="block text-base font-bold text-gray-900 dark:text-white ml-2"
          >
            City
          </label>
          <CustomDropdown
            :options="['Lahore', 'Karachi', 'Islamabad']"
            placeholder="Choose a city"
            v-model="city"
            @update:modelValue="filterByCity"
          />
        </div>

        <div>
          <div v-if="selectedCity === 'Karachi'">
            <label
              for="branch-filter"
              class="block text-base font-bold text-gray-900 dark:text-white ml-2"
            >
              Branch
            </label>
            <CustomDropdown
              :options="['Shahrah-e-Faisal, Karachi']"
              placeholder="Choose a branch"
              v-model="branch"
              @update:modelValue="(value) => setFilter('branch', value)"
            />
          </div>
          <div v-else-if="selectedCity === 'Lahore'">
            <label
              for="branch-filter"
              class="block text-base font-bold text-gray-900 dark:text-white ml-2"
            >
              Branch
            </label>
            <CustomDropdown
              :options="['Z Block DHA Phase III, Lahore']"
              placeholder="Choose a branch"
              v-model="branch"
              @update:modelValue="(value) => setFilter('branch', value)"
            />
          </div>
          <div v-else-if="selectedCity === 'Islamabad'">
            <label
              for="branch-filter"
              class="block text-base font-bold text-gray-900 dark:text-white ml-2"
            >
              Branch
            </label>
            <CustomDropdown
              :options="['I-10 Markaz, Islamabad']"
              placeholder="Choose a branch"
              v-model="branch"
              @update:modelValue="(value) => setFilter('branch', value)"
            />
          </div>
          <div v-else>
            <label
              for="branch-filter"
              class="block text-base font-bold text-gray-900 dark:text-white ml-2"
            >
              Branch
            </label>
            <CustomDropdown
              :options="[
                'Shahrah-e-Faisal, Karachi',
                'Z Block DHA Phase III, Lahore',
                'I-10 Markaz, Islamabad'
              ]"
              placeholder="Choose a branch"
              v-model="branch"
              @update:modelValue="(value) => setFilter('branch', value)"
            />
          </div>
        </div>

        <div>
          <label
            for="gender-filter"
            class="block text-base font-bold text-gray-900 dark:text-white ml-2"
          >
            Gender
          </label>
          <CustomDropdown
            :options="['Male', 'Female']"
            placeholder="Choose a gender"
            v-model="gender"
            @update:modelValue="filterByGender"
          />
        </div>

        <div>
          <label
            for="customer-filter"
            class="block text-base font-bold text-gray-900 dark:text-white ml-2"
          >
            BAFL Customer Type
          </label>
          <CustomDropdown
            :options="['Account Holder of BAFL', 'Non-Account Holder of BAFL']"
            placeholder="Choose a customer type"
            v-model="customerType"
            @update:modelValue="filterByCustomerType"
          />
        </div>

        <div>
          <label
            for="visiting-filter"
            class="block text-base font-bold text-gray-900 dark:text-white ml-2"
          >
            Purpose of Visit
          </label>
          <CustomDropdown
            :options="[
              'Depositing money',
              'Withdrawing money',
              'Payments of bills/dues',
              'Cheque deposit',
              'Transferring funds'
            ]"
            placeholder="Choose a purpose of visit"
            v-model="purposeOfVisit"
            @update:modelValue="(value) => setFilter('deposit', value)"
          />
        </div>
      </div>

      <div class="flex justify-end mb-7 mt-7">
        <Transition name="bounce">
          <button
            v-if="
              dataStore.filters.gender ||
              dataStore.filters.customerType ||
              dataStore.filters.branch ||
              dataStore.filters.deposit ||
              dataStore.filters.cheque_deposit ||
              dataStore.filters.transferring_fund ||
              dataStore.filters.payment_dues ||
              dataStore.filters.city ||
              dataStore.filters.withdrawal
            "
            @click="filterRemoved"
            class="dark:bg-[#008ffb] text-[#455984] dark:text-white py-2 px-5 rounded-md block transition-all duration-300 hover:bg-[#455984] dark:hover:bg-white dark:hover:text-[#008ffb] hover:text-white border-2 border-[#455984]"
          >
            Clear Filters
          </button>
        </Transition>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-12 2xl:gap-7.5">
        <DataStatsOne />
      </div>
      <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <GradientPirChart />
        <BarChart />
      </div>
      <div
        class="relative dark:bg-boxdark flex flex-col items-center justify-center p-6 pb-10 mt-8 bg-[#FFFFFF] shadow-[1px_2px_55px_-18px_#00008070] dark:border dark:border-strokedark rounded-lg min-h-[45rem]"
      >
        <div class="-mb-12">
          <h1 class="text-[22px] text-center font-extrabold text-black dark:text-white mb-2 mt-4">
            Satisfaction Score with Overall Experience
          </h1>
          <h2 class="text-[20px] text-center font-extrabold text-black dark:text-white">
            (Top 2 Boxes Score)
          </h2>
        </div>
        <Guage />
        <div>
          <span
            class="ml-4 font-bold text-[14px] text-black/40 dark:text-white absolute top-[23.5rem] right-[28rem]"
          >
            n={{ useDataStore().achieved }}
          </span>
        </div>
        <div class="flex flex-col lg:flex-row w-full justify-around items-center gap-10 lg:gap-0">
          <div class="border-[#c3c3c3] lg:w-[25%]">
            <RadialChart1 />
          </div>
          <div class="w-[30%]">
            <RadialChart2 />
          </div>
          <div class="border-[#c3c3c3] lg:w-[25%]">
            <RadialChart3 />
          </div>
        </div>
      </div>
      <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <VBarChart />
        <TimelineChart />
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}
</style>
