/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material'

import toast from 'react-hot-toast'
import ComposerMediaPreview from './Composer/ComposerMediaPreview'
import ComposerToolbar from './Composer/ComposerToolbar'
import { useCreatePost } from './hooks/useCreatePost'

import {
  getSignedUploadUrl,
  uploadToSignedUrl,
} from 'src/pages/api/files/upload'

interface ReplyComposerProps {
  parentId: string | undefined
  onReplyCreated: (post: any) => void
}

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'video/mp4'])

export default function ReplyComposer({
  parentId,
  onReplyCreated,
}: ReplyComposerProps) {
  const { submit, loading: submitLoading } = useCreatePost()

  const [text, setText] = useState('')
  const [media, setMedia] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState('')
  const [uploadingLocal, setUploadingLocal] = useState(false)

  if (!parentId) return null

  // ✅ Quando arrasta/seleciona arquivos
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

  // ✅ Enviar resposta
  const handleSubmit = async () => {
    if (!text.trim()) return
    if (uploadingLocal || submitLoading) return

    setUploadingLocal(true)
    const toastId = toast.loading('Enviando resposta...', {
      position: 'bottom-right',
    })

    try {
      const finalMedia: any[] = []

      // ✅ Upload de arquivos
      for (const file of media) {
        const signed = await getSignedUploadUrl(file)
        await uploadToSignedUrl(signed.signedUrl, file)

        finalMedia.push({
          url: signed.publicUrl,
          type: file.type.startsWith('video') ? 'video' : 'image',
        })
      }

      // ✅ Adicionar URLs
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

      // ✅ Chamada para criar no backend
      const created = await submit(text, finalMedia, parentId, [], null)

      toast.dismiss(toastId)

      if (created) {
        toast.success('Comentário enviado!', { position: 'bottom-right' })
        onReplyCreated(created)
        setText('')
        setImageUrls('')
        setMedia([])
      } else {
        toast.error('Erro ao enviar comentário', { position: 'bottom-right' })
      }
    } catch (error) {
      toast.dismiss(toastId)
      toast.error('Falha ao enviar resposta.', { position: 'bottom-right' })
    } finally {
      setUploadingLocal(false)
    }
  }

  const isBusy = uploadingLocal || submitLoading

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 4,
        p: 2,
        borderRadius: 3,
        border: '1px solid rgba(0,0,0,0.1)',
      }}
    >
      <Typography sx={{ fontWeight: 600, mb: 1.5 }}>
        Responder ao post
      </Typography>

      {/* Texto */}
      <TextField
        fullWidth
        multiline
        minRows={3}
        placeholder='Escreva sua resposta...'
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* URLs */}
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

      {/* Preview */}
      <ComposerMediaPreview files={media} remove={removeMedia} />

      {/* Toolbar Upload */}
      <ComposerToolbar onSelectMedia={addMedia} />

      {/* Botão enviar */}
      <Button
        variant='contained'
        onClick={handleSubmit}
        disabled={isBusy}
        sx={{ mt: 2 }}
      >
        {isBusy ? 'Enviando...' : 'Responder'}
      </Button>

      {/* Overlay durante upload */}
      {isBusy && (
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            color: 'text.secondary',
          }}
        >
          <CircularProgress size={20} />
          <span>Enviando arquivos…</span>
        </Box>
      )}
    </Paper>
  )
}
