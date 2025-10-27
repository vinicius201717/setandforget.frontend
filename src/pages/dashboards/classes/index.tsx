import { Box } from '@mui/material'
import React from 'react'
import LessonsMenu from 'src/components/lessonsMenu'

const CourseViewer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: '70%' },
          height: { xs: '50%', md: '100%' },
          backgroundColor: 'blue',
        }}
      >
        <iframe
          width='100%'
          height='100%'
          src='https://www.youtube.com/embed/JkWwPmr7D5g'
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
          style={{
            border: 'none',
          }}
        />
      </Box>

      <Box
        sx={{
          width: { xs: '100%', md: '30%' },
          height: { xs: '50%', md: '100%' },
        }}
      >
        <LessonsMenu />
      </Box>
    </Box>
  )
}

export default CourseViewer
