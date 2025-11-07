/* eslint-disable no-unused-vars */
// src/components/feed/composer/ComposerMediaPreview.tsx
'use client'

import { Box, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'

interface ComposerMediaPreviewProps {
  files: File[]
  remove: (index: number) => void
}

export default function ComposerMediaPreview({
  files,
  remove,
}: ComposerMediaPreviewProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
      {files.map((file, index) => {
        const url = URL.createObjectURL(file)

        return (
          <Box
            key={index}
            sx={{
              position: 'relative',
              width: 120,
              height: 120,
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: 'grey.200',
            }}
          >
            <Image
              src={url}
              alt='preview'
              fill
              style={{ objectFit: 'cover' }}
            />

            <IconButton
              size='small'
              onClick={() => remove(index)}
              sx={{
                position: 'absolute',
                top: 4,
                right: 4,
                bgcolor: 'rgba(0,0,0,0.5)',
                color: '#fff',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
              }}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </Box>
        )
      })}
    </Box>
  )
}
