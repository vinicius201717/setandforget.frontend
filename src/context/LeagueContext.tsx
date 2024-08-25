import React, { createContext, useContext } from 'react'
import { LeagueResponse } from 'src/types/apps/footballType'
import { getLeagueDetails } from 'src/pages/api/football/league/getLeagueDetails'
import { useQuery } from '@tanstack/react-query'

interface LeagueContextProps {
  leagueDetails: LeagueResponse[] | undefined
  isLoading: boolean
  error: any
}

const LeagueContext = createContext<LeagueContextProps | undefined>(undefined)

export const LeagueProvider: React.FC<{
  leagueId: number
  season: number
  children: React.ReactNode
}> = ({ leagueId, season, children }) => {
  const {
    data: leagueDetails,
    error,
    isLoading,
  } = useQuery<LeagueResponse[]>({
    queryKey: ['leagueDetails', leagueId, season],
    queryFn: () => getLeagueDetails(leagueId, season),
    enabled: !!leagueId && !!season,
  })

  return (
    <LeagueContext.Provider value={{ leagueDetails, isLoading, error }}>
      {children}
    </LeagueContext.Provider>
  )
}

export const useLeagueContext = (): LeagueContextProps => {
  const context = useContext(LeagueContext)
  if (!context) {
    throw new Error(
      'useLeagueContext deve ser usado dentro de um LeagueProvider',
    )
  }
  return context
}
