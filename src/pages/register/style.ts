import {
  Box,
  BoxProps,
  Typography,
  TypographyProps,
  styled,
} from '@mui/material'
import Link from 'next/link'

export const RegisterIllustrationWrapper = styled(Box)<BoxProps>(
  ({ theme }) => ({
    padding: theme.spacing(20),
    paddingRight: '0 !important',
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(10),
    },
  }),
)

export const RegisterIllustration = styled('img')(({ theme }) => ({
  maxWidth: '46rem',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '35rem',
  },
}))

export const TreeIllustration = styled('img')(({ theme }) => ({
  bottom: 0,
  left: '1.875rem',
  position: 'absolute',
  [theme.breakpoints.down('lg')]: {
    left: 0,
  },
}))

export const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450,
  },
}))

export const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    width: '100%',
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: 400,
  },
}))

export const TypographyStyled = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down('md')]: { mt: theme.spacing(8) },
  }),
)

export const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
}))
