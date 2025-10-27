import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  Box,
} from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles'

export default function LessonsMenu() {
  const [openTopic, setOpenTopic] = useState<string | null>(null)
  const theme = useTheme()

  const handleToggle = (topic: string) => {
    setOpenTopic(openTopic === topic ? null : topic)
  }

  const topics = [
    {
      title: 'Módulo 1 - Fundamentos',
      lessons: ['Introdução', 'O que é Price Action', 'Estrutura de Mercado'],
    },
    {
      title: 'Módulo 2 - Estratégias',
      lessons: ['Breakouts', 'Pullbacks', 'Gestão de Risco'],
    },
    {
      title: 'Módulo 3 - Psicologia',
      lessons: ['Controle Emocional', 'Rotina de Trader'],
    },
  ]

  return (
    <Box>
      <Typography
        variant='h6'
        sx={{ mb: 2, px: 7, color: theme.palette.text.primary }}
      >
        Lesson
      </Typography>

      <List component='nav' disablePadding>
        {topics.map((topic) => (
          <Box key={topic.title}>
            <ListItemButton
              onClick={() => handleToggle(topic.title)}
              sx={{
                bgcolor:
                  openTopic === topic.title
                    ? theme.palette.action.selected
                    : theme.palette.action.hover,
                borderRadius: 2,
                mb: 1,
                px: 3,
                width: { xs: '95%', md: '90%' },
                mx: 'auto',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: theme.palette.action.focus,
                  transform: 'scale(1.02)',
                },
              }}
            >
              <ListItemText
                primary={topic.title}
                primaryTypographyProps={{
                  sx: {
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    fontSize: '1rem',
                  },
                }}
              />
              {openTopic === topic.title ? (
                <ExpandLess sx={{ color: theme.palette.text.primary }} />
              ) : (
                <ExpandMore sx={{ color: theme.palette.text.primary }} />
              )}
            </ListItemButton>

            <Collapse
              in={openTopic === topic.title}
              timeout='auto'
              unmountOnExit
            >
              <List component='div' disablePadding>
                {topic.lessons.map((lesson) => (
                  <ListItemButton
                    key={lesson}
                    sx={{
                      pl: 6,
                      width: { xs: '92%', md: '88%' },
                      mx: 'auto',
                      mb: 0.5,
                      borderRadius: 2,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: theme.palette.action.hover,
                        transform: 'scale(1.01)',
                      },
                    }}
                  >
                    <ListItemText
                      primary={lesson}
                      primaryTypographyProps={{
                        sx: {
                          color: theme.palette.text.secondary,
                          fontSize: '0.9rem',
                        },
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  )
}
