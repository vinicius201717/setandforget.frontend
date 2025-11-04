/* eslint-disable no-unused-vars */
'use client'

import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { AnalisesRegistradasCardProps } from 'src/types/apps/operationType'

export default function AnalisesRegistradasCard({
  analyses,
  loadAnalysis,
}: AnalisesRegistradasCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 6,
        position: { md: 'sticky' },
        top: 16,
      }}
    >
      <CardContent sx={{ mt: 3 }}>
        <Typography variant='subtitle2' gutterBottom>
          Análises Registradas
        </Typography>

        <List dense sx={{ maxHeight: 300, overflowY: 'auto' }}>
          {analyses.length > 0 ? (
            analyses.map((a, i) => (
              <ListItemButton key={i} onClick={() => loadAnalysis(a)}>
                <ListItemText primary={a.pair} secondary={a.date} />
              </ListItemButton>
            ))
          ) : (
            <Typography variant='body2' color='textSecondary'>
              Nenhuma análise registrada.
            </Typography>
          )}
        </List>
      </CardContent>
    </Card>
  )
}
