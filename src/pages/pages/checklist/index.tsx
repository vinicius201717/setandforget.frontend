/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import React, { useEffect, useMemo, useState } from 'react'
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
import { CHECKLIST, FOREX_PAIRS, GRADES } from 'src/utils/checklist'
import PairSelectDialog from 'src/components/checklist/modal/PairSelectDialog'
import ResumoDialog from 'src/components/checklist/modal/ResumeDialog'
import PublishDialog from 'src/components/checklist/modal/PublishDialog'
import HeaderSection from 'src/components/checklist/HeaderSelection'
import ChecklistGroup from 'src/components/checklist/ChecklistGroup'
import ResumoRapidoCard from 'src/components/checklist/ResumeRapidCard'
import AnalisesRegistradasCard from 'src/components/checklist/AnaliseRegistreCard'
import toast from 'react-hot-toast'
import { AnalysisItem } from 'src/types/apps/operationType'
import { getOperationsByUserDraft } from 'src/pages/api/operation/getOperationByUserDraft'

// Mock do professor
const professorPairs = ['EUR/USD', 'USD/JPY', 'AUD/USD']

// Mock análises registradas
// Mock análises registradas

const publishSchema = z.object({
  notes: z.string().optional(),
  link: z
    .string()
    .regex(
      /^https:\/\/(www\.)?tradingview\.com\/x\/[A-Za-z0-9]+\/?$/,
      'O link deve estar no formato https://www.tradingview.com/x/XXXXXX/',
    ),
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
  const [analyses, setAnalyses] = useState<AnalysisItem[]>([])
  const [openPublishModal, setOpenPublishModal] = useState(false)

  const form = useForm<PublishFormData>({
    resolver: zodResolver(publishSchema),
    defaultValues: { notes: '', link: '' },
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

  const parseChecklistField = (raw?: string): Record<string, boolean> => {
    if (!raw) return {}
    try {
      // Ex.: raw = '"{\"patterns\":true,...}"'  -> 1st JSON.parse -> '{"patterns":true,...}'
      const once = JSON.parse(raw)
      // pode já estar vindo só como '{}' (string) ou como objeto (se backend mudar)
      if (typeof once === 'string') {
        return JSON.parse(once)
      }
      if (typeof once === 'object' && once !== null) {
        return once as Record<string, boolean>
      }
    } catch (e) {
      console.warn('parseChecklistField failed for raw:', raw, e)
    }
    return {}
  }

  const loadAnalysis = (analysis: AnalysisItem) => {
    setSelectedPair(analysis.pair)
    const newChecked: Record<string, boolean> = {}
    analysis.checkedItems.forEach((id) => (newChecked[id] = true))
    setChecklist(newChecked)
  }

  const onSubmitPublish = (data: PublishFormData) => {
    createOperation({
      pair: selectedPair,
      checklist: JSON.stringify(checklist),
      rr,
      status: 'PUBLISHED',
      notes: data.notes,
      link: data.link,
    }).then((res: any) => {
      if (res) {
        toast.success('Operação publicada com sucesso!', {
          position: 'bottom-right',
        })

        // 🔹 Normaliza os itens marcados
        const normalize = (items: string[]) =>
          items
            .map((s) => String(s).trim())
            .filter(Boolean)
            .sort((a, b) => a.localeCompare(b))

        const publishedChecked = normalize(
          Object.keys(checklist).filter((id) => checklist[id]),
        )

        // 🔹 Gera uma chave única (pair + itens)
        const makeKey = (pair: string, checked: string[]) =>
          `${pair}|${checked.join(',')}`

        const publishedKey = makeKey(selectedPair, publishedChecked)

        // 🔹 Remove da lista de análises o item que tiver a mesma chave
        setAnalyses((prev) => {
          const prevNormalized = prev.map((a) => ({
            ...a,
            _key: makeKey(a.pair, normalize(a.checkedItems)),
          }))
          return prevNormalized.filter((a) => a._key !== publishedKey)
        })
      } else {
        toast.error('Erro ao publicar operação.', { position: 'bottom-right' })
        console.error('Erro ao publicar operação.')
      }
    })

    setOpenPublishModal(false)
    reset()
  }

  const onSubmitDraft = () => {
    if (!selectedPair) {
      toast.error('É obrigatório selecionar um par.', {
        position: 'bottom-right',
      })
      return
    }

    const isRrFilled = typeof rr === 'number' && !isNaN(rr)

    const newAnalysis = {
      pair: selectedPair,
      date: new Date().toLocaleDateString('pt-BR'),
      checkedItems: Object.keys(checklist).filter((id) => checklist[id]),
    }

    const payload = {
      pair: selectedPair,
      rr: isRrFilled ? rr : undefined,
      checklist: JSON.stringify(checklist),
      status: 'DRAFT' as const,
      notes: '',
    }

    createOperation(payload).then((res: any) => {
      if (res) {
        // normaliza checkedItems do newAnalysis
        const normalize = (items: string[]) =>
          items
            .map((s) => String(s).trim())
            .filter(Boolean)
            .sort((a, b) => a.localeCompare(b))

        const newChecked = normalize(newAnalysis.checkedItems)
        const makeKey = (pair: string, checked: string[]) =>
          `${pair}|${checked.join(',')}`
        const newKey = makeKey(newAnalysis.pair, newChecked)

        setAnalyses((prev) => {
          const prevNormalized = prev.map((a) => ({
            ...a,
            _key: makeKey(a.pair, normalize(a.checkedItems)),
          }))

          // se backend retornou id do rascunho, use por id
          if (res.id) {
            const idxById = prev.findIndex((a) => a.id === res.id)
            if (idxById !== -1) {
              const updated = [...prev]
              updated[idxById] = {
                ...(updated[idxById] as any),
                date: new Date(
                  res.updatedAt ?? res.createdAt ?? Date.now(),
                ).toLocaleDateString('pt-BR'),
                checkedItems: newChecked,
                id: res.id,
              }
              return updated
            }
            // não existia: inserir item vindo do backend (preferível)
            return [
              ...prev,
              {
                id: res.id,
                pair: res.pair ?? newAnalysis.pair,
                date: new Date(res.createdAt ?? Date.now()).toLocaleDateString(
                  'pt-BR',
                ),
                checkedItems: newChecked,
              },
            ]
          }

          // fallback: compara por conteúdo normalizado (key)
          const existingIdx = prevNormalized.findIndex((p) => p._key === newKey)
          if (existingIdx !== -1) {
            const updated = [...prev]
            updated[existingIdx] = {
              ...updated[existingIdx],
              date: newAnalysis.date,
              checkedItems: newChecked,
            }
            return updated
          }

          // não existe: adiciona
          return [
            ...prev,
            {
              id: res?.id, // pode ser undefined
              pair: newAnalysis.pair,
              date: newAnalysis.date,
              checkedItems: newChecked,
            },
          ]
        })

        toast.success('Rascunho salvo com sucesso!', {
          position: 'bottom-right',
        })
      } else {
        toast.error('Erro ao salvar rascunho.', { position: 'bottom-right' })
        console.error('Erro ao salvar rascunho.')
      }
    })
  }

  useEffect(() => {
    const fetchDrafts = async () => {
      const res = await getOperationsByUserDraft()

      if (!res) return

      const parsed = res.map((item: any): AnalysisItem => {
        const parsedChecklist = parseChecklistField(item.checklist)
        return {
          id: item.id,
          pair: item.pair,
          date: new Date(item.createdAt).toLocaleDateString('pt-BR'),
          checkedItems: Object.keys(parsedChecklist).filter(
            (k) => parsedChecklist[k],
          ),
        }
      })

      setAnalyses(parsed)
    }

    fetchDrafts()
  }, [])

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
              <HeaderSection
                userName={user.user?.name}
                selectedPair={selectedPair}
                operacaoPermitida={operacaoPermitida}
                onOpenPairModal={() => setOpenPairModal(true)}
              />

              <Divider sx={{ my: 2 }} />

              {/* Checklist */}
              {['Análise', 'Entrada'].map((group) => {
                const items = CHECKLIST.filter((it) => it.group === group)
                return (
                  <ChecklistGroup
                    key={group}
                    group={group}
                    items={items}
                    checklist={checklist}
                    toggle={toggle}
                  />
                )
              })}

              {/* RR obrigatório */}
              <Box
                sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}
              >
                <Typography>RR ≥ 2.0 (Obrigatório)</Typography>
                <Button
                  variant={rr >= 2 ? 'contained' : 'outlined'}
                  onClick={() => setRr(2)}
                >
                  Sim
                </Button>
                <Button
                  variant={rr < 2 ? 'contained' : 'outlined'}
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
          <ResumoRapidoCard
            totalPeso={totalPeso}
            percentual={percentual}
            grade={grade}
            rr={rr}
            operacaoPermitida={operacaoPermitida}
            onPublish={() => setOpenPublishModal(true)}
            onSaveDraft={onSubmitDraft}
          />
          <br />

          <AnalisesRegistradasCard
            analyses={analyses}
            loadAnalysis={loadAnalysis}
          />
        </Grid>
      </Grid>

      {/* Modal de seleção de par */}
      <PairSelectDialog
        open={openPairModal}
        onClose={() => setOpenPairModal(false)}
        selectedPair={selectedPair}
        pairSearch={pairSearch}
        setPairSearch={setPairSearch}
        professorPairs={professorPairs}
        filteredPairs={filteredPairs}
        handlePairSelect={handlePairSelect}
      />

      <ResumoDialog
        open={openResumo}
        onClose={fecharResumo}
        checklist={checklist}
        totalPeso={totalPeso}
        percentual={percentual}
        grade={grade}
        rr={rr}
      />

      <PublishDialog
        open={openPublishModal}
        onClose={() => setOpenPublishModal(false)}
        handleSubmit={handleSubmit}
        onSubmitPublish={onSubmitPublish}
        control={control}
      />
    </Box>
  )
}
