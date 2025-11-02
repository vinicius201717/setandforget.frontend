export interface OperationType {
  id: string
  userId: string
  pair: string
  isTeacher: boolean
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  rr?: number
  checklist?: string
  notes?: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface CreateOperationType {
  pair: string
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  rr?: number
  checklist?: string
  notes?: string
}

export interface UpdateOperationType {
  pair?: string
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  rr?: number
  checklist?: string
  notes?: string
}
