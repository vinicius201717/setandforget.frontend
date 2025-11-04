'use client'

import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from '@mui/material'
import { CHECKLIST } from 'src/utils/checklist'

interface ResumoDialogProps {
  open: boolean
  onClose: () => void
  checklist: Record<string, boolean>
  totalPeso: number
  percentual: number
  grade: string
  rr: number
}

export default function ResumoDialog({
  open,
  onClose,
  checklist,
  totalPeso,
  percentual,
  grade,
  rr,
}: ResumoDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>Resumo da Análise</DialogTitle>
      <DialogContent>
        <Typography variant='subtitle1' gutterBottom>
          Detalhamento por item
        </Typography>
        <Table size='small'>
          <TableBody>
            {CHECKLIST.map((it) => (
              <TableRow key={it.id}>
                <TableCell>{it.title}</TableCell>
                <TableCell align='right'>{it.weight}%</TableCell>
                <TableCell align='right'>
                  {checklist[it.id] ? '✔' : '—'}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <strong>Total (peso)</strong>
              </TableCell>
              <TableCell align='right'>
                <strong>{totalPeso}%</strong>
              </TableCell>
              <TableCell align='right'>
                <strong>{percentual}%</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box sx={{ mt: 2 }}>
          <Typography variant='subtitle2'>Interpretação</Typography>
          <Typography variant='body2' sx={{ mt: 1 }}>
            Nota: <strong>{grade}</strong>.{' '}
            {rr < 2
              ? 'RR insuficiente — entrada proibida.'
              : 'RR em termos aceitáveis.'}
          </Typography>
          <Typography variant='body2' sx={{ mt: 1 }}>
            Se a nota for A+ ou B+ e o horário permitir, você tem uma
            configuração de alta probabilidade — alinhe SL/TP conforme sua
            regra.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  )
}
