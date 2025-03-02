// src/components/Cart.tsx

import React from 'react'
import { useCart } from 'src/context/CartOddsContext'
import { Modal, Box, Typography, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { BoxContainer, EndTextCard, TicketContainer } from './style'
import CartOddsTicket from './CartOddsTickt'

type CartModalProps = {
  open: boolean
  onClose: () => void
}

const Cart: React.FC<CartModalProps> = ({ open, onClose }) => {
  const { items, clearCart, totalAmount } = useCart()

  return (
    <Modal open={open} onClose={onClose} aria-labelledby='cart-modal-title'>
      {/* BoxContainer para impedir a propagação do clique */}
      <BoxContainer onClick={(event) => event.stopPropagation()}>
        {/* Botão para fechar o modal */}
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Lista de itens no carrinho */}
        <TicketContainer>
          {items.map((item, key) => (
            <CartOddsTicket
              key={key}
              price={item.price}
              quantity={item.quantity}
              bet={item.bet}
              fixtureStatus={item.fixtureStatus}
              fixture={item.fixture}
              oddId={item.oddId}
              fixtureId={item.fixtureId}
              odd={item.odd}
            />
          ))}
        </TicketContainer>

        {/* Total do carrinho */}
        <EndTextCard>
          <Typography variant='body1' mt={2}>
            Total: R$ {totalAmount.toFixed(2)}
          </Typography>

          {/* Botão para limpar o carrinho */}
          <Box display='flex' justifyContent='space-between' mt={3}>
            <Button variant='outlined' color='primary' onClick={clearCart}>
              Limpar Carrinho
            </Button>
          </Box>
        </EndTextCard>
      </BoxContainer>
    </Modal>
  )
}

export default Cart
