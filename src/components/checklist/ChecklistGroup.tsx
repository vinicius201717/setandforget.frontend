/* eslint-disable no-unused-vars */
'use client'

import React from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  FormControlLabel,
  Checkbox,
  Chip,
  Divider,
} from '@mui/material'

export interface ChecklistItem {
  id: string
  title: string
  description?: string
  weight: number
}

interface ChecklistGroupProps {
  group: string
  items: ChecklistItem[]
  checklist: Record<string, boolean>
  toggle: (id: string) => void
}

export default function ChecklistGroup({
  group,
  items,
  checklist,
  toggle,
}: ChecklistGroupProps) {
  return (
    <Box key={group} sx={{ mb: 2 }}>
      <Typography variant='h6' sx={{ mb: 1, fontWeight: 700 }}>
        {group}
      </Typography>

      <Grid container spacing={2}>
        {items.map((it) => (
          <Grid item xs={12} sm={6} key={it.id}>
            <Card
              sx={{
                p: 1,
                height: '100%',
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!checklist[it.id]}
                      onChange={() => toggle(it.id)}
                    />
                  }
                  label={
                    <Box>
                      <Typography variant='subtitle1'>{it.title}</Typography>
                      {it.description && (
                        <Typography variant='caption' color='text.secondary'>
                          {it.description}
                        </Typography>
                      )}
                    </Box>
                  }
                />

                <Box sx={{ ml: 'auto' }}>
                  <Chip label={`${it.weight}%`} size='small' />
                </Box>
              </Box>
            </Card>
            <Divider sx={{ my: 1 }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
