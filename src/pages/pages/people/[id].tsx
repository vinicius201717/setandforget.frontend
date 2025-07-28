import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import UserPeople from 'src/views/pages/user-people/UserPeople'
import { CircularProgress, Box } from '@mui/material'

import { PeopleProfileResponse } from 'src/context/types'
import getPeople from 'src/pages/api/people/getPeople'

const UserProfilePage = () => {
  const router = useRouter()
  const { id } = router.query

  const [userData, setUserData] = useState<PeopleProfileResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchUser = async () => {
      try {
        const response = await getPeople(String(id))

        setUserData(response)
      } catch (error) {
        console.error('Erro ao buscar usuário:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!userData) {
    return <p>Not found user.</p>
  }

  return <UserPeople peopleData={userData} peopleId={id as string} />
}

export default UserProfilePage
