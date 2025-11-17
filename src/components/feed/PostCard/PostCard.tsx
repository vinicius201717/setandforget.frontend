/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import { PostCardProps } from 'src/types/apps/feedType'
import PostHeader from './PostHeader'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import PostMedia from './PostMedia'
import PostActions from './PostActions'
import PostFooter from './PostFooter'
import { useAuth } from 'src/hooks/useAuth'

export default function PostCard({
  post,
  setPosts,
  onLike,
  onReply,
  onRepost,
  onMediaClick,
  compact,
}: PostCardProps) {
  const [hideMedia, setHideMedia] = useState(false)
  const { user } = useAuth()

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        overflow: 'hidden',
        p: compact ? 1 : 0,
      }}
    >
      <PostHeader post={post} setPosts={setPosts} />

      {/* ✅ Botão para ocultar mídia (só no compact) */}
      {compact && (post.media?.length ?? 0) > 0 && (
        <Box sx={{ px: 2, pb: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton size='small' onClick={() => setHideMedia(!hideMedia)}>
            {hideMedia ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
          </IconButton>
        </Box>
      )}

      {/* ✅ Texto */}
      <CardContent sx={{ pt: compact ? 0.5 : 1 }}>
        {post.text && (
          <Typography
            variant='body1'
            sx={{ mb: compact ? 1 : 1.5, fontSize: compact ? 14 : 16 }}
          >
            {post.text}
          </Typography>
        )}

        {/* ✅ Mídia escondida quando hideMedia = true */}
        {!hideMedia && (
          <PostMedia media={post.media ?? []} onMediaClick={onMediaClick} />
        )}
      </CardContent>

      <PostActions
        post={post}
        onLike={onLike!}
        onReply={onReply!}
        onRepost={onRepost!}
        compact={compact}
        currentUserId={user?.id || ''}
      />
      <PostFooter post={post} />
    </Card>
  )
}
