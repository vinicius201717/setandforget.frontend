'use client'

import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@mui/material'

interface ResumoRapidoCardProps {
  totalPeso: number
  percentual: number
  grade: string
  rr: number | null
  operacaoPermitida: boolean
  onPublish: () => void
  onSaveDraft: () => void
}

export default function ResumoRapidoCard({
  totalPeso,
  percentual,
  grade,
  rr,
  operacaoPermitida,
  onPublish,
  onSaveDraft,
}: ResumoRapidoCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 6,
        position: { md: 'sticky' },
        top: 16,
      }}
    >
      <CardContent>
        <Typography variant='h6'>Resumo Rápido</Typography>
        <Divider sx={{ my: 1 }} />

        <Table size='small'>
          <TableBody>
            <TableRow>
              <TableCell>Confluência (peso somado)</TableCell>
              <TableCell align='right'>{totalPeso}%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Percentual Normalizado</TableCell>
              <TableCell align='right'>{percentual}%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Nota</TableCell>
              <TableCell align='right'>{grade}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>RR ≥ 2.0</TableCell>
              <TableCell align='right'>
                {rr === null ? '—' : rr >= 2 ? 'OK' : 'NÃO'}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Regra de horário</TableCell>
              <TableCell align='right'>
                {operacaoPermitida ? 'Permitido (04:00–13:00)' : 'Bloqueado'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <br />

        <Button variant='contained' sx={{ marginRight: 2 }} onClick={onPublish}>
          Publicar
        </Button>

        <Button variant='outlined' onClick={onSaveDraft}>
          Guardar rascunho
        </Button>
      </CardContent>
    </Card>
  )
}
