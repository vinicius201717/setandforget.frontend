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

  const mappedFriends = friendsList.map((friend) => {
    const friendUser =
      friend.requesterId === userId ? friend.addressee : friend.requester
    const friendUserId =
      friend.requesterId === userId ? friend.addresseeId : friend.requesterId
    return {
      id: friendUserId,
      name: friendUser.name,
      originalFriendship: friend,
    }
  })

  const filteredFriends = mappedFriends.filter((friend) =>
    friend.name.toLowerCase().includes(search.toLowerCase()),
  )

  const handleChallenge = () => {
    if (!selectedFriend) {
      toast.error('Select a friend to challenge!', {
        position: 'bottom-right',
      })
      return
    }

    const friend = mappedFriends.find((f) => f.id === selectedFriend)
    if (!friend) return
    const data = {
      amount,
      duration,
      userId: selectedFriend,
      peace,
    }
    chessFriendChallengeCreate(data).then((response) => {
      console.log(response)

      toast.success(`Challenge sent to ${friend.name}`, {
        position: 'bottom-right',
      })
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
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant='h6' mb={2}>
          Challenge a Friend
        </Typography>

        <TextField
          fullWidth
          label='Search friends'
          variant='outlined'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Color</FormLabel>
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
        <Divider />
        <br />
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
                label={friend.name}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Box mt={3} display='flex' justifyContent='flex-end' gap={1}>
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
