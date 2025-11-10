/* eslint-disable @typescript-eslint/no-unused-vars */
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
  CircularProgress,
  Box,
} from '@mui/material'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ComposerToolbar from './ComposerToolbar'
import ComposerMediaPreview from './ComposerMediaPreview'
import { useState } from 'react'
import { useCreatePost } from '../hooks/useCreatePost'
import toast from 'react-hot-toast'
import {
  getSignedUploadUrl,
  uploadToSignedUrl,
} from 'src/pages/api/files/upload'
interface ComposerSheetProps {
  open: boolean
  onClose: () => void
  onPostCreated: (newPost: any) => void
  parentId?: string
}

const schema = z.object({
  text: z.string().min(1, 'O texto é obrigatório'),
  tags: z.string().optional(),
  pair: z.string().optional(),
  imageUrls: z.string().optional(), // várias URLs
})

type FormValues = z.infer<typeof schema>

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'video/mp4'])

export default function ComposerSheet({
  open,
  onClose,
  onPostCreated,
  parentId,
}: ComposerSheetProps) {
  const { submit, loading: submitLoading } = useCreatePost()

  // uploadingLocal = processo de upload de arquivos para o bucket (antes do submit ao servidor)
  const [uploadingLocal, setUploadingLocal] = useState(false)
  const [media, setMedia] = useState<File[]>([])

  const {
    register,
    watch,
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

  const imageUrlsValue = watch('imageUrls')

  // Filtra por tipo permitido e adiciona; mostra toast para arquivos rejeitados
  const addMedia = (files: File[]) => {
    const accepted: File[] = []
    const rejected: File[] = []

    files.forEach((f) => {
      if (ALLOWED_MIME.has(f.type)) accepted.push(f)
      else rejected.push(f)
    })

    if (rejected.length > 0) {
      toast.error(
        `Arquivos rejeitados (tipos permitidos: jpg, png, mp4). Ignorados ${rejected
          .map((r) => r.name)
          .join(', ')}`,
        { position: 'bottom-right' },
      )
    }

    if (accepted.length > 0) {
      setMedia((prev) => [...prev, ...accepted])
    }
  }

  const removeMedia = (i: number) => {
    setMedia((prev) => prev.filter((_, idx) => idx !== i))
  }

  const onSubmit = async (data: FormValues) => {
    if (uploadingLocal || submitLoading) return

    setUploadingLocal(true)
    const toastId = toast.loading('Publish', { position: 'bottom-right' })

    try {
      const finalMedia: any[] = []
      if (media.length > 0) {
        for (const file of media) {
          try {
            // pede signed url ao servidor
            const signedData = await getSignedUploadUrl(file)
            // signedData esperado: { signedUrl, path, publicUrl, mimeType }
            if (!signedData || !signedData.signedUrl || !signedData.publicUrl) {
              throw new Error('Resposta inválida ao solicitar signed url')
            }

            // upload para signed url
            await uploadToSignedUrl(signedData.signedUrl, file)

            // depois do PUT (sucesso), adiciona a publicUrl retornada pelo servidor
            finalMedia.push({
              url: signedData.publicUrl,
              type: file.type.startsWith('video') ? 'video' : 'image',
            })
          } catch (err) {
            console.error('Erro ao subir arquivo:', file.name, err)
            // opcional: você pode escolher continuar ou abortar todos. Aqui abortamos com erro.
            throw new Error(
              `Falha no upload do arquivo ${file.name}: ${String(err)}`,
            )
          }
        }
      }

      // 2) adicionar links colocados manualmente (uma URL por linha)
      if (data.imageUrls) {
        const links = data.imageUrls
          .split('\n')
          .map((line) => line.trim())
          .filter((url) => url.length > 0)
          .map((url) => ({
            url,
            type: url.match(/\.(mp4|mov)$/i) ? 'video' : 'link',
            source: 'link',
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

      const pair = data.pair?.toUpperCase()

      const created = await submit(
        data.text,
        finalMedia as any,
        parentId,
        tagsArray,
        pair || null,
      )

      toast.dismiss(toastId)

      if (created) {
        toast.success('Post publicado com sucesso!', {
          position: 'bottom-right',
        })
        onPostCreated(created)
        reset()
        setMedia([])
        onClose()
      } else {
        toast.error('Falha ao publicar o post.', { position: 'bottom-right' })
      }
    } catch (error) {
      console.error('Erro ao criar post:', error)
      toast.dismiss() // remove loading
      toast.error(
        typeof error === 'string'
          ? error
          : 'Ocorreu um erro ao publicar. Tente novamente.',
        { position: 'bottom-right' },
      )
    } finally {
      setUploadingLocal(false)
    }
  }

  const isBusy = uploadingLocal || submitLoading

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Novo Post</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <TextField
            {...register('text')}
            multiline
            minRows={3}
            fullWidth
            placeholder='O que você está pensando?'
            error={!!errors.text}
            helperText={errors.text?.message}
          />

          <TextField
            {...register('tags')}
            fullWidth
            label='Tags'
            placeholder='forex, EURUSD'
            sx={{ mt: 2 }}
          />

          <TextField
            {...register('pair')}
            fullWidth
            label='Par'
            placeholder='EUR/USD'
            sx={{ mt: 2 }}
          />

          {/* ✅ Campo para várias URLs */}
          <TextField
            {...register('imageUrls')}
            fullWidth
            multiline
            minRows={3}
            label='URLs das imagens (uma por linha)'
            placeholder={
              'https://site.com/img1.jpg\nhttps://site.com/img2.png\nhttps://site.com/img3.jpeg'
            }
            sx={{ mt: 2 }}
          />

          {/* Preview de uploads */}
          <ComposerMediaPreview files={media} remove={removeMedia} />

          {/* Toolbar para upload */}
          <ComposerToolbar onSelectMedia={addMedia} />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={isBusy}>
            Cancelar
          </Button>
          <Button type='submit' variant='contained' disabled={isBusy}>
            {isBusy ? 'Publicando...' : 'Publicar'}
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
          aria-hidden
        >
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <CircularProgress />
            <Box component='span' sx={{ color: 'white' }}>
              Enviando arquivos e publicando...
            </Box>
          </Box>
        </Box>
      )}
    </Dialog>
  )
}
