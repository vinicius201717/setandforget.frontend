// src/components/feed/PostCard/PostCard.tsx
import React from 'react'
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  CardActions,
  Box,
  Button,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline'
import Repeat from '@mui/icons-material/Repeat'
import Image from 'next/image'
import { PostCardProps } from 'src/types/apps/feedType'

export default function PostCard({
  post,
  onLike,
  onReply,
  onRepost,
  onMediaClick,
}: PostCardProps) {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardHeader
        avatar={
          <Avatar src={post.author.avatarUrl}>{post.author.name[0]}</Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={post.author.name}
        subheader={`${post.author.handle} • ${new Date(post.createdAt).toLocaleString()}`}
      />

      {/* Texto */}
      <CardContent>
        {post.text && (
          <Typography variant='body1' sx={{ mb: 1.5 }}>
            {post.text}
          </Typography>
        )}

        {/* Media simple: primeira imagem */}
        {post.media?.[0]?.type === 'image' && (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: 300, md: 420 },
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: 'grey.100',
              cursor: 'pointer',
            }}
            onClick={() => onMediaClick?.(post.media ?? [], 0)}
          >
            <Image
              src={post.media[0].url}
              alt={post.text ?? 'Post image'}
              fill
              style={{ objectFit: 'cover' }}
              sizes='(max-width: 600px) 100vw, 800px'
            />
          </Box>
        )}
      </CardContent>

      <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
        <Box>
          <IconButton aria-label='like' onClick={() => onLike?.(post.id)}>
            <FavoriteBorder />
          </IconButton>
          <IconButton aria-label='reply' onClick={() => onReply?.(post.id)}>
            <ChatBubbleOutline />
          </IconButton>
          <IconButton aria-label='repost' onClick={() => onRepost?.(post.id)}>
            <Repeat />
          </IconButton>
        </Box>

        <Button
          size='small'
          onClick={() => {
            /* open thread */
          }}
        >
          Ver Thread
        </Button>
      </CardActions>
    </Card>
  )
}
