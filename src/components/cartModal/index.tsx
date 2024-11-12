// src/components/CustomModal.tsx

import React from 'react'
import { BoxContainer } from './style'
import Cart from '../cartOdds'
import { Badge, IconButton, useTheme } from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'

type CartModalProps = {
  open: boolean
  modalOpen: boolean
  onCloseCardOdds: () => void
  onOpenCardOdds: () => void
}

const CartModal: React.FC<CartModalProps> = ({
  open,
  modalOpen,
  onCloseCardOdds,
  onOpenCardOdds,
}) => {
  const theme = useTheme()

  return (
    <>
      <BoxContainer open={open} onClick={() => onOpenCardOdds()}>
        <IconButton aria-label='bet cart'>
          <Badge badgeContent={3} color='secondary'>
            <ReceiptIcon
              sx={{ fontSize: '4rem', color: theme.palette.primary.main }}
            />
          </Badge>
        </IconButton>
      </BoxContainer>
      <Cart open={modalOpen} onClose={onCloseCardOdds} />
    </>
  )
}

export default CartModal
