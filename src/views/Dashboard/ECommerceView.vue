<script setup lang="ts">
import DataStatsOne from '@/components/DataStats/DataStatsOne.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useDataStore } from '@/stores/data'
import RadialChart1 from '@/components/Charts/ApexCharts/RadialChart1.vue'
import RadialChart2 from '@/components/Charts/ApexCharts/RadialChart2.vue'
import RadialChart3 from '@/components/Charts/ApexCharts/RadialChart3.vue'
import CustomDropdown from '@/components/DropDown/DropDown.vue'
import { ref } from 'vue'
import RadialChart4 from '@/components/Charts/ApexCharts/RadialChart4.vue'
import RadialChart5 from '@/components/Charts/ApexCharts/RadialChart5.vue'
import RadialChart6 from '@/components/Charts/ApexCharts/RadialChart6.vue'
import RadialChart7 from '@/components/Charts/ApexCharts/RadialChart7.vue'
import { useBigData } from '@/stores/bigData'

const dataStore = useDataStore()
const bigDataStore = useBigData()

dataStore.fetchData() // Fetch and initialize data

const province = ref('Choose a province')
const city = ref('Choose a city')
const branch = ref('Choose a branch')
const branchType = ref('Choose a branch type')
const scenario = ref('Choose a scenario')

// Filters for province
function filterByProvince(selectedProvince: string) {
  console.log(selectedProvince)

  const provinceValue = selectedProvince === 'Choose a province' ? '' : selectedProvince
  dataStore.setProvince(provinceValue)
}

// Filters for city
function setFilter(filter: string, value: string) {
  if (filter === 'city') {
    const cityValue = value === 'Choose a city' ? '' : value
    dataStore.setCity(cityValue)
  }
}

//filter by branch
function filterByBranch(selectedBranch: string) {
  const branchValue = selectedBranch === 'Choose a branch' ? '' : selectedBranch
  dataStore.setBranch(branchValue)
}

// Filters for branch type
function filterByCityBranchType(selectedBranchType: string) {
  const branchTypeValue = selectedBranchType === 'Choose a branch type' ? '' : selectedBranchType
  dataStore.setBranchType(branchTypeValue)
}

// Filters for scenario
function filterByScenario(selectedScenario: string) {
  const scenarioValue = selectedScenario === 'Choose a scenario' ? '' : selectedScenario
  dataStore.setScenario(scenarioValue)
}

// Clear all filters
function filterRemoved() {
  province.value = 'Choose a province'
  city.value = 'Choose a city'
  branch.value = 'Choose a branch'
  branchType.value = 'Choose a branch type'
  scenario.value = 'Choose a scenario'

  dataStore.clearFilters()
}
</script>

<template>
  <DefaultLayout>
    <div>
      <div class="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 justify-between gap-1 flex-wrap">
        <div>
          <label
            for="province-filter"
            class="block text-base font-bold text-[#1e1e2c] dark:text-white ml-2"
          >
            Province
          </label>
          <CustomDropdown
            :options="[
              'AJK',
              'Balochistan',
              'Capital Territory',
              'FATA',
              'Gilgit',
              'Islamabad',
              'Khyber Pakhtunkhwa',
              'Punjab',
              'Sindh'
            ]"
            placeholder="Choose a province"
            v-model="province"
            @update:modelValue="filterByProvince"
          />
        </div>
        <div>
          <div>
            <label
              for="city-filter"
              class="block text-base font-bold text-[#1e1e2c] dark:text-white ml-2"
            >
              City
            </label>
            <CustomDropdown
              :options="useBigData().cities.map((city) => city.name)"
              placeholder="Choose a city"
              v-model="city"
              @update:modelValue="(value) => setFilter('city', value)"
            />
          </div>
        </div>
        <div>
          <div>
            <label
              for="branch-filter"
              class="block text-base font-bold text-[#1e1e2c] dark:text-white ml-2"
            >
              Branch
            </label>
            <CustomDropdown
              :options="useBigData().branches.map((branch) => branch.name)"
              placeholder="Choose a branch"
              v-model="branch"
              @update:modelValue="filterByBranch"
            />
          </div>
        </div>
        <div>
          <label
            for="Branch-type-filter"
            class="block text-base font-bold text-[#1e1e2c] dark:text-white ml-2"
          >
            Branch Type
          </label>
          <CustomDropdown
            :options="['Conventional', 'Islamic Banking']"
            placeholder="Choose a branch type"
            v-model="branchType"
            @update:modelValue="filterByCityBranchType"
          />
        </div>

        <div>
          <label
            for="scenario-filter"
            class="block text-base font-bold text-[#1e1e2c] dark:text-white ml-2"
          >
            Scenarios
          </label>
          <CustomDropdown
            :options="useBigData().scenarios.map((scenario) => scenario.name)"
            placeholder="Choose a scenario"
            v-model="scenario"
            @update:modelValue="filterByScenario"
          />
        </div>
      </div>

      <div class="flex justify-end mb-7 mt-7">
        <Transition name="bounce">
          <button
            v-if="
              dataStore.filter.province ||
              dataStore.filter.city ||
              dataStore.filter.branch ||
              dataStore.filter.branch_type ||
              dataStore.filter.scenario
            "
            @click="filterRemoved"
            class="text-[#F29F67] py-2 px-5 rounded-md block transition-all duration-300 hover:bg-[#F29F67] hover:text-[#1e1e2c] border-2 border-[#F29F67]"
          >
            <span> Clear Filters </span>
            <span> </span>
          </button>
        </Transition>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-12 2xl:gap-7.5">
        <DataStatsOne />
      </div>
      <div class="mt-10">
        <RadialChart1 />
      </div>
      <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 bg-white">
        <!-- <GradientPirChart /> -->
        <RadialChart2 />
        <RadialChart3 />
        <RadialChart4 />

        <!-- <BarChart /> -->
      </div>
      <div class="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 bg-white">
        <!-- <GradientPirChart /> -->
        <RadialChart5 />
        <RadialChart6 />
        <RadialChart7 />
        <!-- <BarChart /> -->
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
