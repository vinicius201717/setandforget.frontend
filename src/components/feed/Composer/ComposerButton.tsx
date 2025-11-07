// src/components/feed/composer/ComposerButton.tsx
'use client'

import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

interface ComposerButtonProps {
  onClick: () => void
}

export default function ComposerButton({ onClick }: ComposerButtonProps) {
  return (
    <Fab
      color='primary'
      aria-label='create-post'
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9950,
      }}
      onClick={onClick}
    >
      <AddIcon />
    </Fab>
  )
}
