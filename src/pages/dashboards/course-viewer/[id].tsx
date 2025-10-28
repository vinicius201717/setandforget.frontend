'use client'

import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LessonsMenu from 'src/components/lessonsMenu'
import getClasses from 'src/pages/api/classes/getClasses'
import { CategoryWithLessonsResponse, Lesson } from 'src/types/apps/admin'
import { useRouter } from 'next/router'

const CourseViewer = () => {
  const router = useRouter()
  const id = router.query.id as string
  const [lessons, setLessons] = useState<CategoryWithLessonsResponse>()
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

  useEffect(() => {
    if (!id) return

    getClasses(id)
      .then((res) => setLessons(res.data))
      .catch((err) => console.error(err))
  }, [id, router.query])

  return (
    <Box
      sx={{
        width: '100%',
        height: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* PLAYER */}
      <Box
        sx={{
          width: { xs: '100%', md: '70%' },
          height: { xs: '50%', md: '100%' },
        }}
      >
        <iframe
          width='100%'
          height='100%'
          src={
            selectedLesson
              ? selectedLesson.videoLink
              : 'https://www.youtube.com/embed/JkWwPmr7D5g'
          }
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
          style={{
            border: 'none',
          }}
        />
      </Box>

      {/* LISTA DE AULAS */}
      <Box
        sx={{
          width: { xs: '100%', md: '30%' },
          height: { xs: '50%', md: '100%' },
        }}
      >
        <LessonsMenu
          lessons={lessons}
          onSelectLesson={(lesson) => setSelectedLesson(lesson)}
        />
      </Box>
    </Box>
  )
}

export default CourseViewer
