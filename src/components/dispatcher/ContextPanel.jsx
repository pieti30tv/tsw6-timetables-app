import { useState } from 'react'
import { Badge } from '../ui/Badge.jsx'

export function ContextPanel({ activeTimetable }) {
  const [open, setOpen] = useState(false)

  if (!activeTimetable) {
    return (
      <Badge variant="neutral">No timetable loaded</Badge>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
      >
        <span className="w-2 h-2 rounded-full bg-amber-500" />
        Context: {activeTimetable.name}
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-6 w-72 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20 p-3">
          <p className="text-xs font-semibold text-gray-300 mb-2">Context sent to AI</p>
          <div className="text-xs text-gray-500 space-y-1 max-h-48 overflow-y-auto">
            <p><span className="text-gray-400">Timetable:</span> {activeTimetable.name}</p>
            <p><span className="text-gray-400">Trains:</span> {activeTimetable.trains.length}</p>
            <div className="mt-2 pt-2 border-t border-gray-700 space-y-0.5">
              {activeTimetable.trains.map(t => {
                const first = t.stops[0]
                const last = t.stops[t.stops.length - 1]
                return (
                  <p key={t.id} className="font-mono">
                    <span className="text-amber-600">{t.trainNumber}</span>
                    {first && last && (
                      <span className="text-gray-600"> {first.stationName} → {last.stationName}</span>
                    )}
                  </p>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
