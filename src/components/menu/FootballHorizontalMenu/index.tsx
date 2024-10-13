import React, { useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  AppBarContainer,
  BoxContainer,
  ButtonBack,
  ButtonLink,
  LeagueImage,
  ListItemMenu,
  PopoverComponent,
  ToolbarContainer,
} from './style'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { LeagueResponseFavorite } from 'src/types/apps/footballType'
import { getFavoriteLeague } from 'src/pages/api/football/league/getFavoriteLeague'
import {
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import toast from 'react-hot-toast'

type FootballVerticalMenuType = {
  type: string
}

const FootballVerticalMenu = ({ type }: FootballVerticalMenuType) => {
  const router = useRouter()
  const [year, setYear] = useState(new Date().getFullYear())
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleBack = () => {
    router.back()
  }

  const { data, error, isLoading } = useQuery<LeagueResponseFavorite[]>({
    queryKey: ['userFavoriteLeague'],
    queryFn: () => getFavoriteLeague(),
  })

  useEffect(() => {
    const currentYear = new Date().getFullYear()
    setYear(currentYear)
  }, [])

  useEffect(() => {
    if (error) toast.error('Internal error', { position: 'bottom-right' })
  }, [error])

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'favorites-popover' : undefined

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <AppBarContainer position='static'>
      <ToolbarContainer>
        <ButtonLink href={'/sports/football'} isSelected={type === 'home'}>
          <HomeIcon />
        </ButtonLink>
        <ButtonLink
          href={'/sports/football/odds/live'}
          isSelected={type === 'live'}
        >
          Live
        </ButtonLink>
        <ButtonLink
          href={'/sports/football/leagues'}
          isSelected={type === 'leagues'}
        >
          Leagues
        </ButtonLink>
        {data && data.length > 0 && (
          <>
            <List component='nav'>
              <ListItemMenu onClick={handleMenuClick}>
                <BoxContainer>
                  {data.slice(0, 3).map((league, index) => (
                    <LeagueImage
                      key={league.id}
                      src={league.logo}
                      alt={league.name}
                      title={league.name}
                      width={30}
                      height={30}
                      sx={{
                        position: 'absolute',
                        left: `${index * 15}px`,
                        zIndex: index,
                      }}
                    />
                  ))}
                </BoxContainer>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemMenu>
            </List>

            <PopoverComponent
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <List component='div' disablePadding>
                {data.map((league) => (
                  <ListItem
                    key={league.id}
                    component={ButtonLink}
                    href={`/sports/football/league/${league.leagueId}/${year}/details`}
                    sx={{
                      '&:hover': { backgroundColor: 'action.hover' },
                      transition: 'background-color 0.3s ease',
                    }}
                  >
                    <ListItemIcon>
                      <LeagueImage
                        src={league.logo}
                        alt={league.name}
                        title={league.name}
                        width={30}
                        height={30}
                      />
                    </ListItemIcon>
                    <ListItemText primary={league.name} />
                  </ListItem>
                ))}
              </List>
            </PopoverComponent>
          </>
        )}

        <ButtonBack onClick={handleBack}>
          <ArrowBackIcon />
        </ButtonBack>
      </ToolbarContainer>
    </AppBarContainer>
  )
}

export default FootballVerticalMenu
