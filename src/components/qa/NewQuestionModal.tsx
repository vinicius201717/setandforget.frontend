import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from '@mui/material'
import { useState } from 'react'

interface Props {
  open: boolean
  onClose: () => void
}

export default function NewQuestionModal({ open, onClose }: Props) {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [image, setImage] = useState('')

  const handleSubmit = () => {
    console.log({ title, tags, image })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Nova Pergunta</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label='Título da pergunta'
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label='Tags (separe por vírgula)'
            fullWidth
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <TextField
            label='URL da imagem (opcional)'
            fullWidth
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant='contained'>
          Publicar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
