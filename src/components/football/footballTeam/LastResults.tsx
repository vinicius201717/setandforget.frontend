import React from 'react'
import { Typography, Card, CardContent, Divider, Box } from '@mui/material'
import { LastResultsContainer } from './style'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import { green, red, grey } from '@mui/material/colors'

interface FormProps {
  form: string
}

const renderIcon = (result: string) => {
  switch (result) {
    case 'W':
      return <SportsSoccerIcon sx={{ color: green[500] }} />
    case 'D':
      return <SportsSoccerIcon sx={{ color: grey[700] }} />
    case 'L':
      return <SportsSoccerIcon sx={{ color: red[500] }} />
    default:
      return null
  }
}

const LastResults = ({ form }: FormProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='body2' sx={{ marginRight: 2 }}>
          Latest Results:
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <LastResultsContainer>
          {form
            ? form.split('').map((result, index) => (
                <Box key={index} sx={{ margin: '0 4px' }}>
                  {renderIcon(result)}
                </Box>
              ))
            : null}
        </LastResultsContainer>
      </CardContent>
    </Card>
  )
}

export default LastResults
