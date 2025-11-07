// src/components/feed/composer/ComposerSheet.tsx
'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import ComposerToolbar from './ComposerToolbar'
import ComposerMediaPreview from './ComposerMediaPreview'
import { useCreatePost } from '../hooks/useCreatePost'

interface ComposerSheetProps {
  open: boolean
  onClose: () => void
  onPostCreated: () => void
  parentId?: string
}

export default function ComposerSheet({
  open,
  onClose,
  onPostCreated,
  parentId,
}: ComposerSheetProps) {
  const [text, setText] = useState('')
  const [media, setMedia] = useState<File[]>([])
  const { submit, loading } = useCreatePost()

  const addMedia = (files: File[]) => {
    setMedia((prev) => [...prev, ...files])
  }

  const removeMedia = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index))
  }

  const handleCreate = async () => {
    const created = await submit(text, media, parentId)

    if (created) {
      onPostCreated()
      setText('')
      setMedia([])
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Novo post</DialogTitle>

      <DialogContent dividers>
        <TextField
          multiline
          minRows={3}
          fullWidth
          placeholder='O que você está pensando?'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <ComposerMediaPreview files={media} remove={removeMedia} />
        <ComposerToolbar onSelectMedia={addMedia} />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant='contained'
          onClick={handleCreate}
          disabled={loading || (!text && media.length === 0)}
        >
          Publicar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
