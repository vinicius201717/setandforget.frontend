/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Post } from 'src/types/apps/feedType'
import ReplyComposerSheet from './Composer/ReplyComposerSheet'

export default function FeedList() {
  const { posts, setPosts, loading, hasMore, fetchMore } = useFeed()

  // ✅ agora pega like, repost e reply
  const { like, repost } = usePostActions(posts, setPosts)

  const [selectedMedia, setSelectedMedia] = useState<{
    media: any[]
    index: number
  } | null>(null)

  const [openMedia, setOpenMedia] = useState(false)
  const [composerOpen, setComposerOpen] = useState(false)
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyToPost, setReplyToPost] = useState<Post | null>(null)
  const [replyOpen, setReplyOpen] = useState(false)

  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const handleOpenMedia = (media: any[], index: number) => {
    setSelectedMedia({ media, index })
    setOpenMedia(true)
  }

  const handleCloseMedia = () => setOpenMedia(false)

  // ✅ Infinite Scroll
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
        {posts
          .filter((post) => !post.parentId)
          .map((post) => (
            <PostCard
              key={post.id}
              post={post}
              setPosts={setPosts}
              onLike={() => like(post.id)}
              onRepost={() => repost(post.id)}
              onReply={() => {
                setReplyToPost(post)
                setReplyOpen(true)
              }}
              onMediaClick={handleOpenMedia}
            />
          ))}
      </Stack>

      {/* sentinela scroll infinito */}
      <Box ref={sentinelRef} sx={{ height: 10 }} />

      {/* Loader */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <CircularProgress size={28} />
        </Box>
      )}

      {/* botão novo post */}
      <ComposerButton
        onClick={() => {
          setReplyTo(null)
          setComposerOpen(true)
        }}
      />

      {/* compositor / reply */}
      <ComposerSheet
        open={composerOpen}
        onClose={() => {
          setComposerOpen(false)
        }}
        onPostCreated={(newPost) => {
          // Criar post normal → adiciona no topo
          setPosts((prev) => [newPost, ...prev])
        }}
      />

      <ReplyComposerSheet
        open={replyOpen}
        onClose={() => {
          setReplyOpen(false)
          setReplyToPost(null)
        }}
        parentPost={replyToPost}
        onReplyCreated={(reply) => {
          setPosts((prev) => {
            const idx = prev.findIndex((p) => p.id === reply.parentId)
            if (idx === -1) return prev

            const arr = [...prev]
            arr.splice(idx + 1, 0, reply)
            return arr
          })
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
