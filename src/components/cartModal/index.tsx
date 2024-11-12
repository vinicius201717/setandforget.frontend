// src/components/CustomModal.tsx

import React from 'react'
import { BoxContainer, IconeTicket } from './style'
import Cart from '../cartOdds'
import { Badge, IconButton } from '@mui/material'
import { useCart } from 'src/context/CartOddsContext'

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
  const { items } = useCart()
  return (
    <>
      <BoxContainer open={open} onClick={() => onOpenCardOdds()}>
        <IconButton aria-label='bet cart'>
          <Badge badgeContent={items.length} color='secondary'>
            <IconeTicket />
          </Badge>
        </IconButton>
      </BoxContainer>
      <Cart open={modalOpen} onClose={onCloseCardOdds} />
    </>
  )
}

export default CartModal
