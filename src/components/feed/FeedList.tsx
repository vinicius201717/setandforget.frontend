/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Stack, Box, CircularProgress } from '@mui/material'

import PostCard from './PostCard/PostCard'
import PostMediaModal from './PostMediaModal'

import { useFeed } from './hooks/useFeed'
import { usePostActions } from './hooks/usePostAction'
import ComposerButton from './Composer/ComposerButton'
import ComposerSheet from './Composer/ComposerSheet'

export default function FeedList() {
  const { posts, setPosts, loading, hasMore, fetchMore } = useFeed()
  const { like, repost } = usePostActions(posts, setPosts)

  const [selectedMedia, setSelectedMedia] = useState<{
    media: any[]
    index: number
  } | null>(null)

  const [openMedia, setOpenMedia] = useState(false)
  const [composerOpen, setComposerOpen] = useState(false)

  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const handleOpenMedia = (media: any[], index: number) => {
    setSelectedMedia({ media, index })
    setOpenMedia(true)
  }

  const handleCloseMedia = () => setOpenMedia(false)

  // ✅ Infinite Scroll Observer
  useEffect(() => {
    if (!sentinelRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchMore()
        }
      },
      { rootMargin: '200px' },
    )

    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [hasMore, loading])

  return (
    <>
      <Stack spacing={2}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            setPosts={setPosts}
            onLike={like}
            onReply={() => setComposerOpen(true)}
            onRepost={repost}
            onMediaClick={handleOpenMedia}
          />
        ))}
      </Stack>

      {/* Sentinela invisível */}
      <Box ref={sentinelRef} sx={{ height: 10 }} />

      {/* Loader */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <CircularProgress size={28} />
        </Box>
      )}

      <ComposerButton onClick={() => setComposerOpen(true)} />

      <ComposerSheet
        open={composerOpen}
        onClose={() => setComposerOpen(false)}
        onPostCreated={(newPost) => {
          setPosts((prev) => [newPost, ...prev])
        }}
      />

      {selectedMedia && (
        <PostMediaModal
          media={selectedMedia.media}
          open={openMedia}
          initialIndex={selectedMedia.index}
          onClose={handleCloseMedia}
        />
      )}
    </>
  )
}
