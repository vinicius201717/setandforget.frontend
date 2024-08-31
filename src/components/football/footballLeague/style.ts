import {
  Box,
  BoxProps,
  CardContent,
  CardContentProps,
  Chip,
  ChipProps,
  Modal,
  ModalProps,
  Pagination,
  styled,
  TableCell,
  TableCellProps,
  TableRow,
  TableRowProps,
  Typography,
  TypographyProps,
} from '@mui/material'
import Image, { ImageProps } from 'next/image'

interface InfoItemProps extends BoxProps {
  result: string
  isLast: boolean
}

export const ContainerProgress = styled(Box)<BoxProps>(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  paddingBottom: '300px',
}))

export const TeamLogoContainer = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2',
  margin: '20px',
}))

export const TeamLogo = styled(Image)<ImageProps>(() => ({
  width: '30px',
  height: '30px',
  objectFit: 'contain',
  marginRight: '6px',
}))

export const ContainerFixture = styled(Box)<BoxProps>(() => ({
  width: '100%',
}))

export const PlayerPhoto = styled(Image)<ImageProps>(() => ({
  width: '30px',
  height: '30px',
  objectFit: 'contain',
  marginRight: '6px',
  borderRadius: '10%',
}))

export const TeamCellClube = styled(TableCell)<TableCellProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}))

export const TypographyPrimary = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    color: theme.palette.primary.main,
  }),
)

export const BoxForm = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
}))

export const ChipIcon = styled(Chip)<ChipProps>(() => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  '.MuiChip-icon': {
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

export const GetIcon = styled(Box)<InfoItemProps>(
  ({ theme, result, isLast }) => ({
    width: isLast ? 22 : 18,
    height: isLast ? 22 : 18,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    backgroundColor:
      result === 'W'
        ? theme.palette.success.main
        : result === 'L'
          ? theme.palette.error.main
          : theme.palette.grey[500],
    border: isLast ? `2px solid white` : 'none',
    fontSize: '1.2rem',
  }),
)

//
export const StyledPagination = styled(Pagination)(() => ({
  '& .MuiPaginationItem-root': {
    color: '#ffffff',
  },
  '& .Mui-selected': {
    backgroundColor: '#4caf50',
    color: '#ffffff',
  },
}))

export const StyledTableCell = styled(TableCell)<TableCellProps>(
  ({ theme }) => ({
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: '0.875rem',
    padding: theme.spacing(2),
  }),
)

export const StyledTableRow = styled(TableRow)<TableRowProps>(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}))
export const ModalProdiction = styled(Modal)<ModalProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const ContentUnavailable = styled(CardContent)<CardContentProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '30px',
}))

export const ModalContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '90%',
  maxWidth: '1000px',
  height: '90vh',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  outline: 'none',
  overflowY: 'auto',
  scrollbarWidth: 'thin',
  scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.default}`,
  '&::-webkit-scrollbar': {
    width: '7px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
  },
}))
