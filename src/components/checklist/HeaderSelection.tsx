'use client'

import React from 'react'
import {
  Stack,
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  useTheme,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { motion } from 'framer-motion'

interface HeaderSectionProps {
  userName?: string
  selectedPair: string
  operacaoPermitida: boolean
  onOpenPairModal: () => void
  isTeacherPair?: boolean // <- AGORA É ESTE
}

export default function HeaderSection({
  userName,
  selectedPair,
  operacaoPermitida,
  onOpenPairModal,
  isTeacherPair = false, // <- VALOR PADRÃO
}: HeaderSectionProps) {
  const theme = useTheme()

  // Agora usa APENAS o modo do professor
  const isTeacherMode = isTeacherPair

  const TeacherTag = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: -8, y: -8 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          bgcolor: theme.palette.primary.main,
          color: '#fff',
          px: 0.8,
          py: 0.2,
          borderBottomRightRadius: '8px',
          fontSize: '0.7rem',
          fontWeight: 700,
          zIndex: 2,
        }}
      >
        PROF
      </Box>
    </motion.div>
  )

  const SelectedPairDisplay = () => (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      {isTeacherMode && <TeacherTag />}

      <Box
        sx={{
          px: 6,
          py: 3,
          borderRadius: 1,
          border: '1px solid',
          borderColor: isTeacherMode
            ? theme.palette.primary.main
            : 'rgba(255,255,255,0.2)',
          color: isTeacherMode
            ? theme.palette.primary.main
            : theme.palette.text.primary,
          fontWeight: 700,
          fontSize: '1rem',
          position: 'relative',
          bgcolor: isTeacherMode
            ? theme.palette.primary.main + '15'
            : 'transparent',
          transition: '0.25s',
        }}
      >
        {selectedPair || 'Nenhum'}
      </Box>
    </Box>
  )

  return (
    <Stack
      direction='row'
      spacing={2}
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 2 }}
    >
      {/* Lado esquerdo */}
      <Box>
        <Stack direction='row' spacing={1} alignItems='center' sx={{ mt: 0.5 }}>
          {userName && (
            <Typography variant='body2' color='text.secondary'>
              {userName}
            </Typography>
          )}
        </Stack>

        <Typography variant='h5' sx={{ fontWeight: 700 }}>
          Checklist de Análise & Entrada — Set & Forget
        </Typography>

        <SelectedPairDisplay />
      </Box>

      {/* Lado direito */}
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
