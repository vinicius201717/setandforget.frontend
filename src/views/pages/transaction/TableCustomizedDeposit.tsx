/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { differenceInSeconds, format } from 'date-fns'
import { StyledTableCell, StyledTableRow } from './style'
import { Badge, Box } from '@mui/material'
import { Deposit } from 'src/context/types'
import { formatMoney } from 'src/utils/format-money'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import DepositSuccessModal from 'src/components/deposit/DepositSuccessModal'
import { updateDeposit } from 'src/pages/api/payment/updateDeposit'

interface TableCustomizedProps {
  setDeposit: (deposit: Deposit[]) => void
  deposit: Deposit[] | undefined
  handlePageDeposit: (page: number) => void
  currentPage: number
}

interface DepositResponse {
  response?: {
    pixCode?: string
    message?: string
    expire?: number
  }
}

const TableRowStatus = (status: 'PENDING' | 'PAID' | 'FAILED') => {
  switch (status) {
    case 'PENDING':
      return (
        <Badge
          color='warning'
          variant='dot'
          sx={{
            '& .MuiBadge-badge': {
              right: 4,
              boxShadow: (theme) =>
                `0 0 0 2px ${theme.palette.background.paper}`,
            },
          }}
        />
      )
    case 'PAID':
      return (
        <Badge
          color='success'
          variant='dot'
          sx={{
            '& .MuiBadge-badge': {
              right: 4,
              boxShadow: (theme) =>
                `0 0 0 2px ${theme.palette.background.paper}`,
            },
          }}
        />
      )
    case 'FAILED':
      return (
        <Badge
          color='error'
          variant='dot'
          sx={{
            '& .MuiBadge-badge': {
              right: 4,
              boxShadow: (theme) =>
                `0 0 0 2px ${theme.palette.background.paper}`,
            },
          }}
        />
      )
    default:
      return null
  }
}

const TableCustomizedDeposit = ({
  setDeposit,
  deposit,
  handlePageDeposit,
  currentPage,
}: TableCustomizedProps) => {
  const [openModal, setOpenModal] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // Default 5 minutes
  const [response, setResponse] = useState<DepositResponse | null>(null)
  const [validButtons, setValidButtons] = useState<Set<string | number>>(
    new Set(),
  )

  const handleOpenModal = (deposit: Deposit) => {
    const secondsSinceUpdate = differenceInSeconds(
      new Date(),
      new Date(deposit.updatedAt),
    )
    const remainingTime = Math.max(300 - secondsSinceUpdate, 0)
    setResponse({
      response: {
        pixCode: deposit.pixCode || 'No pix code available',
        message: 'Transaction ready to be processed.',
        expire: remainingTime,
      },
    })
    setTimeLeft(remainingTime)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setResponse(null)
    setTimeLeft(300)
  }

  const actionButton = (row: Deposit) => {
    if (row.status !== 'PENDING') return null

    const updatedAt = new Date(row.updatedAt)
    const now = new Date()

    const diffMs = now.getTime() - updatedAt.getTime()
    const diffMinutes = diffMs / 1000 / 60

    if (diffMinutes <= 5) {
      return (
        <Button variant='contained' onClick={() => handleOpenModal(row)}>
          Pagar
        </Button>
      )
    } else {
      updateDeposit(row.id as string, 'FAILED')
      setDeposit(
        (deposit ?? []).map((dep) =>
          dep.id === row.id ? { ...dep, status: 'FAILED' } : dep,
        ),
      )
    }

    return null
  }

  const itemsPerPage = 10
  const mappedTransactions = deposit || []

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageDeposit(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (mappedTransactions.length === itemsPerPage) {
      handlePageDeposit(currentPage + 1)
    }
  }

  // Timer para monitorar a validade dos botões
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const newValidButtons = new Set<string | number>()
      mappedTransactions.forEach((deposit) => {
        const secondsSinceUpdate = differenceInSeconds(
          now,
          new Date(deposit.updatedAt),
        )
        if (secondsSinceUpdate <= 300 && deposit.status === 'PENDING') {
          newValidButtons.add(deposit.id as string)
        }
      })
      setValidButtons(newValidButtons)
    }, 1000)

    return () => clearInterval(timer)
  }, [mappedTransactions])

  // Timer para o modal
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (openModal && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            handleCloseModal()
            toast.error('O tempo para pagamento expirou.')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [openModal, timeLeft])

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='Transactions'>
          <TableRow>
            <StyledTableCell>Deposit ID</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell align='left'>Payment Type</StyledTableCell>
            <StyledTableCell align='left'>Amount</StyledTableCell>
            <StyledTableCell align='left'>Date</StyledTableCell>
            <StyledTableCell align='center'>Action</StyledTableCell>
          </TableRow>
          <TableBody>
            {mappedTransactions.length > 0 ? (
              mappedTransactions.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align='left'>{row.id}</StyledTableCell>
                  <StyledTableCell align='left'>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      {TableRowStatus(
                        row.status as 'PENDING' | 'PAID' | 'FAILED',
                      )}
                      {row.status}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    {row.paymentType.toUpperCase()}
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    {formatMoney(row.amount)}
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    {row.createdAt
                      ? format(new Date(row.createdAt), 'dd/MM/yyyy HH:mm:ss')
                      : 'No data available'}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {actionButton(row)}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={6} align='center'>
                  No deposit transactions available.
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '16px',
          gap: '16px',
          padding: '0 16px',
        }}
      >
        <Button
          variant='outlined'
          onClick={handlePrevious}
          disabled={currentPage === 1}
          sx={{ mb: 2 }}
        >
          Previous
        </Button>
        <Typography variant='body2'>
          Page {currentPage} ({mappedTransactions.length} items)
        </Typography>
        <Button
          variant='outlined'
          onClick={handleNext}
          disabled={mappedTransactions.length < itemsPerPage}
          sx={{ mb: 2 }}
        >
          Next
        </Button>
      </Box>
      {response && (
        <DepositSuccessModal
          onClose={handleCloseModal}
          open={openModal}
          response={response}
        />
      )}
    </div>
  )
}

export default TableCustomizedDeposit
