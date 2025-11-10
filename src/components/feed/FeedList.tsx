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

  // ✅ agora pega like, repost e reply
  const { like, repost, reply } = usePostActions(posts, setPosts)

  const [selectedMedia, setSelectedMedia] = useState<{
    media: any[]
    index: number
  } | null>(null)

  const [openMedia, setOpenMedia] = useState(false)
  const [composerOpen, setComposerOpen] = useState(false)
  const [replyTo, setReplyTo] = useState<string | null>(null)

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
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            setPosts={setPosts}
            onLike={() => like(post.id)} // ✅ Like funcionando
            onRepost={() => repost(post.id)} // ✅ Repost funcionando
            onReply={() => {
              setReplyTo(post.id) // ✅ guarda qual post será comentado
              setComposerOpen(true)
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
          setReplyTo(null)
        }}
        parentId={replyTo ?? undefined} // ✅ SE FOR REPLY, ENVIA O postId
        onPostCreated={(newPost) => {
          // ✅ insere no feed corretamente
          if (replyTo) {
            // se era reply, insere logo abaixo do pai
            setPosts((prev) => {
              const idx = prev.findIndex((p) => p.id === replyTo)
              if (idx === -1) return prev
              const arr = [...prev]
              arr.splice(idx + 1, 0, newPost)
              return arr
            })
          } else {
            // se é post normal, coloca no topo
            setPosts((prev) => [newPost, ...prev])
          }
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
