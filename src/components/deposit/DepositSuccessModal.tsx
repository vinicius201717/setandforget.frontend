import React, { useEffect, useState } from 'react'
import {
  Modal,
  Box,
  Typography,
  Button,
  LinearProgress,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material'
import { ContentCopy } from '@mui/icons-material'
import { QRCodeCanvas } from 'qrcode.react'
import toast from 'react-hot-toast'
import { DepositResponse } from 'src/pages/api/payment/deposit'
import { updateDeposit } from 'src/pages/api/payment/updateDeposit'

interface Props {
  open: boolean
  onClose: () => void
  response: DepositResponse
}

export default function DepositSuccessModal({
  open,
  onClose,
  response,
}: Props) {
  const pixCode = response?.response?.pixCode || ''
  const message =
    response?.response?.message || 'Transaction completed successfully.'
  const expire = response?.response?.expire || 300

  const [timeLeft, setTimeLeft] = useState(expire)

  useEffect(() => {
    if (!open) return
    setTimeLeft(expire)

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [open, expire])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixCode)
    toast.success('Pix code copied to clipboard!', { position: 'bottom-right' })
  }

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60)
    const sec = s % 60
    return `${min}:${sec < 10 ? '0' : ''}${sec}`
  }

  useEffect(() => {
    if (timeLeft === 290 && open) {
      updateDeposit(response.response?.id as string, 'FAILED')
      onClose()
    }
  }, [timeLeft, open, onClose, response])

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant='h6' gutterBottom>
          {message}
        </Typography>

        <Stack
          direction='column'
          alignItems='center'
          spacing={2}
          sx={{ my: 3 }}
        >
          <QRCodeCanvas value={pixCode} size={200} />
          <Typography variant='body2' textAlign='center'>
            Scan the QR Code or copy the code below:
          </Typography>

          <Stack direction='row' alignItems='center' spacing={1}>
            <Typography
              variant='body2'
              sx={{
                wordBreak: 'break-all',
                maxWidth: 360,
                height: 40,
                overflowY: 'auto',
                bgcolor: 'default',
                p: 1,
                borderRadius: 1,
                fontSize: '0.8rem',
              }}
            >
              {pixCode}
            </Typography>
            <Tooltip title='Copy'>
              <IconButton onClick={copyToClipboard} size='small'>
                <ContentCopy fontSize='small' />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Typography variant='body2' gutterBottom>
          Time remaining: <strong>{formatTime(timeLeft)}</strong>
        </Typography>
        <LinearProgress
          variant='determinate'
          value={((expire - timeLeft) / expire) * 100}
          sx={{ mb: 2 }}
        />

        <Button
          onClick={() => {
            if (pixCode) window.location.href = pixCode
            onClose()
          }}
          fullWidth
          variant='contained'
          color='primary'
        >
          I already paid
        </Button>
      </Box>
    </Modal>
  )
}
