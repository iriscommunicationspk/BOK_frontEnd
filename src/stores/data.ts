import { defineStore } from 'pinia'
import axios from 'axios'

// Define the structure of your data
interface DataItem {
  gender: string
  account_holder: string
  existing_customers: string
  widrawing_money: string
  deposit: string
  closing_acc: string
  transfering_fund: string
  loan_service: string
  credit_card: string
  city:string
}

export const useDataStore = defineStore({
  id: 'data',
  state: () => ({
    data: [] as DataItem[],
    originalData: [] as DataItem[], // Store the unfiltered data
    filteredData: [] as DataItem[], // To store the data after applying filters
    malePercentage: 0,
    femalePercentage: 0,
    total_sample: 0,
    account_holder: 0,
    none_account_holder: 0,
    old_customer: 0,
    new_customer: 0,
    withdrawal: 0,
    deposit: 0,
    closing_acc: 0,
    transferring_fund: 0,
    loan_service: 0,
    credit_card: 0,
    filter_applied: false,
    city:0,
    filters: {
      gender: '',
      customerType: '',
      city:''
    },
    loader: false
  }),
  actions: {
    async fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/get-gender')
        this.data = response.data
        this.originalData = [...response.data] // Store original data
        this.filteredData = this.data // Initialize filteredData with all data
        this.applyFilters()
        this.loader = true;
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    applyFilters() {
      let filtered = [...this.originalData]

      if (this.filters.gender) {
        filtered = filtered.filter(item => item.gender === this.filters.gender)
      }

      if (this.filters.customerType) {
        filtered = filtered.filter(item => item.account_holder === this.filters.customerType)
      }

      if (this.filters.city) {
        filtered = filtered.filter(item => item.city === this.filters.city)
      }

      this.filteredData = filtered
      this.updateStatistics()
    },
    updateStatistics() {
      const total = this.filteredData.length

      this.total_sample = total

      // Calculate percentages based on filtered data
      const maleCount = this.filteredData.filter(item => item.gender === 'Male').length
      const femaleCount = this.filteredData.filter(item => item.gender === 'Female').length
      this.malePercentage = total ? Math.floor((maleCount / total) * 100) : 0
      this.femalePercentage = total ? Math.floor((femaleCount / total) * 100) : 0

      const accountHolder = this.filteredData.filter(item => item.account_holder === 'Yes').length
      const noneAccountHolder = this.filteredData.filter(item => item.account_holder === 'No').length
      this.account_holder = total ? Math.floor((accountHolder / total) * 100) : 0
      this.none_account_holder = total ? Math.floor((noneAccountHolder / total) * 100) : 0

      // Update other statistics similarly
      const newCus = this.filteredData.filter((item) => item.existing_customers === '1').length
      const oldCus = this.filteredData.filter((item) => item.existing_customers === '2').length
      this.old_customer = total ? Math.floor((oldCus / total) * 100) : 0
      this.new_customer = total ? Math.floor((newCus / total) * 100) : 0

      const withdraw = this.filteredData.filter((item) => item.widrawing_money === 'Yes').length
      this.withdrawal = total ? Math.floor((withdraw / total) * 100) : 0

      const deposit = this.filteredData.filter((item) => item.deposit === 'Yes').length
      this.deposit = total ? Math.floor((deposit / total) * 100) : 0

      const close = this.filteredData.filter((item) => item.closing_acc === 'Yes').length
      this.closing_acc = total ? Math.floor((close / total) * 100) : 0

      const transfer = this.filteredData.filter((item) => item.transfering_fund === 'Yes').length
      this.transferring_fund = total ? Math.floor((transfer / total) * 100) : 0

      const loan = this.filteredData.filter((item) => item.loan_service === 'Yes').length
      this.loan_service = total ? Math.floor((loan / total) * 100) : 0

      const credit = this.filteredData.filter((item) => item.credit_card === 'Yes').length
      this.credit_card = total ? Math.floor((credit / total) * 100) : 0
    },
    setGender(gender: string) {
      this.filters.gender = gender
      this.applyFilters()
    },
    setCustomerType(type: string) {
      this.filters.customerType = type
      this.applyFilters()
    },
    setcity(type: string) {
      this.filters.city = type
      this.applyFilters()
    },
    clearFilters() {
      this.filters.gender = ''
      this.filters.customerType = ''
      this.filteredData = [...this.originalData]
      this.updateStatistics()
    }
  }
})
