import { GetPostsResponse } from 'src/types/apps/feedType'
import authConfig from 'src/configs/auth'
import { api } from 'src/lib/axios'

export default async function getPosts(): Promise<GetPostsResponse> {
  const token = window.localStorage.getItem(authConfig.storageTokenKeyName)

  try {
    const res = await api.get(`/posts/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = res.data

    return {
      posts: Array.isArray(data.posts) ? data.posts : [],
      reposted: Array.isArray(data.reposted) ? data.reposted : [],
    }
  } catch (error) {
    console.error('Erro ao buscar posts:', error)

    // FRONTEND NUNCA QUEBRA
    return {
      posts: [],
      reposted: [],
    }
  }
}
