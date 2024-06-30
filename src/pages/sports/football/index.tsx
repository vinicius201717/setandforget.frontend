import { useEffect, useState } from 'react'
import { api } from 'src/lib/axios'

export default function SMC() {
  const [data, setData] = useState(null)

  async function fetchData() {
    try {
      const response = await api.get('/sportmonks/get-leagues')
      setData(response.data)
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h1>Sportmonks Leagues</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
