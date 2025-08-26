type PeriodSummary = {
  totalDeposits: number
  totalWithdrawals: number
  depositCount: number
  withdrawalCount: number
  profit: number
  profitPercentage: number
  isPositive: boolean
}

export type PaymentSummary = {
  totalDeposits: number
  totalWithdrawals: number
  depositCount: number
  withdrawalCount: number
  hasMoreThan1000: boolean
  profit: number
  isPositive: boolean
  profitPercentage: number
  daily: any[]
  amountAccount: { amount: number }
  lastWeek: PeriodSummary
  lastMonth: PeriodSummary
  lastYear: PeriodSummary
}
export interface AnalyticsTotalProfitProps {
  profit: number
}

export interface AnalyticsDepositWithdrawProps {
  daily: PaymentSummary[]
}
