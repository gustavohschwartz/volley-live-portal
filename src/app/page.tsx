'use client'

import { useState } from 'react'
import useSWR from 'swr'
import api from '../lib/api'
import GameCard from '../components/GameCard'

type Game = {
  id: number
  timestamp: number
  teams: {
    home: { name: string }
    away: { name: string }
  }
  scores: {
    home: number | null
    away: number | null
  }
  country: {
    id: number
    name: string
    code: string
    flag: string
  }
  league: {
    name: string
  }
  periods?: {
    first?: { home: number; away: number }
    second?: { home: number; away: number }
    third?: { home: number; away: number }
    fourth?: { home: number; away: number }
    fifth?: { home: number; away: number }
  }
}

const fetcher = (url: string) => api.get(url).then(res => res.data)

function formatToBrasiliaTime(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  const brDate = new Date(date.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }))
  return brDate.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })
}

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  })

  const [selectedCountry, setSelectedCountry] = useState<string>("Todos")

  const { data, error } = useSWR(`/games?date=${selectedDate}`, fetcher, {
    refreshInterval: 15000,
  })

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
  }

  // Corrigido: extrai país corretamente de game.country.name
  const countries: string[] = data?.response
    ? Array.from(
        new Set(
          (data.response as Game[])
            .map((g) => g.country?.name)
            .filter((c): c is string => typeof c === 'string' && c.trim().length > 0)
        )
      )
    : []

  const filteredGames = data?.response
    ?.filter((game: Game) =>
      selectedCountry === "Todos" || game.country?.name === selectedCountry
    ) || []

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Jogos de Vôlei - {selectedDate}</h1>

      <div className="mb-4 space-y-3">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border px-3 py-2 rounded w-full"
        />

        {data?.response && countries.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filtrar por país
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            >
              <option value="Todos">Todos</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {error && <div className="text-red-500">Erro ao carregar jogos.</div>}
      {!data && <div>Carregando...</div>}

      {filteredGames.length === 0 && (
        <div className="text-gray-500">Nenhum jogo encontrado para essa data.</div>
      )}

      {filteredGames.map((game) => (
        <GameCard
        key={game.id}
        home={game.teams.home.name}
        away={game.teams.away.name}
        homeScore={game.scores.home}
        awayScore={game.scores.away}
        time={formatToBrasiliaTime(game.timestamp)}
        league={game.league.name}
        countryName={game.country?.name}
        countryFlag={game.country?.flag}
        periods={game.periods}
      />
      
      ))}
    </main>
  )
}
