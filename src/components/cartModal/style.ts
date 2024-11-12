import { Button, styled } from '@mui/material'

import ReceiptIcon from '@mui/icons-material/Receipt'

interface BoxContainerProps {
  open: boolean
}

export const BoxContainer = styled(Button)<BoxContainerProps>(({ open }) => ({
  position: 'fixed',
  bottom: '40px',
  right: '40px',
  height: '30px',
  width: '30px',
  borderRadius: '50%',

  display: open ? 'flex' : 'none',
}))

export const IconeTicket = styled(ReceiptIcon)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  fontSize: '2rem',
}))
