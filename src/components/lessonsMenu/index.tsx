/* eslint-disable no-unused-vars */
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  Box,
} from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { useState, useMemo } from 'react'
import { useTheme } from '@mui/material/styles'
import { CategoryWithLessonsResponse, Lesson } from 'src/types/apps/admin'

interface LessonsMenuProps {
  lessons: CategoryWithLessonsResponse | undefined
  onSelectLesson: (lesson: Lesson) => void
}

export default function LessonsMenu({
  lessons,
  onSelectLesson,
}: LessonsMenuProps) {
  const [openTopic, setOpenTopic] = useState<string | null>(null)
  const theme = useTheme()

  const handleToggle = (topicId: string) => {
    setOpenTopic(openTopic === topicId ? null : topicId)
  }

  const groupedLessons = useMemo(() => {
    if (!lessons?.classes) return []

    const groups: Record<string, Lesson[]> = {}

    lessons.classes.forEach((lesson) => {
      if (!groups[lesson.title]) {
        groups[lesson.title] = []
      }
      groups[lesson.title].push(lesson)
    })

    return Object.entries(groups).map(([title, lessons]) => ({
      title,
      lessons,
    }))
  }, [lessons])

  return (
    <Box>
      <Typography
        variant='h6'
        sx={{ mb: 2, px: 7, color: theme.palette.text.primary }}
      >
        Lessons
      </Typography>

      <List
        component='nav'
        disablePadding
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 2,
          overflow: 'hidden',
        }}
      >
        {groupedLessons.map((group) => (
          <Box key={group.title}>
            {/* --- Módulo principal (title) --- */}
            <ListItemButton
              onClick={() => handleToggle(group.title)}
              sx={{
                bgcolor:
                  openTopic === group.title
                    ? 'primary.main'
                    : 'background.default',
                color:
                  openTopic === group.title
                    ? 'primary.contrastText'
                    : 'text.primary',
                '&:hover': {
                  bgcolor:
                    openTopic === group.title ? 'primary.dark' : 'action.hover',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    variant='subtitle1'
                    fontWeight={600}
                    sx={{ letterSpacing: 0.3 }}
                  >
                    {group.title}
                  </Typography>
                }
              />
              {openTopic === group.title ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            {/* --- Subaulas (subtitle) --- */}
            <Collapse
              in={openTopic === group.title}
              timeout='auto'
              unmountOnExit
            >
              <List component='div' disablePadding>
                {group.lessons.map((lesson) => (
                  <ListItemButton
                    key={lesson.id}
                    onClick={() => onSelectLesson(lesson)}
                    sx={{
                      pl: 4,
                      py: 1.2,
                      borderBottom: '1px dashed',
                      borderColor: 'divider',
                      '&:hover': {
                        bgcolor: 'action.hover',
                        pl: 4.5,
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant='body2' color='text.secondary'>
                          {lesson.subtitle}
                        </Typography>
                      }
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
