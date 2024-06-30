import React, { useState } from 'react'
import {
  Modal,
  Typography,
  Button,
  Slider,
  Box,
  TextField,
} from '@mui/material'
import { StyledBox } from './style'
import { times } from 'src/pages/chess/data/times'

interface FilterGlobalPlayersProps {
  open: boolean
  handleClose: () => void
  title: string
  children: React.ReactNode
}

function FilterGlobalPlayers({
  open,
  handleClose,
  title,
  children,
}: FilterGlobalPlayersProps) {
  const [amount, setAmount] = useState('')
  const [time, setTime] = useState<number | string | Array<number | string>>(
    times[0].value,
  )

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
      disableAutoFocus
    >
      <StyledBox>
        <Typography id='modal-title' variant='h6' component='h2'>
          {title}
        </Typography>
        <Box component='form' noValidate sx={{ mt: 1 }}>
          <Typography gutterBottom>
            Tempo de Duração: {times.find((t) => t.value === time)?.label}
          </Typography>
          <Slider
            value={typeof time === 'number' ? time : 0}
            onChange={(e, newValue) => setTime(newValue)}
            aria-labelledby='input-slider'
            step={null}
            marks={times.map(({ value }) => ({ value }))}
            min={times[0].value}
            max={times[times.length - 1].value}
            valueLabelDisplay='off'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='amount'
            label='Valor (R$)'
            name='amount'
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {children}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={() =>
              console.log(
                `Filtrando por tempo: ${time} segundos, Valor: ${amount}`,
              )
            }
          >
            Aplicar Filtro
          </Button>
          <Button fullWidth variant='text' onClick={handleClose}>
            Fechar
          </Button>
        </Box>
      </StyledBox>
    </Modal>
  )
}

export default FilterGlobalPlayers
