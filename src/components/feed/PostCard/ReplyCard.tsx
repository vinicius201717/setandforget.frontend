/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Box, Typography, Avatar, IconButton, Chip, Paper } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { useState } from 'react'
import PostMedia from './PostMedia'
import { Media } from 'src/types/apps/feedType'

export default function ReplyCard({ reply, onMarkSolved }: any) {
  const [solved, setSolved] = useState(reply.solved ?? false)

  const handleMark = () => {
    setSolved(true)
    onMarkSolved?.(reply.id)
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        mb: 2,
        border: '1px solid rgba(0,0,0,0.08)',
        position: 'relative',
        transition: '0.2s',
        '&:hover': { backgroundColor: 'rgba(0,0,0,0.02)' },
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        {/* Avatar */}
        <Avatar
          src={reply.author.avatarUrl}
          sx={{ width: 44, height: 44, mt: 0.3 }}
        />

        <Box sx={{ flex: 1 }}>
          {/* Nome */}
          <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
            {reply.author.name}
          </Typography>

          {/* Texto */}
          <Typography
            sx={{ mt: 1, fontSize: 14, color: 'text.primary', lineHeight: 1.5 }}
          >
            {reply.text}
          </Typography>

          {/* Mídias */}
          {reply.media?.length > 0 && (
            <Box sx={{ mt: 1.5 }}>
              <PostMedia media={reply.media as Media[]} />
            </Box>
          )}
        </Box>
      </Box>

      {/* BOTÃO / SOLUÇÃO */}
      <Box
        sx={{
          position: 'absolute',
          right: 16,
          bottom: 16,
        }}
      >
        {solved ? (
          <Chip
            icon={<CheckCircleIcon sx={{ color: 'white !important' }} />}
            label='Solução aceita'
            color='success'
            size='small'
            sx={{ fontWeight: 600, pl: 1 }}
          />
        ) : (
          <IconButton
            onClick={handleMark}
            size='small'
            sx={{
              p: 0.7,
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.05)',
              color: 'text.secondary',
              transition: '0.2s',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.1)',
                color: 'primary.main',
              },
            }}
          >
            <RadioButtonUncheckedIcon fontSize='small' sx={{ opacity: 0.8 }} />
          </IconButton>
        )}
      </Box>
    </Paper>
  )
}
