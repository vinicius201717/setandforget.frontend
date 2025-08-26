/* eslint-disable react/no-unescaped-entities */
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

import { getInitials } from 'src/@core/utils/get-initials'
import { FriendshipChallengeType } from 'src/context/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getFriends } from 'src/pages/api/friendship/getFriends'
import { useAuth } from 'src/hooks/useAuth'
import { usePresence } from 'src/context/PresenceContext'

interface FriendWithPresence extends FriendshipChallengeType {
  friendId: string
  friendName: string
  presence: 'Online' | 'Offline'
}

interface CellType {
  row: FriendWithPresence
}

const FriendsTable = () => {
  const { onlineUsers } = usePresence()
  const { user } = useAuth()
  const [friends, setFriends] = useState<FriendWithPresence[]>([])

  useEffect(() => {
    if (!user?.id) return

    getFriends(user.id).then((response) => {
      // Mapeando os amigos e definindo friendId, friendName e presença
      const allFriends: FriendWithPresence[] = response.data.map(
        (friend: FriendshipChallengeType) => {
          const friendId =
            friend.requesterId === user.id
              ? friend.addresseeId
              : friend.requesterId
          const friendName =
            friend.requesterId === user.id
              ? friend.addressee.name
              : friend.requester.name

          const isOnline = onlineUsers.some(
            (online) => online.friendId === friendId,
          )

          return {
            ...friend,
            friendId,
            friendName,
            presence: isOnline ? 'Online' : 'Offline',
          }
        },
      )

      // Ordena Online antes de Offline
      const sorted = allFriends.sort((a, b) => {
        if (a.presence === b.presence) return 0
        return a.presence === 'Online' ? -1 : 1
      })

      setFriends(sorted)
    })
  }, [user, onlineUsers])

  // Colunas do DataGrid
  const columns: GridColDef[] = [
    {
      flex: 0.25,
      field: 'friendName',
      minWidth: 200,
      headerName: 'Name',
      renderCell: ({ row }: CellType) => (
        <Link
          href={`/pages/people/${row.friendId}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
            <CustomAvatar
              skin='light'
              sx={{ mr: 3, width: 30, height: 30, fontSize: '.8rem' }}
            >
              {getInitials(row.friendName || 'JD')}
            </CustomAvatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                sx={{
                  mb: -0.5,
                  fontWeight: 600,
                  lineHeight: 1.72,
                  fontSize: '0.875rem',
                  letterSpacing: '0.22px',
                }}
              >
                {row.friendName || 'John Doe'}
              </Typography>
              <Typography
                variant='body2'
                sx={{ fontSize: '0.75rem', letterSpacing: '0.4px' }}
              >
                {row.status}
              </Typography>
            </Box>
          </Box>
        </Link>
      ),
    },
    {
      flex: 0.2,
      minWidth: 140,
      field: 'presence',
      headerName: 'Status',
      renderCell: ({ row }: CellType) => (
        <CustomChip
          skin='light'
          label={row.presence}
          color={row.presence === 'Online' ? 'success' : 'default'}
          sx={{
            height: 24,
            fontSize: '0.75rem',
            textTransform: 'capitalize',
            '& .MuiChip-label': { fontWeight: 600, lineHeight: 1.4 },
          }}
        />
      ),
    },
  ]

  return (
    <Card>
      <Typography
        variant='h6'
        sx={{ p: 3, pt: 2, fontWeight: 600, letterSpacing: '0.15px' }}
      >
        Friends
      </Typography>

      {friends.length > 0 ? (
        <DataGrid
          autoHeight
          hideFooter
          rows={friends}
          columns={columns}
          getRowId={(row) => row.friendId}
          disableRowSelectionOnClick
        />
      ) : (
        <Box p={3}>
          <Typography variant='body2'>
            You haven't added any friends yet
          </Typography>
        </Box>
      )}
    </Card>
  )
}

export default FriendsTable
