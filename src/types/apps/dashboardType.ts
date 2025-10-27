/* eslint-disable @typescript-eslint/no-explicit-any */
type PeriodSummary = {
  totalDeposits: number
  totalWithdrawals: number
  depositCount: number
  hasMoreThan1000: boolean
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
  amountAccount: number
  lastWeek?: PeriodSummary
  lastMonth?: PeriodSummary
  lastYear?: PeriodSummary
}

export type PaymentSummaryUnic = {
  totalDeposits: number
  totalWithdrawals: number
  depositCount: number
  withdrawalCount: number
  amountAccount: number
  hasMoreThan1000: boolean
  profit: number
  isPositive: boolean
  profitPercentage: number
  daily: any[]
}
export interface AnalyticsTotalProfitProps {
  profit: number
}

export interface AnalyticsDepositWithdrawProps {
  daily: PaymentSummary[]
}

export interface UserInfo {
  name: string
}
