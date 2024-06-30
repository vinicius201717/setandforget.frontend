import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Theme,
  styled,
} from '@mui/material'

export const Container = styled(Box)<BoxProps>(
  ({ theme }: { theme: Theme }) => ({
    position: 'absolute',
    backgroundColor: theme.palette.primary.main,
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    width: '40%',
    height: '100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }),
)

export const ButtonPiece = styled(Button)<ButtonProps>(() => ({
  background: 'none',
}))
