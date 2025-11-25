/* eslint-disable no-unused-vars */
export interface OperationType {
  id: string
  userId: string
  pair: string
  isTeacher: boolean
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  rr?: number
  checklist?: Record<string, boolean>
  notes?: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface TeacherOperationsResponse {
  drafts: OperationType[]
  published: OperationType[]
}

export interface ImageBlock {
  link: string
  text?: string
}
export interface CreateOperationType {
  pair: string
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  rr?: number
  checklist?: string
  notes?: string
  links?: ImageBlock[]
  totalRR?: number
  type?: 'buy' | 'sell'
  entryDate?: string
  entryTime?: string
  exitDate?: string
  exitTime?: string
  result?: string
}

export interface UpdateOperationType {
  pair?: string
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  rr?: number
  checklist?: string
  notes?: string
}

export type Item = {
  id: string
  title: string
  description?: string
  group: string
  weight: number
}

export interface AnalysisItem {
  id?: string
  pair: string
  date: string
  checkedItems: string[]
}

export interface AnalisesRegistradasCardProps {
  analyses: AnalysisItem[]
  loadAnalysis: (a: AnalysisItem) => void
  onDelete: (analysis: AnalysisItem) => void
}

export interface MediaEntry {
  id: string
  file?: File
  preview?: string
  link?: string
  description?: string
}
