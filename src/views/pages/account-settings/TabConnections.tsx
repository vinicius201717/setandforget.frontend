/* eslint-disable react/no-unescaped-entities */
// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import {
  Dialog,
  DialogContent,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createSocialMedia } from 'src/pages/api/social-media/createSocialMedia'
import toast from 'react-hot-toast'
import { getSocialMedia } from 'src/pages/api/social-media/getSocialMedia'
import { deleteSocialMedia } from 'src/pages/api/social-media/deleteSocialMedia'
const socialMediaSchema = z.object({
  url: z.string().min(20, 'Invalid Url.'),
  name: z
    .enum(['INSTAGRAM', 'FACEBOOK', 'TIKTOK'])
    .refine((val) => ['INSTAGRAM', 'FACEBOOK', 'TIKTOK'].includes(val), {
      message:
        'You must choose a valid option between Instagram, Facebook and TikTok.',
    }),
})

type SocialMediaType = z.infer<typeof socialMediaSchema>

type SocialMediaResponseType = {
  id: string
  name: 'INSTAGRAM' | 'FACEBOOK' | 'TIKTOK'
  url: string
  createdAt: string
  updatedAt: string
}
const TabConnections = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [social, setSocial] = useState<SocialMediaResponseType[] | []>()

  // ** Hooks
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SocialMediaType>({ resolver: zodResolver(socialMediaSchema) })

  const toggle2FADialog = () => setOpen(!open)

  const close2FADialog = () => {
    toggle2FADialog()
  }

  const onAddSocialMedia = async (data: SocialMediaType) => {
    try {
      const response = await createSocialMedia(data)
      if (response !== null) {
        setSocial((prev) => {
          const safePrev = prev || []
          return [...safePrev, response]
        })
        toggle2FADialog()
        toast.success('Successfully registered social media', {
          position: 'bottom-right',
        })
      } else {
        toggle2FADialog()
        toast.error('No data returned, social media not registered', {
          position: 'bottom-right',
        })
      }
    } catch (error) {
      console.error('Error in registering social media:', error)
      toggle2FADialog()
      toast.error('Error registering social media', {
        position: 'bottom-right',
      })
    }
  }
  const onDeleteSocialMedia = (id: string) => {
    deleteSocialMedia(id).then((response) => {
      if (response) {
        toast.success('Social media successfully removed', {
          position: 'bottom-right',
        })
        setSocial((current) => current?.filter((item) => item.id !== id))
      } else {
        toast.error('Error removing social media.', {
          position: 'bottom-right',
        })
      }
    })
  }

  useEffect(() => {
    getSocialMedia().then((response) => {
      setSocial(response)
    })
  }, [])

  return (
    <Card>
      <Grid container spacing={5}>
        {/* Social Accounts Cards */}
        <Grid item xs={12} md={12}>
          <CardContent>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant='h6'>Social Accounts</Typography>
                <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                  Display content from social accounts on your site
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  onClick={toggle2FADialog}
                  type='submit'
                  variant='contained'
                  color='primary'
                >
                  To add
                </Button>
              </Box>
            </Box>
            {social && social.length > 0
              ? social.map((account: SocialMediaResponseType) => {
                  return (
                    <Box
                      key={account.id}
                      sx={{
                        gap: 2,
                        mt: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        '&:not(:last-of-type)': { mb: 4 },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            mr: 2.5,
                            minWidth: 45,
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          <img
                            src={`/images/logos/${account.name.toLowerCase()}.png`}
                            alt={account.name}
                            height='30'
                          />
                        </Box>
                        <div>
                          <Typography sx={{ fontWeight: 600 }}>
                            {account.name}
                          </Typography>
                          {account.url ? (
                            <Typography
                              href={account.url}
                              component={Link}
                              onClick={(e) => e.preventDefault()}
                              sx={{
                                color: 'text.disabled',
                                textDecoration: 'none',
                              }}
                            >
                              Connected
                            </Typography>
                          ) : (
                            <Typography sx={{ color: 'text.disabled' }}>
                              Not connected
                            </Typography>
                          )}
                        </div>
                      </Box>
                      <Button
                        onClick={() => onDeleteSocialMedia(account.id)}
                        variant='outlined'
                        sx={{ p: 1.5, minWidth: 38 }}
                        color='secondary'
                      >
                        <Icon icon={'mdi:delete-outline'} />
                      </Button>
                    </Box>
                  )
                })
              : ''}
          </CardContent>
        </Grid>
      </Grid>
      <Dialog fullWidth open={open} onClose={toggle2FADialog}>
        <DialogContent
          sx={{
            px: (theme) => [
              `${theme.spacing(5)} !important`,
              `${theme.spacing(15)} !important`,
            ],
            py: (theme) => [
              `${theme.spacing(8)} !important`,
              `${theme.spacing(12.5)} !important`,
            ],
          }}
        >
          <form onSubmit={handleSubmit(onAddSocialMedia)}>
            <Box sx={{ mb: 12, display: 'flex', justifyContent: 'center' }}>
              <Typography variant='h5' sx={{ fontSize: '1.625rem' }}>
                Connect your social account
              </Typography>
            </Box>

            <IconButton
              size='small'
              onClick={close2FADialog}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
              <Icon icon='mdi:close' />
            </IconButton>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <Select {...field} fullWidth size='small'>
                    <MenuItem value='FACEBOOK'>FACEBOOK</MenuItem>
                    <MenuItem value='INSTAGRAM'>INSTAGRAM</MenuItem>
                    <MenuItem value='TIKTOK'>TIKTOK</MenuItem>
                  </Select>
                )}
              />
              {errors.name?.message}
            </Grid>
            <Typography
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                marginBottom: '5px',
              }}
            >
              Paste your profile link
            </Typography>

            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel
                htmlFor='opt-phone-number'
                error={Boolean(errors.url)}
              >
                URL
              </InputLabel>
              <Controller
                name='url'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <OutlinedInput
                    type='string'
                    value={value}
                    onChange={onChange}
                    label='URL'
                    placeholder={'https://www.anything.com/youraccountid'}
                    error={Boolean(errors.url)}
                  />
                )}
              />
              {errors.url && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {errors.url.message}
                </FormHelperText>
              )}
            </FormControl>
            <Button type='submit' variant='contained' color='primary'>
              Apply
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
export default TabConnections
