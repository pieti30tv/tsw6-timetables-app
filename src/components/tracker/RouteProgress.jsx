import { useTimetables } from '../../hooks/useTimetables.js'
import { useTrackerContext } from '../../context/TrackerContext.jsx'

export function RouteProgress() {
  const { timetables } = useTimetables()
  const { selectedTimetableId, selectedTrainId, currentStopIndex, setCurrentStopIndex } = useTrackerContext()

  const timetable = timetables.find(t => t.id === selectedTimetableId)
  const train = timetable?.trains.find(t => t.id === selectedTrainId)

  if (!train || train.stops.length === 0) return null

  const stops = train.stops
  const pct = stops.length > 1 ? (currentStopIndex / (stops.length - 1)) * 100 : 0

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Route Progress</span>
        <span className="text-xs text-gray-500">{stops[0].stationName} → {stops[stops.length - 1].stationName}</span>
      </div>

      {/* Progress bar */}
      <div className="relative mb-4">
        <div className="h-1 bg-gray-800 rounded-full">
          <div
            className="h-1 bg-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Station dots */}
        <div className="flex justify-between mt-2">
          {stops.map((stop, i) => {
            const isPast = i < currentStopIndex
            const isCurrent = i === currentStopIndex
            const isFuture = i > currentStopIndex

            return (
              <button
                key={stop.id}
                onClick={() => setCurrentStopIndex(i)}
                className="flex flex-col items-center group"
                style={{ width: `${100 / stops.length}%` }}
                title={`${stop.stationName}${stop.platform ? ` Plt. ${stop.platform}` : ''}`}
              >
                <div
                  className={`
                    w-3 h-3 rounded-full border-2 transition-all
                    ${isCurrent ? 'bg-amber-500 border-amber-500 scale-125' : ''}
                    ${isPast ? 'bg-emerald-600 border-emerald-600' : ''}
                    ${isFuture ? 'bg-gray-700 border-gray-600' : ''}
                    ${stop.passingStop ? 'w-2 h-2' : ''}
                    group-hover:border-amber-400
                  `}
                />
                {stops.length <= 12 && (
                  <span
                    className={`
                      mt-1 text-[9px] leading-tight text-center truncate max-w-full px-0.5
                      ${isCurrent ? 'text-amber-400 font-semibold' : ''}
                      ${isPast ? 'text-gray-600' : ''}
                      ${isFuture ? 'text-gray-600' : ''}
                    `}
                  >
                    {stop.stationName.split(' ').slice(0, 2).join(' ')}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center">
        Click a station dot to jump to that stop
      </p>
    </div>
  )
}
