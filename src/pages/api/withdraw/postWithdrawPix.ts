/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export interface WithdrawPixProps {
  amount: number
  pixKey?: string
  pixKeyType?: number
  ownerTaxnumber?: string
  ownerNamePixKey?: string
}

export interface WithdrawPixResponse {
  response?: {
    success?: boolean
    message?: string
  }
  error?: string
}

export class WithdrawPixError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'WithdrawPixError'
  }
}

// const generateTransactionId = () => {
//   const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
//   const seq = Math.floor(Math.random() * 1000)
//     .toString()
//     .padStart(3, '0')
//   return `pix-${dateStr}-${seq}`
// }

export async function postWithdrawPix(
  data: WithdrawPixProps,
): Promise<WithdrawPixResponse> {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )
    if (!storedToken) {
      throw new WithdrawPixError('Token de autenticação não encontrado')
    }

    // const transactionId = generateTransactionId()

    const payload = {
      amount: data.amount,
      ownerTaxnumber: data.ownerTaxnumber,
      pixKey: data.pixKey,
      pixKeyType: data.pixKeyType,
      // transactionId,
    }

    const response = await api.post('/withdrawals', payload, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })

    if (response.status === 201) {
      return {
        response: {
          success: response.data.success || true,
          message:
            response.data.message || 'Saque via PIX enviado com sucesso!',
        },
      }
    }
    return { error: 'Status de resposta inesperado' }
  } catch (error) {
    console.error('Erro ao realizar o saque via PIX:', error)
    if (error instanceof WithdrawPixError) {
      return { error: error.message }
    }
    if ((error as any).response) {
      return {
        error: (error as any).response.data.message || 'Erro no servidor',
      }
    }
    return { error: 'Erro de rede ou desconhecido ocorreu' }
  }
}
