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
import { toast } from 'react-hot-toast'
import { Item, OperationType } from 'src/types/apps/operationType'

interface ChecklistGroupProps {
  group: string
  items: Item[]
  checklist: Record<string, boolean>
  toggle: (id: string) => void
  isTeacherPair?: boolean
  operationTeacherPair?: OperationType[] // vários pares
  selectedPair?: string // par atual selecionado
}

export default function ChecklistGroup({
  group,
  items,
  checklist,
  toggle,
  isTeacherPair = false,
  operationTeacherPair = [],
  selectedPair,
}: ChecklistGroupProps) {
  // pega apenas o item do professor referente ao par atual
  const teacherOpForCurrentPair = React.useMemo(() => {
    if (!isTeacherPair || !selectedPair) return null
    return operationTeacherPair.find((op) => op.pair === selectedPair) || null
  }, [isTeacherPair, selectedPair, operationTeacherPair])

  return (
    <Box key={group} sx={{ mb: 2 }}>
      <Typography variant='h6' sx={{ mb: 1, fontWeight: 700 }}>
        {group}
      </Typography>

      <Grid container spacing={2}>
        {items.map((it) => {
          const isUserChecked = !!checklist[it.id]

          // Agora checklist do professor é sempre um objeto
          const teacherChecklist =
            (teacherOpForCurrentPair?.checklist as Record<string, boolean>) ||
            {}

          const teacherMarked = teacherChecklist[it.id] === true

          const isDiffFromTeacher =
            isTeacherPair && isUserChecked && teacherMarked === false

          return (
            <Grid item xs={12} sm={6} key={it.id}>
              <Card
                sx={{
                  p: 1,
                  height: '100%',
                  borderRadius: 2,
                  border: isDiffFromTeacher
                    ? '2px solid #ffa726'
                    : '1px solid transparent',
                  boxShadow: isDiffFromTeacher
                    ? '0 0 0 3px rgba(255,167,38,0.25)'
                    : 'none',
                  transition: 'all .25s ease',
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
                        checked={isUserChecked}
                        onChange={() => {
                          if (
                            isTeacherPair &&
                            !teacherMarked &&
                            !isUserChecked
                          ) {
                            toast.error('O professor não selecionou este item.')
                          }

                          toggle(it.id)
                        }}
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
          )
        })}
      </Grid>
    </Box>
  )
}
