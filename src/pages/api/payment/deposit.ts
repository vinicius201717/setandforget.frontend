/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export interface DepositRequest {
  amount: number
  customerName: string
  customerDocument: string
  customerPhone: string
  customerEmail: string
  paymentType: string
  productName: string | undefined | ''
  cardNumber?: string
  expiryDate?: string
  cvv?: string
}

export interface DepositResponse {
  response?: {
    id?: string
    message?: string
    expire?: number
    pixCode?: string
    value?: number
    success?: boolean
    typeMessage?: number
  }
  error?: string
}

export class DepositError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DepositError'
  }
}

const generateReferenceId = () => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const seq = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0')
  return `dep-${dateStr}-${seq}`
}

export async function deposit(data: DepositRequest): Promise<DepositResponse> {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )
    if (!storedToken) {
      throw new DepositError('Authentication token not found')
    }

    const referenceId = generateReferenceId()

    const payload = {
      amount: data.amount,
      customerName: data.customerName,
      customerDocument: data.customerDocument,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail,
      paymentType: data.paymentType,
      productName: data.productName,
      referenceId,
      ...(data.paymentType
        ? {}
        : {
            cardNumber: data.cardNumber,
            expiryDate: data.expiryDate,
            cvv: data.cvv,
          }),
    }

    const response = await api.post('/payments', payload, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })

    if (response.status === 201) {
      const apiResponse = {
        id: response.data.id,
        message: response.data.message || 'Operation completed successfully!',
        expire: response.data.expire,
        pixCode: response.data.pixCode,
        value: response.data.value,
        success: response.data.success,
        typeMessage: response.data.typeMessage,
      }
      return {
        response: apiResponse,
      }
    }
    return { error: 'Unexpected response status' }
  } catch (error) {
    console.error('Error when making payment:', error)
    if (error instanceof DepositError) {
      return { error: error.message }
    }
    if ((error as any).response) {
      return { error: (error as any).response.data.message || 'Server error' }
    }
    return { error: 'Network or unknown error occurred' }
  }
}
