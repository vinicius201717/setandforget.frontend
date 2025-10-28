// pages/checklist.tsx
'use client'

import { useState } from 'react'
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
} from '@mui/material'

type ChecklistItem = {
  id: number
  label: string
  image: string
}

const checklistData: ChecklistItem[] = [
  {
    id: 1,
    label: 'Pergunta 1: Verifique o equipamento',
    image: '/images/equipamento.png', // coloque suas imagens na pasta public/images
  },
  {
    id: 2,
    label: 'Pergunta 2: Confirme a conexão',
    image: '/images/conexao.png',
  },
  {
    id: 3,
    label: 'Pergunta 3: Teste a funcionalidade',
    image: '/images/teste.png',
  },
]

export default function ChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<number[]>([])

  const handleToggle = (id: number) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const handleSubmit = () => {
    alert(`Itens marcados: ${checkedItems.join(', ')}`)
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant='h4' mb={3}>
        Checklist com imagens
      </Typography>

      <Grid container spacing={2}>
        {checklistData.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card sx={{ display: 'flex', alignItems: 'center' }}>
              <CardMedia
                component='img'
                sx={{ width: 120, objectFit: 'contain', p: 1 }}
                image={item.image}
                alt={item.label}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedItems.includes(item.id)}
                      onChange={() => handleToggle(item.id)}
                    />
                  }
                  label={<Typography>{item.label}</Typography>}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          Enviar
        </Button>
      </Box>
    </Box>
  )
}
