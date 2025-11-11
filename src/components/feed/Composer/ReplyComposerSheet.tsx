/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'

import ComposerMediaPreview from '../Composer/ComposerMediaPreview'
import ComposerToolbar from '../Composer/ComposerToolbar'
import { useCreatePost } from '../hooks/useCreatePost'
import {
  getSignedUploadUrl,
  uploadToSignedUrl,
} from 'src/pages/api/files/upload'

import { Post } from 'src/types/apps/feedType'

interface ReplyComposerProps {
  open: boolean
  onClose: () => void
  parentPost: Post | null
  onReplyCreated: (newReply: Post) => void
}

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'video/mp4'])

export default function ReplyComposerSheet({
  open,
  onClose,
  parentPost,
  onReplyCreated,
}: ReplyComposerProps) {
  const { submit, loading: submitLoading } = useCreatePost()

  const [uploadingLocal, setUploadingLocal] = useState(false)
  const [text, setText] = useState('')
  const [media, setMedia] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState('')

  if (!parentPost) return null

  /** Adicionar mídias */
  const addMedia = (files: File[]) => {
    const accepted: File[] = []
    const rejected: File[] = []

    files.forEach((f) => {
      if (ALLOWED_MIME.has(f.type)) accepted.push(f)
      else rejected.push(f)
    })

    if (rejected.length > 0)
      toast.error(
        `Arquivos rejeitados: ${rejected.map((r) => r.name).join(', ')}`,
        { position: 'bottom-right' },
      )

    if (accepted.length > 0) setMedia((prev) => [...prev, ...accepted])
  }

  const removeMedia = (i: number) => {
    setMedia((prev) => prev.filter((_, idx) => idx !== i))
  }

  /** Submit */
  const handleSubmit = async () => {
    if (!text.trim()) return
    if (uploadingLocal || submitLoading) return

    setUploadingLocal(true)
    const toastId = toast.loading('Enviando resposta...', {
      position: 'bottom-right',
    })

    try {
      const finalMedia: any[] = []

      // ✅ Upload local de arquivos
      for (const file of media) {
        const signed = await getSignedUploadUrl(file)
        await uploadToSignedUrl(signed.signedUrl, file)

        finalMedia.push({
          url: signed.publicUrl,
          type: file.type.startsWith('video') ? 'video' : 'image',
        })
      }

      // ✅ URLs manuais
      if (imageUrls.trim().length > 0) {
        const links = imageUrls
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean)
          .map((url) => ({
            url,
            type: url.match(/\.(mp4|mov)$/i) ? 'video' : 'link',
          }))

        finalMedia.push(...links)
      }

      const created = await submit(text, finalMedia, parentPost.id, [], null)

      toast.dismiss(toastId)

      if (created) {
        toast.success('Comentário enviado!', { position: 'bottom-right' })
        onReplyCreated(created)
        setText('')
        setImageUrls('')
        setMedia([])
        onClose()
      } else {
        toast.error('Erro ao enviar comentário', { position: 'bottom-right' })
      }
    } catch (error) {
      console.error(error)
      toast.dismiss(toastId)
      toast.error('Falha ao enviar resposta.', { position: 'bottom-right' })
    } finally {
      setUploadingLocal(false)
    }
  }

  const isBusy = uploadingLocal || submitLoading

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Responder</DialogTitle>

      <DialogContent dividers>
        <Box
          sx={{
            p: 2,
            mb: 1.5,
            borderRadius: 2,
            fontSize: 14,
            bgcolor: 'action.hover',
          }}
        >
          {parentPost.text}
        </Box>

        <Link
          href={`/pages/feed/${parentPost.id}`}
          style={{ textDecoration: 'none' }}
        >
          <Typography
            sx={{
              color: 'primary.main',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              mb: 2,
              '&:hover': { color: 'primary.dark' },
            }}
          >
            Ver todas as respostas →
          </Typography>
        </Link>

        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder='Escreva sua resposta...'
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* URLs manuais */}
        <TextField
          fullWidth
          multiline
          minRows={2}
          label='URLs das imagens (uma por linha)'
          placeholder='https://exemplo.com/img.png'
          value={imageUrls}
          onChange={(e) => setImageUrls(e.target.value)}
          sx={{ mb: 2 }}
        />

        <ComposerMediaPreview files={media} remove={removeMedia} />
        <ComposerToolbar onSelectMedia={addMedia} />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isBusy}>
          Cancelar
        </Button>
        <Button variant='contained' onClick={handleSubmit} disabled={isBusy}>
          {isBusy ? 'Enviando...' : 'Responder'}
        </Button>
      </DialogActions>

      {/* Overlay de upload */}
      {isBusy && (
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 1400,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(2px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}
        >
          <CircularProgress />
          <Box sx={{ mt: 2 }}>Enviando arquivos…</Box>
        </Box>
      )}
    </Dialog>
  )
}
