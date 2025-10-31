import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

export async function getSignedUploadUrl(file: File) {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )
  if (!storedToken) throw new Error('Token não encontrado')

  const { data } = await api.post(
    '/files/signed-url',
    {
      fileName: file.name,
      mimeType: file.type,
      fileSize: file.size,
    },
    {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    },
  )

  return data
}

export async function uploadToSignedUrl(signedUrl: string, file: File) {
  const response = await fetch(signedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  })

  if (!response.ok) {
    throw new Error('Erro ao enviar o arquivo')
  }
}
