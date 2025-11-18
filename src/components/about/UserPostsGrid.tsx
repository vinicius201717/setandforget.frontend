/* eslint-disable @typescript-eslint/no-explicit-any */
// components/about/UserPostsGrid.tsx

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  Tabs,
  Tab,
  Skeleton,
  Alert,
} from '@mui/material'
import { UserDataType } from 'src/context/types'
import getPosts from 'src/pages/api/feed/getPosts'

interface Props {
  user: UserDataType
}

export default function UserPostsGrid({ user }: Props) {
  const [tab, setTab] = useState<'posts' | 'reposts'>('posts')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [posts, setPosts] = useState<any[]>([])
  const [reposted, setReposted] = useState<any[]>([])

  const handleTabChange = (_: any, newValue: 'posts' | 'reposts') => {
    setTab(newValue)
  }

  // Lista atual
  const list = tab === 'posts' ? posts : reposted

  // Filtrar apenas posts com imagem válida
  const listFiltered = (list || []).filter(
    (p) => typeof p.media?.[0]?.url === 'string' && p.media[0].url.length > 0,
  )

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError(null)

        const data = await getPosts()

        setPosts(data.posts || [])
        setReposted(data.reposted || [])
      } catch (err: any) {
        setError('Não foi possível carregar os posts.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [user.id])

  return (
    <Card
      sx={{
        width: '100%',
        flexShrink: 0,
        height: '100%',
      }}
    >
      <CardContent sx={{ minHeight: 250 }}>
        {/* TABS */}
        <Tabs
          value={tab}
          onChange={handleTabChange}
          textColor='primary'
          indicatorColor='primary'
          sx={{ mb: 2 }}
        >
          <Tab
            label='Posts'
            value='posts'
            sx={{ textTransform: 'none', fontWeight: 600 }}
          />
          <Tab
            label='Reposts'
            value='reposts'
            sx={{ textTransform: 'none', fontWeight: 600 }}
          />
        </Tabs>

        {/* ERRO */}
        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* LOADING */}
        {loading && (
          <Grid container spacing={2}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={4} key={i}>
                <Skeleton
                  variant='rectangular'
                  width='100%'
                  height={200}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* LISTA */}
        {!loading && !error && (
          <Grid container spacing={2}>
            {listFiltered.length > 0 ? (
              listFiltered.map((post, index) => {
                const img = post.media?.[0]?.url
                const text = post.text || ''

                return (
                  <Grid item xs={4} key={index}>
                    <Link
                      href={`/feed/${post.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          height: 200,
                          borderRadius: 2,
                          overflow: 'hidden',
                          position: 'relative',
                          cursor: 'pointer',
                          transition: '0.2s',
                          '&:hover': {
                            opacity: 0.85,
                            transform: 'scale(1.02)',
                          },
                        }}
                      >
                        <Box
                          component='img'
                          src={img}
                          alt='Post'
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />

                        {/* Texto sobre a imagem */}
                        {text && (
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              width: '100%',
                              bgcolor: 'rgba(0,0,0,0.55)',
                              color: '#fff',
                              fontSize: '0.7rem',
                              px: 1,
                              py: 0.5,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {text}
                          </Box>
                        )}
                      </Box>
                    </Link>
                  </Grid>
                )
              })
            ) : (
              // MENSAGEM DE VAZIO
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: '100%',
                    height: 120,
                    borderRadius: 2,
                    bgcolor: 'action.hover',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.6,
                    textAlign: 'center',
                    px: 2,
                  }}
                >
                  <Typography color='text.secondary' fontSize={14}>
                    {tab === 'posts'
                      ? 'Este usuário ainda não postou nada.'
                      : 'Nenhum repost encontrado.'}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </CardContent>
    </Card>
  )
}
