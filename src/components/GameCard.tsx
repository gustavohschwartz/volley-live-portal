interface GameCardProps {
  home: string;
  away: string;
  homeScore: number | null;
  awayScore: number | null;
  time: string;
  league: string;
  countryName?: string;
  countryFlag?: string;
  periods?: {
    first?: { home: number; away: number };
    second?: { home: number; away: number };
    third?: { home: number; away: number };
    fourth?: { home: number; away: number };
    fifth?: { home: number; away: number };
  };
}

export default function GameCard({
  home,
  away,
  homeScore,
  awayScore,
  time,
  league,
  countryName,
  countryFlag,
  periods = {},
}: GameCardProps) {
  const getWinner = () => {
    if (homeScore == null || awayScore == null) return null
    return homeScore > awayScore ? 'home' : 'away'
  }

  const isWinner = getWinner()

  const renderSet = (label: string, set: any) => {
    if (!set || set.home == null || set.away == null) return null
    return (
      <div key={label} className="text-sm text-gray-700">
        {label}: {set.home} - {set.away}
      </div>
    )
  }

  return (
    <div className="border border-gray-200 p-4 rounded-2xl shadow-md bg-white hover:shadow-lg transition-all duration-200">
      <div className="flex items-center gap-2 mb-2 text-sm text-blue-800">
        {countryFlag && (
          <img src={countryFlag} alt={countryName} className="w-5 h-5 rounded-full border" />
        )}
        <span>{league}</span>
        {countryName && <span className="text-gray-600 ml-auto">{countryName}</span>}
      </div>

      <div className="flex justify-between items-center text-lg font-medium mb-1">
        <span className={isWinner === 'home' ? 'text-green-600 font-bold' : ''}>
          {home}
        </span>
        <span>{homeScore != null ? homeScore : '-'}</span>
      </div>

      <div className="flex justify-between items-center text-lg font-medium mb-1">
        <span className={isWinner === 'away' ? 'text-green-600 font-bold' : ''}>
          {away}
        </span>
        <span>{awayScore != null ? awayScore : '-'}</span>
      </div>

      <div className="text-sm text-gray-500 mt-2">Horário: {time}</div>

      <div className="mt-2 space-y-1">
        {renderSet("1º Set", periods.first)}
        {renderSet("2º Set", periods.second)}
        {renderSet("3º Set", periods.third)}
        {renderSet("4º Set", periods.fourth)}
        {renderSet("5º Set", periods.fifth)}
      </div>
    </div>
  )
}
