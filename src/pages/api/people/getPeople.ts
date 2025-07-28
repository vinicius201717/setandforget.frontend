import { api } from 'src/lib/axios'
import authConfig from 'src/configs/auth'
import { PeopleProfileResponse } from 'src/context/types'

export default async function getPeople(
  id: string,
): Promise<PeopleProfileResponse> {
  const storedToken = window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )

  const { data } = await api.get<PeopleProfileResponse>(`/users/people/${id}`, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  })

  return data
}
