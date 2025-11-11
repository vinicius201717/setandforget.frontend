'use client'

import { Avatar, Box, IconButton, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState } from 'react'

import PostOptionsMenu from './PostOptionsMenu'
import ComposerEditSheet from '../Composer/ComposerEditSheet'
import { Post } from 'src/types/apps/feedType'
import { useAuth } from 'src/hooks/useAuth'

interface PostHeaderProps {
  post: Post
  setPosts?: React.Dispatch<React.SetStateAction<Post[]>>
}

export default function PostHeader({ post, setPosts }: PostHeaderProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  const { user } = useAuth()

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleCloseMenu = () => setAnchorEl(null)

  const handleEditPost = () => {
    setEditingPost(post)
    setEditOpen(true)
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, pt: 2 }}>
        <Avatar
          src={post.author.avatarUrl}
          sx={{ width: 40, height: 40, mr: 1.5 }}
        />

        <Box sx={{ flex: 1 }}>
          <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
            {post.author.name}
          </Typography>

          <Typography variant='body2' color='text.secondary'>
            {post.author.handle} • {new Date(post.createdAt).toLocaleString()}
          </Typography>
        </Box>

        <IconButton size='small' onClick={handleOpenMenu}>
          <MoreVertIcon />
        </IconButton>

        <PostOptionsMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          isOwner={post.author.id === user?.id}
          postId={post.id}
          setPosts={setPosts}
          onEdit={handleEditPost}
        />
      </Box>

      {/* Modal de edição */}
      {editingPost && (
        <ComposerEditSheet
          open={editOpen}
          post={editingPost}
          onClose={() => {
            setEditOpen(false)
            setEditingPost(null) // ✅ limpa corretamente
          }}
          onPostUpdated={(updated) => {
            // ✅ só atualiza se vier via setPosts
            setPosts?.((prev) =>
              prev.map((p) => (p.id === updated.id ? updated : p)),
            )
          }}
        />
      )}
    </>
  )
}
