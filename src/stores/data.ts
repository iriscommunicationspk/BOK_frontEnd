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
  city: string
  branch: string
  staff_interaction: string
  purpose_of_visit: string
  turn_around_time: string
  over_all_satisfactory: string
  // widrawing_money: string
}

export const useDataStore = defineStore({
  id: 'data',
  state: () => ({
    data: [] as DataItem[],
    originalData: [] as DataItem[], // Store the unfiltered data
    filteredData: [] as DataItem[], // To store the data after applying filters
    malePercentage: 0,
    femalePercentage: 0,
    total_sample: 90,
    achieved: 0,
    account_holder: 0,
    none_account_holder: 0,
    old_customer: 0,
    new_customer: 0,
    branch: 0,
    withdrawal: 0,
    deposit: 0,
    staff_int_top2: 0,
    closing_acc: 0,
    transferring_fund: 0,
    loan_service: 0,
    credit_card: 0,
    filter_applied: false,
    city: 0,
    staff_interaction_highly: 0,
    staff_interaction_high: 0,
    purpose_of_visit_high: 0,
    purpose_of_visit_highly: 0,
    purpose_of_visit_top2: 0,
    turn_around_time_high: 0,
    turn_around_time_highly: 0,
    turn_around_time_top2: 0,
    overAll_high: 0,
    overAll_highly: 0,
    overAll_top2: 0,
    filters: {
      gender: '',
      customerType: '',
      city: '',
      deposit: '',
      closing_acc: '',
      transferring_fund: '',
      loan_service: '',
      branch: '',
      withdrawal: ''
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
        console.log(this.data) // Log the fetched data
        console.log(this.staff_interaction_highly)

        this.applyFilters()
        this.loader = true
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    applyFilters() {
      let filtered = [...this.originalData]

      if (this.filters.gender) {
        filtered = filtered.filter((item) => item.gender === this.filters.gender)
      }

      if (this.filters.customerType) {
        filtered = filtered.filter((item) => item.account_holder === this.filters.customerType)
      }

      if (this.filters.city) {
        filtered = filtered.filter((item) => item.city === this.filters.city)
      }

      if (this.filters.deposit) {
        filtered = filtered.filter((item) => item.deposit === this.filters.deposit)
      }

      if (this.filters.closing_acc) {
        filtered = filtered.filter((item) => item.closing_acc === this.filters.closing_acc)
      }

      if (this.filters.transferring_fund) {
        filtered = filtered.filter(
          (item) => item.transfering_fund === this.filters.transferring_fund
        )
      }

      if (this.filters.loan_service) {
        filtered = filtered.filter((item) => item.loan_service === this.filters.loan_service)
      }

      if (this.filters.withdrawal) {
        filtered = filtered.filter((item) => item.widrawing_money === this.filters.withdrawal)
      }

      if (this.filters.branch) {
        console.log('Filtering by branch:', this.filters.branch)
        filtered = filtered.filter((item) => item.branch === this.filters.branch)
      }

      this.filteredData = filtered
      console.log('Filtered data:', this.filteredData) // Log the filtered data

      this.updateStatistics()
    },
    updateStatistics() {
      console.log('Updating statistics...')

      const total = this.filteredData.length

      this.achieved = total

      // Calculate percentages based on filtered data
      const maleCount = this.filteredData.filter((item) => item.gender === 'Male').length
      const femaleCount = this.filteredData.filter((item) => item.gender === 'Female').length
      this.malePercentage = total ? Math.floor((maleCount / total) * 100) : 0
      this.femalePercentage = total ? Math.floor((femaleCount / total) * 100) : 0

      const accountHolder = this.filteredData.filter((item) => item.account_holder === 'Yes').length
      const noneAccountHolder = this.filteredData.filter(
        (item) => item.account_holder === 'No'
      ).length
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

      // staff_interaction - Top 2 boxes
      const staff_interaction_highly = this.filteredData.filter(
        (item) => item.staff_interaction == 'Highly satisfied'
      ).length

      console.log('Count = ', staff_interaction_highly)
      this.staff_interaction_highly = total
        ? Math.floor((staff_interaction_highly / total) * 100)
        : 0

      console.log('Percentage = ', this.staff_interaction_highly, '%')

      const staff_interaction_high = this.filteredData.filter(
        (item) => item.staff_interaction == 'Somewhat Satisfied'
      ).length

      console.log('Count = ', staff_interaction_high)
      this.staff_interaction_high = total ? Math.floor((staff_interaction_high / total) * 100) : 0

      console.log('Percentage = ', this.staff_interaction_high, '%')

      console.log(
        'Top 2 Boxes = ',
        this.staff_interaction_high + this.staff_interaction_highly,
        '%'
      )
      this.staff_int_top2 = this.staff_interaction_high + this.staff_interaction_highly

      // purpose_of_visit - Top 2 boxes

      const purpose_of_visit_high = this.filteredData.filter(
        (item) => item.purpose_of_visit == 'Highly satisfied'
      ).length

      console.log('purpose_of_visit_high Count = ', purpose_of_visit_high)
      this.purpose_of_visit_high = total ? Math.floor((purpose_of_visit_high / total) * 100) : 0

      console.log('purpose_of_visit_high Percentage = ', this.purpose_of_visit_high, '%')

      const purpose_of_visit_highly = this.filteredData.filter(
        (item) => item.purpose_of_visit == 'Somewhat Satisfied'
      ).length

      console.log('purpose_of_visit_highly Count = ', purpose_of_visit_highly)
      this.purpose_of_visit_highly = total ? Math.floor((purpose_of_visit_highly / total) * 100) : 0

      console.log('purpose_of_visit_highly Percentage = ', this.purpose_of_visit_highly, '%')

      this.purpose_of_visit_top2 = this.purpose_of_visit_high + this.purpose_of_visit_highly

      // turn_around_time - Top 2 boxes

      const turn_around_time_high = this.filteredData.filter(
        (item) => item.turn_around_time == 'Highly satisfied'
      ).length

      console.log('Turn around time Count high = ', turn_around_time_high)
      this.turn_around_time_high = total ? Math.floor((turn_around_time_high / total) * 100) : 0

      console.log('Turn around time Percentage high = ', this.turn_around_time_high, '%')

      const turn_around_time_highly = this.filteredData.filter(
        (item) => item.turn_around_time == 'Somewhat Satisfied'
      ).length

      console.log('Turn around time Count highly = ', turn_around_time_highly)
      this.turn_around_time_highly = total ? Math.floor((turn_around_time_highly / total) * 100) : 0

      console.log('Turn around time Percentage highly = ', this.turn_around_time_highly, '%')

      this.turn_around_time_top2 = this.turn_around_time_high + this.turn_around_time_highly

      console.log('Top 2 Boxes = ', this.turn_around_time_top2, '%')

      // over_all_satisfactory - Top 2 boxes

      const over_all_high = this.filteredData.filter(
        (item) => item.over_all_satisfactory == 'Highly satisfied'
      ).length

      console.log('Overall high Count= ', over_all_high)
      this.overAll_high = total ? Math.floor((over_all_high / total) * 100) : 0

      console.log('Overall high Percentage= ', this.overAll_high, '%')

      const over_all_highly = this.filteredData.filter(
        (item) => item.over_all_satisfactory == 'Somewhat Satisfied'
      ).length

      console.log('Overall highly Count= ', over_all_highly)
      this.overAll_highly = total ? Math.floor((over_all_highly / total) * 100) : 0

      console.log('Overall highly Percentage = ', this.overAll_highly, '%')

      this.overAll_top2 = this.overAll_high + this.overAll_highly

      console.log('Top 2 Boxes = ', this.overAll_top2, '%')
    },
    setGender(gender: string) {
      this.filters.gender = gender
      this.applyFilters()
    },
    setCustomerType(type: string) {
      this.filters.customerType = type
      this.applyFilters()
    },
    setCity(city: string) {
      this.filters.city = city
      this.applyFilters()
    },
    setDeposit(deposit: string) {
      this.filters.deposit = deposit
      this.applyFilters()
    },
    setClosingAcc(closingAcc: string) {
      this.filters.closing_acc = closingAcc
      this.applyFilters()
    },
    setTransferringFund(transferringFund: string) {
      this.filters.transferring_fund = transferringFund
      this.applyFilters()
    },
    setLoanService(loanService: string) {
      this.filters.loan_service = loanService
      this.applyFilters()
    },
    setWithdrawal(withdrawal: string) {
      this.filters.withdrawal = withdrawal
      this.applyFilters()
    },
    setBranch(branch: string) {
      console.log('set branch', branch)

      this.filters.branch = branch
      this.applyFilters()
    },
    clearFilters() {
      this.filters.gender = ''
      this.filters.customerType = ''
      this.filters.city = ''
      this.filters.deposit = ''
      this.filters.closing_acc = ''
      this.filters.transferring_fund = ''
      this.filters.loan_service = ''
      this.filters.branch = ''
      this.filteredData = [...this.originalData]
      this.updateStatistics()
    }
  }
})
