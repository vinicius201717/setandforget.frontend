import { Chip } from '@mui/material'

export default function TagChip({ label }: { label: string }) {
  return (
    <Chip
      label={label}
      size='small'
      sx={{
        bgcolor: 'rgba(0,0,0,0.05)',
        fontWeight: 500,
        borderRadius: 2,
      }}
    />
  )
}
