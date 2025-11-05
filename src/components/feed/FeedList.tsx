/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Stack } from '@mui/material'
import PostMediaModal from './PostMediaModal'
import PostCard from './PostCard/PostCard'

export default function FeedList() {
  const [selectedMedia, setSelectedMedia] = useState<{
    media: any[]
    index: number
  } | null>(null)
  const [open, setOpen] = useState(false)

  const mock = [
    {
      id: 'post_1001',
      author: {
        id: 'u12',
        name: 'Marcos',
        handle: '@marcosfx',
        avatarUrl: '/avatar/1.png',
        verified: true,
      },
      text: 'EUR/USD formando um padrão de reversão. Observo suporte em 1.082. #forex #EURUSD',
      media: [
        {
          type: 'image',
          url: '/images/pages/auth-v2-reset-password-illustration-bordered-dark.png',
        },
      ],
      metrics: { likes: 124, reposts: 12, replies: 6, views: 2500 },
      userReactions: { liked: false, bookmarked: false, reposted: false },
      createdAt: '2025-11-05T01:10:00Z',
      tags: ['forex', 'EURUSD'],
      pair: 'EUR/USD',
    },
  ]

  const handleOpenMedia = (media: any[], index: number) => {
    setSelectedMedia({ media, index })
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  return (
    <>
      <Stack spacing={2}>
        {mock.map((post) => (
          <PostCard key={post.id} post={post} onMediaClick={handleOpenMedia} />
        ))}
      </Stack>

      {selectedMedia && (
        <PostMediaModal
          media={selectedMedia.media}
          open={open}
          onClose={handleClose}
          initialIndex={selectedMedia.index}
        />
      )}
    </>
  )
}
