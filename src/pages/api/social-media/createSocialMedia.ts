import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'

type RegisterCreateType = {
  name: string
  url: string
}

type SocialMediaResponseType = {
  id: string
  name: 'INSTAGRAM' | 'FACEBOOK' | 'TIKTOK'
  url: string
  createdAt: string
  updatedAt: string
}

export async function createSocialMedia(
  data: RegisterCreateType,
): Promise<SocialMediaResponseType | null> {
  try {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName,
    )
    if (storedToken) {
      const response = await api.post(
        '/social-media',
        { name: data.name, url: data.url },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        },
      )
      if (response.status === 201) {
        return response.data as SocialMediaResponseType
      } else {
        return null
      }
    } else {
      return null
    }
  } catch (error) {
    console.error('Error registering social media:', error)
    return null
  }
}
