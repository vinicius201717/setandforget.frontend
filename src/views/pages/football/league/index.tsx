import { Card, CardContent, Container, Typography } from '@mui/material'
import { InfoBox, LeagueImage } from './style'

interface LeagueDetailProps {
  response: any
}

export default function LeagueDetail({ response }: LeagueDetailProps) {
  return (
    <Container>
      <Typography variant='h4' component='h1' gutterBottom>
        {response.data.name}
      </Typography>

      <Card>
        <CardContent>
          <LeagueImage
            src={response.data.image_path}
            alt={response.data.name}
            width={100}
            height={100}
          />

          <InfoBox>
            <Typography variant='h6'>Type:</Typography>
            <Typography>
              {response.data.type} ({response.data.sub_type})
            </Typography>
          </InfoBox>

          <InfoBox>
            <Typography variant='h6'>Country ID:</Typography>
            <Typography>{response.data.country_id}</Typography>
          </InfoBox>

          <InfoBox>
            <Typography variant='h6'>Sport ID:</Typography>
            <Typography>{response.data.sport_id}</Typography>
          </InfoBox>

          <InfoBox>
            <Typography variant='h6'>Active:</Typography>
            <Typography>{response.data.active ? 'Yes' : 'No'}</Typography>
          </InfoBox>

          <InfoBox>
            <Typography variant='h6'>Short Code:</Typography>
            <Typography>{response.data.short_code || 'N/A'}</Typography>
          </InfoBox>

          <InfoBox>
            <Typography variant='h6'>Last Played At:</Typography>
            <Typography>{response.data.last_played_at}</Typography>
          </InfoBox>

          <InfoBox>
            <Typography variant='h6'>Category:</Typography>
            <Typography>{response.data.category}</Typography>
          </InfoBox>

          <InfoBox>
            <Typography variant='h6'>Has Jerseys:</Typography>
            <Typography>{response.data.has_jerseys ? 'Yes' : 'No'}</Typography>
          </InfoBox>
        </CardContent>
      </Card>
    </Container>
  )
}
