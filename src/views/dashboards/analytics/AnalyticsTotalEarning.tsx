/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// ** MUI Imports
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import LinearProgress from '@mui/material/LinearProgress'
import Image from 'next/image'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { RankEntry, UserRankings } from 'src/types/apps/dashboardType'
import { useAuth } from 'src/hooks/useAuth'

interface AnalyticsTotalEarningProps {
  rankings: UserRankings
}

export const fakeUserRankings: UserRankings = {
  blitz: {
    rank: [
      { User: { name: 'Alice' }, chessBlitzRating: 1500 },
      { User: { name: 'Livia' }, chessBlitzRating: 1349 },
      { User: { name: 'Charlie' }, chessBlitzRating: 1300 },
    ],
    userRank: 343,
    userRating: 1009,
  },
  bullet: {
    rank: [
      { User: { name: 'Vinicius Sousa' }, chessBulletRating: 1219 },
      { User: { name: 'Alice' }, chessBulletRating: 1190 },
      { User: { name: 'Bob' }, chessBulletRating: 1100 },
    ],
    userRank: 1,
    userRating: 1219,
  },
  rapid: {
    rank: [
      { User: { name: 'Alice' }, chessRapidRating: 1520 },
      { User: { name: 'Bob' }, chessRapidRating: 1500 },
      { User: { name: 'Vinicius Sousa' }, chessRapidRating: 1484 },
    ],
    userRank: 3,
    userRating: 1484,
  },
  daily: {
    rank: [
      { User: { name: 'Bob' }, chessDailyRating: 1400 },
      { User: { name: 'Vinicius Sousa' }, chessDailyRating: 1346 },
      { User: { name: 'Charlie' }, chessDailyRating: 1200 },
    ],
    userRank: 2,
    userRating: 1346,
  },
}

const modes = {
  bullet: { ratingKey: 'chessBulletRating', color: 'primary' as ThemeColor },
  blitz: { ratingKey: 'chessBlitzRating', color: 'secondary' as ThemeColor },
  rapid: { ratingKey: 'chessRapidRating', color: 'success' as ThemeColor },
  daily: { ratingKey: 'chessDailyRating', color: 'info' as ThemeColor },
}

const AnalyticsTotalEarning: React.FC<AnalyticsTotalEarningProps> = ({
  rankings,
}) => {
  const [selectedMode, setSelectedMode] = useState<
    'bullet' | 'blitz' | 'rapid' | 'daily'
  >('blitz')
  const [timeLeft, setTimeLeft] = useState<string>('')

  const { user } = useAuth()

  const modeData = fakeUserRankings?.[selectedMode]
  const { rank, userRank, userRating } = modeData || {
    rank: [],
    userRank: 0,
    userRating: 0,
  }
  const { ratingKey, color } = modes[selectedMode]

  // Month progress calculation
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
  )
  const totalMonthMs = endOfMonth.getTime() - startOfMonth.getTime()
  const passedMs = now.getTime() - startOfMonth.getTime()
  const progressMonth = Math.min((passedMs / totalMonthMs) * 100, 100)

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      let diff = endOfMonth.getTime() - now.getTime()
      if (diff <= 0) {
        setTimeLeft('0 days 0 hours 0 minutes')
        clearInterval(interval)
        return
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      diff -= days * 1000 * 60 * 60 * 24
      const hours = Math.floor(diff / (1000 * 60 * 60))
      diff -= hours * 1000 * 60 * 60
      const minutes = Math.floor(diff / (1000 * 60))
      setTimeLeft(`${days} days ${hours} hours ${minutes} minutes`)
    }, 1000)
    return () => clearInterval(interval)
  }, [endOfMonth])

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'bullet' | 'blitz' | 'rapid' | 'daily' | null,
  ) => {
    if (newMode) setSelectedMode(newMode)
  }

  // Top 3 players
  const topPlayers = rank.slice(0, 3).map((player, idx) => {
    const key = ratingKey as keyof RankEntry
    const ratingValue = player[key] ?? 0
    return {
      ...player,
      subtitle: `Rank ${idx + 1}`,
      position: idx + 1,
      isUser: false,
      rating: ratingValue.toString(),
    }
  })

  // Add logged-in user if outside top 3
  if (userRank > 3) {
    topPlayers.push({
      User: { name: user?.name ?? 'You' },
      subtitle: `Rank ${userRank}`,
      position: userRank,
      isUser: true,
      rating: userRating.toString(),
    })
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* Month prize info */}
      <CardContent sx={{ pb: 1 }}>
        <Typography variant='h6' sx={{ mb: 1 }}>
          Monthly Prize: <strong>R$ 1,500.00</strong>
        </Typography>
        <LinearProgress
          variant='determinate'
          value={progressMonth}
          sx={{ height: 10, borderRadius: 5, mb: 1 }}
        />
        <Typography variant='body2' color='text.secondary'>
          Time left until end of the month: {timeLeft}
        </Typography>
      </CardContent>

      {/* Ranking */}
      <CardHeader
        title={`${selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1)} Rankings`}
        titleTypographyProps={{
          sx: {
            lineHeight: '1.6 !important',
            letterSpacing: '0.15px !important',
          },
        }}
        action={
          <ToggleButtonGroup
            exclusive
            value={selectedMode}
            onChange={handleModeChange}
            aria-label='game mode'
            size='small'
          >
            <ToggleButton value='bullet'>Bullet</ToggleButton>
            <ToggleButton value='blitz'>Blitz</ToggleButton>
            <ToggleButton value='rapid'>Rapid</ToggleButton>
            <ToggleButton value='daily'>Daily</ToggleButton>
          </ToggleButtonGroup>
        }
      />
      <CardContent sx={{ pt: 1 }}>
        {topPlayers.map((player, idx) => {
          const imgSrc =
            player.isUser && player.position > 3
              ? '/images/cards/peace1.png'
              : `/images/cards/peace${idx + 1}.png`

          return (
            <Box
              key={player.User.name + idx}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: topPlayers.length === 4 ? 5 : 10,
              }}
            >
              {/* position */}
              <Typography
                sx={{ width: 30, textAlign: 'center', fontWeight: 600 }}
              >
                {player.position}
              </Typography>

              {/* avatar */}
              <Avatar
                variant='rounded'
                sx={{
                  width: 40,
                  height: 40,
                  mr: 2,
                  bgcolor: (theme) =>
                    `rgba(${theme.palette.customColors.main}, 0.04)`,
                }}
              >
                <Image
                  src={imgSrc}
                  alt={player.User.name}
                  width={30}
                  height={30}
                  style={{
                    opacity: player.isUser && player.position > 3 ? 0.5 : 1,
                  }}
                />
              </Avatar>

              {/* name */}
              <Typography sx={{ flexGrow: 1, fontWeight: 600 }}>
                {player.User.name}
              </Typography>

              {/* rating */}
              <Typography sx={{ fontWeight: 600, color: `${color}.main` }}>
                {player.rating}
              </Typography>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default AnalyticsTotalEarning
