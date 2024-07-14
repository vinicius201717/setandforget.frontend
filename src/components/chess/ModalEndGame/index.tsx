import {
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material'
import { CloseButton, DataGame, StyledCard } from './style'
import CloseIcon from '@mui/icons-material/Close'
import { formatMoney } from 'src/utils/format-money'
import { GridArrowDownwardIcon, GridArrowUpwardIcon } from '@mui/x-data-grid'
import { formatClock } from 'src/utils/format-clock-ticket'
import { translateGameOverMessage } from '../utils/verifyTitleInRelationMessage'
import { useAuth } from 'src/hooks/useAuth'
import { Player } from 'src/types/apps/chessTypes'
interface ConfirmModalProps {
  open: boolean
  roomId: string
  handleClose: () => void
  amount: number
  duration: number
  message: string
  playerOne: Player
  playerTwo: Player
  winnerId: string
  loserId: string
}

function ModalEndGame({
  open,
  handleClose,
  amount,
  duration,
  message,
  playerOne,
  playerTwo,
  winnerId,
}: ConfirmModalProps) {
  const { user } = useAuth()

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
          {translateGameOverMessage(message, winnerId, user?.id as string)}
        </Typography>
        <p>{message}</p>
        <CloseButton onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={3}>
                  <DataGame>
                    <span>{formatClock(duration / 60)}</span>
                    <div>
                      {translateGameOverMessage(
                        message,
                        winnerId,
                        user?.id as string,
                      ) === 'You lost' ? (
                        <GridArrowDownwardIcon
                          style={{
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
                        winnerId,
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
      </StyledCard>
    </Modal>
  )
}

export default ModalEndGame
