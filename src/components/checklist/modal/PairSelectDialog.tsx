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
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface PairSelectDialogProps {
  open: boolean
  onClose: () => void
  selectedPair: string
  pairSearch: string
  setPairSearch: (v: string) => void
  professorPairs: string[]
  filteredPairs: string[]
  handlePairSelect: (pair: string) => void
}

export default function PairSelectDialog({
  open,
  onClose,
  selectedPair,
  pairSearch,
  setPairSearch,
  professorPairs,
  filteredPairs,
  handlePairSelect,
}: PairSelectDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Selecionar Par</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          variant='outlined'
          placeholder='Buscar par ou digite "professor"'
          value={pairSearch}
          onChange={(e) => setPairSearch(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {pairSearch.toLowerCase() === 'professor' ? (
            <Box>
              <Typography variant='subtitle2' sx={{ mb: 1 }}>
                Professor
              </Typography>
              <Grid container spacing={1}>
                {professorPairs.map((pair, i) => (
                  <Grid item xs={2.4} key={i}>
                    <Button
                      variant={selectedPair === pair ? 'contained' : 'text'}
                      color={selectedPair === pair ? 'primary' : 'inherit'}
                      fullWidth
                      sx={{ textTransform: 'none', minHeight: 40 }}
                      onClick={() => handlePairSelect(pair)}
                    >
                      {pair}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Box>
              <Typography variant='subtitle2' sx={{ mb: 1 }}>
                Todos os pares
              </Typography>
              <Grid container spacing={1}>
                {filteredPairs.map((pair, i) => (
                  <Grid item xs={2.4} key={i}>
                    <Button
                      variant={selectedPair === pair ? 'contained' : 'text'}
                      color={selectedPair === pair ? 'primary' : 'inherit'}
                      fullWidth
                      sx={{ textTransform: 'none', minHeight: 40 }}
                      onClick={() => handlePairSelect(pair)}
                    >
                      {pair}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  )
}
