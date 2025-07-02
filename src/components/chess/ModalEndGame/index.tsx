/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { CloseButton, DataGame, StyledCard } from './style'
import CloseIcon from '@mui/icons-material/Close'
import { formatMoney } from 'src/utils/format-money'
import { GridArrowDownwardIcon, GridArrowUpwardIcon } from '@mui/x-data-grid'
import { formatClock } from 'src/utils/format-clock-ticket'
import { translateGameOverMessage } from '../utils/verifyTitleInRelationMessage'
import { useAuth } from 'src/hooks/useAuth'
import { Player } from 'src/types/apps/chessTypes'
import {
  isUserConnected,
  revenge,
} from 'src/pages/api/chess-room/chess-challenge-websocket'
import toast from 'react-hot-toast'
import { CancelableToastContentRevenge } from '../PersistentToast/revenge'
import { updateAccountAmount } from './utils'
interface ConfirmModalProps {
  open: boolean
  roomId: string
  handleClose: () => void
  amount: number
  duration: number
  message: string
  playerOne: Player
  playerTwo: Player
  loserId: string
}

function ModalEndGame({
  open,
  handleClose,
  amount,
  duration,
  roomId,
  message,
  playerOne,
  playerTwo,
  loserId,
}: ConfirmModalProps) {
  const { user, toastId, setToastId, setUser } = useAuth()
  const notAmI: Player = user?.id === playerOne.id ? playerTwo : playerOne

  type RevengeType = {
    amount: number
    duration: number
  }

  const handleRevenge = (data: RevengeType) => {
    if (user?.Account.amount && user.Account.amount / 100 >= data.amount) {
      revenge(roomId, user.id, user.name)
      setToastId(
        toast.loading(
          <CancelableToastContentRevenge
            toastId={toastId}
            amount={data.amount}
            userName={notAmI.name}
            updateAccountAmount={() => updateAccountAmount}
          />,
          {
            position: 'bottom-right',
            duration: Infinity,
            id: 'chess-loading-toast',
          },
        ),
      )
    } else {
      toast.error('Insufficient funds.', {
        position: 'bottom-right',
      })
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
      disableAutoFocus
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <StyledCard>
        <Typography variant='h4'>
          {translateGameOverMessage(message, loserId, user?.id as string)}
        </Typography>
        <p>{message}</p>
        <CloseButton onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
        <TableContainer component={Paper} sx={{ marginBottom: '5px' }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={3}>
                  <DataGame>
                    <span>{formatClock(duration / 60)}</span>
                    <div>
                      {translateGameOverMessage(
                        message,
                        loserId,
                        user?.id as string,
                      ) === 'You lost' ? (
                        <GridArrowDownwardIcon
                          style={{
                            width: '15px',
                            color: 'red',
                            verticalAlign: 'middle',
                            marginRight: '-5px',
                            marginBottom: '3px',
                          }}
                        />
                      ) : (
                        ''
                      )}
                      <span> {formatMoney(amount)}</span>
                    </div>

                    <div>
                      {translateGameOverMessage(
                        message,
                        loserId,
                        user?.id as string,
                      ) === 'You won' ? (
                        <GridArrowUpwardIcon
                          style={{
                            width: '15px',
                            color: 'green',
                            verticalAlign: 'middle',
                            marginRight: '-5px',
                            marginBottom: '3px',
                          }}
                        />
                      ) : (
                        ''
                      )}
                      <span> {formatMoney(amount * 2 * 0.9)}</span>
                    </div>
                  </DataGame>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{playerOne.name}</TableCell>
                <TableCell></TableCell>
                <TableCell align='right'>{playerTwo.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{formatMoney(amount)}</TableCell>
                <TableCell></TableCell>
                <TableCell align='right'>{formatMoney(amount)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant='contained' sx={{ margin: '5px' }}>
          <PersonAddIcon />
        </Button>
        {isUserConnected() && (
          <Button
            onClick={() => handleRevenge({ amount, duration })}
            variant='contained'
            sx={{ margin: '5px', width: '60%' }}
          >
            Revanche
          </Button>
        )}
      </StyledCard>
    </Modal>
  )
}

export default ModalEndGame
