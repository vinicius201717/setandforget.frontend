// src/pages/feed.tsx (Next Page)
import React from 'react'
import { Container, CssBaseline } from '@mui/material'
import FeedList from 'src/components/feed/FeedList'

export default function FeedPage() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth='md' sx={{ py: 3 }}>
        <FeedList />
      </Container>
    </>
  )
}
