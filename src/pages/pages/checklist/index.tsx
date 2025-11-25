/* eslint-disable react-hooks/exhaustive-deps */
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
  Divider,
  LinearProgress,
  Button,
} from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { isNaN } from 'lodash'
import { createOperation } from 'src/pages/api/operation/createOperation'
import { CHECKLIST, FOREX_PAIRS, GRADES } from 'src/utils/checklist'
import PairSelectDialog from 'src/components/checklist/modal/PairSelectDialog'
import ResumoDialog from 'src/components/checklist/modal/ResumeDialog'
import PublishDialog from 'src/components/checklist/modal/publishModal/PublishDialog'
import HeaderSection from 'src/components/checklist/HeaderSelection'
import ChecklistGroup from 'src/components/checklist/ChecklistGroup'
import ResumoRapidoCard from 'src/components/checklist/ResumeRapidCard'
import AnalisesRegistradasCard from 'src/components/checklist/AnaliseRegistreCard'
import toast from 'react-hot-toast'
import { AnalysisItem, OperationType } from 'src/types/apps/operationType'
import { getOperationsByUserDraft } from 'src/pages/api/operation/getOperationByUserDraft'
import { deleteOperation } from 'src/pages/api/operation/deleteOperation'
import { getOperationsByTeacher } from 'src/pages/api/operation/getOperationByTeacher'
import { ImagesModal } from 'src/components/checklist/modal/publishModal/ImageLinksDialog'

// Zod schema atualizado: totalRR como string (só números), imageBlocks opcional
const publishSchema = z.object({
  notes: z.string().optional(),

  type: z.enum(['buy', 'sell']),

  totalRR: z
    .string()
    .regex(/^\d+(\.\d+)?$/, 'RR inválido — use apenas números'),

  entryDate: z.string(),
  entryTime: z.string(),

  exitDate: z.string(),
  exitTime: z.string(),

  result: z.string().min(1, 'Informe o resultado da operação'),
})

type PublishFormData = z.infer<typeof publishSchema>

export default function ChecklistTradingPage() {
  const user = useAuth()
  const [checklist, setChecklist] = useState<Record<string, boolean>>({})
  const [rr, setRr] = useState<number>(0)
  const [openResumo, setOpenResumo] = useState(false)
  const [openPairModal, setOpenPairModal] = useState(false)
  const [selectedPair, setSelectedPair] = useState('')
  const [pairSearch, setPairSearch] = useState('')
  const [analyses, setAnalyses] = useState<AnalysisItem[]>([])
  const [openPublishModal, setOpenPublishModal] = useState(false)
  const [teacherPair, setTeacherPair] = useState<string[]>([])
  const [isTeacherPair, setIsTeacherPair] = useState(false)
  const [operationTeacherPair, setOperationTeacherPair] = useState<
    OperationType[]
  >([])
  const [openImagesModal, setOpenImagesModal] = useState(false)

  // imageBlocks mantidos no pai: array de { link, text }
  const [links, setLinks] = useState<{ link: string; text: string }[]>([])

  const form = useForm<PublishFormData>({
    resolver: zodResolver(publishSchema),
    defaultValues: {
      notes: '',
      type: 'buy',
      totalRR: '2',
      entryDate: new Date().toISOString().slice(0, 10),
      entryTime: '09:00',
      exitDate: new Date().toISOString().slice(0, 10),
      exitTime: '12:00',
      result: '',
    },
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
    if (!pairSearch) return FOREX_PAIRS
    return FOREX_PAIRS.filter((p) =>
      p.toLowerCase().includes(pairSearch.toLowerCase()),
    )
  }, [pairSearch])

  const handlePairSelect = (pair: string, teacherMode: boolean) => {
    setSelectedPair(pair)
    setIsTeacherPair(!!teacherMode)

    const saved = analyses.find((a) => a.pair === pair)

    if (saved) {
      loadAnalysis(saved)
    } else {
      setChecklist({})
      setRr(0)
    }
  }

  const parseChecklistField = (raw: any): Record<string, boolean> => {
    if (!raw) return {}

    if (typeof raw === 'object') return raw

    if (typeof raw === 'string') {
      try {
        return JSON.parse(raw)
      } catch {
        console.warn('JSON inválido:', raw)
        return {}
      }
    }

    return {}
  }

  const loadAnalysis = (analysis: AnalysisItem) => {
    // muda o par
    setSelectedPair(analysis.pair)

    // verifica se esse par é um par de professor
    const isTeacher = teacherPair.includes(analysis.pair)
    setIsTeacherPair(isTeacher)

    // monta o checklist salvo
    const newChecked: Record<string, boolean> = {}
    analysis.checkedItems.forEach((id) => (newChecked[id] = true))
    setChecklist(newChecked)
  }

  const onSubmitPublish = (data: PublishFormData) => {
    const normalizedLinks = links
      .map((b) => ({
        link: b.link?.trim() ?? '',
        text: b.text?.trim() ?? '',
      }))
      .filter((b) => b.link !== '' || b.text !== '')

    // validação adicional: totalRR string -> number
    const totalRrNumber = Number(data.totalRR)
    if (Number.isNaN(totalRrNumber)) {
      toast.error('RR inválido — use apenas números', {
        position: 'bottom-right',
      })
      return
    }

    createOperation({
      pair: selectedPair,
      checklist: JSON.stringify(checklist),
      type: data.type,
      totalRR: totalRrNumber,
      entryDate: data.entryDate,
      entryTime: data.entryTime,
      exitDate: data.exitDate,
      exitTime: data.exitTime,
      result: data.result,
      links: normalizedLinks,
      rr,
      status: 'PUBLISHED',
      notes: data.notes || '',
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

        const makeKey = (pair: string, checked: string[]) =>
          `${pair}|${checked.join(',')}`

        const publishedKey = makeKey(selectedPair, publishedChecked)

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
    // limpar blocos de imagem após publicar
    setLinks([{ link: '', text: '' }])
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
          // normalização das checkedItems
          const normalize = (items: string[]) =>
            items
              .map((s) => String(s).trim())
              .filter(Boolean)
              .sort((a, b) => a.localeCompare(b))

          const newChecked = normalize(newAnalysis.checkedItems)

          // 1 — Atualizar por ID (melhor cenário)
          if (res.id) {
            const idx = prev.findIndex((a) => a.id === res.id)
            if (idx !== -1) {
              const updated = [...prev]
              updated[idx] = {
                ...updated[idx],
                date: new Date(
                  res.updatedAt ?? res.createdAt ?? Date.now(),
                ).toLocaleDateString('pt-BR'),
                checkedItems: newChecked,
                id: res.id,
              }
              return updated
            }
          }

          // 2 — Atualizar por PAR (pair) caso id não exista
          const idxByPair = prev.findIndex((a) => a.pair === newAnalysis.pair)
          if (idxByPair !== -1) {
            const updated = [...prev]
            updated[idxByPair] = {
              ...updated[idxByPair],
              date: newAnalysis.date,
              checkedItems: newChecked,
              id: res?.id ?? updated[idxByPair].id,
            }
            return updated
          }

          // 3 — Criar novo item apenas se realmente não existe
          return [
            ...prev,
            {
              id: res?.id,
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

  const handleDeleteAnalysis = async (analysis: AnalysisItem) => {
    if (!analysis.id) {
      setAnalyses((prev) => prev.filter((a) => a !== analysis))
      return
    }

    const res = await deleteOperation(analysis.id)

    if (res) {
      setAnalyses((prev) => prev.filter((a) => a.id !== analysis.id))
      toast.success('Análise removida!', { position: 'bottom-right' })
    } else {
      toast.error('Erro ao remover análise.', { position: 'bottom-right' })
    }
  }

  useEffect(() => {
    const fetchDrafts = async () => {
      const res = await getOperationsByUserDraft()
      const teacherData = await getOperationsByTeacher()

      if (!res) return
      if (teacherData) {
        const allOps = [...teacherData.drafts, ...teacherData.published]
        setOperationTeacherPair(allOps)
        const uniquePairs = Array.from(new Set(allOps.map((op) => op.pair)))

        setTeacherPair(uniquePairs)
      }

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
                isTeacherPair={isTeacherPair}
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
                    selectedPair={selectedPair}
                    operationTeacherPair={operationTeacherPair}
                    isTeacherPair={isTeacherPair}
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
            onDelete={handleDeleteAnalysis}
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
        teacherPair={teacherPair}
        filteredPairs={filteredPairs}
        handlePairSelect={handlePairSelect}
        isTeacherMode={isTeacherPair}
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
        links={links}
        onOpenImages={() => setOpenImagesModal(true)}
      />

      {/* Images modal */}
      <ImagesModal
        open={openImagesModal}
        onClose={() => setOpenImagesModal(false)}
        links={links}
        setLinks={setLinks}
      />
    </Box>
  )
}
