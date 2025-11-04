'use client'

import React from 'react'
import { Stack, Box, Typography, Button, Chip, IconButton } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

interface HeaderSectionProps {
  userName?: string
  selectedPair: string
  operacaoPermitida: boolean
  onOpenPairModal: () => void
}

export default function HeaderSection({
  userName,
  selectedPair,
  operacaoPermitida,
  onOpenPairModal,
}: HeaderSectionProps) {
  return (
    <Stack
      direction='row'
      spacing={2}
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 2 }}
    >
      <Box>
        <Typography variant='h5' sx={{ fontWeight: 700 }}>
          Checklist de Análise & Entrada — Set & Forget
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
          {userName ? `${userName} •` : ''} Par selecionado:{' '}
          <strong>{selectedPair}</strong>
        </Typography>
      </Box>

      <Stack direction='row' spacing={1} alignItems='center'>
        <Button variant='outlined' onClick={onOpenPairModal}>
          Selecionar Par
        </Button>
        <Chip
          label={operacaoPermitida ? 'Entrada Permitida' : 'Entrada Bloqueada'}
          color={operacaoPermitida ? 'success' : 'error'}
        />
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Stack>
    </Stack>
  )
}
