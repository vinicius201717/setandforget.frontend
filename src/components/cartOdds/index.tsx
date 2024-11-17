// src/components/Cart.tsx

import React from 'react'
import { useCart } from 'src/context/CartOddsContext'
import { Modal, Box, Typography, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { BoxContainer, TicketContainer } from './style'
import CartOddsTicket from './CartOddsTickt'

type CartModalProps = {
  open: boolean
  onClose: () => void
}

const Cart: React.FC<CartModalProps> = ({ open, onClose }) => {
  const { items, clearCart, totalAmount } = useCart()

  return (
    <Modal open={open} onClose={onClose} aria-labelledby='cart-modal-title'>
      <BoxContainer onClick={(event) => event.stopPropagation()}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>

        <TicketContainer>
          {items.map((item, key) => (
            <CartOddsTicket
              key={key}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              fixture={item.fixture}
              oddId={item.oddId}
              fixtureId={item.fixtureId}
              odd={item.odd}
            />
          ))}
        </TicketContainer>
        <Typography variant='body1' mt={2}>
          Total: R$ {totalAmount.toFixed(2)}
        </Typography>
        <Box display='flex' justifyContent='space-between' mt={3}>
          <Button variant='outlined' color='primary' onClick={clearCart}>
            Limpar Carrinho
          </Button>
        </Box>
      </BoxContainer>
    </Modal>
  )
}

export default Cart
