import { useTimetables } from '../../hooks/useTimetables.js'
import { useTrackerContext } from '../../context/TrackerContext.jsx'
import { formatTime, computeDelay, getDelaySeverity, minutesUntil } from '../../utils/timeUtils.js'
import { DelayBadge } from '../ui/Badge.jsx'
import { StatusIndicator } from '../ui/StatusIndicator.jsx'

export function LiveDisplay() {
  const { timetables } = useTimetables()
  const { selectedTimetableId, selectedTrainId, currentStopIndex, currentMinutes } = useTrackerContext()

  const timetable = timetables.find(t => t.id === selectedTimetableId)
  const train = timetable?.trains.find(t => t.id === selectedTrainId)

  if (!train) return null

  const stops = train.stops
  const currentStop = stops[currentStopIndex]
  const nextStop = stops[currentStopIndex + 1] ?? null

  const clockStr = formatTime(currentMinutes)

  // Compute schedule status at current stop
  const scheduledDep = currentStop?.departure || currentStop?.arrival || null
  const delayMinutes = scheduledDep ? computeDelay(scheduledDep, clockStr) : null
  const severity = delayMinutes != null ? getDelaySeverity(Math.max(0, delayMinutes)) : 'neutral'

  // Minutes until next stop's arrival
  const minsUntilNext = nextStop?.arrival ? minutesUntil(clockStr, nextStop.arrival) : null

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
      {/* Header bar */}
      <div className="bg-gray-800/60 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-amber-400 font-bold text-sm">{train.trainNumber}</span>
          <span className="text-xs text-gray-500">{train.trainType}</span>
          <StatusIndicator
            status={severity === 'on-time' ? 'on-time' : severity === 'minor' ? 'minor' : 'major'}
            label={severity === 'on-time' ? 'On Time' : severity === 'minor' ? 'Minor Delay' : 'Delayed'}
          />
        </div>
        <div className="font-mono text-lg text-gray-100 tabular-nums">{clockStr}</div>
      </div>

      <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Current stop */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Current Station</p>
          <p className="text-base font-semibold text-gray-100">{currentStop?.stationName ?? '—'}</p>
          {currentStop?.platform && (
            <p className="text-xs text-gray-500 mt-0.5">Platform {currentStop.platform}</p>
          )}
          {currentStop?.departure && (
            <p className="text-xs text-gray-400 mt-1">
              Dep: <span className="font-mono text-amber-400">{currentStop.departure}</span>
            </p>
          )}
        </div>

        {/* Next stop */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Next Station</p>
          {nextStop ? (
            <>
              <p className="text-base font-semibold text-gray-100">{nextStop.stationName}</p>
              {nextStop.platform && (
                <p className="text-xs text-gray-500 mt-0.5">Platform {nextStop.platform}</p>
              )}
              {nextStop.arrival && (
                <p className="text-xs text-gray-400 mt-1">
                  Arr: <span className="font-mono text-gray-300">{nextStop.arrival}</span>
                  {minsUntilNext != null && (
                    <span className="text-gray-600 ml-1">({minsUntilNext}m)</span>
                  )}
                </p>
              )}
            </>
          ) : (
            <p className="text-base text-gray-600">Terminus</p>
          )}
        </div>

        {/* Delay status */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Schedule Status</p>
          <div className="flex items-center gap-2">
            <DelayBadge delayMinutes={delayMinutes != null ? Math.max(0, delayMinutes) : 0} />
          </div>
          {delayMinutes != null && delayMinutes > 0 && (
            <p className="text-xs text-gray-500 mt-1">+{delayMinutes} min behind schedule</p>
          )}
          {delayMinutes != null && delayMinutes <= 0 && (
            <p className="text-xs text-gray-500 mt-1">
              {delayMinutes < 0 ? `${Math.abs(delayMinutes)} min early` : 'Running on time'}
            </p>
          )}
        </div>
      </div>

      {/* All stops mini-table */}
      <div className="border-t border-gray-800 px-4 pb-4 pt-3">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">All Stops</p>
        <div className="space-y-0.5 max-h-40 overflow-y-auto">
          {stops.map((stop, i) => (
            <div
              key={stop.id}
              className={`flex items-center gap-3 text-xs px-2 py-1 rounded ${
                i === currentStopIndex ? 'bg-amber-500/10 text-amber-300' :
                i < currentStopIndex ? 'text-gray-600' : 'text-gray-400'
              }`}
            >
              <span className="w-2 h-2 rounded-full shrink-0 inline-block" style={{
                backgroundColor: i === currentStopIndex ? '#F59E0B' :
                  i < currentStopIndex ? '#374151' : '#4B5563'
              }} />
              <span className="flex-1">{stop.stationName}</span>
              <span className="font-mono text-gray-600">{stop.arrival || stop.departure}</span>
              {stop.platform && <span className="text-gray-700">Plt {stop.platform}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
