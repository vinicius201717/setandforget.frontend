/* eslint-disable no-unused-vars */
'use client'

import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  Box,
  Grid,
  Typography,
  useTheme,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { motion } from 'framer-motion'

interface PairSelectDialogProps {
  open: boolean
  onClose: () => void
  selectedPair: string
  pairSearch: string
  setPairSearch: (v: string) => void
  teacherPair: string[]
  filteredPairs: string[]
  handlePairSelect: (pair: string, teacherMode: boolean) => void
  isTeacherMode: boolean
}

export default function PairSelectDialog({
  open,
  onClose,
  selectedPair,
  pairSearch,
  setPairSearch,
  teacherPair,
  filteredPairs,
  handlePairSelect,
  isTeacherMode,
}: PairSelectDialogProps) {
  const theme = useTheme()

  // Filtro final
  const finalTeacherPairs = teacherPair.filter((p) =>
    p.toLowerCase().includes(pairSearch.toLowerCase()),
  )

  const finalNormalPairs = filteredPairs.filter((p) =>
    p.toLowerCase().includes(pairSearch.toLowerCase()),
  )

  // Tag animada
  const TeacherTag = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: -6, y: -6 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{ duration: 0.22 }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          bgcolor: theme.palette.primary.main,
          color: '#fff',
          px: 0.7,
          py: 0.2,
          borderBottomRightRadius: '6px',
          fontSize: '0.63rem',
          fontWeight: 700,
          zIndex: 2,
        }}
      >
        PROF
      </Box>
    </motion.div>
  )

  // Botão dos pares
  const PairButton = ({
    pair,
    isSelected,
    isTeacher,
  }: {
    pair: string
    isSelected: boolean
    isTeacher: boolean
  }) => (
    <Box sx={{ position: 'relative' }}>
      {isTeacher && <TeacherTag />}

      <Button
        variant={isSelected ? 'contained' : 'outlined'}
        color={isSelected ? 'primary' : 'inherit'}
        fullWidth
        onClick={() => handlePairSelect(pair, isTeacher)}
        sx={{
          textTransform: 'none',
          minHeight: 46,
          borderRadius: '10px',
          fontWeight: 600,
          transition: '0.25s ease',
          borderColor: isTeacher
            ? theme.palette.primary.main
            : 'rgba(255,255,255,0.25)',
          bgcolor: isSelected
            ? theme.palette.primary.main
            : 'rgba(255,255,255,0.03)',
        }}
      >
        {pair}
      </Button>
    </Box>
  )

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, p: 0.5 },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700 }}>Selecionar Par</DialogTitle>

      <DialogContent>
        {/* Buscar */}
        <TextField
          fullWidth
          variant='outlined'
          placeholder='Buscar par'
          value={pairSearch}
          onChange={(e) => setPairSearch(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Pares do Professor */}
        {finalTeacherPairs.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 'bold' }}>
              Pares do Professor
            </Typography>

            <Typography
              variant='caption'
              color='text.secondary'
              sx={{ mb: 2, display: 'block' }}
            >
              Selecionando qualquer par abaixo, você será corrigido se errar
              alguma confluência.
            </Typography>

            <Grid container spacing={1}>
              {finalTeacherPairs.map((pair, i) => (
                <Grid item xs={6} sm={4} md={3} key={i}>
                  <PairButton
                    pair={pair}
                    isSelected={selectedPair === pair && isTeacherMode === true}
                    isTeacher={true}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Todos os Pares */}
        <Box>
          <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 'bold' }}>
            Todos os Pares
          </Typography>

          <Typography
            variant='caption'
            color='text.secondary'
            sx={{ mb: 2, display: 'block' }}
          >
            Selecionando qualquer par abaixo, você NÃO será corrigido se errar
            alguma confluência.
          </Typography>

          <Grid container spacing={1}>
            <Grid container spacing={1}>
              {finalNormalPairs.map((pair, i) => (
                <Grid item xs={6} sm={4} md={3} key={i}>
                  <PairButton
                    pair={pair}
                    isSelected={
                      selectedPair === pair && isTeacherMode === false
                    }
                    isTeacher={false}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} sx={{ fontWeight: 600 }}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
