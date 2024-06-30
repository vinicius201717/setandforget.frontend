import { Box, styled } from '@mui/material'

export const StyledBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.easeInOut,
    duration: '1s',
  }),

  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
      outline: 'none',
    },
  },
}))
