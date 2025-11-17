/* eslint-disable no-unused-vars */
// src/components/feed/PostCard/PostActions.tsx
'use client'

import { Box, IconButton, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import RepeatIcon from '@mui/icons-material/Repeat'
import RepeatOnIcon from '@mui/icons-material/RepeatOn'
import { Post } from 'src/types/apps/feedType'

interface PostActionsProps {
  post: Post
  currentUserId: string
  onLike: (id: string) => void
  onReply: (id: string) => void
  onRepost: (id: string) => void
  compact?: boolean
}

export default function PostActions({
  post,
  currentUserId,
  onLike,
  onReply,
  onRepost,
  compact,
}: PostActionsProps) {
  const metrics = post.metrics ?? {
    likes: 0,
    replies: 0,
    reposts: 0,
  }

  const postReactions = Array.isArray(post.postReactions)
    ? post.postReactions
    : []

  // ---------------------------------------------------------------------
  // 2) IDENTIFICAR REAÇÃO DO USUÁRIO LOGADO
  // ---------------------------------------------------------------------
  const userReaction = postReactions.find(
    (r) => r.userId === currentUserId,
  ) ?? { liked: false, reposted: false }

  // Agora podemos usar:
  const isLiked = userReaction.liked === true
  const isReposted = userReaction.reposted === true

  // ---------------------------------------------------------------------

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
      {/* ------------------ LIKE ------------------ */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <IconButton
          size='small'
          onClick={() => onLike(post.id)}
          sx={{
            color: isLiked ? 'error.main' : 'text.secondary',
          }}
        >
          {isLiked ? (
            <FavoriteIcon fontSize='small' />
          ) : (
            <FavoriteBorderIcon fontSize='small' />
          )}
        </IconButton>
        <Typography variant='caption'>{metrics.likes}</Typography>
      </Box>

      {/* ------------------ REPLY ------------------ */}
      {!compact && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton size='small' onClick={() => onReply(post.id)}>
            <ChatBubbleOutlineIcon fontSize='small' />
          </IconButton>
          <Typography variant='caption'>{metrics.replies}</Typography>
        </Box>
      )}

      {/* ------------------ REPOST ------------------ */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <IconButton
          size='small'
          onClick={() => onRepost(post.id)}
          sx={{
            color: isReposted ? 'success.main' : 'text.secondary',
          }}
        >
          {isReposted ? (
            <RepeatOnIcon fontSize='small' />
          ) : (
            <RepeatIcon fontSize='small' />
          )}
        </IconButton>
        <Typography variant='caption'>{metrics.reposts}</Typography>
      </Box>
    </Box>
  )
}
