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
  Complain_resolution: string
  Foreign_echange: string
  Investment_service: string
  financial_advice: string
  customer_support: string
  digital_banking: string
  money_pay_order: string
  safe_deposit: string
  payments_bills: string
  issuance_cheque_book: string
  bank_statement: string
  online_transaction: string
  installment_plot: string
  receive_ATM: string
  Update_personal_info: string
  credit_card_payment: string
  opening_new_acc: string
  city: string
  branch: string
  staff_interaction: string
  purpose_of_visit: string
  turn_around_time: string
  over_all_satisfactory: string
  Date: string // Assuming there is a date field
  payment_dues: string
  cheque_deposit: string
  turn_around_time_mins: string
}

interface DataArrayItem {
  date: string
  percentage: number
}

interface TopCategoryItem {
  x: string
  y: number
}

export const useDataStore = defineStore({
  id: 'data',
  state: () => ({
    color: '#455984',
    size: '15px',
    data: [] as DataItem[],
    originalData: [] as DataItem[], // Store the unfiltered data
    filteredData: [] as DataItem[], // To store the data after applying filters
    malePercentage: 0,
    femalePercentage: 0,
    total_sample: 60,
    achieved: 0,
    account_holder: 0,
    none_account_holder: 0,
    old_customer: 0,
    new_customer: 0,
    account_holder_count: 0,
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
    branch_Lahore: 0,
    branch_Karachi: 0,
    branch_Islamabad: 0,
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
    payment_dues: 0,
    cheque_deposit: 0,
    Complain_resolution: 0,
    Foreign_echange: 0,
    Investment_service: 0,
    financial_advice: 0,
    customer_support: 0,
    digital_banking: 0,
    money_pay_order: 0,
    safe_deposit: 0,

    issuance_cheque_book: 0,
    bank_statement: 0,
    online_transaction: 0,
    installment_plot: 0,
    receive_ATM: 0,
    credit_card_payment: 0,

    opening_new_acc: 0,
    Update_personal_info: 0,

    less_then_10: 0,
    bt_10_15: 0,
    bt_15_20: 0,
    bt_20_25: 0,
    bt_25_30: 0,
    bt_30_45: 0,
    bt_45_60: 0,
    more_then_60: 0,
    top5Array: [] as TopCategoryItem[],
    filters: {
      gender: '',
      customerType: '',
      city: '',
      deposit: '',
      closing_acc: '',
      transferring_fund: '',
      loan_service: '',
      branch: '',
      withdrawal: '',
      payment_dues: '',
      cheque_deposit: '',
      Date: ''
    },
    satisfaction_trend: [],
    data_array: [] as DataArrayItem[],
    loader: false
  }),
  actions: {
    async fetchData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_ENDPOINT}get-gender`)
        this.data = response.data
        this.originalData = [...response.data] // Store original data
        this.filteredData = this.data // Initialize filteredData with all data
        this.getOverallTop2ArrayByDate()
        console.log(this.data) // Log the fetched data
        // console.log(this.staff_interaction_highly)
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

      if (this.filters.payment_dues) {
        filtered = filtered.filter((item) => item.payment_dues === this.filters.payment_dues)
      }

      if (this.filters.cheque_deposit) {
        filtered = filtered.filter((item) => item.cheque_deposit === this.filters.cheque_deposit)
      }

      if (this.filters.branch) {
        // console.log('Filtering by branch:', this.filters.branch)
        filtered = filtered.filter((item) => item.branch === this.filters.branch)
      }

      this.filteredData = filtered
      // console.log('Filtered data:', this.filteredData) // Log the filtered data

      this.updateStatistics()
      this.data_array = [...this.getOverallTop2ArrayByDate()]
      console.log('data.ts', this.data_array)
      this.updateTop5Array()
    },
    updateStatistics() {
      // console.log('Updating statistics...')

      const total = this.filteredData.length

      this.achieved = total

      // Calculate percentages based on filtered data
      const maleCount = this.filteredData.filter((item) => item.gender === 'Male').length
      const femaleCount = this.filteredData.filter((item) => item.gender === 'Female').length
      this.malePercentage = total ? Math.round((maleCount / total) * 100) : 0
      this.femalePercentage = total ? Math.round((femaleCount / total) * 100) : 0

      const accountHolder = this.filteredData.filter((item) => item.account_holder === 'Yes').length
      this.account_holder_count = accountHolder
      const noneAccountHolder = this.filteredData.filter(
        (item) => item.account_holder === 'No'
      ).length
      this.account_holder = total ? Math.round((accountHolder / total) * 100) : 0
      this.none_account_holder = total ? Math.round((noneAccountHolder / total) * 100) : 0

      // Update other statistics similarly
      const newCus = this.filteredData.filter((item) => item.existing_customers === '1').length
      const oldCus = this.filteredData.filter((item) => item.existing_customers === '2').length
      this.old_customer = total ? Math.round((oldCus / this.account_holder_count) * 100) : 0
      this.new_customer = total ? Math.round((newCus / this.account_holder_count) * 100) : 0
      console.log(
        'newCus',
        newCus,
        'oldCus',
        oldCus,
        'total',
        total,
        'account_holder',
        accountHolder
      )

      // console.log('newCus', newCus, 'oldCus', oldCus)

      const branchLahore = this.filteredData.filter(
        (item) => item.branch === 'Z Block DHA Phase III, Lahore'
      ).length

      const branchIslamabad = this.filteredData.filter(
        (item) => item.branch === 'I-10 Markaz, Islamabad'
      ).length

      const branchKarachi = this.filteredData.filter(
        (item) => item.branch === 'Shahrah-e-Faisal, Karachi'
      ).length
      this.branch_Lahore = total ? Math.round((branchLahore / total) * 100) : 0
      this.branch_Islamabad = total ? Math.round((branchIslamabad / total) * 100) : 0
      this.branch_Karachi = total ? Math.round((branchKarachi / total) * 100) : 0

      console.log(
        'branchLahore',
        branchLahore,
        'branchIslamabad',
        branchIslamabad,
        'branchKarachi',
        branchKarachi
      )

      const withdraw = this.filteredData.filter((item) => item.widrawing_money === 'Yes').length
      this.withdrawal = total ? Math.round((withdraw / total) * 100) : 0

      const deposit = this.filteredData.filter((item) => item.deposit === 'Yes').length
      this.deposit = total ? Math.round((deposit / total) * 100) : 0

      const close = this.filteredData.filter((item) => item.closing_acc === 'Yes').length
      this.closing_acc = total ? Math.round((close / total) * 100) : 0

      const transfer = this.filteredData.filter((item) => item.transfering_fund === 'Yes').length
      this.transferring_fund = total ? Math.round((transfer / total) * 100) : 0

      const loan = this.filteredData.filter((item) => item.loan_service === 'Yes').length
      this.loan_service = total ? Math.round((loan / total) * 100) : 0

      const credit = this.filteredData.filter((item) => item.credit_card === 'Yes').length
      this.credit_card = total ? Math.round((credit / total) * 100) : 0

      const paymnet_dues = this.filteredData.filter((item) => item.payment_dues === 'Yes').length
      this.payment_dues = total ? Math.round((paymnet_dues / total) * 100) : 0

      const cheque_deposite = this.filteredData.filter(
        (item) => item.cheque_deposit === 'Yes'
      ).length
      this.cheque_deposit = total ? Math.round((cheque_deposite / total) * 100) : 0

      const Complain_resolutions = this.filteredData.filter(
        (item) => item.Complain_resolution === 'Yes'
      ).length

      this.Complain_resolution = total ? Math.round((Complain_resolutions / total) * 100) : 0

      const Foreign_echanges = this.filteredData.filter(
        (item) => item.Foreign_echange === 'Yes'
      ).length

      this.Foreign_echange = total ? Math.round((Foreign_echanges / total) * 100) : 0

      const Investment_services = this.filteredData.filter(
        (item) => item.Investment_service === 'Yes'
      ).length

      this.Investment_service = total ? Math.round((Investment_services / total) * 100) : 0

      // financial_advice

      const financial_advice = this.filteredData.filter(
        (item) => item.financial_advice === 'Yes'
      ).length
      this.financial_advice = total ? Math.round((financial_advice / total) * 100) : 0

      // customer_support

      const customer_support = this.filteredData.filter(
        (item) => item.customer_support === 'Yes'
      ).length
      this.customer_support = total ? Math.round((customer_support / total) * 100) : 0

      // digital_banking

      const digital_banking = this.filteredData.filter(
        (item) => item.digital_banking === 'Yes'
      ).length
      this.digital_banking = total ? Math.round((digital_banking / total) * 100) : 0

      // money_pay_order

      const money_pay_order = this.filteredData.filter(
        (item) => item.money_pay_order === 'Yes'
      ).length
      this.money_pay_order = total ? Math.round((money_pay_order / total) * 100) : 0

      // safe_deposit

      const safe_deposit = this.filteredData.filter((item) => item.safe_deposit === 'Yes').length
      this.safe_deposit = total ? Math.round((safe_deposit / total) * 100) : 0

      // // payments_bills

      // const payments_bills = this.filteredData.filter(
      //   (item) => item.payments_bills === 'Yes'
      // ).length
      // this.payments_bills = total ? Math.round((payments_bills / total) * 100) : 0

      // issuance_cheque_book

      const issuance_cheque_book = this.filteredData.filter(
        (item) => item.issuance_cheque_book === 'Yes'
      ).length
      this.issuance_cheque_book = total ? Math.round((issuance_cheque_book / total) * 100) : 0

      // bank_statement

      const bank_statement = this.filteredData.filter(
        (item) => item.bank_statement === 'Yes'
      ).length
      this.bank_statement = total ? Math.round((bank_statement / total) * 100) : 0

      // online_transaction

      const online_transaction = this.filteredData.filter(
        (item) => item.online_transaction === 'Yes'
      ).length
      this.online_transaction = total ? Math.round((online_transaction / total) * 100) : 0

      // installment_plot

      const installment_plot = this.filteredData.filter(
        (item) => item.installment_plot === 'Yes'
      ).length
      this.installment_plot = total ? Math.round((installment_plot / total) * 100) : 0

      // receive_ATM

      const receive_ATM = this.filteredData.filter((item) => item.receive_ATM === 'Yes').length
      this.receive_ATM = total ? Math.round((receive_ATM / total) * 100) : 0

      // credit_card_payment

      const credit_card_payment = this.filteredData.filter(
        (item) => item.credit_card_payment === 'Yes'
      ).length
      this.credit_card_payment = total ? Math.round((credit_card_payment / total) * 100) : 0

      // opening_new_acc

      const opening_new_acc = this.filteredData.filter(
        (item) => item.opening_new_acc === 'Yes'
      ).length

      this.opening_new_acc = total ? Math.round((opening_new_acc / total) * 100) : 0

      // Update_personal_info

      const Update_personal_info = this.filteredData.filter(
        (item) => item.Update_personal_info === 'Yes'
      ).length
      this.Update_personal_info = total ? Math.round((Update_personal_info / total) * 100) : 0

      //////////////////////////////////////////////////////////////////////////////////////////////
      const less_then_10 = this.filteredData.filter(
        (item) => item.turn_around_time_mins === '1'
      ).length

      this.less_then_10 = total ? Math.round((less_then_10 / total) * 100) : 0

      const bt_10_15 = this.filteredData.filter((item) => item.turn_around_time_mins === '2').length

      this.bt_10_15 = total ? Math.round((bt_10_15 / total) * 100) : 0

      const bt_15_20 = this.filteredData.filter((item) => item.turn_around_time_mins === '3').length

      this.bt_15_20 = total ? Math.round((bt_15_20 / total) * 100) : 0

      const bt_20_25 = this.filteredData.filter((item) => item.turn_around_time_mins === '4').length

      this.bt_20_25 = total ? Math.round((bt_20_25 / total) * 100) : 0

      const bt_25_30 = this.filteredData.filter((item) => item.turn_around_time_mins === '5').length

      this.bt_25_30 = total ? Math.round((bt_25_30 / total) * 100) : 0

      const bt_30_45 = this.filteredData.filter((item) => item.turn_around_time_mins === '6').length

      this.bt_30_45 = total ? Math.round((bt_30_45 / total) * 100) : 0

      const bt_45_60 = this.filteredData.filter((item) => item.turn_around_time_mins === '7').length

      this.bt_45_60 = total ? Math.round((bt_45_60 / total) * 100) : 0

      const more_then_60 = this.filteredData.filter(
        (item) => item.turn_around_time_mins === '8'
      ).length

      this.more_then_60 = total ? Math.round((more_then_60 / total) * 100) : 0

      console.log(
        'less_then_10',
        this.less_then_10,
        'bt_10_15',
        this.bt_10_15,
        'bt_15_20',
        this.bt_15_20,
        'bt_20_25',
        this.bt_20_25,
        'bt_25_30',
        this.bt_25_30,
        'bt_30_45',
        this.bt_30_45,
        'bt_45_60',
        this.bt_45_60,
        'more_then_60',
        this.more_then_60
      )

      // staff_interaction - Top 2 boxes
      const staff_interaction_highly = this.filteredData.filter(
        (item) => item.staff_interaction == 'Highly satisfied'
      ).length

      console.log('staff Count highly = ', staff_interaction_highly)
      this.staff_interaction_highly = total
        ? Math.round((staff_interaction_highly / total) * 100)
        : 0

      // console.log('Percentage = ', this.staff_interaction_highly, '%')

      const staff_interaction_high = this.filteredData.filter(
        (item) => item.staff_interaction == 'Somewhat Satisfied'
      ).length

      console.log('staff Count high= ', staff_interaction_high)
      this.staff_interaction_high = total ? Math.round((staff_interaction_high / total) * 100) : 0

      // console.log('Percentage = ', this.staff_interaction_high, '%')

      // console.log(
      //   'Top 2 Boxes = ',
      //   this.staff_interaction_high + this.staff_interaction_highly,
      //   '%'
      // )
      const total_staff = staff_interaction_high + staff_interaction_highly
      this.staff_int_top2 = total ? Math.round((total_staff / total) * 100) : 0

      // purpose_of_visit - Top 2 boxes

      const purpose_of_visit_high = this.filteredData.filter(
        (item) => item.purpose_of_visit == 'Highly satisfied'
      ).length

      console.log('purpose_of_visit_high Count = ', purpose_of_visit_high)
      this.purpose_of_visit_high = total ? Math.round((purpose_of_visit_high / total) * 100) : 0

      // console.log('purpose_of_visit_high Percentage = ', this.purpose_of_visit_high, '%')

      const purpose_of_visit_highly = this.filteredData.filter(
        (item) => item.purpose_of_visit == 'Somewhat Satisfied'
      ).length

      console.log('purpose_of_visit_highly Count = ', purpose_of_visit_highly)
      this.purpose_of_visit_highly = total ? Math.round((purpose_of_visit_highly / total) * 100) : 0

      //console.log('purpose_of_visit_highly Percentage = ', this.purpose_of_visit_highly, '%')
      console.log('purpose of visit total count =', purpose_of_visit_high + purpose_of_visit_highly)

      // this.purpose_of_visit_top2 = this.purpose_of_visit_high + this.purpose_of_visit_highly

      const total_count = purpose_of_visit_high + purpose_of_visit_highly
      console.log('total count =', total_count)

      this.purpose_of_visit_top2 = Math.round((total_count / total) * 100)
      console.log('top 2 boxes =', this.purpose_of_visit_top2, '%')

      // turn_around_time - Top 2 boxes

      const turn_around_time_high = this.filteredData.filter(
        (item) => item.turn_around_time == 'Highly satisfied'
      ).length

      console.log('Turn around time Count high = ', turn_around_time_high)
      this.turn_around_time_high = total ? Math.round((turn_around_time_high / total) * 100) : 0

      //console.log('Turn around time Percentage high = ', this.turn_around_time_high, '%')

      const turn_around_time_highly = this.filteredData.filter(
        (item) => item.turn_around_time == 'Somewhat Satisfied'
      ).length

      console.log('Turn around time Count highly = ', turn_around_time_highly)
      this.turn_around_time_highly = total ? Math.round((turn_around_time_highly / total) * 100) : 0

      //console.log('Turn around time Percentage highly = ', this.turn_around_time_highly, '%')
      const total_turn = turn_around_time_high + turn_around_time_highly
      // this.turn_around_time_top2 = this.turn_around_time_high + this.turn_around_time_highly
      this.turn_around_time_top2 = total ? Math.round((total_turn / total) * 100) : 0

      ///console.log('Top 2 Boxes = ', this.turn_around_time_top2, '%')

      // over_all_satisfactory - Top 2 boxes

      const over_all_high = this.filteredData.filter(
        (item) => item.over_all_satisfactory == 'Highly satisfied'
      ).length
      console.log('Overall high Count= ', over_all_high)

      console.log('Overall high Count= ', over_all_high)
      // this.overAll_high = total ? Math.round((over_all_high / total) * 100) : 0
      // this.overAll_high = total ? Math.round((over_all_high / total) * 100) : 0

      //console.log('Overall high Percentage= ', this.overAll_high, '%')

      const over_all_highly = this.filteredData.filter(
        (item) => item.over_all_satisfactory == 'Somewhat Satisfied'
      ).length
      console.log('Overall highly Count= ', over_all_highly)

      console.log('guage total count =', over_all_highly + over_all_high)

      //console.log('Overall highly Count= ', over_all_highly)
      this.overAll_highly = total ? Math.round((over_all_highly / total) * 100) : 0

      //console.log('Overall highly Percentage = ', this.overAll_highly, '%')
      const total_overAll_count = over_all_high + over_all_highly
      // this.overAll_top2 = this.overAll_high + this.overAll_highly
      this.overAll_top2 = total ? Math.round((total_overAll_count / total) * 100) : 0

      console.log('guage = ', this.overAll_top2)

      //console.log('Top 2 Boxes = ', this.overAll_top2, '%')
    },
    getOverallTop2ArrayByDate() {
      // Define the type for groupedByDate
      type GroupedByDate = Record<string, { high: number; highly: number; count: number }>

      const overallTop2ByDate: { date: string; percentage: number }[] = []

      const groupedByDate: GroupedByDate = this.filteredData.reduce(
        (acc: GroupedByDate, item: any) => {
          const date = item.Date
          if (!acc[date]) {
            acc[date] = { high: 0, highly: 0, count: 0 }
          }
          acc[date].count += 1
          acc[date].high += item.over_all_satisfactory === 'Highly satisfied' ? 1 : 0
          acc[date].highly += item.over_all_satisfactory === 'Somewhat Satisfied' ? 1 : 0

          return acc
        },
        {} as GroupedByDate
      )

      for (const [date, counts] of Object.entries(groupedByDate)) {
        overallTop2ByDate.push({
          date: date,
          percentage: Math.round(((counts.high + counts.highly) / counts.count) * 100)
        })
      }

      // Sort the array by date
      this.data_array = [...overallTop2ByDate].sort(
        (a: { date: string }, b: { date: string }) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      )

      console.log('data.ts', this.data_array)
      return this.data_array
    },

    setGender(gender: string) {
      this.filters.gender = gender
      this.applyFilters()
    },
    setCustomerType(type: string) {
      if (type == 'Account Holder of BAFL') {
        this.filters.customerType = 'Yes'
      } else {
        this.filters.customerType = 'No'
      }
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
    setPaymentDues(payment_dues: string) {
      this.filters.payment_dues = payment_dues
      this.applyFilters()
    },
    setChequeDeposit(cheque_deposit: string) {
      this.filters.cheque_deposit = cheque_deposit
      this.applyFilters()
    },
    setBranch(branch: string) {
      console.log('set branch', branch)
      this.filters.branch = branch
      this.applyFilters()
    },
    updateTop5Array() {
      const stats = {
        'Withdrawing money': this.withdrawal,
        'Opening a new account': this.opening_new_acc,
        'Depositing money': this.deposit,
        'Updating personal information': this.Update_personal_info,
        'Closing an account': this.closing_acc,
        'Transferring funds': this.transferring_fund,
        'Loan services/information': this.loan_service,
        'Complain resolution': this.Complain_resolution,
        'Foreign exchange services': this.Foreign_echange,
        'Credit and debit card services': this.credit_card,
        'Investment services': this.Investment_service,
        'Financial advice and planning': this.financial_advice,
        'Customer support and inquiries': this.customer_support,
        'Digital banking services': this.digital_banking,
        'Money/Pay orders': this.money_pay_order,
        'Safe deposit lockers': this.safe_deposit,
        'Payments of bills/dues': this.payment_dues,
        'Cheque deposit': this.cheque_deposit,
        'Issuance of Cheque book': this.issuance_cheque_book,
        'Bank statement': this.bank_statement,
        'Online transaction': this.online_transaction,
        'Installment of plot': this.installment_plot,
        'To receive ATM card': this.receive_ATM,
        'Credit card payment': this.credit_card_payment
      }

      console.log(stats)

      // Filter out the categories with a value of zero
      const filteredStats = Object.entries(stats).filter(([key, value]) => value > 0)

      // Sort the remaining entries and select the top 5
      const sortedStats = filteredStats.sort((a, b) => b[1] - a[1])
      const top5Stats = sortedStats.slice(0, 5)

      // Update the top5Array
      this.top5Array = top5Stats.map(([key, value]) => ({ x: key, y: value }))

      console.log('top5Array', this.top5Array)
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
      this.filters.withdrawal = ''
      this.filters.payment_dues = ''
      this.filters.cheque_deposit = ''
      this.filteredData = [...this.originalData]
      this.updateStatistics()
      this.getOverallTop2ArrayByDate()
      this.updateTop5Array()
    }
  }
})
