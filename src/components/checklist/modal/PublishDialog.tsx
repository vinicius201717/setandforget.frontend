/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material'
import { Controller, Control, SubmitHandler } from 'react-hook-form'

interface PublishDialogProps {
  open: boolean
  onClose: () => void
  handleSubmit: (
    callback: SubmitHandler<any>,
  ) => (e?: React.BaseSyntheticEvent) => void
  onSubmitPublish: SubmitHandler<any>
  control: Control<any>
}

export default function PublishDialog({
  open,
  onClose,
  handleSubmit,
  onSubmitPublish,
  control,
}: PublishDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Publicar Operação</DialogTitle>

      <DialogContent>
        <form id='publish-form' onSubmit={handleSubmit(onSubmitPublish)}>
          {/* Campo de notas */}
          <Controller
            name='notes'
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Notas adicionais (opcional)'
                multiline
                rows={4}
                fullWidth
                margin='normal'
                variant='outlined'
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          {/* Campo de link */}
          <Controller
            name='link'
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Link da postagem (opcional)'
                fullWidth
                margin='normal'
                variant='outlined'
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button type='submit' form='publish-form' variant='contained'>
          Publicar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
