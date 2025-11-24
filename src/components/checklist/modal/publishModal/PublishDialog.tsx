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
  MenuItem,
  Box,
  Typography,
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
  links: { link: string; text: string }[]
  onOpenImages: () => void // função para abrir o modal de imagens
}

export default function PublishDialog({
  open,
  onClose,
  handleSubmit,
  onSubmitPublish,
  control,
  links,
  onOpenImages,
}: PublishDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Publicar Operação</DialogTitle>

      <DialogContent>
        <form id='publish-form' onSubmit={handleSubmit(onSubmitPublish)}>
          {/* Notas */}
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

          {/* Botão para abrir modal de imagens */}
          <Box sx={{ display: 'flex', gap: 2, my: 1, alignItems: 'center' }}>
            <Button variant='outlined' onClick={onOpenImages}>
              Editar imagens (adicionar/editar múltiplas)
            </Button>
            <Typography>- {links.length} image</Typography>
          </Box>

          {/* Tipo de operação (compra/venda) */}
          <Controller
            name='type'
            control={control}
            rules={{ required: 'Selecione o tipo da operação' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                select
                label='Tipo da operação'
                fullWidth
                margin='normal'
                variant='outlined'
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              >
                <MenuItem value='buy'>Compra</MenuItem>
                <MenuItem value='sell'>Venda</MenuItem>
              </TextField>
            )}
          />

          {/* RR (string validated) */}
          <Controller
            name='totalRR'
            control={control}
            rules={{ required: 'Informe o RR' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='RR (use apenas números, ex: 2 ou 2.5)'
                fullWidth
                margin='normal'
                variant='outlined'
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          {/* Data e hora da ENTRADA da operação */}
          <Controller
            name='entryDate'
            control={control}
            rules={{ required: 'Informe o dia da entrada' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type='date'
                label='Dia da entrada'
                fullWidth
                margin='normal'
                variant='outlined'
                InputLabelProps={{ shrink: true }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name='entryTime'
            control={control}
            rules={{ required: 'Informe a hora da entrada' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type='time'
                label='Hora da entrada'
                fullWidth
                margin='normal'
                variant='outlined'
                InputLabelProps={{ shrink: true }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          {/* Data e hora da SAÍDA da operação */}
          <Controller
            name='exitDate'
            control={control}
            rules={{ required: 'Informe o dia da saída' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type='date'
                label='Dia da saída'
                fullWidth
                margin='normal'
                variant='outlined'
                InputLabelProps={{ shrink: true }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name='exitTime'
            control={control}
            rules={{ required: 'Informe a hora da saída' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type='time'
                label='Hora da saída'
                fullWidth
                margin='normal'
                variant='outlined'
                InputLabelProps={{ shrink: true }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name='result'
            control={control}
            rules={{ required: 'Selecione o resultado da operação' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                select
                label='Resultado da operação'
                fullWidth
                margin='normal'
                variant='outlined'
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              >
                <MenuItem value='take_profit'>take profit</MenuItem>
                <MenuItem value='stop_loss'>stop loss</MenuItem>
              </TextField>
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
