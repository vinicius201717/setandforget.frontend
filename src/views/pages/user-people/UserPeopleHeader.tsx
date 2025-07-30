/* eslint-disable no-unused-vars */
import { useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'

// ** Types
import { PeopleProfileResponse } from 'src/context/types'

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4),
  },
}))

type UserProfileHeaderProps = {
  peopleData: PeopleProfileResponse
  peopleId: string
  onFriendAction: (
    action: 'add' | 'remove' | 'accept' | 'decline' | 'cancel',
    myId: string,
    peapleId: string,
    friendshipId: string | null,
  ) => Promise<void>
}

const UserPeopleHeader = ({
  peopleData,
  peopleId,
  onFriendAction,
}: UserProfileHeaderProps) => {
  const { people, friendship } = peopleData
  const { user } = useAuth()

  const [friendshipStatus, setFriendshipStatus] = useState<
    'ACCEPTED' | 'PENDING' | 'DECLINED' | null
  >(friendship ? friendship.status : null)

  const [friendshipId, setFriendshipId] = useState<string | null>(
    friendship ? friendship.id : null,
  )

  // ==============================
  // 🎯 STATUS DE AMIZADE
  // ==============================
  const renderFriendshipStatus = () => {
    if (!friendshipStatus) {
      return (
        <Typography color='text.secondary'>You are not friends yet</Typography>
      )
    }

    switch (friendshipStatus) {
      case 'ACCEPTED':
        return <Typography color='success.main'>You are friends</Typography>
      case 'PENDING':
        return (
          <Typography color='warning.main'>Friend request pending</Typography>
        )
      case 'DECLINED':
        return (
          <Typography color='error.main'>Friend request declined</Typography>
        )
      default:
        return null
    }
  }

  // ==============================
  // 🎯 LÓGICA DE BOTÕES
  // ==============================
  const handleFriendAction = async (
    action: 'add' | 'remove' | 'accept' | 'decline' | 'cancel',
  ) => {
    try {
      await onFriendAction(action, user?.id as string, peopleId, friendshipId)

      switch (action) {
        case 'add':
          setFriendshipStatus('PENDING')
          setFriendshipId(friendshipId ?? 'temp-id') // 🔹 define um ID provisório
          // 🔹 cria um "friendship" virtual para que o botão entenda que VOCÊ é o requester
          peopleData.friendship = {
            id: friendshipId ?? 'temp-id',
            requesterId: user?.id as string,
            addresseeId: peopleId,
            status: 'PENDING',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
          toast.success('Friend request sent!', { position: 'bottom-right' })
          break

        case 'cancel':
          setFriendshipStatus(null)
          setFriendshipId(null)
          peopleData.friendship = null // 🔹 limpa a amizade simulada
          toast('Friend request canceled.', {
            icon: '❌',
            position: 'bottom-right',
          })
          break

        case 'remove':
          setFriendshipStatus(null)
          setFriendshipId(null)
          peopleData.friendship = null
          toast('You are no longer friends.', {
            icon: '👋',
            position: 'bottom-right',
          })
          break

        case 'accept':
          setFriendshipStatus('ACCEPTED')
          toast.success('Friend request accepted!', {
            position: 'bottom-right',
          })
          break

        case 'decline':
          setFriendshipStatus('DECLINED')
          toast.error('Friend request declined.', { position: 'bottom-right' })
          break
      }
    } catch (error) {
      console.error('❌ Error while performing friend action:', error)
      toast.error('Something went wrong. Try again later.', {
        position: 'bottom-right',
      })
    }
  }

  const renderFriendshipButton = () => {
    if (!friendshipStatus) {
      return (
        <Button
          variant='contained'
          color='primary'
          startIcon={<Icon icon='mdi:account-plus' fontSize={20} />}
          onClick={() => handleFriendAction('add')}
        >
          Send Friend Request
        </Button>
      )
    }

    switch (friendshipStatus) {
      case 'ACCEPTED':
        return (
          <Button
            variant='outlined'
            color='error'
            startIcon={<Icon icon='mdi:account-remove' fontSize={20} />}
            onClick={() => handleFriendAction('remove')}
          >
            Unfriend
          </Button>
        )

      case 'PENDING':
        // ✅ CHECAGEM ROBUSTA USANDO requestId do backend
        if (friendship?.requesterId === user?.id) {
          // ✅ EU ENVIEI → só botão de cancelar
          return (
            <Button
              variant='outlined'
              color='warning'
              startIcon={<Icon icon='mdi:account-clock' fontSize={20} />}
              onClick={() => handleFriendAction('cancel')}
            >
              Cancel Request
            </Button>
          )
        } else {
          // ✅ EU RECEBI → botões de aceitar/declinar
          return (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant='contained'
                color='success'
                startIcon={<Icon icon='mdi:account-check' fontSize={20} />}
                onClick={() => handleFriendAction('accept')}
              >
                Accept
              </Button>

              <Button
                variant='outlined'
                color='error'
                startIcon={<Icon icon='mdi:account-remove' fontSize={20} />}
                onClick={() => handleFriendAction('decline')}
              >
                Decline
              </Button>
            </Box>
          )
        }

      case 'DECLINED':
        return (
          <Button
            variant='contained'
            color='primary'
            startIcon={<Icon icon='mdi:account-plus' fontSize={20} />}
            onClick={() => handleFriendAction('add')}
          >
            Send Friend Request Again
          </Button>
        )

      default:
        return null
    }
  }

  return (
    <Card>
      <CardMedia
        component='img'
        alt='profile-header'
        image={people.banner ?? '/images/banners/banner-1.jpg'}
        sx={{ height: { xs: 150, md: 250 } }}
      />

      <CardContent
        sx={{
          pt: 0,
          mt: -8,
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' },
        }}
      >
        <ProfilePicture
          src={people.avatar ?? '/images/avatars/5.png'}
          alt='profile-picture'
        />

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: 'flex-end',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['center', 'space-between'],
          }}
        >
          {/* ✅ Nome + Status */}
          <Box
            sx={{
              mb: [6, 0],
              display: 'flex',
              flexDirection: 'column',
              alignItems: ['center', 'flex-start'],
            }}
          >
            <Typography variant='h5' sx={{ mb: 1 }}>
              {people.name}
            </Typography>
            {renderFriendshipStatus()}
          </Box>

          {/* ✅ Botões dinâmicos */}
          {renderFriendshipButton()}
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserPeopleHeader
