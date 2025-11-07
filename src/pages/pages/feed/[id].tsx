'use client'

import { Box, Divider, Typography } from '@mui/material'
import PostCard from 'src/components/feed/PostCard/PostCard'
import { useThread } from 'src/components/feed/hooks/useThread'
import { useState } from 'react'
import { usePostActions } from 'src/components/feed/hooks/usePostAction'
import ComposerButton from 'src/components/feed/Composer/ComposerButton'
import ComposerSheet from 'src/components/feed/Composer/ComposerSheet'

export default function ThreadView({ id }: { id: string }) {
  const { post, replies, loading, refresh } = useThread(id)

  const { like, repost } = usePostActions(
    post ? [post, ...replies] : [],
    () => undefined,
  )

  const [composerOpen, setComposerOpen] = useState(false)

  if (loading || !post) return <Typography>Carregando…</Typography>

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', py: 3 }}>
      {/* Post principal */}
      <PostCard
        post={post}
        onLike={like}
        onReply={() => {
          setComposerOpen(true)
        }}
        onRepost={repost}
      />

      <Divider sx={{ my: 3 }} />

      <Typography variant='h6' sx={{ mb: 1 }}>
        Respostas
      </Typography>

      {/* Replies */}
      {replies.map((rep) => (
        <PostCard
          key={rep.id}
          post={rep}
          onLike={like}
          onReply={() => setComposerOpen(true)}
          onRepost={repost}
        />
      ))}

      {/* Composer para responder */}
      <ComposerButton onClick={() => setComposerOpen(true)} />

      <ComposerSheet
        open={composerOpen}
        onClose={() => setComposerOpen(false)}
        onPostCreated={refresh}
        parentId={post.id}
      />
    </Box>
  )
}
