// ** React Imports
// import { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { UserDataType } from 'src/context/types'
import Link from 'next/link'

// ** Types
// import { ProfileHeaderType } from 'src/types/apps/userTypes'

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
  userData: UserDataType
}

const UserProfileHeader = ({ userData }: UserProfileHeaderProps) => {
  const designationIcon = 'mdi:briefcase-outline'

  return (
    <Card>
      <CardMedia
        component='img'
        alt='profile-header'
        image={
          userData.banner ? userData.banner : '/images/banners/banner-1.jpg'
        }
        sx={{
          height: { xs: 150, md: 250 },
        }}
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
          src={userData.avatar ? userData.avatar : '/images/avatars/5.png'}
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
            <Typography variant='h5' sx={{ mb: 4 }}>
              {userData.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start'],
              }}
            >
              <Box
                sx={{
                  mr: 5,
                  display: 'flex',
                  alignItems: 'center',
                  '& svg': { mr: 1, color: 'text.secondary' },
                }}
              >
                <Icon icon={designationIcon} />
                <Typography
                  sx={{ ml: 1, color: 'text.secondary', fontWeight: 600 }}
                >
                  {userData.role.charAt(0).toUpperCase() +
                    userData.role.slice(1)}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Link href='/pages/account-settings/account/'>
            <Button
              variant='contained'
              startIcon={<Icon icon='mdi:cog' fontSize={20} />}
            >
              Settings
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserProfileHeader
