interface GameCardProps {
  home: string;
  away: string;
  homeScore: number | null;
  awayScore: number | null;
  time: string;
  league: string;
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
  periods = {},
}: GameCardProps) {
  const getStyle = (isWinner: boolean) =>
    isWinner ? "text-green-600 font-bold" : "text-gray-500";

  const isFinished = homeScore !== null && awayScore !== null;

  const renderSet = (label: string, set: any) => {
    if (!set || set.home == null || set.away == null) return null;
    return (
      <div key={label} className="text-sm text-gray-700">
        {label}: {set.home} - {set.away}
      </div>
    );
  };

  return (
    <div className="border p-4 rounded mb-4 shadow bg-white">
      <div className="text-sm text-blue-800 mb-1">{league}</div>
      <div className="text-lg font-semibold">{home} vs {away}</div>
      <div className="text-sm text-gray-500">Horário: {time}</div>

      <div className="mt-2 text-xl">
        {isFinished ? (
          <span>
            <span className={getStyle(homeScore > awayScore)}>{homeScore}</span> -
            <span className={`ml-1 ${getStyle(awayScore > homeScore)}`}>{awayScore}</span>
          </span>
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </div>

      <div className="mt-2 space-y-1">
        {renderSet("1º Set", periods.first)}
        {renderSet("2º Set", periods.second)}
        {renderSet("3º Set", periods.third)}
        {renderSet("4º Set", periods.fourth)}
        {renderSet("5º Set", periods.fifth)}
      </div>
    </div>
  );
}
