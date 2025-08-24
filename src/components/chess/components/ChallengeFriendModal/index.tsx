import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
} from '@mui/material'
import { getFriends } from 'src/pages/api/friendship/getFriends'
import { FriendshipChallengeType } from 'src/context/types'
import toast from 'react-hot-toast'
import { chessFriendChallengeCreate } from 'src/pages/api/chess-challenge/chessFriendChallengeCreate'
import { CancelableToastContent } from '../../PersistentToast'
import { useAuth } from 'src/hooks/useAuth'
import { CreateChallengeReturn } from 'src/types/apps/chessTypes'
import { chessChallengeCancel } from 'src/pages/api/chess-challenge/chessChallengeCancel'
import { connectSocket } from 'src/pages/api/chess-room/chess-challenge-websocket'
import { usePresence } from 'src/context/PresenceContext'

type ChallengeFriendModalProps = {
  open: boolean
  userId: string
  handleClose: () => void
  amount: number
  duration: number
}

const ChallengeFriendModal: React.FC<ChallengeFriendModalProps> = ({
  open,
  userId,
  handleClose,
  amount,
  duration,
}) => {
  const [search, setSearch] = useState('')
  const [selectedFriend, setSelectedFriend] = useState<string>('')
  const [friendsList, setFriendsList] = useState<FriendshipChallengeType[]>([])

  const [peace, setPeace] = useState<'white' | 'black'>('white')

  const { user, toastId, setUser, setToastId } = useAuth()

  const { onlineUsers } = usePresence()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as 'white' | 'black'
    setPeace(value)
  }

  useEffect(() => {
    getFriends(userId)
      .then((response) => {
        setFriendsList(response.data)
      })
      .catch((error) => {
        console.error('Failed to fetch friends:', error)
      })
  }, [userId])

  useEffect(() => {
    const challengeId = window.localStorage.getItem('chess-challenge-id')
    const roomId = window.localStorage.getItem('chess-room-id')
    if (challengeId && roomId) {
      chessChallengeCancel(challengeId, roomId, JSON.stringify(amount))
    }
  }, [])

  const mappedFriends = friendsList.map((friend) => {
    const friendUser =
      friend.requesterId === userId ? friend.addressee : friend.requester
    const friendUserId =
      friend.requesterId === userId ? friend.addresseeId : friend.requesterId

    return {
      id: friendUserId,
      name: friendUser.name,
      online: (onlineUsers ?? []).some(
        (online) => online.friendId === friendUserId,
      ),
    }
  })

  const filteredFriends = mappedFriends
    .filter((friend) =>
      friend.name.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => (a.online === b.online ? 0 : a.online ? -1 : 1))

  const handleChallenge = () => {
    if (!selectedFriend) {
      toast.error('Select a friend to challenge!', {
        position: 'bottom-right',
      })
      return
    }

    const updateAccountAmount = (amount: number, action: string) => {
      if (user && user.Account) {
        let newAmount: number
        switch (action) {
          case 'subtraction':
            newAmount = (user.Account.amount / 100 - amount) * 100
            break

          case 'plus':
            newAmount = user.Account.amount
            break
          default:
            newAmount = user.Account.amount
            break
        }

        const updatedUser = {
          ...user,
          Account: {
            ...user.Account,
            amount: newAmount,
          },
        }
        setUser(updatedUser)
      }
    }

    // ABRIR SALA COM SOCKET PRA DEIXAR ONLINE ESPERANDO O JOGADOR ADDREESS ACEITAR O DESAFIO

    const friend = mappedFriends.find((f) => f.id === selectedFriend)
    if (!friend) return
    const data = {
      amount,
      duration,
      userId: selectedFriend,
      peace,
    }
    chessFriendChallengeCreate(data).then((response: CreateChallengeReturn) => {
      if (response) {
        updateAccountAmount(data.amount, 'subtraction')
        connectSocket(
          response.challenge.id,
          response.room.id,
          userId,
          userId,
          JSON.stringify(data.amount),
          'true',
          toastId as string,
          null,
          null,
          null,
          null,
          null,
        )
        window.localStorage.setItem('chess-room-id', response.room.id)
        window.localStorage.setItem('chess-challenge-id', response.challenge.id)

        setToastId(
          toast.loading(
            <CancelableToastContent
              toastId={toastId}
              amount={data.amount}
              updateAccountAmount={updateAccountAmount}
            />,
            {
              position: 'bottom-right',
              duration: Infinity,
              id: 'chess-loading-toast',
            },
          ),
        )
      }
    })

    handleClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 450,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant='h5' fontWeight={600} mb={3} color='text.primary'>
          Challenge a Friend
        </Typography>

        <TextField
          fullWidth
          label='Search friends'
          variant='outlined'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 3 }}
        />

        <FormControl component='fieldset' sx={{ mb: 3 }}>
          <FormLabel component='legend'>Choose your color</FormLabel>
          <RadioGroup row value={peace} onChange={handleChange}>
            <FormControlLabel
              value='white'
              control={<Radio />}
              label='♔ White'
            />
            <FormControlLabel
              value='black'
              control={<Radio />}
              label='♚ Black'
            />
          </RadioGroup>
        </FormControl>

        <Divider sx={{ mb: 3 }} />

        <FormControl component='fieldset'>
          <RadioGroup
            value={selectedFriend}
            onChange={(e) => setSelectedFriend(e.target.value)}
          >
            {filteredFriends.map((friend) => (
              <FormControlLabel
                key={friend.id}
                value={friend.id}
                control={<Radio />}
                label={
                  <Box display='flex' alignItems='center' gap={1}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: friend.online ? 'green' : 'grey.500',
                        border: '1px solid #ccc',
                        marginLeft: '10px',
                      }}
                    />
                    <Typography>{friend.name}</Typography>
                  </Box>
                }
                sx={{
                  mb: 1,
                  px: 1,
                  borderRadius: 1,
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Box mt={4} display='flex' justifyContent='flex-end' gap={2}>
          <Button variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleChallenge}>
            Challenge
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ChallengeFriendModal
