/* eslint-disable no-unused-vars */
// src/components/feed/PostCard/PostMedia.tsx
'use client'

import { Box } from '@mui/material'
import { Media } from 'src/types/apps/feedType'

interface PostMediaProps {
  media: Media[]
  onMediaClick?: (media: Media[], index: number) => void
}

export default function PostMedia({ media, onMediaClick }: PostMediaProps) {
  if (!media || media.length === 0) return null

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 1,
        borderRadius: 3,
        overflow: 'hidden',
        ...(media.length === 1 && { gridTemplateColumns: '1fr' }),
        ...(media.length === 2 && { gridTemplateColumns: '1fr 1fr' }),
        ...(media.length === 3 && {
          gridTemplateColumns: '2fr 1fr',
          gridTemplateRows: '1fr 1fr',
          '& > :first-of-type': { gridRow: '1 / span 2' },
        }),
        ...(media.length >= 4 && {
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
        }),
      }}
    >
      {media.slice(0, 4).map((item, idx) => (
        <Box
          key={idx}
          component={item.type === 'video' ? 'video' : 'img'}
          src={item.url}
          onClick={() => onMediaClick?.(media, idx)}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            cursor: 'pointer',
            borderRadius: 2,
          }}
          {...(item.type === 'video' ? { controls: false, muted: true } : {})}
        />
      ))}
    </Box>
  )
}
