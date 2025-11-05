/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Stack,
  Chip,
  LinearProgress,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { useUploadMedia } from 'src/hooks/useUploadMedia'

type UploadedMedia = { type: 'image' | 'video' | 'link'; url: string }

export default function CreatePostForm() {
  const [text, setText] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { uploadFiles, progress } = useUploadMedia()

  const onFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setSelectedFiles(Array.from(e.target.files))
  }

  const handleSubmit = async () => {
    setError(null)
    if (selectedFiles.length === 0 && !text.trim()) {
      setError('Digite algo ou adicione mídias.')
      return
    }

    try {
      setLoading(true)
      const uploads = await Promise.all(
        selectedFiles.map(async (file) => {
          const [result] = await uploadFiles([file], 1)
          return result as UploadedMedia
        }),
      )

      await axios.post(
        '/posts',
        { text, media: uploads, tags: [], pair: null },
        {
          headers: {
            Authorization:
              typeof window !== 'undefined'
                ? `Bearer ${localStorage.getItem('token')}`
                : '',
          },
        },
      )

      setText('')
      setSelectedFiles([])
    } catch (err: any) {
      console.error(err)
      setError(err?.message || 'Erro ao publicar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Stack spacing={2}>
        <TextField
          placeholder='O que está acontecendo?'
          multiline
          minRows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type='file'
          multiple
          accept='image/*,video/*'
          onChange={onFilesChange}
          id='file-input'
          style={{ display: 'block' }}
        />

        {selectedFiles.length > 0 && (
          <Stack spacing={1}>
            {selectedFiles.map((f) => (
              <Box key={f.name}>
                <Stack direction='row' alignItems='center' spacing={1}>
                  <Chip label={`${f.name} (${Math.round(f.size / 1024)}KB)`} />
                  {progress[f.name] && (
                    <Typography variant='body2' color='text.secondary'>
                      {progress[f.name]}%
                    </Typography>
                  )}
                </Stack>
                {progress[f.name] !== undefined && (
                  <LinearProgress
                    variant='determinate'
                    value={progress[f.name]}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                )}
              </Box>
            ))}
          </Stack>
        )}

        {error && <Box color='error.main'>{error}</Box>}

        <Box display='flex' gap={2}>
          <Button variant='contained' onClick={handleSubmit} disabled={loading}>
            {loading ? 'Publicando...' : 'Publicar'}
          </Button>

          <Button
            variant='outlined'
            onClick={() => {
              setSelectedFiles([])
              setText('')
            }}
            disabled={loading}
          >
            Limpar
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}
