import { Box, Button } from '@mui/material'

interface Props {
  handleBack: () => void
  handleNext: () => void
  activeStep: number
  steps: string[]
}

export function ButtonBackNext({
  handleBack,
  handleNext,
  activeStep,
  steps,
}: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
      {activeStep > 0 ? (
        <Button color='inherit' onClick={() => handleBack()} sx={{ mr: 1 }}>
          Back
        </Button>
      ) : (
        ''
      )}

      <Box sx={{ flex: '1 1 auto' }} />
      <Button onClick={() => handleNext()}>
        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
      </Button>
    </Box>
  )
}
