/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import React, { useMemo, useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
  LinearProgress,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Stack,
  IconButton,
  TextField,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import SearchIcon from '@mui/icons-material/Search'
import { useAuth } from 'src/hooks/useAuth'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { isNaN } from 'lodash'
import { createOperation } from 'src/pages/api/operation/createOperation'

type Item = {
  id: string
  title: string
  description?: string
  group: string
  weight: number
}

// Mock checklist
const CHECKLIST: Item[] = [
  {
    id: 'aoi-touch',
    title: 'Toque / Rejeição em AOI (Weekly/Daily)',
    description:
      'Preço reagindo em AOI no Weekly/Daily (ex.: martelo, engulfing)',
    group: 'Análise',
    weight: 15,
  },
  {
    id: 'psych-level',
    title: 'Nível psicológico (Weekly/Daily)',
    description:
      'Níveis redondos (ex.: 1.20000). Confluência extra se coincidir com AOI',
    group: 'Análise',
    weight: 10,
  },
  {
    id: 'ema-touch',
    title: 'Toque / Rejeição na EMA 50',
    description: 'EMA50 atuando como suporte/resistência dinâmica',
    group: 'Análise',
    weight: 10,
  },
  {
    id: 'candle-rejection',
    title: 'Rejeição por padrão de candle',
    description: 'Pin bar, martelo, martelo invertido, engulfing',
    group: 'Análise',
    weight: 10,
  },
  {
    id: 'prev-structure',
    title: 'Rejeição na estrutura anterior',
    description: 'Preço reagindo em topos/fundos anteriores',
    group: 'Análise',
    weight: 10,
  },
  {
    id: 'patterns',
    title: 'Padrões/gráficos',
    description: 'Topo/Fundo duplo, OCO, rompimento e reteste',
    group: 'Análise',
    weight: 10,
  },
  {
    id: 'sos',
    title: 'SOS — Shift Of Structure',
    description: 'Mudança de estrutura confirmando força',
    group: 'Entrada',
    weight: 15,
  },
  {
    id: 'entry-patterns',
    title: 'Padrões de entrada',
    description: 'Topo/Fundo duplo, OCO, Pullback',
    group: 'Entrada',
    weight: 10,
  },
  {
    id: 'hl-lh',
    title: 'Entrada em HL/LH',
    description: 'HL para compra, LH para venda',
    group: 'Entrada',
    weight: 10,
  },
  {
    id: 'engulfing-4h',
    title: 'Engulfing no 4H',
    description: 'Engulfing demonstra domínio de compradores/vendedores',
    group: 'Entrada',
    weight: 5,
  },
]

// Mock de pares Forex
const FOREX_PAIRS = [
  'EUR/USD',
  'GBP/USD',
  'USD/JPY',
  'USD/CHF',
  'USD/CAD',
  'AUD/USD',
  'NZD/USD',
  'EUR/GBP',
  'EUR/JPY',
  'EUR/CHF',
  'EUR/AUD',
  'EUR/NZD',
  'EUR/CAD',
  'GBP/JPY',
  'GBP/CHF',
  'GBP/AUD',
  'GBP/NZD',
  'GBP/CAD',
  'AUD/JPY',
  'AUD/NZD',
  'AUD/CHF',
  'AUD/CAD',
  'NZD/JPY',
  'NZD/CHF',
  'NZD/CAD',
  'CAD/JPY',
  'CAD/CHF',
  'CHF/JPY',
]

// Mock do professor
const professorPairs = ['EUR/USD', 'USD/JPY', 'AUD/USD']

// Mock análises registradas
const savedAnalyses = [
  {
    pair: 'EUR/USD',
    date: '02/11/2025',
    checkedItems: ['aoi-touch', 'psych-level'],
  },
  {
    pair: 'GBP/USD',
    date: '01/11/2025',
    checkedItems: ['aoi-touch', 'hl-lh', 'sos'],
  },
]

const GRADES = [
  { threshold: 90, label: 'A+' },
  { threshold: 80, label: 'B+' },
  { threshold: 70, label: 'C+' },
  { threshold: 60, label: 'D+' },
  { threshold: 50, label: 'F+' },
]

const publishSchema = z.object({
  notes: z.string().optional(),
})
type PublishFormData = z.infer<typeof publishSchema>

export default function ChecklistTradingPage() {
  const user = useAuth()
  const [checklist, setChecklist] = useState<Record<string, boolean>>({})
  const [rr, setRr] = useState<number>(0)
  const [openResumo, setOpenResumo] = useState(false)
  const [openPairModal, setOpenPairModal] = useState(false)
  const [selectedPair, setSelectedPair] = useState('EUR/USD')
  const [pairSearch, setPairSearch] = useState('')
  const [analyses, setAnalyses] = useState(savedAnalyses)
  const [openPublishModal, setOpenPublishModal] = useState(false)

  const form = useForm<PublishFormData>({
    resolver: zodResolver(publishSchema),
    defaultValues: { notes: '' },
  })
  const { handleSubmit, control, reset } = form

  // toggle item
  const toggle = (id: string) => setChecklist((s) => ({ ...s, [id]: !s[id] }))

  // total peso
  const totalPeso = useMemo(
    () =>
      CHECKLIST.reduce(
        (sum, it) => (checklist[it.id] ? sum + it.weight : sum),
        0,
      ),
    [checklist],
  )
  const totalMax = useMemo(
    () => CHECKLIST.reduce((acc, it) => acc + it.weight, 0),
    [],
  )
  const percentual = useMemo(
    () => Math.round(totalMax ? (totalPeso / totalMax) * 100 : 0),
    [totalPeso, totalMax],
  )
  const grade = useMemo(
    () => GRADES.find((g) => percentual >= g.threshold)?.label || 'Reprovado',
    [percentual],
  )

  const agora = new Date()
  const hora = agora.getHours()
  const minuto = agora.getMinutes()
  const operacaoPermitida =
    hora >= 4 && (hora < 13 || (hora === 13 && minuto === 0))

  const analisar = () => setOpenResumo(true)
  const fecharResumo = () => setOpenResumo(false)

  // filtro pares
  const filteredPairs = useMemo(() => {
    if (pairSearch.toLowerCase() === 'professor') return professorPairs
    if (!pairSearch) return FOREX_PAIRS
    return FOREX_PAIRS.filter((p) =>
      p.toLowerCase().includes(pairSearch.toLowerCase()),
    )
  }, [pairSearch])

  const handlePairSelect = (pair: string) => {
    setSelectedPair(pair)
    setOpenPairModal(false)
  }

  // abrir análise salva
  const loadAnalysis = (analysis: (typeof savedAnalyses)[0]) => {
    setSelectedPair(analysis.pair)
    const newChecked: Record<string, boolean> = {}
    analysis.checkedItems.forEach((id) => (newChecked[id] = true))
    setChecklist(newChecked)
  }

  const onSubmitPublish = (data: PublishFormData) => {
    console.log('Publicando operação:', {
      pair: selectedPair,
      checklist,
      rr,
      notes: data.notes,
    })
    setOpenPublishModal(false)
    reset()
  }

  const onSubmitDraft = () => {
    if (!selectedPair) {
      console.error('Erro: É obrigatório selecionar um par.')
      return
    }

    const isCheckedFilled = Array.isArray(checklist) && checklist.length > 0
    const isRrFilled = typeof rr === 'number' && !isNaN(rr)

    const payload = {
      pair: selectedPair,
      rr: isRrFilled ? rr : undefined,
      checklist: isCheckedFilled ? checklist.join(',') : '',
      status: 'DRAFT' as const,
      notes: '',
    }

    createOperation(payload).then((res) => {
      if (res) {
        console.log('Rascunho salvo com sucesso:', res)
      } else {
        console.error('Erro ao salvar rascunho.')
      }
    })
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        bgcolor: 'background.default',
        minHeight: '100vh',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: 8 }}>
            <CardContent>
              <Stack
                direction='row'
                spacing={2}
                justifyContent='space-between'
                alignItems='center'
                sx={{ mb: 2 }}
              >
                <Box>
                  <Typography variant='h5' sx={{ fontWeight: 700 }}>
                    Checklist de Análise & Entrada — Set & Forget
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ mt: 0.5 }}
                  >
                    {user.user?.name ? `${user.user.name} •` : ''} Par
                    selecionado: <strong>{selectedPair}</strong>
                  </Typography>
                </Box>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <Button
                    variant='outlined'
                    onClick={() => setOpenPairModal(true)}
                  >
                    Selecionar Par
                  </Button>
                  <Chip
                    label={
                      operacaoPermitida
                        ? 'Entrada Permitida'
                        : 'Entrada Bloqueada'
                    }
                    color={operacaoPermitida ? 'success' : 'error'}
                  />
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Stack>
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Checklist */}
              {['Análise', 'Entrada'].map((group) => {
                const items = CHECKLIST.filter((it) => it.group === group)
                return (
                  <Box key={group} sx={{ mb: 2 }}>
                    <Typography variant='h6' sx={{ mb: 1, fontWeight: 700 }}>
                      {group}
                    </Typography>
                    <Grid container spacing={2}>
                      {items.map((it) => (
                        <Grid item xs={12} sm={6} key={it.id}>
                          <Card
                            variant='outlined'
                            sx={{ p: 1, height: '100%', borderRadius: 2 }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 1,
                              }}
                            >
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={!!checklist[it.id]}
                                    onChange={() => toggle(it.id)}
                                  />
                                }
                                label={
                                  <Box>
                                    <Typography variant='subtitle1'>
                                      {it.title}
                                    </Typography>
                                    {it.description && (
                                      <Typography
                                        variant='caption'
                                        color='text.secondary'
                                      >
                                        {it.description}
                                      </Typography>
                                    )}
                                  </Box>
                                }
                              />
                              <Box sx={{ ml: 'auto' }}>
                                <Chip label={`${it.weight}%`} size='small' />
                              </Box>
                            </Box>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )
              })}

              <Divider sx={{ my: 2 }} />

              {/* RR obrigatório */}
              <Box
                sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}
              >
                <Typography>RR ≥ 2.0 (Obrigatório)</Typography>
                <Button
                  variant={rr ? 'contained' : 'outlined'}
                  onClick={() => setRr(0)}
                >
                  Sim
                </Button>
                <Button
                  variant={rr === 0 ? 'contained' : 'outlined'}
                  onClick={() => setRr(0)}
                >
                  Não
                </Button>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Button onClick={analisar} variant='contained' size='large'>
                  Analisar Confluência
                </Button>
                <Button
                  onClick={() => {
                    setChecklist({})
                    setRr(0)
                  }}
                  variant='outlined'
                >
                  Resetar
                </Button>
                <Box sx={{ ml: 'auto', textAlign: 'right' }}>
                  <Typography variant='subtitle2'>Score atual</Typography>
                  <Typography variant='h6'>
                    {percentual}% — {grade}
                  </Typography>
                  <LinearProgress
                    variant='determinate'
                    value={percentual}
                    sx={{ height: 10, borderRadius: 2, mt: 1 }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Painel lateral */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 6,
              position: { md: 'sticky' },
              top: 16,
            }}
          >
            <CardContent>
              <Typography variant='h6'>Resumo Rápido</Typography>
              <Divider sx={{ my: 1 }} />
              <Table size='small'>
                <TableBody>
                  <TableRow>
                    <TableCell>Confluência (peso somado)</TableCell>
                    <TableCell align='right'>{totalPeso}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Percentual Normalizado</TableCell>
                    <TableCell align='right'>{percentual}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Nota</TableCell>
                    <TableCell align='right'>{grade}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>RR ≥ 2.0</TableCell>
                    <TableCell align='right'>
                      {rr === null ? '—' : rr ? 'OK' : 'NÃO'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Regra de horário</TableCell>
                    <TableCell align='right'>
                      {operacaoPermitida
                        ? 'Permitido (04:00-13:00)'
                        : 'Bloqueado'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <br />
              <Button
                variant='contained'
                sx={{ marginRight: 2 }}
                onClick={() => setOpenPublishModal(true)}
              >
                Publicar
              </Button>

              <Button variant='outlined' onClick={() => onSubmitDraft()}>
                Guardar rascunho
              </Button>
            </CardContent>
          </Card>
          <br />
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 6,
              position: { md: 'sticky' },
              top: 16,
            }}
          >
            <CardContent sx={{ mt: 3 }}>
              <Typography variant='subtitle2' gutterBottom>
                Análises Registradas
              </Typography>
              <List dense sx={{ maxHeight: 300, overflowY: 'auto' }}>
                {analyses.map((a, i) => (
                  <ListItemButton key={i} onClick={() => loadAnalysis(a)}>
                    <ListItemText primary={a.pair} secondary={a.date} />
                  </ListItemButton>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Modal de seleção de par */}
      <Dialog
        open={openPairModal}
        onClose={() => setOpenPairModal(false)}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>Selecionar Par</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant='outlined'
            placeholder='Buscar par ou digite "professor"'
            value={pairSearch}
            onChange={(e) => setPairSearch(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Se digitou "professor" */}
            {pairSearch.toLowerCase() === 'professor' && (
              <Box>
                <Typography variant='subtitle2' sx={{ mb: 1 }}>
                  Professor
                </Typography>
                <Grid container spacing={1}>
                  {professorPairs.map((pair, i) => (
                    <Grid item xs={2.4} key={i}>
                      <Button
                        variant={selectedPair === pair ? 'contained' : 'text'}
                        color={selectedPair === pair ? 'primary' : 'inherit'}
                        fullWidth
                        sx={{ textTransform: 'none', minHeight: 40 }}
                        onClick={() => handlePairSelect(pair)}
                      >
                        {pair}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Exibir os demais pares normais */}
            {pairSearch.toLowerCase() !== 'professor' && (
              <Box>
                <Typography variant='subtitle2' sx={{ mb: 1 }}>
                  Todos os pares
                </Typography>
                <Grid container spacing={1}>
                  {filteredPairs.map((pair, i) => (
                    <Grid item xs={2.4} key={i}>
                      <Button
                        variant={selectedPair === pair ? 'contained' : 'text'}
                        color={selectedPair === pair ? 'primary' : 'inherit'}
                        fullWidth
                        sx={{ textTransform: 'none', minHeight: 40 }}
                        onClick={() => handlePairSelect(pair)}
                      >
                        {pair}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPairModal(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal de resumo detalhado */}
      <Dialog open={openResumo} onClose={fecharResumo} maxWidth='md' fullWidth>
        <DialogTitle>Resumo da Análise</DialogTitle>
        <DialogContent>
          <Typography variant='subtitle1' gutterBottom>
            Detalhamento por item
          </Typography>
          <Table size='small'>
            <TableBody>
              {CHECKLIST.map((it) => (
                <TableRow key={it.id}>
                  <TableCell>{it.title}</TableCell>
                  <TableCell align='right'>{it.weight}%</TableCell>
                  <TableCell align='right'>
                    {checklist[it.id] ? '✔' : '—'}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <strong>Total (peso)</strong>
                </TableCell>
                <TableCell align='right'>
                  <strong>{totalPeso}%</strong>
                </TableCell>
                <TableCell align='right'>
                  <strong>{percentual}%</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box sx={{ mt: 2 }}>
            <Typography variant='subtitle2'>Interpretação</Typography>
            <Typography variant='body2' sx={{ mt: 1 }}>
              Nota: <strong>{grade}</strong>.{' '}
              {rr < 2
                ? 'RR insuficiente — entrada proibida.'
                : 'RR em termos aceitáveis.'}
            </Typography>
            <Typography variant='body2' sx={{ mt: 1 }}>
              Se a nota for A+ ou B+ e o horário permitir, você tem uma
              configuração de alta probabilidade — alinhe SL/TP conforme sua
              regra.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={fecharResumo}>Fechar</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPublishModal}
        onClose={() => setOpenPublishModal(false)}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>Publicar Operação</DialogTitle>
        <DialogContent>
          <form id='publish-form' onSubmit={handleSubmit(onSubmitPublish)}>
            <Controller
              name='notes'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  rows={4}
                  fullWidth
                  placeholder='Notas adicionais (opcional)'
                  variant='outlined'
                />
              )}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPublishModal(false)}>Cancelar</Button>
          <Button type='submit' form='publish-form' variant='contained'>
            Publicar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
