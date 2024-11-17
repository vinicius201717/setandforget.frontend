import { Button, keyframes, styled } from '@mui/material'

import ReceiptIcon from '@mui/icons-material/Receipt'

interface BoxContainerProps {
  open: boolean
}

export const BoxContainer = styled(Button)<BoxContainerProps>(({ open }) => ({
  position: 'fixed',
  bottom: '40px',
  right: '40px',
  height: '50px',
  width: '50px',
  borderRadius: '50%',

  display: open ? 'flex' : 'none',
}))

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`

export const IconeTicket = styled(ReceiptIcon)(({ theme }) => ({
  fontSize: '2.9rem',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '50%',
  padding: '6px',
  animation: `${pulse} 1.5s ease-in-out infinite`,
}))
