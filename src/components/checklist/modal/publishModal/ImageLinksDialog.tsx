/* eslint-disable no-unused-vars */
import { Add, Remove } from '@mui/icons-material'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Box,
  Button,
  Typography,
  Paper,
  useTheme,
} from '@mui/material'
import { useState } from 'react'

interface ImagesModalProps {
  open: boolean
  onClose: () => void
  links: { link: string; text: string }[]
  setLinks: (v: { link: string; text: string }[]) => void
}

export function ImagesModal({
  open,
  onClose,
  links,
  setLinks,
}: ImagesModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const theme = useTheme()
  const updateBlock = (
    index: number,
    patch: Partial<{ link: string; text: string }>,
  ) => {
    const copy = [...links]
    copy[index] = { ...copy[index], ...patch }
    setLinks(copy)
  }

  const addBlock = () => {
    setLinks([...links, { link: '', text: '' }])
    setCurrentIndex(links.length) // Seleciona o novo bloco
  }

  const removeBlock = (index: number) => {
    const filtered = links.filter((_, i) => i !== index)
    setLinks(filtered)

    // Ajusta seleção visual
    if (currentIndex >= filtered.length) {
      setCurrentIndex(Math.max(0, filtered.length - 1))
    }
  }

  const current = links[currentIndex]

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>Imagens com textos explicativos</DialogTitle>

      {/* ░░ Visor superior da imagem selecionada ░░ */}
      <Box sx={{ p: 2 }}>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 2,
            textAlign: 'center',
            minHeight: 260,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {current?.link ? (
            <img
              alt='current'
              src={current.link}
              width={600}
              height={350}
              style={{
                objectFit: 'contain',
                borderRadius: 8,
                maxHeight: 260,
                width: '100%',
              }}
            />
          ) : (
            <Typography variant='body2' color='text.secondary'>
              Nenhuma imagem selecionada
            </Typography>
          )}

          {current?.text && (
            <Typography
              variant='body2'
              sx={{ mt: 1, whiteSpace: 'pre-line', opacity: 0.8 }}
            >
              {current.text}
            </Typography>
          )}
        </Paper>
      </Box>

      {/* ░░ Lista de blocos editáveis ░░ */}
      <DialogContent sx={{ pt: 2, pb: 10 }}>
        {links.map((b, i) => (
          <Box
            key={i}
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 2,
              border:
                i === currentIndex
                  ? `2px solid ${theme.palette.secondary.main}`
                  : `1px solid ${theme.palette.getContrastText(theme.palette.secondary.main)}`,
              backgroundColor:
                i === currentIndex
                  ? `${theme.palette.background.default}`
                  : `${theme.palette.background.paper}`,
              cursor: 'pointer',
            }}
            onClick={() => setCurrentIndex(i)}
          >
            <TextField
              label={`Link da imagem #${i + 1}`}
              value={b.link}
              onChange={(e) => updateBlock(i, { link: e.target.value })}
              fullWidth
              placeholder='https://...'
              sx={{ mb: 2 }}
            />

            <TextField
              label={`Texto explicativo #${i + 1}`}
              value={b.text}
              onChange={(e) => updateBlock(i, { text: e.target.value })}
              fullWidth
              multiline
              rows={3}
              placeholder='Explicação da imagem...'
            />

            {links.length > 1 && (
              <Box sx={{ textAlign: 'right', mt: 1 }}>
                <IconButton onClick={() => removeBlock(i)} title='Remover'>
                  <Remove />
                </IconButton>
              </Box>
            )}
          </Box>
        ))}
      </DialogContent>

      {/* ░░ Botão flutuante de adicionar (fixo no canto inferior direito) ░░ */}
      <Box
        sx={{
          position: 'absolute',
          right: 24,
          bottom: 70,
        }}
      >
        <Button
          variant='contained'
          color='primary'
          startIcon={<Add />}
          sx={{ borderRadius: '50px', px: 3 }}
          onClick={addBlock}
        >
          Adicionar imagem
        </Button>
      </Box>

      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  )
}
