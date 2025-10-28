/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  CardActionArea,
  Chip,
} from '@mui/material'
import { CategoryWithLessons } from 'src/types/apps/admin'
import getCategories from 'src/pages/api/classes/getCategoreis'
import Link from 'next/link'

export default function LearningPage() {
  const [query, setQuery] = useState('')
  const [categories, setCategories] = useState<CategoryWithLessons[]>([])

  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response.data)
      })
      .catch((error) => {
        console.error('Erro ao carregar categorias:', error)
      })
  }, [])

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase().trim()),
  )

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', p: { xs: 3, md: 6 } }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: 4,
          gap: 2,
        }}
      >
        <Box>
          <Typography variant='h4' fontWeight={700}>
            Learning
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Explore categories - And study with diverse content{' '}
          </Typography>
        </Box>

        <TextField
          size='small'
          label='Pesquisar categorias'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ width: { xs: '100%', sm: 260 } }}
        />
      </Box>

      {/* Grid de categorias */}
      <Grid container spacing={3}>
        {filtered.map((cat) => (
          <Grid key={cat.id} item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { transform: 'scale(1.02)', boxShadow: 6 },
              }}
            >
              <Link
                href={`/dashboards/course-viewer/${cat.id}`}
                passHref
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <CardActionArea>
                  <Box
                    height={140}
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    bgcolor='primary.light'
                  >
                    <Typography variant='h5' color='primary.contrastText'>
                      {cat.name.charAt(0)}
                    </Typography>
                  </Box>

                  <CardContent>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      mb={1}
                    >
                      <Typography variant='h6' fontWeight={600}>
                        {cat.name}
                      </Typography>
                      <Chip
                        size='small'
                        label={`${cat.classes?.length ?? 0} aulas`}
                        color='primary'
                        variant='outlined'
                      />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Caso não encontre categorias */}
      {filtered.length === 0 && (
        <Typography
          align='center'
          color='text.secondary'
          sx={{ mt: 6, fontStyle: 'italic' }}
        >
          Nenhuma categoria encontrada.
        </Typography>
      )}
    </Box>
  )
}
