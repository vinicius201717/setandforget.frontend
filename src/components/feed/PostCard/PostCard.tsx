/* eslint-disable @typescript-eslint/no-non-null-assertion */
// src/components/feed/PostCard/PostCard.tsx
'use client'

import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

import { PostCardProps } from 'src/types/apps/feedType'

import PostHeader from './PostHeader'
import PostMedia from './PostMedia'
import PostActions from './PostActions'
import PostFooter from './PostFooter'

export default function PostCard({
  post,
  onLike,
  onReply,
  onRepost,
  onMediaClick,
}: PostCardProps) {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
      {/* Header: avatar + nome + handle + menu */}
      <PostHeader post={post} />

      {/* Conteúdo do texto */}
      <CardContent sx={{ pt: 1 }}>
        {post.text && (
          <Typography variant='body1' sx={{ mb: 1.5 }}>
            {post.text}
          </Typography>
        )}

        <PostMedia media={post.media ?? []} onMediaClick={onMediaClick} />
      </CardContent>

      {/* Botões de like/reply/repost */}
      <PostActions
        post={post}
        onLike={onLike!}
        onReply={onReply!}
        onRepost={onRepost!}
      />

      {/* Tags, views, par, etc. */}
      <PostFooter post={post} />
    </Card>
  )
}
