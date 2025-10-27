/* eslint-disable no-unused-vars */
// LessonList.tsx
import React from 'react'
import { Box, List, Typography, Button } from '@mui/material'
import { Lesson as LessonType } from 'src/types/apps/admin'

interface LessonListProps {
  lessons: LessonType[]
  handleEditLesson: (lesson: LessonType) => void
  handleDeleteLesson: (lesson: LessonType) => void
}

const LessonList: React.FC<LessonListProps> = ({
  lessons,
  handleEditLesson,
  handleDeleteLesson,
}) => {
  if (lessons.length === 0) return null

  return (
    <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {lessons.map((lesson) => (
        <Box
          key={lesson.id}
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: 'background.default',
            boxShadow: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: '0.2s',
            '&:hover': {
              boxShadow: 3,
              transform: 'scale(1.01)',
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='subtitle1' fontWeight={600}>
              {lesson.name}
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ mb: lesson.videoLink ? 1 : 0 }}
            >
              {lesson.description}
            </Typography>
            {lesson.videoLink && (
              <a
                href={lesson.videoLink}
                target='_blank'
                rel='noopener noreferrer'
                style={{
                  color: '#42a5f5',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                }}
              >
                ▶️ Watch video
              </a>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size='small'
              sx={{ minWidth: 0, borderRadius: 2 }}
              onClick={() => handleEditLesson(lesson)}
            >
              EDIT
            </Button>
            <Button
              size='small'
              sx={{ minWidth: 0, borderRadius: 2 }}
              onClick={() => handleDeleteLesson(lesson)}
            >
              DELETE
            </Button>
          </Box>
        </Box>
      ))}
    </List>
  )
}

export default LessonList
