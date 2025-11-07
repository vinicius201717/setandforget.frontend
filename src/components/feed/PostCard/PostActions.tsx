/* eslint-disable no-unused-vars */
// src/components/feed/PostCard/PostActions.tsx
'use client'

import { Box, IconButton, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import RepeatIcon from '@mui/icons-material/Repeat'
import { Post } from 'src/types/apps/feedType'

interface PostActionsProps {
  post: Post
  onLike: (id: string) => void
  onReply: (id: string) => void
  onRepost: (id: string) => void
}

export default function PostActions({
  post,
  onLike,
  onReply,
  onRepost,
}: PostActionsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        px: 2,
        pb: 1.5,
        pt: 1,
        alignItems: 'center',
      }}
    >
      {/* Like */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <IconButton size='small' onClick={() => onLike(post.id)}>
          <FavoriteBorderIcon fontSize='small' />
        </IconButton>
        <Typography variant='caption'>{post.metrics.likes}</Typography>
      </Box>

      {/* Comentário */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <IconButton size='small' onClick={() => onReply(post.id)}>
          <ChatBubbleOutlineIcon fontSize='small' />
        </IconButton>
        <Typography variant='caption'>{post.metrics.replies}</Typography>
      </Box>

      {/* Repost */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <IconButton size='small' onClick={() => onRepost(post.id)}>
          <RepeatIcon fontSize='small' />
        </IconButton>
        <Typography variant='caption'>{post.metrics.reposts}</Typography>
      </Box>
    </Box>
  )
}
