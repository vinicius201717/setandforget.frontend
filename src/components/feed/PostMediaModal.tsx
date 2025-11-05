'use client'
import React, { useState } from 'react'
import {
  Dialog,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Fade,
} from '@mui/material'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import SwipeableViews from 'react-swipeable-views'

interface Media {
  type: 'image' | 'video' | 'link' | string
  url: string
}

interface PostMediaModalProps {
  media: Media[]
  open: boolean
  initialIndex?: number
  onClose: () => void
}

export default function PostMediaModal({
  media,
  open,
  initialIndex = 0,
  onClose,
}: PostMediaModalProps) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [index, setIndex] = useState(initialIndex)

  if (!media || media.length === 0) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth='lg'
      PaperProps={{
        sx: {
          bgcolor: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        },
      }}
      TransitionComponent={Fade}
    >
      {/* Botão fechar */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: 'white',
          bgcolor: 'rgba(0,0,0,0.4)',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
          zIndex: 2,
        }}
      >
        <X size={22} />
      </IconButton>

      {/* Carrossel com swipe */}
      <SwipeableViews
        index={index}
        onChangeIndex={setIndex}
        enableMouseEvents
        style={{
          width: fullScreen ? '100vw' : '80vw',
          height: fullScreen ? '100vh' : '80vh',
        }}
      >
        {media.map((item, i) => (
          <Box
            key={i}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              position: 'relative',
              bgcolor: 'black',
            }}
          >
            {item.type === 'video' ? (
              <Box
                component='video'
                src={item.url}
                controls
                autoPlay={false}
                sx={{
                  maxHeight: '90%',
                  maxWidth: '100%',
                  borderRadius: 2,
                  objectFit: 'contain',
                }}
              />
            ) : (
              <Box
                component='img'
                src={item.url}
                alt='media'
                sx={{
                  maxHeight: '90%',
                  maxWidth: '100%',
                  borderRadius: 2,
                  objectFit: 'contain',
                }}
              />
            )}
          </Box>
        ))}
      </SwipeableViews>

      {/* Botões de navegação laterais (desktop apenas) */}
      {!fullScreen && media.length > 1 && (
        <>
          <IconButton
            onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
            sx={{
              position: 'absolute',
              left: 16,
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.3)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
              zIndex: 2,
            }}
          >
            <ChevronLeft size={28} />
          </IconButton>

          <IconButton
            onClick={() =>
              setIndex((prev) => Math.min(prev + 1, media.length - 1))
            }
            sx={{
              position: 'absolute',
              right: 16,
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.3)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
              zIndex: 2,
            }}
          >
            <ChevronRight size={28} />
          </IconButton>
        </>
      )}
    </Dialog>
  )
}
