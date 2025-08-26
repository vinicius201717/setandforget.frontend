interface DailySummary {
  date: string
  deposit: number
  withdraw: number
  profit: number
}

export interface PaymentSummary {
  daily: DailySummary[]
  hasMoreThan1000: boolean
  profit: number
  totalDeposits: number
}

export interface AnalyticsTotalProfitProps {
  profit: number
}

export interface AnalyticsDepositWithdrawProps {
  daily: DailySummary[]
}
