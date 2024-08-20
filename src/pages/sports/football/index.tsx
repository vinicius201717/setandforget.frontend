import { Container } from '@mui/material'
import { ContainerFixture } from './style'
import FootballLayout from 'src/layouts/components/footballLayout'
import { useEffect, useState } from 'react'
import { getFixture } from 'src/pages/api/football/fixture/getFixture'

export default function Football() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    getFixture().then((response) => {
      setData(response)
    })
  }, [])

  return (
    <FootballLayout>
      <Container>
        <ContainerFixture>
          {data.length > 0 ? (
            <pre>
              {data.map((value: any, key: number) => (
                <div key={key}>{JSON.stringify(value, null, 2)} </div>
              ))}
            </pre>
          ) : (
            <p>Carregando dados...</p>
          )}
        </ContainerFixture>
      </Container>
    </FootballLayout>
  )
}
