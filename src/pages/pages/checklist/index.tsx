/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
  Tooltip,
  IconButton,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { CHECKLIST, Item } from 'src/utils/checklist'
import { useAuth } from 'src/hooks/useAuth'

const GRADES = [
  { threshold: 90, label: 'A+' },
  { threshold: 80, label: 'B+' },
  { threshold: 70, label: 'C+' },
  { threshold: 60, label: 'D+' },
  { threshold: 50, label: 'F+' },
]

export default function ChecklistTradingPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [rrOk, setRrOk] = useState<boolean | null>(null)
  const [openResumo, setOpenResumo] = useState(false)

  const grupos = useMemo(() => {
    const map = new Map<string, Item[]>()
    CHECKLIST.forEach((it) => {
      if (!map.has(it.group)) map.set(it.group, [])
      map.get(it.group)!.push(it)
    })
    return map
  }, [])

  const toggle = (id: string) => {
    setChecked((s) => ({ ...s, [id]: !s[id] }))
  }

  // cálculo do score de confluência (soma dos pesos marcados)
  const totalPeso = useMemo(() => {
    let sum = 0
    CHECKLIST.forEach((it) => {
      if (checked[it.id]) sum += it.weight
    })
    return sum
  }, [checked])

  const totalMax = useMemo(() => {
    return CHECKLIST.reduce((acc, it) => acc + it.weight, 0)
  }, [])

  const percentual = useMemo(() => {
    // normaliza para escala 0-100
    if (totalMax === 0) return 0
    return Math.round((totalPeso / totalMax) * 100)
  }, [totalPeso, totalMax])

  const grade = useMemo(() => {
    for (const g of GRADES) if (percentual >= g.threshold) return g.label
    return 'Reprovado'
  }, [percentual])

  const agora = new Date()
  const hora = agora.getHours()
  const minuto = agora.getMinutes()
  const operacaoPermitida =
    hora >= 4 && (hora < 13 || (hora === 13 && minuto === 0))

  const analisar = () => {
    setOpenResumo(true)
  }

  const user = useAuth()

  const fecharResumo = () => setOpenResumo(false)

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 2, boxShadow: 6 }}>
            <CardContent>
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
              >
                <Box>
                  <Typography variant='h5' gutterBottom>
                    Checklist de Confluência — Set & Forget
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {user.user?.name} — responda as perguntas selecionando os
                    itens que batem na sua análise. Cada item soma a porcentagem
                    indicada. O total indica a força da confluência.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Tooltip title='Regra de horário: novas entradas permitidas apenas entre 04:00 e 13:00 (BRT)'>
                    <Chip
                      label={
                        operacaoPermitida
                          ? 'Entrada Permitida'
                          : 'Entrada Bloqueada'
                      }
                      color={operacaoPermitida ? 'success' : 'error'}
                    />
                  </Tooltip>
                  <Tooltip title='Informações sobre pontuação e RR'>
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Lista de grupos e itens */}
              {[...grupos.entries()].map(([group, items]) => (
                <Box key={group} sx={{ mb: 2 }}>
                  <Typography variant='h6' sx={{ mb: 1 }}>
                    {group}
                  </Typography>
                  <Grid container spacing={1}>
                    {items.map((it) => (
                      <Grid item xs={12} sm={6} key={it.id}>
                        <Card variant='outlined' sx={{ p: 1, height: '100%' }}>
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
                                  checked={!!checked[it.id]}
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

                            <Box sx={{ ml: 'auto', textAlign: 'right' }}>
                              <Chip label={`${it.weight}%`} size='small' />
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              {/* RR obrigatório toggle */}
              <Box
                sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}
              >
                <Typography>RR ≥ 2.50 (Obrigatório)</Typography>
                <Button
                  variant={rrOk ? 'contained' : 'outlined'}
                  onClick={() => setRrOk(true)}
                >
                  Sim
                </Button>
                <Button
                  variant={rrOk === false ? 'contained' : 'outlined'}
                  onClick={() => setRrOk(false)}
                >
                  Não
                </Button>
                <Typography variant='caption' color='text.secondary'>
                  Se não houver RR ≥ 2.5, a entrada deve ser cancelada.
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Button onClick={analisar} variant='contained' size='large'>
                  Analisar Confluência
                </Button>
                <Button
                  onClick={() => {
                    setChecked({})
                    setRrOk(null)
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
                  <Box sx={{ width: 260 }}>
                    <LinearProgress
                      variant='determinate'
                      value={percentual}
                      sx={{ height: 10, borderRadius: 2, mt: 1 }}
                    />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Painel lateral com resumo rápido */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              position: { md: 'sticky' },
              top: 16,
              borderRadius: 2,
              boxShadow: 6,
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
                    <TableCell>RR ≥ 2.5</TableCell>
                    <TableCell align='right'>
                      {rrOk === null ? '—' : rrOk ? 'OK' : 'NÃO'}
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

              <Divider sx={{ my: 1 }} />

              <Typography variant='subtitle2'>Recomendações</Typography>
              <Box sx={{ mt: 1 }}>
                {!operacaoPermitida && (
                  <Typography variant='body2' color='error'>
                    Fora do horário de entrada: Não abrir novas posições.
                  </Typography>
                )}

                {rrOk === false && (
                  <Typography variant='body2' color='error'>
                    RR insuficiente — NÃO ENTRAR.
                  </Typography>
                )}

                {rrOk !== false && percentual >= 90 && (
                  <Typography variant='body2' color='success.main'>
                    Confluência forte — entrada válida (A+).
                  </Typography>
                )}

                {rrOk !== false && percentual >= 70 && percentual < 90 && (
                  <Typography variant='body2' color='text.primary'>
                    Confluência razoável — avaliar risco (C+/B+).
                  </Typography>
                )}

                {percentual < 50 && (
                  <Typography variant='body2' color='text.secondary'>
                    Confluência fraca — evitar entrada.
                  </Typography>
                )}
              </Box>

              <Divider sx={{ my: 1 }} />

              <Typography variant='caption' color='text.secondary'>
                Configurações: escolha até 3 operações por dia. Aos domingos,
                selecione 3 pares principais e prepare as ordens para London/NY.
              </Typography>
              <Box sx={{ mt: 2, textAlign: 'left' }}>
                <Button variant='contained' color='primary' size='large'>
                  Registrar Entrada
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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
                    {checked[it.id] ? '✔' : '—'}
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
              {rrOk === false
                ? 'RR insuficiente — entrada proibida.'
                : 'RR em termos aceitáveis.'}
            </Typography>

            <Typography variant='body2' sx={{ mt: 1 }}>
              Se a nota for A+ ou B+ e o horário permitir, você tem uma
              configuração de alta probabilidade — alinhe SL/TP conforme sua
              regra: SL acima/abaixo da mudança de estrutura em M30/H1 com 5–15
              pips de espaço. TP preferencialmente no HH/LL anterior quando a
              entrada foi em AOI semanal/diário.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={fecharResumo}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
