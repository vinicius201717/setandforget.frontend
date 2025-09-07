// ** MUI Imports
import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types
import { Rating } from 'src/types/apps/chessTypes'
import Link from 'next/link'

interface CardStatsRatingVerticalProps {
  title?: string
  icon?: React.ReactNode
  rating?: Rating
}

const ratingTypes = {
  chessBulletRating: 'Bullet',
  chessBlitzRating: 'Blitz',
  chessRapidRating: 'Rapid',
  chessDailyRating: 'Daily',
} as const

type RatingType = keyof typeof ratingTypes

const CardStatsRatingVertical: React.FC<CardStatsRatingVerticalProps> = ({
  title,
  icon,
  rating,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedType, setSelectedType] =
    React.useState<RatingType>('chessBlitzRating')

  const open = Boolean(anchorEl)

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)
  const handleSelect = (type: RatingType) => {
    setSelectedType(type)
    handleMenuClose()
  }

  const displayedRating = rating?.[selectedType] ?? 0

  return (
    <Card>
      <CardContent>
        {/* Header com Avatar, Título e Menu */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar
              color='primary'
              sx={{ boxShadow: 3, mr: 3, width: 48, height: 48 }}
            >
              {icon}
            </CustomAvatar>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>
              {title}
            </Typography>
          </Box>

          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            {Object.entries(ratingTypes).map(([key, label]) => (
              <MenuItem
                key={key}
                selected={selectedType === key}
                onClick={() => handleSelect(key as RatingType)}
              >
                {label}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Rating */}
        <Typography variant='body1'>{ratingTypes[selectedType]}</Typography>
        <Typography
          variant='h6'
          sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}
        >
          {displayedRating}
        </Typography>

        <Link href={'/chess'}>
          <Button
            rel='noopener'
            variant='contained'
            size='small'
            sx={{ textTransform: 'none' }}
          >
            Chess
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default CardStatsRatingVertical
