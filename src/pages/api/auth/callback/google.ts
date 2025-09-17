import { NextApiRequest, NextApiResponse } from 'next/types'

import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { code } = req.query
  console.log(code)

  try {
    // envia o code para o backend NestJS
    const response = await axios.get(
      'http://localhost:3001/auth/google/callback',
      {
        params: { code },
      },
    )

    // Aqui você pode salvar o JWT em cookie ou redirecionar o usuário
    const { jwt, user } = response.data

    res.status(200).json({ jwt, user })
  } catch (error: any) {
    console.error(error.response?.data || error.message)
    res.status(500).json({ error: 'Google login failed' })
  }
}
