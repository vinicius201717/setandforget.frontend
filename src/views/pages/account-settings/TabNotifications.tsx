/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  Grid,
  Card,
  Table,
  Select,
  Button,
  MenuItem,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  CardContent,
  TableContainer,
} from '@mui/material'
import { updateNotificationSettings } from 'src/pages/api/notification/updateNotificationSettings'
import toast from 'react-hot-toast'
import { getNotificationSettings } from 'src/pages/api/notification/getNotificationSettings'

const notificationSchema = z.object({
  newForYouEmail: z.boolean(),
  newForYouWhatsApp: z.boolean(),
  newForYouPhone: z.boolean(),
  newDeviceLoggedInEmail: z.boolean(),
  newDeviceLoggedInWhatsApp: z.boolean(),
  newDeviceLoggedInPhone: z.boolean(),
  depositOrWithdrawalEmail: z.boolean(),
  depositOrWithdrawalWhatsApp: z.boolean(),
  depositOrWithdrawalPhone: z.boolean(),
  notifyOnlyWhenOnline: z.enum(['ONLINE', 'ANYTIME']),
})

type TypeNotificationSettings = z.infer<typeof notificationSchema>

const TabNotifications = () => {
  const [initiaValues, setInitialValues] = useState<TypeNotificationSettings>()

  const { handleSubmit, control, reset } = useForm<TypeNotificationSettings>({
    defaultValues: {
      newForYouEmail: false,
      newForYouWhatsApp: false,
      newForYouPhone: false,
      newDeviceLoggedInEmail: false,
      newDeviceLoggedInWhatsApp: false,
      newDeviceLoggedInPhone: false,
      depositOrWithdrawalEmail: false,
      depositOrWithdrawalWhatsApp: false,
      depositOrWithdrawalPhone: false,
      notifyOnlyWhenOnline: 'ONLINE',
    },
    resolver: zodResolver(notificationSchema),
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await getNotificationSettings()
      if (response) {
        const formValues: TypeNotificationSettings = {
          newForYouEmail: response.newForYouEmail ?? false,
          newForYouWhatsApp: response.newForYouWhatsApp ?? false,
          newForYouPhone: response.newForYouPhone ?? false,
          newDeviceLoggedInEmail: response.newDeviceLoggedInEmail ?? false,
          newDeviceLoggedInWhatsApp:
            response.newDeviceLoggedInWhatsApp ?? false,
          newDeviceLoggedInPhone: response.newDeviceLoggedInPhone ?? false,
          depositOrWithdrawalEmail: response.depositOrWithdrawalEmail ?? false,
          depositOrWithdrawalWhatsApp:
            response.depositOrWithdrawalWhatsApp ?? false,
          depositOrWithdrawalPhone: response.depositOrWithdrawalPhone ?? false,
          notifyOnlyWhenOnline:
            (response.notifyOnlyWhenOnline as unknown as string) === 'ONLINE'
              ? 'ONLINE'
              : 'ANYTIME',
        }
        setInitialValues(formValues)
        reset(formValues)
      }
    }
    fetchData()
  }, [reset])

  const hasChanges = (
    oldValues: TypeNotificationSettings,
    newValues: TypeNotificationSettings,
  ): boolean => {
    const oldParsed = notificationSchema.parse(oldValues)
    const newParsed = notificationSchema.parse(newValues)

    return (Object.keys(oldParsed) as (keyof TypeNotificationSettings)[]).some(
      (key) => oldParsed[key] !== newParsed[key],
    )
  }

  const onSubmit = async (data: TypeNotificationSettings) => {
    if (hasChanges(initiaValues as TypeNotificationSettings, data)) {
      const response = await updateNotificationSettings(data)
      if (response && response.status === 200) {
        const { id, userId, createdAt, updatedAt, ...newValue } = response.data
        const correctedValue: TypeNotificationSettings = {
          ...newValue,
          notifyOnlyWhenOnline:
            newValue.notifyOnlyWhenOnline === 'ONLINE' ? 'ONLINE' : 'ANYTIME',
        }
        setInitialValues(correctedValue)
        toast.success('Successful update.', {
          position: 'bottom-right',
        })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader title='Recent Devices' sx={{ pb: 4 }} />
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>Email</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>WhatsApp</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={'newForYou'}>
                <TableCell>
                  <Typography sx={{ whiteSpace: 'nowrap' }}>
                    New for you
                  </Typography>
                </TableCell>
                <TableCell>
                  <Controller
                    name='newForYouEmail'
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value} />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Controller
                    name='newForYouWhatsApp'
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value} />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Controller
                    name='newForYouPhone'
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value} />
                    )}
                  />
                </TableCell>
              </TableRow>

              <TableRow key={'newDeviceIsLinked'}>
                <TableCell>
                  <Typography sx={{ whiteSpace: 'nowrap' }}>
                    A new device is linked
                  </Typography>
                </TableCell>
                <TableCell>
                  <Controller
                    name='newDeviceLoggedInEmail'
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value} />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Controller
                    name='newDeviceLoggedInWhatsApp'
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value} />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Controller
                    name='newDeviceLoggedInPhone'
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value} />
                    )}
                  />
                </TableCell>
              </TableRow>
              <TableRow key={'depositOrWithdrawal'}>
                <TableCell>
                  <Typography sx={{ whiteSpace: 'nowrap' }}>
                    Deposit or Withdrawal
                  </Typography>
                </TableCell>
                <TableCell>
                  <Controller
                    name='depositOrWithdrawalEmail'
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value} />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Controller
                    name='depositOrWithdrawalWhatsApp'
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value} />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Controller
                    name='depositOrWithdrawalPhone'
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value} />
                    )}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <CardContent>
          <Typography sx={{ mb: 6, fontWeight: 600, color: 'text.secondary' }}>
            When should we send you notifications?
          </Typography>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name='notifyOnlyWhenOnline'
                control={control}
                render={({ field }) => (
                  <Select {...field} fullWidth size='small'>
                    <MenuItem value='ONLINE'>Only when I'm online</MenuItem>
                    <MenuItem value='ANYTIME'>Anytime</MenuItem>
                  </Select>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' sx={{ mr: 4 }}>
                Save Changes
              </Button>
              <Button variant='outlined' color='secondary'>
                Discard
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  )
}

export default TabNotifications
