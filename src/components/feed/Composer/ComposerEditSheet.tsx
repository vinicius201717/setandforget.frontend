/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  CircularProgress,
} from '@mui/material'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ComposerToolbar from './ComposerToolbar'
import ComposerMediaPreview from './ComposerMediaPreview'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  getSignedUploadUrl,
  uploadToSignedUrl,
} from 'src/pages/api/files/upload'
import updatePost from 'src/pages/api/feed/updatePost'
import { Post } from 'src/types/apps/feedType'

interface EditSheetProps {
  open: boolean
  onClose: () => void
  post: Post | null
  onPostUpdated: (updated: Post) => void
}

const schema = z.object({
  text: z.string().min(1, 'O texto é obrigatório'),
  tags: z.string().optional(),
  pair: z.string().optional(),
  imageUrls: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'video/mp4'])

export default function ComposerEditSheet({
  open,
  onClose,
  post,
  onPostUpdated,
}: EditSheetProps) {
  const [mediaLocal, setMediaLocal] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      text: '',
      tags: '',
      pair: '',
      imageUrls: '',
    },
  })

  // ✅ Carrega infos iniciais quando abrir
  useEffect(() => {
    if (post && open) {
      reset({
        text: post.text ?? '',
        tags: post.tags.join(', '),
        pair: post.pair ?? '',
        imageUrls: '',
      })
      setMediaLocal([])
    }
  }, [post, open])

  const addMedia = (files: File[]) => {
    const accepted: File[] = []
    const rejected: File[] = []

    files.forEach((f) => {
      if (ALLOWED_MIME.has(f.type)) accepted.push(f)
      else rejected.push(f)
    })

    if (rejected.length > 0) {
      toast.error(
        `Arquivos rejeitados: ${rejected.map((r) => r.name).join(', ')}`,
        { position: 'bottom-right' },
      )
    }

    if (accepted.length > 0) {
      setMediaLocal((prev) => [...prev, ...accepted])
    }
  }

  const removeMedia = (i: number) => {
    setMediaLocal((prev) => prev.filter((_, idx) => idx !== i))
  }

  const onSubmit = async (data: FormValues) => {
    if (!post) return

    setUploading(true)
    const toastId = toast.loading('Atualizando...', {
      position: 'bottom-right',
    })

    try {
      // ✅ Começa com mídia existente, porém limpa campos indesejados
      const finalMedia: any[] = Array.isArray(post.media)
        ? post.media.map((m) => ({
            url: m.url,
            type: m.type,
          }))
        : []

      // ✅ Upload de novos arquivos
      for (const file of mediaLocal) {
        const signed = await getSignedUploadUrl(file)
        await uploadToSignedUrl(signed.signedUrl, file)

        finalMedia.push({
          url: signed.publicUrl,
          type: file.type.startsWith('video') ? 'video' : 'image',
        })
      }

      // ✅ URLs manuais
      if (data.imageUrls) {
        const links = data.imageUrls
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean)
          .map((url) => ({
            url,
            type: url.match(/\.(mp4|mov)$/i) ? 'video' : 'link',
          }))

        finalMedia.push(...links)
      }

      const tagsArray =
        data.tags
          ?.toUpperCase()
          .replace(/\s+/g, ' ')
          .replace(/,/g, ' ')
          .trim()
          .split(' ')
          .filter(Boolean) ?? []

      const updated = await updatePost(post.id, {
        text: data.text,
        pair: data.pair || null,
        tags: tagsArray,
        media: finalMedia, // ✅ agora só tem url e type
      })

      toast.dismiss(toastId)
      toast.success('Post atualizado!', { position: 'bottom-right' })

      onPostUpdated(updated.data)
      onClose()
    } catch (err) {
      toast.dismiss(toastId)
      toast.error('Falha ao atualizar o post', { position: 'bottom-right' })
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const isBusy = uploading

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Editar Post</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <TextField
            {...register('text')}
            multiline
            minRows={3}
            fullWidth
            placeholder='Edite seu post'
            error={!!errors.text}
            helperText={errors.text?.message}
          />

          <TextField
            {...register('tags')}
            fullWidth
            label='Tags'
            placeholder='FOREX, EURUSD'
            sx={{ mt: 2 }}
          />

          <TextField
            {...register('pair')}
            fullWidth
            label='Par'
            placeholder='EUR/USD'
            sx={{ mt: 2 }}
          />

          <TextField
            {...register('imageUrls')}
            fullWidth
            multiline
            minRows={3}
            label='URLs das imagens (uma por linha)'
            placeholder='https://site.com/img1.jpg'
            sx={{ mt: 2 }}
          />

          {/* Mídias existentes */}
          {post?.media && post.media.length > 0 && (
            <Box sx={{ mt: 2, opacity: 0.7, fontSize: 13 }}>
              Mídias atuais (não removíveis ainda)
            </Box>
          )}

          {/* Novos uploads */}
          <ComposerMediaPreview files={mediaLocal} remove={removeMedia} />

          <ComposerToolbar onSelectMedia={addMedia} />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={isBusy}>
            Cancelar
          </Button>
          <Button type='submit' variant='contained' disabled={isBusy}>
            {isBusy ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogActions>
      </form>

      {isBusy && (
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 1400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Dialog>
  )
}
