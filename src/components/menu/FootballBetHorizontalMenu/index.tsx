/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {
  IconButton,
  InputBase,
  Typography,
  Modal,
  CircularProgress,
  Divider,
} from '@mui/material'
import AppsIcon from '@mui/icons-material/Apps'
import {
  AppBarContainer,
  AppBoxContainer,
  Search,
  SearchContainer,
  ModalContentContainer,
  ModalButtonContainer,
  ButtonLink,
  FixtureContainer,
  FixtureTeamContainer,
  TeamLogo,
  ContainerProgress,
} from './style'
import {
  Bets,
  OddsBetType,
  UserFavoriteOddsBetType,
} from 'src/types/apps/footballType/oddsType'
import CloseIcon from '@mui/icons-material/Close'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import toast from 'react-hot-toast'
import { postOddsBet } from 'src/pages/api/football/odds/postOddsBet'
import { deleteFavoriteOddsBet } from 'src/pages/api/football/odds/deleteFavoriteOddsBet'
import { useQuery } from '@tanstack/react-query'
import { fixtureType } from 'src/types/apps/footballType/fixtureType'
interface MenuBetProps {
  oddsBet: OddsBetType[] | null
  fixture: fixtureType | null
  favoriteOddsBet: UserFavoriteOddsBetType[] | null
  favorites: Bets | null
  identifyFavorite: OddsBetType | null
  handleFavoritOddsBet: (betId: number, rm: boolean) => void
  handleGetBet: (betId: number) => void
}

const FootballBetHorizontalMenu = ({
  oddsBet,
  fixture,
  favoriteOddsBet,
  identifyFavorite,
  handleFavoritOddsBet,
  handleGetBet,
}: MenuBetProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedBet, setSelectedBet] = useState<OddsBetType | null>(null)
  const [favoriteBets, setFavoriteBets] = useState<UserFavoriteOddsBetType[]>(
    [],
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredBets, setFilteredBets] = useState<OddsBetType[] | null>(null)
  const [focusedBetId, setFocusedBetId] = useState<number | null>(null)

  const { refetch } = useQuery<UserFavoriteOddsBetType>({
    queryKey: ['postUserFavoriteOddsBet', selectedBet?.id],
    queryFn: async () => {
      if (selectedBet) {
        const response = await postOddsBet(selectedBet)
        if (response) {
          setFavoriteBets([...favoriteBets, response])
          handleFavoritOddsBet(selectedBet?.id, true)
          toast.success(`${selectedBet.name} added to favorites`, {
            position: 'bottom-right',
          })
        } else {
          toast.error(`Failed to add ${selectedBet.name} to favorites`, {
            position: 'bottom-right',
          })
        }
        return response
      }
      throw new Error('No bet selected')
    },
    enabled: false,
  })

  const handleDeleteUserFavoriteOddsBet = (id: string, betId: number) => {
    deleteFavoriteOddsBet(id).then((response: OddsBetType | unknown) => {
      if (response) {
        toast.success(`Bet successfully removed!`, {
          position: 'bottom-right',
        })
        handleFavoritOddsBet(betId, false)
        setFavoriteBets((prevFavorites) =>
          prevFavorites.filter((favBet) => favBet.betId !== betId),
        )
      } else {
        toast.error('Failed to remove bet', {
          position: 'bottom-right',
        })
      }
    })
  }

  useEffect(() => {
    if (identifyFavorite) {
      setFocusedBetId(identifyFavorite.id)
    }
  }, [identifyFavorite])

  useEffect(() => {
    if (selectedBet) {
      const favorite = favoriteBets.find(
        (favBet) => favBet.betId === selectedBet.id,
      )

      if (favorite) {
        handleDeleteUserFavoriteOddsBet(favorite.id, favorite.betId)
      } else {
        refetch()
      }
    }
  }, [selectedBet])

  const toggleFavorite = async (bet: OddsBetType) => {
    setSelectedBet(bet)
  }

  useEffect(() => {
    if (favoriteOddsBet) {
      setFavoriteBets(favoriteOddsBet)
    }
  }, [favoriteOddsBet])

  const handleFocusBet = (betId: number) => {
    handleGetBet(betId)
    setFocusedBetId(betId)
  }

  useEffect(() => {
    if (oddsBet) {
      const filtered = oddsBet.filter((bet) =>
        bet.name?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredBets(filtered)
    }
  }, [searchQuery, oddsBet])

  const handleOpenModal = () => setModalOpen(true)
  const handleCloseModal = () => setModalOpen(false)

  return (
    <AppBarContainer position='static'>
      {oddsBet && fixture ? (
        <>
          <FixtureContainer>
            <FixtureTeamContainer>
              {fixture && (
                <>
                  <TeamLogo
                    src={fixture.home.logo}
                    width={100}
                    height={100}
                    alt={fixture.home.name}
                  />
                  <Typography>{fixture.home.name}</Typography>
                </>
              )}
            </FixtureTeamContainer>
            <Typography>X</Typography>
            <FixtureTeamContainer>
              {fixture && (
                <>
                  <Typography>{fixture.away.name}</Typography>
                  <TeamLogo
                    src={fixture.away.logo}
                    width={100}
                    height={100}
                    alt={fixture.away.name}
                  />
                </>
              )}
            </FixtureTeamContainer>
          </FixtureContainer>
          <Divider />
          <SearchContainer>
            <IconButton
              sx={{ p: '10px' }}
              aria-label='menu'
              onClick={handleOpenModal}
            >
              <AppsIcon />
            </IconButton>
            <Search>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='Search bet'
                inputProps={{ 'aria-label': 'search leagues' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery ? (
                <IconButton
                  sx={{ p: '10px' }}
                  aria-label='clear'
                  onClick={() => setSearchQuery('')}
                >
                  <CloseIcon />
                </IconButton>
              ) : null}
            </Search>
          </SearchContainer>

          <AppBoxContainer>
            {!favoriteOddsBet ? (
              <CircularProgress size={24} />
            ) : searchQuery && filteredBets && filteredBets.length > 0 ? (
              filteredBets.map((bet: OddsBetType) => {
                const isFavorite = favoriteBets.some(
                  (favBet) => favBet.betId === bet.id,
                )
                return (
                  <ButtonLink
                    key={bet.id}
                    sx={{
                      flexShrink: 0,
                      minWidth: '150px',
                    }}
                  >
                    {bet.name}
                    <IconButton onClick={() => toggleFavorite(bet)}>
                      {isFavorite ? (
                        <StarIcon color='primary' />
                      ) : (
                        <StarBorderIcon />
                      )}
                    </IconButton>
                  </ButtonLink>
                )
              })
            ) : favoriteOddsBet.length > 0 ? (
              favoriteOddsBet.map((bet: UserFavoriteOddsBetType) => {
                const isHighlighted = bet.betId === focusedBetId

                return (
                  <ButtonLink
                    onClick={() => handleFocusBet(bet.betId)}
                    key={bet.id}
                    sx={{
                      backgroundColor: isHighlighted
                        ? 'primary.main'
                        : 'secondary.main',
                    }}
                  >
                    {bet.name}
                  </ButtonLink>
                )
              })
            ) : (
              <Typography variant='body2'>No favorite bets found</Typography>
            )}
          </AppBoxContainer>
        </>
      ) : (
        <ContainerProgress>
          <CircularProgress />
        </ContainerProgress>
      )}

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <ModalContentContainer>
          <Typography id='modal-title' variant='h6'>
            CHOOSE BET
          </Typography>
          <ModalButtonContainer>
            {oddsBet &&
              [...oddsBet]
                .sort((a, b) => {
                  const aIsFavorite = favoriteBets.some(
                    (favBet) => favBet.betId === a.id,
                  )
                  const bIsFavorite = favoriteBets.some(
                    (favBet) => favBet.betId === b.id,
                  )
                  return aIsFavorite === bIsFavorite ? 0 : aIsFavorite ? -1 : 1
                })
                .map((bet: OddsBetType) => {
                  const isFavorite = favoriteBets.some(
                    (favBet) => favBet.betId === bet.id,
                  )

                  return (
                    <ButtonLink
                      key={bet.id}
                      onClick={() => handleGetBet(bet.id)}
                    >
                      {bet.name}
                      <IconButton onClick={() => toggleFavorite(bet)}>
                        {isFavorite ? (
                          <StarIcon color='primary' />
                        ) : (
                          <StarBorderIcon />
                        )}
                      </IconButton>
                    </ButtonLink>
                  )
                })}
          </ModalButtonContainer>
        </ModalContentContainer>
      </Modal>
    </AppBarContainer>
  )
}

export default FootballBetHorizontalMenu
