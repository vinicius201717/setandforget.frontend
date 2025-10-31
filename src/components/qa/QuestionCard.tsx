import { memo } from 'react'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Box,
} from '@mui/material'
import QuestionFooter from './QuestionFooter'
import TagChip from './TagChip'

interface QuestionCardProps {
  question: {
    id: number
    title: string
    image?: string
    tags: string[]
    votes: number
    answers: number
    createdAt: string
    user: { name: string; avatar: string }
  }
}

function QuestionCard({ question }: QuestionCardProps) {
  return (
    <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
      <CardHeader
        avatar={<Avatar src={question.user.avatar} />}
        title={question.user.name}
        subheader={question.createdAt}
      />
      {question.image && (
        <CardMedia
          component='img'
          image={question.image}
          alt={question.title}
          loading='lazy'
        />
      )}
      <CardContent>
        <Typography variant='h6' fontWeight={600}>
          {question.title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
          {question.tags.map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <QuestionFooter votes={question.votes} answers={question.answers} />
      </CardActions>
    </Card>
  )
}

export default memo(QuestionCard)
