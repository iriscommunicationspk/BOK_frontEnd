import { defineStore } from 'pinia'
import axios from 'axios'
import { useBigData } from './bigData'

interface DataItem {
  overall: number
  overAllScore: number
  section_1_branch_exterior: number
  section_2_branch_internal: number
  section_3_customer_services: number
  section_4_product_knowledge: number
  section_5_cash_counter_services: number
  section_6_atm_services: number
  province_codes: string
  city_codes: string
  branch_type_code: string
  code_scenarios: string
}

export const useDataStore = defineStore({
  id: 'data',
  state: () => ({
    loader: true,
    total_sample: 235,
    achieved: 0,
    islamic_count: 0,
    conventional_count: 0,
    overAllScore: 0,
    branch_exterior_overAllScore: 0,
    branch_interior_overAllScore: 0,
    customer_service_overAllScore: 0,
    product_knowledge_overAllScore: 0,
    cash_counter_overAllScore: 0,
    atm_services_overAllScore: 0,
    filter: {
      province: '',
      city: '',
      branch_type: '',
      scenario: ''
    },
    provinceMapping: {
      AJK: '1',
      Balochistan: '2',
      'Capital Territory': '3',
      FATA: '4',
      Gilgit: '5',
      Islamabad: '6',
      'Khyber Pakhtunkhwa': '7',
      Punjab: '8',
      Sindh: '9'
    } as any,
    data: [] as DataItem[],
    originalData: [] as DataItem[],
    filteredData: [] as DataItem[]
  }),
  actions: {
    async fetchData() {
      try {
        this.loader = true
        const response = await axios.get(`${import.meta.env.VITE_APP_ENDPOINT}api/raw`)
        this.data = response.data.data
        this.originalData = [...response.data.data]
        this.achieved = response.data.count
        this.filteredData = this.data // Initialize filteredData with all data

        this.calculateOverAllScore()
        this.applyFilters() // Apply filters after fetching data
        // this.calculateOverAllScore();
        this.loader = false
      } catch (error) {
        this.loader = false
        console.error('Error fetching data:', error)
      }
    },
    calculateOverAllScore() {
      this.filteredData.forEach((item: any) => {
        //first change the item.overall from string to number
        item.overall = Number(item.overall)
        this.overAllScore = this.overAllScore + item.overall

        item.section_1_branch_exterior = Number(item.section_1_branch_exterior)
        this.branch_exterior_overAllScore =
          this.branch_exterior_overAllScore + item.section_1_branch_exterior

        item.section_2_branch_internal = Number(item.section_2_branch_internal)
        this.branch_interior_overAllScore =
          this.branch_interior_overAllScore + item.section_2_branch_internal

        item.section_3_customer_services = Number(item.section_3_customer_services)
        this.customer_service_overAllScore =
          this.customer_service_overAllScore + item.section_3_customer_services

        item.section_4_product_knowledge = Number(item.section_4_product_knowledge)
        this.product_knowledge_overAllScore =
          this.product_knowledge_overAllScore + item.section_4_product_knowledge

        item.section_5_cash_counter_services = Number(item.section_5_cash_counter_services)
        this.cash_counter_overAllScore =
          this.cash_counter_overAllScore + item.section_5_cash_counter_services

        item.section_6_atm_services = Number(item.section_6_atm_services)
        this.atm_services_overAllScore =
          this.atm_services_overAllScore + item.section_6_atm_services
      })

      this.overAllScore = Math.round((this.overAllScore / this.achieved) * 100)
      this.branch_exterior_overAllScore = Math.round(
        (this.branch_exterior_overAllScore / this.achieved) * 100
      )
      this.branch_interior_overAllScore = Math.round(
        (this.branch_interior_overAllScore / this.achieved) * 100
      )
      this.customer_service_overAllScore = Math.round(
        (this.customer_service_overAllScore / this.achieved) * 100
      )
      this.product_knowledge_overAllScore = Math.round(
        (this.product_knowledge_overAllScore / this.achieved) * 100
      )
      this.cash_counter_overAllScore = Math.round(
        (this.cash_counter_overAllScore / this.achieved) * 100
      )
      this.atm_services_overAllScore = Math.round(
        (this.atm_services_overAllScore / this.achieved) * 100
      )
    },
    applyFilters() {
      let filtered = [...this.originalData]

      if (this.filter.province) {
        const provinceCode = this.provinceMapping[this.filter.province]

        // Correctly filter the province
        filtered = filtered.filter((item) => {
          return item.province_codes === provinceCode
        })
      }

      if (this.filter.city) {
        const cityCode = useBigData().cities.find((city) => city.name === this.filter.city)?.code

        // Correctly filter the city
        filtered = filtered.filter((item) => {
          return Number(item.city_codes) === cityCode
        })
        // filtered = filtered.filter((item) => item.city_codes === this.filter.city);
      }

      if (this.filter.branch_type) {    
        const branchTypeCode = useBigData().branch_type.find((branchType) => branchType.name === this.filter.branch_type)?.code
        filtered = filtered.filter((item) => Number(item.branch_type_code) === branchTypeCode)
      }

      if (this.filter.scenario) {
        const scenarioCode = useBigData().scenarios.find((scenario) => scenario.name === this.filter.scenario)?.code
        filtered = filtered.filter((item) => Number(item.code_scenarios) === scenarioCode)
      }
   
      
      this.filteredData = filtered

      this.updateStatistics()
    },

    updateStatistics() {
      const total = this.filteredData.length
      this.achieved = total

      this.islamic_count = this.filteredData.filter((item) => item.branch_type_code === '2').length
      this.conventional_count = this.filteredData.filter(
        (item) => item.branch_type_code === '1'
      ).length

      // this.overAllScore =
      this.overAllScore = 0
      this.filteredData.filter((item) => {
        item.overall = Number(item.overall)
        this.overAllScore = this.overAllScore + item.overall
      })
      this.overAllScore = Math.round((this.overAllScore / this.achieved) * 100)

      // section_1 branch exterior

      this.branch_exterior_overAllScore = 0
      this.filteredData.filter((item) => {
        item.section_1_branch_exterior = Number(item.section_1_branch_exterior)
        this.branch_exterior_overAllScore =
          this.branch_exterior_overAllScore + item.section_1_branch_exterior
      })

      this.branch_exterior_overAllScore = Math.round(
        (this.branch_exterior_overAllScore / this.achieved) * 100
      )

      //section_1 branch interioir

      this.branch_interior_overAllScore = 0
      this.filteredData.filter((item) => {
        item.section_2_branch_internal = Number(item.section_2_branch_internal)
        this.branch_interior_overAllScore =
          this.branch_interior_overAllScore + item.section_2_branch_internal
      })

      this.branch_interior_overAllScore = Math.round(
        (this.branch_interior_overAllScore / this.achieved) * 100
      )

      //section_3 customer service

      this.customer_service_overAllScore = 0

      this.filteredData.filter((item) => {
        item.section_3_customer_services = Number(item.section_3_customer_services)
        this.customer_service_overAllScore =
          this.customer_service_overAllScore + item.section_3_customer_services
      })

      this.customer_service_overAllScore = Math.round(
        (this.customer_service_overAllScore / this.achieved) * 100
      )

      //section_4

      this.product_knowledge_overAllScore = 0

      this.filteredData.filter((item) => {
        item.section_4_product_knowledge = Number(item.section_4_product_knowledge)
        this.product_knowledge_overAllScore =
          this.product_knowledge_overAllScore + item.section_4_product_knowledge
      })

      this.product_knowledge_overAllScore = Math.round(
        (this.product_knowledge_overAllScore / this.achieved) * 100
      )

      //section_5

      this.cash_counter_overAllScore = 0

      this.filteredData.filter((item) => {
        item.section_5_cash_counter_services = Number(item.section_5_cash_counter_services)
        this.cash_counter_overAllScore =
          this.cash_counter_overAllScore + item.section_5_cash_counter_services
      })

      this.cash_counter_overAllScore = Math.round(
        (this.cash_counter_overAllScore / this.achieved) * 100
      )

      //section_6

      this.atm_services_overAllScore = 0

      this.filteredData.filter((item) => {
        item.section_6_atm_services = Number(item.section_6_atm_services)
        this.atm_services_overAllScore =
          this.atm_services_overAllScore + item.section_6_atm_services
      })

      this.atm_services_overAllScore = Math.round(
        (this.atm_services_overAllScore / this.achieved) * 100
      )

      // Add other section scores here if needed
    },
    setProvince(province: string) {
      this.filter.province = province
      this.applyFilters()
    },
    setCity(city: string) {
      this.filter.city = city
      this.applyFilters()
    },
    setBranchType(branchType: string) {
      this.filter.branch_type = branchType
      this.applyFilters()
    },
    setScenario(scenario: string) {
      this.filter.scenario = scenario
      this.applyFilters()
    },
    clearFilters() {
      this.filter = {
        province: '',
        city: '',
        branch_type: '',
        scenario: ''
      }
      this.filteredData = [...this.originalData]
      this.updateStatistics()
    }
  }
})
