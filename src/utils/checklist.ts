export type Item = {
  id: string
  title: string
  description?: string
  weight: number // percentual da confluência
  group: string
}

export const CHECKLIST: Item[] = [
  // Grupo: Weekly / Daily / 4H - Swingtrade
  {
    id: 'w1',
    title: 'At AOI / Rejeição (Semanal/Diário)',
    weight: 10,
    group: 'Swing (Weekly/Daily/4H)',
  },
  {
    id: 'w2',
    title: 'Toque / Rejeição da EMA (Weekly/Daily/4H)',
    weight: 5,
    group: 'Swing (Weekly/Daily/4H)',
  },
  {
    id: 'w3',
    title: 'Candle de rejeição (Weekly/Daily)',
    weight: 10,
    group: 'Swing (Weekly/Daily/4H)',
  },
  {
    id: 'w4',
    title: 'Rejeição em ponto de estrutura anterior (Weekly/Daily/4H)',
    weight: 5,
    group: 'Swing (Weekly/Daily/4H)',
  },
  {
    id: 'w5',
    title: 'Nível psicológico redondo (Weekly/Daily)',
    weight: 5,
    group: 'Swing (Weekly/Daily/4H)',
  },
  {
    id: 'w6',
    title: 'Padrões (Weekly/Daily/4H)',
    weight: 10,
    group: 'Swing (Weekly/Daily/4H)',
  },

  // Entry checklist 4H, 2H, 1H, 30M
  {
    id: 'e1',
    title: 'Zona/Dourada 4H (Gold/Zone)',
    weight: 5,
    group: 'Entrada (4H/2H/1H/30M)',
  },
  {
    id: 'e2',
    title: 'SOS 30+1H (confluência de ordem superior)',
    weight: 10,
    group: 'Entrada (4H/2H/1H/30M)',
  },
  {
    id: 'e3',
    title: 'Padrões na entrada (ex.: pin/bar, inside bar, etc.)',
    weight: 5,
    group: 'Entrada (4H/2H/1H/30M)',
  },
  {
    id: 'e4',
    title: 'Compra/Venda obrigatória em HL/LH de H1 que combine com 4H',
    weight: 5,
    group: 'Entrada (4H/2H/1H/30M)',
  },
  {
    id: 'e5',
    title: 'Engolfamento em 1H (Engulfing 1H)',
    weight: 10,
    group: 'Entrada (4H/2H/1H/30M)',
  },
  {
    id: 'e6',
    title: 'RR mínimo 2.50 (Obrigatório)',
    weight: 0,
    description:
      'Este item é obrigatório: se não houver RR ≥ 2.5, a entrada é rejeitada independentemente da soma.',
    group: 'Entrada (4H/2H/1H/30M)',
  },

  // Cheklist 4H/Daily/Daytrade
  {
    id: 'd1',
    title: 'Toque / Rejeição EMA (Daily/4H)',
    weight: 5,
    group: 'Daytrade (Daily/4H)',
  },
  {
    id: 'd2',
    title: 'Candle de rejeição no diário (Daily) / 4H',
    weight: 10,
    group: 'Daytrade (Daily/4H)',
  },
  {
    id: 'd3',
    title: 'Rejeição em estrutura anterior (Daily/4H)',
    weight: 10,
    group: 'Daytrade (Daily/4H)',
  },
  {
    id: 'd4',
    title: 'At AOI (Daily)',
    weight: 10,
    group: 'Daytrade (Daily/4H)',
  },
  {
    id: 'd5',
    title: 'Padrões Daily / 4H',
    weight: 10,
    group: 'Daytrade (Daily/4H)',
  },
  {
    id: 'd6',
    title: 'Nível psicológico redondo (Daily)',
    weight: 5,
    group: 'Daytrade (Daily/4H)',
  },
]
