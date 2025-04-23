'use client'

import { useState } from 'react'
import useSWR from 'swr'
import api from '../lib/api'
import GameCard from '../components/GameCard'

const fetcher = (url: string) => api.get(url).then(res => res.data)

function formatToBrasiliaTime(timestamp: number): string {
  const date = new Date(timestamp * 1000); // Timestamp da API está em segundos
  const brDate = new Date(date.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  return brDate.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
}


export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  })

  const { data, error } = useSWR(`/games?date=${selectedDate}`, fetcher, {
    refreshInterval: 15000,
  })

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Jogos de Vôlei - {selectedDate}</h1>

      <div className="mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border px-3 py-2 rounded"
        />
      </div>

      {error && <div>Erro ao carregar jogos.</div>}
      {!data && <div>Carregando...</div>}

      {data?.response.length === 0 && (
        <div className="text-gray-500">Nenhum jogo encontrado para essa data.</div>
      )}

{data?.response.map((game: any) => {

  return (
    <GameCard
    key={game.id}
    home={game.teams.home.name}
    away={game.teams.away.name}
    homeScore={game.scores.home}
    awayScore={game.scores.away}
    time={formatToBrasiliaTime(game.timestamp)}

    league={game.league.name}
    periods={game.periods}
  />
  
  )
})}

    </main>
  )
}
