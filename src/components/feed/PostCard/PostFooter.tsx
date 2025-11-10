// src/components/feed/PostCard/PostFooter.tsx
'use client'

import { Box, Chip, Typography } from '@mui/material'
import { Post } from 'src/types/apps/feedType'

interface PostFooterProps {
  post: Post
}

export default function PostFooter({ post }: PostFooterProps) {
  return (
    <Box sx={{ px: 2, pb: 2 }}>
      {/* Tags */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
        {(post.tags ?? []).map((tag, i) => (
          <Chip
            key={i}
            size='small'
            label={`#${tag}`}
            clickable
            variant='outlined'
          />
        ))}
      </Box>

      {/* Visualizações e par */}
      <Typography variant='caption' color='text.secondary'>
        {post.metrics.views?.toLocaleString()} visualizações
        {post.pair && ` · ${post.pair}`}
      </Typography>
    </Box>
  )
}
