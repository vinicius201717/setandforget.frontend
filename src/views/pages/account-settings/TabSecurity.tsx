// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import TableContainer from '@mui/material/TableContainer'

// ** Custom Components Imports

// ** Demo Components
import ChangePasswordCard from 'src/views/pages/account-settings/security/ChangePasswordCard'
import TwoFactorAuthentication from 'src/views/pages/account-settings/security/TwoFactorAuthentication'
import { useAuth } from 'src/hooks/useAuth'
import { format } from 'date-fns'
import { getBrowserIconByDeviceName } from 'src/utils/browserIconByDeviceName'
import { Icon } from '@iconify/react'
import { logoutDevice } from 'src/pages/api/devices/logoutDevices'
import toast from 'react-hot-toast'
import { useState } from 'react'

const TabSecurity = () => {
  const auth = useAuth()

  const [devices, setDevices] = useState(auth.user?.UserDevices)

  const onLogoutDevice = (id: string) => {
    logoutDevice(id)
      .then(() => {
        const updatedDevices = devices?.filter((device) => device.id !== id)
        setDevices(updatedDevices)
        toast.success('Device removed successfully', {
          position: 'bottom-right',
        })
      })
      .catch((error) => {
        toast.error('Error to remove device', {
          position: 'bottom-right',
        })
        console.error(error)
      })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ChangePasswordCard />
      </Grid>
      <Grid item xs={12}>
        <TwoFactorAuthentication />
      </Grid>
      {/* Recent Devices Card */}
      {devices && devices.length > 0 ? (
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Recent Devices' />
            <TableContainer>
              <Table>
                <TableHead
                  sx={{ backgroundColor: 'customColors.tableHeaderBg' }}
                >
                  <TableRow>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>Browser</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>Device</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      Registration Date
                    </TableCell>
                    <TableCell align='right' sx={{ whiteSpace: 'nowrap' }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {auth.user?.UserDevices
                    ? auth.user.UserDevices.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {getBrowserIconByDeviceName(row.os.split(' ')[0])}
                              <Typography sx={{ whiteSpace: 'nowrap' }}>
                                {row.os}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant='body2'
                              sx={{ whiteSpace: 'nowrap' }}
                            >
                              {row.browser}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant='body2'
                              sx={{ whiteSpace: 'nowrap' }}
                            >
                              {format(
                                new Date(row.created_at),
                                'd, MMMM yyyy HH:mm',
                              )}
                            </Typography>
                          </TableCell>
                          <TableCell
                            onClick={() => onLogoutDevice(row.id)}
                            align='right'
                            sx={{ cursor: 'pointer' }}
                          >
                            <Icon
                              icon='mdi:logout'
                              fontSize={30}
                              color='#FF7F50 '
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      ) : null}
    </Grid>
  )
}
export default TabSecurity
