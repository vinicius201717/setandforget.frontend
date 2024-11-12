// src/components/Cart.tsx

import React from 'react'
import { useCart } from 'src/context/CartOddsContext'
import { Modal, Box, Typography, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { BoxContainer } from './style'

type CartModalProps = {
  open: boolean
  onClose: () => void
}

const Cart: React.FC<CartModalProps> = ({ open, onClose }) => {
  const { items, removeItem, clearCart, totalAmount } = useCart()

  return (
    <Modal open={open} onClose={onClose} aria-labelledby='cart-modal-title'>
      <Box>
        <BoxContainer>
          <Typography id='cart-modal-title' variant='h6'>
            Meu Carrinho
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </BoxContainer>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - R$ {item.price.toFixed(2)} x {item.quantity}
              <Button
                variant='text'
                color='error'
                onClick={() => removeItem(item.id)}
                sx={{ ml: 1 }}
              >
                Remover
              </Button>
            </li>
          ))}
        </ul>
        <Typography variant='body1' mt={2}>
          Total: R$ {totalAmount.toFixed(2)}
        </Typography>
        <Box display='flex' justifyContent='space-between' mt={3}>
          <Button variant='outlined' color='primary' onClick={clearCart}>
            Limpar Carrinho
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default Cart
