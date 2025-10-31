import { Box, Typography, IconButton } from '@mui/material'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'

interface Props {
  votes: number
  answers: number
}

export default function QuestionFooter({ votes, answers }: Props) {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <IconButton size='small'>
        <ThumbUpAltOutlinedIcon fontSize='small' />
      </IconButton>
      <Typography variant='body2'>{votes}</Typography>
      <IconButton size='small'>
        <ChatBubbleOutlineIcon fontSize='small' />
      </IconButton>
      <Typography variant='body2'>{answers}</Typography>
    </Box>
  )
}
