// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { usePresence } from 'src/context/PresenceContext'
import { OnlineUser } from 'src/context/types'
import Link from 'next/link'

interface CellType {
  row: OnlineUser
}

const AnalyticsTable = () => {
  const { onlineUsers } = usePresence()

  const columns: GridColDef[] = [
    {
      flex: 0.25,
      field: 'name',
      minWidth: 200,
      headerName: 'Name',
      renderCell: ({ row }: CellType) => (
        <Link
          href={`/pages/people/${row.friendId}`}
          style={{ textDecoration: 'none' }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit', // mantém a cor do texto normal
            }}
          >
            <CustomAvatar
              skin='light'
              sx={{ mr: 3, width: 30, height: 30, fontSize: '.8rem' }}
            >
              {getInitials(row.name || 'JD')}
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
                {row.name || 'John Doe'}
              </Typography>
              <Typography
                variant='body2'
                sx={{ fontSize: '0.75rem', letterSpacing: '0.4px' }}
              >
                Online
              </Typography>
            </Box>
          </Box>
        </Link>
      ),
    },

    {
      flex: 0.2,
      minWidth: 140,
      field: 'status',
      headerName: 'Status',
      renderCell: () => (
        <CustomChip
          skin='light'
          label='Online'
          color='success'
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
        Friendships
      </Typography>
      <DataGrid
        autoHeight
        hideFooter
        rows={onlineUsers}
        columns={columns}
        getRowId={(row) => row.friendId}
        disableRowSelectionOnClick
      />
    </Card>
  )
}

export default AnalyticsTable
