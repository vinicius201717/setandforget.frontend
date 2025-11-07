/* eslint-disable no-unused-vars */
// src/components/feed/composer/ComposerToolbar.tsx
'use client'

import { Box, IconButton } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'

interface ComposerToolbarProps {
  onSelectMedia: (files: File[]) => void
}

export default function ComposerToolbar({
  onSelectMedia,
}: ComposerToolbarProps) {
  const handleMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    onSelectMedia(Array.from(e.target.files))
  }

  return (
    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
      {/* Upload de mídia */}
      <IconButton component='label'>
        <ImageIcon />
        <input
          hidden
          type='file'
          accept='image/*'
          multiple
          onChange={handleMedia}
        />
      </IconButton>

      {/* Emojis futuramente */}
      <IconButton>
        <EmojiEmotionsIcon />
      </IconButton>
    </Box>
  )
}
