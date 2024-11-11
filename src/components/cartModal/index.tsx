// src/components/CustomModal.tsx

import React from 'react'
import { Modal, Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { BoxContainer } from './style'

type CartModalProps = {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

const CartModal: React.FC<CartModalProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <BoxContainer>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          {title && (
            <Typography id='modal-title' variant='h6' component='h2'>
              {title}
            </Typography>
          )}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box id='modal-description'>{children}</Box>
      </BoxContainer>
    </Modal>
  )
}

export default CartModal
