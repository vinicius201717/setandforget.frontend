/* eslint-disable no-unused-vars */
// ** React Imports
// import { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { PeopleProfileResponse } from 'src/context/types'
import { styled } from '@mui/material'
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'

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
    action: 'add' | 'remove' | 'accept' | 'decline',
    myId: string,
    peapleId: string,
    friendshipId: string | null,
  ) => void
}

const UserPeopleHeader = ({
  peopleData,
  peopleId,
  onFriendAction,
}: UserProfileHeaderProps) => {
  const { people, friendship } = peopleData

  const { user } = useAuth()

  const renderFriendshipStatus = () => {
    if (!friendship)
      return (
        <Typography color='text.secondary'>You are not friends yet</Typography>
      )

    switch (friendship.status) {
      case 'ACCEPTED':
        return <Typography color='success.main'>You are friends</Typography>
      case 'PENDING':
        return (
          <Typography color='warning.main'>
            Friendship request pending
          </Typography>
        )
      case 'DECLINED':
        return (
          <Typography color='error.main'>
            Friendship request declined
          </Typography>
        )
      default:
        return null
    }
  }

  const renderFriendshipButton = () => {
    if (!friendship) {
      return (
        <Button
          variant='contained'
          color='primary'
          startIcon={<Icon icon='mdi:account-plus' fontSize={20} />}
          onClick={() => {
            onFriendAction('add', user?.id as string, peopleId, null)
            toast.success('Friend request sent!', {
              position: 'bottom-right',
            })
          }}
        >
          Send Friend Request
        </Button>
      )
    }

    switch (friendship.status) {
      case 'ACCEPTED':
        return (
          <Button
            variant='outlined'
            color='error'
            startIcon={<Icon icon='mdi:account-remove' fontSize={20} />}
            onClick={() => {
              onFriendAction(
                'remove',
                user?.id as string,
                peopleId,
                friendship.id,
              )
              toast('You are no longer friends.', {
                icon: '👋',
                position: 'bottom-right',
              })
            }}
          >
            Unfriend
          </Button>
        )

      case 'PENDING':
        return (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant='contained'
              color='success'
              startIcon={<Icon icon='mdi:account-check' fontSize={20} />}
              onClick={() => {
                onFriendAction(
                  'accept',
                  user?.id as string,
                  peopleId,
                  friendship.id,
                )
                toast.success('Friend request accepted!', {
                  position: 'bottom-right',
                })
              }}
            >
              Accept
            </Button>

            <Button
              variant='outlined'
              color='error'
              startIcon={<Icon icon='mdi:account-remove' fontSize={20} />}
              onClick={() => {
                onFriendAction(
                  'decline',
                  user?.id as string,
                  peopleId,
                  friendship.id,
                )
                toast.error('Friend request declined.', {
                  position: 'bottom-right',
                })
              }}
            >
              Decline
            </Button>
          </Box>
        )

      case 'DECLINED':
        return (
          <Button
            variant='contained'
            color='primary'
            startIcon={<Icon icon='mdi:account-plus' fontSize={20} />}
            onClick={() => {
              onFriendAction('add', user?.id as string, peopleId, friendship.id)
              toast.success('Friend request sent again!', {
                position: 'bottom-right',
              })
            }}
          >
            Send Friend Request
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

          {renderFriendshipButton()}
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserPeopleHeader
