import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Lineup } from 'src/types/apps/footballType/teamType'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

interface LineupProps {
  data: Lineup[]
}

export const FormationPieChart = ({ data }: LineupProps) => (
  <ResponsiveContainer width='100%' height={400}>
    <PieChart>
      <Pie
        data={data}
        dataKey='played'
        nameKey='formation'
        cx='50%'
        cy='50%'
        outerRadius={150}
        fill='#8884d8'
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
)
