'use client'

import { Avatar, Box, IconButton, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState } from 'react'

import PostOptionsMenu from './PostOptionsMenu'
import { Post } from 'src/types/apps/feedType'

interface PostHeaderProps {
  post: Post
}

export default function PostHeader({ post }: PostHeaderProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleCloseMenu = () => setAnchorEl(null)

  return (
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

      {/* ✅ MENU */}
      <PostOptionsMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        postId={post.id}
        onDelete={(id) => console.log('Delete', id)}
        onEdit={(id) => console.log('Edit', id)}
      />
    </Box>
  )
}
