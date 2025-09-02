/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { createRating } from 'src/pages/api/rating/createRating'

// 1️⃣ Schema de validação Zod
const usernameSchema = z.object({
  userName: z.string().min(3, 'Username must be at least 3 characters'),
})

type UsernameForm = z.infer<typeof usernameSchema>

interface UsernameModalProps {
  open: boolean
  onClose: () => void
}

const ModalUserChess: React.FC<UsernameModalProps> = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UsernameForm>({
    resolver: zodResolver(usernameSchema),
  })

  const submitForm = async (data: UsernameForm) => {
    setLoading(true)
    try {
      await createRating(data.userName)
      toast.success('Username submitted successfully!', {
        position: 'bottom-right',
      })
      reset()
      onClose()
    } catch (err) {
      toast.error('Failed to submit username. Please try again.', {
        position: 'bottom-right',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Modal
        open={open}
        onClose={(event, reason) => {
          if (reason === 'backdropClick' || reason === 'escapeKeyDown') return
          onClose()
        }}
      >
        <Box
          sx={{
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
          }}
        >
          <Typography variant='h6' mb={2}>
            Chess.com Username Verification
          </Typography>
          <Typography variant='body2' mb={3}>
            Please enter your Chess.com username. For transparency and security,
            the username must match the one registered on the official Chess.com
            platform. Additionally, your account should be established on
            Chess.com for a significant period and have a history of multiple
            games. This ensures fair and accurate tracking of your ratings and
            statistics.
          </Typography>

          <form onSubmit={handleSubmit(submitForm)}>
            <Controller
              name='userName'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Username'
                  fullWidth
                  margin='normal'
                  error={!!errors.userName}
                  helperText={errors.userName?.message}
                />
              )}
            />
            <Button
              type='submit'
              variant='contained'
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default ModalUserChess
