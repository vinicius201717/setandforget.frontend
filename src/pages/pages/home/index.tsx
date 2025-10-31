'use client'

import { useState, Suspense } from 'react'
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  TextField,
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import NewQuestionModal from 'src/components/qa/NewQuestionModal'
import QuestionCard from 'src/components/qa/QuestionCard'

const MOCK_QUESTIONS = [
  {
    id: 1,
    user: { name: 'Vinicius', avatar: '/avatars/vinicius.jpg' },
    title:
      'Como melhorar a performance de um componente React com muitos renders?',
    image: '/images/react-performance.png',
    tags: ['React', 'Performance', 'Hooks'],
    votes: 42,
    answers: 8,
    createdAt: 'há 2 horas',
  },
  {
    id: 2,
    user: { name: 'Livia Dev', avatar: '/avatars/marina.jpg' },
    title: 'Qual a melhor forma de integrar MUI com Next.js?',
    image: '/images/mui-next.png',
    tags: ['Next.js', 'MUI', 'Frontend'],
    votes: 17,
    answers: 3,
    createdAt: 'há 4 horas',
  },
]

export default function QAPage() {
  const [openModal, setOpenModal] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = MOCK_QUESTIONS.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <Box sx={{ maxWidth: 680, mx: 'auto', py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant='h4' fontWeight='bold'>
          Discussões da Comunidade
        </Typography>
        <Button
          variant='contained'
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setOpenModal(true)}
        >
          Nova Pergunta
        </Button>
      </Box>

      <TextField
        fullWidth
        size='small'
        placeholder='Buscar pergunta...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Suspense fallback={<CircularProgress />}>
        {filtered.map((q) => (
          <QuestionCard key={q.id} question={q} />
        ))}
      </Suspense>

      <NewQuestionModal open={openModal} onClose={() => setOpenModal(false)} />
    </Box>
  )
}
