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

interface Rating {
  id: string
  userId: string
  chessBulletRating: number
  chessBlitzRating: number
  chessRapidRating: number
  chessDailyRating: number
}

export interface DashboardChessData {
  lossAmount: number
  netProfit: number
  profitAmount: number
  profitPercentage: number
  totalDraws: number
  totalLosses: number
  totalMatches: number
  totalWins: number
  lastTwentyGames: number[]
  rating: Rating
}

interface Deposit {
  id: string
  userId: string
  amount: number
  customerName: string
  customerDocument: string
  customerPhone: string
  customerEmail: string
  paymentType: string
  productName: string
  pixCode: string | null
  referenceId: string
  status: string
  externalOrderId: string | null
  createdAt: Date
  updatedAt: Date
}

interface Withdrawl {
  id: string
  userId: string
  amount: number
  status: string
  externalOrderId: string | null
  createdAt: Date
  updatedAt: Date
  pixKey: string | null
  pixKeyType: number | null
  ownerTaxnumber: string | null
  ownerNamePixKey: string | null
}

export interface DepositWithdrawResponse {
  deposits: Deposit[]
  withdrawls: Withdrawl[]
}
