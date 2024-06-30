import React from 'react'
import { Radio, styled } from '@mui/material'
import { Box } from '@mui/system'

// Componente de rádio personalizado
const SquareRadio = styled(Radio)(() => ({
  width: '50px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const SquareContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  paddingRight: '15px',
}))

// Componente que encapsula o `SquareRadio`
const CustomRadio = ({ name, value, checked, onChange, label }: any) => {
  return (
    <SquareContainer style={{ cursor: 'pointer' }}>
      <SquareRadio
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </SquareContainer>
  )
}

export default CustomRadio
