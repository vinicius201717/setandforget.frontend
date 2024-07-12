import { Box, BoxProps, styled } from '@mui/material'

export const Container = styled(Box)<BoxProps & { isRunning: boolean }>(
  ({ theme, isRunning }) => ({
    maxWidth: '200px',
    width: 'fit-content',
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: '4px',
    fontSize: '20px',
    fontWeight: '600',
    padding: '10px',
    marginLeft: '10px',
    color: theme.palette.primary.contrastText,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    opacity: isRunning ? 1 : 0.5,

    [theme.breakpoints.down('md')]: {
      margin: '0',
    },
  }),
)
